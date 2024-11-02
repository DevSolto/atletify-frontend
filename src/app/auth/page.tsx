import { Card, CardContent, CardDescription, CardHeader } from "@/src/components/ui/card";
import SignUpForm from "./forms/signUpForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import SignInForm from "./forms/signInForm";
import logo from '@/src/assets/logo.png'
import Image from "next/image";

export default function Auth() {
  return (
    <Tabs defaultValue="signUp">
      <TabsList className="w-full flex ">
        <TabsTrigger value="signIn">
          Entrar
        </TabsTrigger>
        <TabsTrigger value="signUp">
          Cadastrar-se
        </TabsTrigger>
      </TabsList>
      <TabsContent value="signIn">
        <Card>
          <CardHeader>

            <Image alt="Logo" src={logo} className="mx-auto mb-5" />
            <CardDescription>
              Preencha suas credenciais para entrar no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signUp">
        <Card>
          <CardHeader>

            <Image alt="Logo" src={logo} className="mx-auto mb-5" />
            <CardDescription>
              Preencha seus dados para cadastrar-se no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}