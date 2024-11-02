"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { useApi } from "@/src/api/axios";



export type CardProps = {
  regionId: string;
  alt: string;
  src: string;
};

type State = {
  id: string;
  name: string;
  abbreviation: string;
  flagUrl: string | null;
  createdAt: Date;
  regionId: string;
  cities: {
    id: string;
    name: string;
    createdAt: Date;
    stateId: string;
    _count: {
      Content: number
    }
    Authorized: boolean
  }[]
};

export function Card(props: CardProps) {
  const api = useApi()
  const { data: session, status } = useSession();
  const [states, setStates] = useState<State[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      if (status !== "authenticated") {
        console.error("Token não encontrado ou usuário não autenticado");
        setError(true);
        return;
      }


      try {
        const response = await api.get<State[]>(
          `http://localhost:4000/states/region/${props.regionId}`
        );
        setStates(response.data);
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
        setError(true);
      }
    };

    fetchStates();
  }, [props.regionId, session, status]);

  return (
    <div>
      <Dialog>
        <DialogTrigger className="border-white">
          <Image
            alt={`Mapa da região ${props.alt}`}
            src={props.src}
            className="hover:scale-105 transition-all"
          />
        </DialogTrigger>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>Estados da região {props.alt}</DialogTitle>
            <DialogDescription>
              Clique em um estado para ver suas cidades
            </DialogDescription>
          </DialogHeader>
          {error ? (
            <p>Erro ao buscar os estados</p>
          ) : (
            <ScrollArea className="max-h-96 w-full">
              <Accordion type="single" collapsible className="w-full">
                {states.map((state) => (
                  <AccordionItem key={state.id} value={state.id}>
                    <AccordionTrigger className="w-full">
                      <div className="flex items-center justify-center gap-3">
                        <Image alt={`Bandeira do estado ${state.name}`} src={state.flagUrl || ''} width={30} height={20} />
                        {state.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="w-full flex flex-col">
                      {
                        state.cities.map((city, index) => (
                          <>
                            <div key={index} className="w-full flex items-center justify-between py-3">
                              <span className="capitalize col-span-3">
                                {city.name.toLowerCase()}
                              </span>
                              {
                                city.Authorized ? (
                                  <Button>
                                    Acessar
                                  </Button>
                                ) : (
                                  <Button variant={'outline'}>
                                    Contratar
                                  </Button>
                                )
                              }
                            </div>
                            <Separator />
                          </>
                        ))
                      }
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
