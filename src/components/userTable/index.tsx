'use client'

import { useEffect, useState } from "react";
import { columns, User } from "./columns";
import { useApi } from "@/src/api/axios";
import { DataTable } from "../ui/dataTable";
import { Filter } from "../filter";

export type HttpParams = {
  page: string;
  limit: string;
  orderBy: string;
  order: string;
  role: string;
  search?: string;
};

type UserTableProps = {
  data?: User[];
};

export function UserTable(props: UserTableProps) {
  const api = useApi();

  const [users, setUsers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [httpParams, setHttpParams] = useState<HttpParams>({
    limit: "8",
    order: "asc",
    orderBy: "name",
    page: "1",
    role: "",
    search: "",
  });



  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<{
          users: User[];
          total: number;
          totalPages: number;
        }>("/users", { params: httpParams });

        setUsers(response.data.users || []);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Erro ao carregar usuários");
        console.error("Erro ao buscar usuários:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [httpParams]);

  return (
    <>
      {!props.data && (
        <Filter
          httpParams={httpParams}
          setHttpParams={setHttpParams}
          totalPages={totalPages}
        />
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : users && users.length > 0 ? (
        <DataTable columns={columns} data={users} />
      ) : (
        <p>Nenhum usuário encontrado.</p>
      )}
    </>
  );
}
