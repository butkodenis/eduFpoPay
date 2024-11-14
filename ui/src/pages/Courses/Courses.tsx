import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ChevronRight, ChevronLeft } from 'lucide-react';
import { SquarePlus, Filter, X } from 'lucide-react';

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

import CourseForm from '@/components/Forms/CourseForm/CourseForm';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [courseFilter, setCourseFilter] = useState<string>('');

  const fetchCourses = async (page = 1) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/courses/all`,
        {
          params: {
            page,
            limit: rowsPerPage,
            courseName: courseFilter,
          },
        }
      );
      setCourses(response.data.courses);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setTotalCourses(response.data.totalCourses);
    } catch (error) {
      console.error('Ошибка загрузки курсов:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage, rowsPerPage, courseFilter]);

  const handleFilterChenge = (event) => {
    setCourseFilter(event.target.value); // Обновляем фильтр
    setCurrentPage(1); // Сбрасываем страницу на первую
    setCourses([]); // Очищаем текущие данные курсов
  };

  const columns = [
    { accessorKey: 'courseName', header: 'Название' },
    { accessorKey: 'courseType', header: 'Тип' },
    { accessorKey: 'coursePrice', header: 'Цена' },
    { accessorKey: 'coursePoints', header: 'Баллы' },
    { accessorKey: 'department', header: 'Кафедра' },
    {
      accessorKey: 'courseDateStart',
      header: 'Начало',
      cell: (info) => format(new Date(info.getValue()), 'yyyy.MM.dd'),
    },
    {
      accessorKey: 'courseDateEnd',
      header: 'Окончание',
      cell: (info) => format(new Date(info.getValue()), 'yyyy.MM.dd'),
    },
  ];

  const table = useReactTable({
    data: courses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const onSubmit = async (data) => {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/courses/create`,
      data
    );
    console.log('Данные формы:', data);
    setOpen(false); // Закрытие модального окна
    fetchCourses(currentPage); // перезагрузка таблицы
  };

  return (
    <>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full px-2 mb-2">
          <div className="p-1 shadow rounded border border-slate-300">
            <h5 className="text-xl font-bold mb-1">
              Всього Курсів: {totalCourses}
            </h5>
          </div>
        </div>
        <div className="w-full px-2 mb-2">
          <div className="p-1 shadow rounded border border-slate-300">
            <div className="flex flex-row px-2 mb-2 gap-4">
              <div className="flex items-center py-4">
                <Input
                  placeholder="фільтр по назві..."
                  className="max-w-sm"
                  value={courseFilter}
                  onChange={handleFilterChenge}
                />
              </div>

              <div className="flex items-center py-4 ml-auto">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <SquarePlus />
                      Додати курс
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[680px]">
                    <DialogHeader>
                      <DialogTitle>Додати курс</DialogTitle>
                      <DialogDescription>
                        Введіть інформацію про курс та натисніть "Додати"
                      </DialogDescription>
                    </DialogHeader>
                    <CourseForm onSubmit={onSubmit} setOpen={setOpen} />
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <p className="text-lg text-red-600">Завантаження...</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  table.getRowModel().rows.map((row) => (
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
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between py-4">
              {/* Кнопки Назад и Вперед */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft />
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight />
                </Button>
              </div>

              {/* Информация о текущей странице */}
              <div className="flex items-center space-x-2 text-sm">
                <span>
                  {(currentPage - 1) * rowsPerPage + 1}–{' '}
                  {Math.min(currentPage * rowsPerPage, totalCourses)} из{' '}
                  {totalCourses}
                </span>
              </div>

              {/* Выбор количества строк на странице */}
              <Select
                value={rowsPerPage}
                onValueChange={(value: string) => setRowsPerPage(Number(value))}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue
                    placeholder={`${rowsPerPage} строк на странице`}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Строк на странице</SelectLabel>
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
