'use client';

import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { SidebarTrigger } from '../ui/sidebar';


export function Header() {
  const { data: session } = useSession();
  const name = session?.user.name.split(' ');

  const getFallback = () => {
    if (name && name.length > 1) {
      return `${name[0][0]}${name[1][0]}`.toUpperCase();
    }
    return name ? name[0][0].toUpperCase() : '';
  };

  return (
    <header className='bg-sidebar'>
      <div className='w-full flex items-center justify-between p-3'>
        <SidebarTrigger />
        <div className='flex items-center gap-3'>
          <p className='flex flex-col items-end'>
            {name ? `${name[0]} ${name[name.length - 1]}` : 'Usuário'}
            <span className='text-xs text-neutral-700'>
              {session?.user.role === 'ADMIN' ? 'Administrador' : 'Usuário'}
            </span>
          </p>
          <Avatar>
            <AvatarFallback>{getFallback()}</AvatarFallback>
            <AvatarImage src={session?.user.avatarUrl || undefined} />
          </Avatar>
        </div>
      </div>
    </header>
  );
}
