import { UserTable } from "@/src/components/userTable";

export default function Users() {
  return (
    <main className="p-5 flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold">
          Usuários
        </h2>
        <p>listagem de usuários</p>
      </div>
      <UserTable />
    </main>
  )
}