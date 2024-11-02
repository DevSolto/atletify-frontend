import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { IoCopyOutline } from 'react-icons/io5';
import { PiDotsThreeBold } from "react-icons/pi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { CaretSortIcon } from "@radix-ui/react-icons";
import UserDetail from '../userDetail';

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  role: string;
  createdAt: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'avatarUrl',
    header: '',
    cell: ({ row }) => {
      return (
        <Avatar>
          <AvatarImage src={row.getValue('avatarUrl')} />
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      const isSortedDesc = column.getIsSorted() === "desc";
      return (
        <Button
          variant="ghost"
          className='p-0'
          onClick={() => column.toggleSorting(isSortedAsc || !isSortedDesc)}
        >
          Nome
          <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      return (
        <Button
          variant="ghost"
          className='p-0'
          onClick={() => column.toggleSorting(isSortedAsc)}
        >
          Email
          <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      );
    },
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => {
      const user = row.original;

      const handleCopyName = () => {
        navigator.clipboard.writeText(user.name);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger className='text-black text-2xl px-3 py-2 rounded-md'>
            <PiDotsThreeBold />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-white flex items-center justify-between'>
            <DropdownMenuGroup className='w-40'>

                <UserDetail userId={user.id} />
              <Button variant={'ghost'} className='flex w-full justify-between items-center px-2 py-1.5 font-normal' onClick={handleCopyName}>
                Copiar nome
                <IoCopyOutline />
              </Button>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }
];
