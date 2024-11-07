import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ChevronRight, ChevronLeft, SquarePlus, Filter } from 'lucide-react';

export function PaginationRow() {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Link to="#">
              <ChevronLeft />{' '}
            </Link>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <Link to="#">
              <ChevronRight />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Select
        value={rowsPerPage}
        onValueChange={(value: string) => setRowsPerPage(Number(value))}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={`${rowsPerPage} rows per page`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Рядків на сторінці</SelectLabel>
            <SelectItem value={5}>5</SelectItem>
            <SelectItem value={10}>10</SelectItem>
            <SelectItem value={15}>15</SelectItem>
            <SelectItem value={20}>20</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
