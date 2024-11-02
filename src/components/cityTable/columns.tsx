import { ColumnDef } from '@tanstack/react-table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { CaretSortIcon } from "@radix-ui/react-icons";
import { City } from '@/src/types/city';

export const columns: ColumnDef<City>[] = [
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
      )
    },
    cell: ({ row }) => {
      return (
        <p>
          {
            row.original.name
          }
        </p>
      );
    },
  },
  {
    accessorKey: 'contents',
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      const isSortedDesc = column.getIsSorted() === "desc";
      return (
        <Button
          variant="ghost"
          className='p-0'
          onClick={() => column.toggleSorting(isSortedAsc || !isSortedDesc)}
        >
          Conteúdos
          <CaretSortIcon className={`ml-2 h-4 w-4 ${isSortedAsc ? 'rotate-180' : ''}`} />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <p>
          {
            row.original._count.Content
          }
        </p>
      );
    },
  },
  {
    accessorKey: 'state',
    header: 'Estado',
    cell: ({ row }) => {
      return (
        <Avatar className='rounded-none'  >
          <AvatarFallback>
            {row.original.state.abbreviation}
          </AvatarFallback>
          <AvatarImage src={row.original.state.flagUrl} />
        </Avatar>
      )
    }
  },
  {
    accessorKey: 'id',
    header: '',
    cell: () => {

      return (
        <Button variant={'outline'} size={'sm'}>
          Retirar acesso
        </Button>
      );
    },
  }
];
