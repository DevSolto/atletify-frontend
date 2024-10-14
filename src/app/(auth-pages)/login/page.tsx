import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import LoginForm from "./loginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

export default async function Login() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Login
        </CardTitle>
        <CardDescription>
          Faça login para acessar o sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}