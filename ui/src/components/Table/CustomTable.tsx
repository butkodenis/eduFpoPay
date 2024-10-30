// components/CustomTable.tsx
import { useTable, ColumnDef } from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Data {
  id: number;
  name: string;
  age: number;
  email: string;
}

const data: Data[] = [
  { id: 1, name: 'Иван', age: 28, email: 'ivan@example.com' },
  { id: 2, name: 'Мария', age: 34, email: 'maria@example.com' },
  // Добавьте больше данных по мере необходимости
];

const columns: ColumnDef<Data>[] = [
  {
    accessorKey: 'name',
    header: 'Имя',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'age',
    header: 'Возраст',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: (info) => info.getValue(),
  },
];

export function CustomTable() {
  const table = useTable({ data, columns });

  return (
    <Table className="w-full border border-gray-200 rounded-lg shadow-md">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="bg-gray-100">
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                className="px-4 py-2 font-semibold text-left"
              >
                {header.isPlaceholder ? null : header.renderHeader()}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} className="border-b hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="px-4 py-2">
                {cell.renderCell()}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
