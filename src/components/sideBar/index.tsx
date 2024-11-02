import { GoFileDirectoryFill, GoHomeFill, GoPersonFill } from "react-icons/go";
import { FaMapMarker } from "react-icons/fa";

import { FaGear } from "react-icons/fa6";

import logo from '@/src/assets/logo.png'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: GoHomeFill,
  },
  {
    title: "Usuários",
    url: "/dashboard/usuarios",
    icon: GoPersonFill,
  },
  {
    title: "Cidades",
    url: "/dashboard/cidades",
    icon: FaMapMarker,
  },
  {
    title: "Conteúdos",
    url: "/dashboard/conteudos",
    icon: GoFileDirectoryFill,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="p-5 bg-sidebar">
      <SidebarHeader className="p-4">
        <Image alt="Logo da Inteligencia Politica" src={logo} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="items-start">
        <Button variant={'ghost'}>
          <FaGear />
          Configurações
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
