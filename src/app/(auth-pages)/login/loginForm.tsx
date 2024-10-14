'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { Button } from '@/src/components/ui/button'
import { useRouter } from 'next/navigation'

export const loginFormSchema = z.object({
  email: z.string().min(1, 'O email é obrigatório.').email('O email deve ser válido.'),
  password: z.string().min(8, 'A senha tem que ter no mínimo 8 caracteres.')
})

export default function LoginForm() {
  const [error, setError] = useState('')  
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    })
    
    if (result?.error) {
      setError('Login falhou. Verifique suas credenciais.')
    } else {
      setError('')
      router.push('/clubs')
    }
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Digite seu email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Digite sua senha' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit">Login</Button>
      </form>
    </FormProvider>
  )
}
