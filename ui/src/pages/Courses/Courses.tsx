import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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

import axios from 'axios';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/courses/all`
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Ошибка загрузки курсов:', error);
      }
    };

    fetchCourses();
  }, []);

  const columns = [
    { accessorKey: 'courseName', header: 'Название' },
    { accessorKey: 'courseType', header: 'Тип' },
    { accessorKey: 'coursePrice', header: 'Цена' },
    { accessorKey: 'coursePoints', header: 'Баллы' },
    { accessorKey: 'courseDepartment', header: 'Кафедра' },
    {
      accessorKey: 'courseDateStart',
      header: 'Начало',
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
      accessorKey: 'courseDateEnd',
      header: 'Окончание',
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    },
  ];

  const table = useReactTable({
    data: courses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full px-2 mb-2">
        <div className="p-1 shadow rounded border border-slate-300">
          <h5 className="text-xl font-bold mb-1">Курси ({courses.length})</h5>
        </div>
      </div>
      <div className="w-full px-2 mb-2">
        <div className="p-1 shadow rounded border border-slate-300">
          <div className="flex flex-row px-2 mb-2 gap-4">
            <div className="flex items-center py-4">
              <Input placeholder="фільтр по назві..." className="max-w-sm" />
            </div>
            <div className="flex items-center py-4">
              <Input placeholder="фільтр по кафедрі..." className="max-w-sm" />
            </div>
          </div>
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
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Link>
                    {' '}
                    <ChevronLeft />
                  </Link>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <Link>
                    {' '}
                    <ChevronRight />
                  </Link>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
