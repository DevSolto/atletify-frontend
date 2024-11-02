import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { User } from "@/src/types/user";
import { useApi } from "@/src/api/axios";
import { Access } from "@/src/types/access";
import { CityTable } from "../cityTable";
import { City } from "@/src/types/city";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { IoInformationCircleOutline } from "react-icons/io5";

type UserDetailProps = {
  userId: string;
};

type UserDetail = User & {
  accesses: Access[];
};

export default function UserDetail({ userId }: UserDetailProps) {
  const api = useApi();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get<UserDetail>(`/users/${userId}`);
        console.log(response);

        setUser(response.data);
        setError("");
      } catch (error) {
        setError("Erro ao buscar usuários");
        console.error("Erro ao buscar detalhes do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isDialogOpen) {
      fetchUserDetails();
    }
  }, [isDialogOpen, api, userId]);

  const cities: City[] = user ? user.accesses.map((access) => access.city) : [];
  console.log(cities.length);

  return (
    <Dialog onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className='flex w-full justify-between items-center px-2 py-1.5 font-normal'>
          Ver detalhes
          <IoInformationCircleOutline />
        </Button>

      </DialogTrigger>
      <DialogContent>
        {loading ? (
          <p>Carregando detalhes...</p>
        ) : error ? (
          <p>{error}</p>
        ) : user ? (
          <>
            <DialogHeader>
              <DialogTitle>{user.name}</DialogTitle>
              <DialogDescription>{user.email}</DialogDescription>
            </DialogHeader>
            {
              cities.length !== 0 && (
                <section className="space-y-3">
                  <h3>Cidades que este usuário tem acesso</h3>
                  <ScrollArea className="h-96">
                    <CityTable data={cities} />
                  </ScrollArea>
                </section>
              )
            }
          </>
        ) : (
          <p>Nenhum detalhe disponível.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
