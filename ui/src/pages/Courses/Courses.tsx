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
import { Label } from '@/components/ui/label';

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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import axios from 'axios';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

import { Link } from 'react-router-dom';

import { ChevronRight, ChevronLeft, SquarePlus, Filter } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  // Состояние для выбора количества строк на странице
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    <>
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
                <Input
                  placeholder="фільтр по кафедрі..."
                  className="max-w-sm"
                />
              </div>
              <div className="flex items-center py-4">
                <Button variant="outline">
                  <Filter />
                  Пошук
                </Button>
              </div>
              <div className="flex items-center py-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <SquarePlus />
                      Додати курс
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Додати курс</DialogTitle>
                      <DialogDescription>
                        Введіть інформацію про курс та натисніть "Додати"
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Ім'я
                        </Label>
                        <Input id="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="courseType" className="text-right">
                          Тип
                        </Label>
                        <Input id="courseType" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="coursePrice" className="text-right">
                          Ціна
                        </Label>
                        <Input id="coursePrice" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="coursePoints" className="text-right">
                          Бали
                        </Label>
                        <Input id="coursePoints" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label
                          htmlFor="courseDepartment"
                          className="text-right"
                        >
                          Кафедра
                        </Label>
                        <Input id="courseDepartment" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="courseDateStart" className="text-right">
                          Початок
                        </Label>
                        <Input id="courseDateStart" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="courseDateEnd" className="text-right">
                          Кінець
                        </Label>
                        <Input id="courseDateEnd" className="col-span-3" />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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

              {/* Select для выбора количества строк на странице */}
              <Select
                value={rowsPerPage}
                onValueChange={(value) => setRowsPerPage(value)}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
