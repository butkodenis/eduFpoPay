import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { flexRender } from '@tanstack/react-table';

import { LoaderCircle, Loader } from 'lucide-react';

interface CoursesTableProps {
  table: any;
  isLoading: boolean;
  columns: { accessorKey: string; header: string }[];
}

const CoursesTable: React.FC<CoursesTableProps> = ({
  table,
  isLoading,
  columns,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {table
            .getHeaderGroups()
            .map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))
            )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={columns.length}>
              <svg class="animate-spin h-5 w-5 mr-3 ... " viewBox="0 0 24 24">
                <LoaderCircle />
              </svg>
            </TableCell>
          </TableRow>
        ) : (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CoursesTable;
