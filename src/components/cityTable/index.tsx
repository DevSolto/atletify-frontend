'use client'

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { useApi } from "@/src/api/axios";
import { Filter } from "../filter";
import { DataTable } from "../ui/dataTable";
import { City } from "@/src/types/city";
import { HttpParams } from "@/src/types/http";


type UserTableProps = {
  data?: City[];
};

export function CityTable({ data }: UserTableProps) {
  const api = useApi();

  const [cities, setCities] = useState<City[]>([]);
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
    const fetchCities = async () => {
      try {
        setLoading(true);
        setError(null);
  
        const response = await api.get<{
          cities: City[];
          total: number;
          totalPages: number;
        }>("/cidade", { params: httpParams });
  
        setCities(response.data.cities || []);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Erro ao carregar cidades");
        console.error("Erro ao buscar cidades:", err);
      } finally {
        setLoading(false);
      }
    };
    if (!data) {
      fetchCities();
    } else {
      setCities(data)
    }
  }, [httpParams, data, api]);

  return (
    <>
      {!data && (
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
      ) : cities && cities.length > 0 ? (
        <DataTable columns={columns} data={cities} />
      ) : (
        <p>Nenhuma cidade encontrado.</p>
      )}
    </>
  );
}
