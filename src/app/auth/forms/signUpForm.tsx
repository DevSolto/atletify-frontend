'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { register } from '@/src/services/authService'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import { signIn } from 'next-auth/react'
import { Label } from '@/src/components/ui/label'
import { RiLoaderFill } from 'react-icons/ri'

export const signUpFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório.'),
  email: z.string().min(1, 'O email é obrigatório.').email('O email deve ser válido.'),
  password: z.string().min(8, 'A senha tem que ter no mínimo 8 caracteres.')
})

export default function SignUpForm() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<File | null>(null)
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {},
  })

  const router = useRouter()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarUrl(e.target.files[0])
    }
  }

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    try {
      setIsLoading(true)
      const response = await register({
        ...values,
        avatarUrl
      })

      if (response?.error) {
        setError('Falha no registro. Verifique os dados e tente novamente.')
        setIsLoading(false)
      } else {
        setError('')
        const result = await signIn('credentials', {
          redirect: false,
          email: values.email,
          password: values.password,
        })

        if (result?.error) {
          setError('Erro ao entrar no sistema faça login.')
          setIsLoading(false)
        } else {
          setError('')
          router.push('/dashboard')
        }
      }
    } catch (error) {
      console.error(error);

      setError('Erro ao tentar registrar. Tente novamente.')
      setIsLoading(false)
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div>
          <Label htmlFor="image">Imagem de perfil</Label>
          <Input className='mt-2' type="file" name="image/png" id="image" onChange={handleImageChange} />
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="seuemail@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Digite sua senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className='w-full mt-2'>
          {isLoading ? (
            <RiLoaderFill className='animate-spin' />
          ) : (
            'Cadastrar'
          )}
        </Button>
      </form>
    </FormProvider>
  )
}
