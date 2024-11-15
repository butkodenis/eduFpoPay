import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import { SquarePlus } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import axios from 'axios';

import { useReactTable, getCoreRowModel } from '@tanstack/react-table';

import CourseForm from '@/components/Forms/CourseForm/CourseForm';
import CoursesTable from '@/components/Table/CoursesTable/CoursesTable';
import Pagination from '@/components/Pagination/Pagination';

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

  const handleFilterChenge = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseFilter(event.target.value); // Обновляем фильтр
    setCurrentPage(1); // Сбрасываем страницу на первую
    setCourses([]); // Очищаем текущие данные курсов
  };

  const columns = [
    { accessorKey: 'courseName', header: 'Назва' },
    { accessorKey: 'courseType', header: 'Тип' },
    { accessorKey: 'coursePrice', header: 'Вартість' },
    { accessorKey: 'coursePoints', header: 'Бали' },
    { accessorKey: 'department', header: 'Кафедра' },
    {
      accessorKey: 'courseDateStart',
      header: 'Початок',
      cell: (info: { getValue: () => string | Date }) =>
        format(new Date(info.getValue()), 'yyyy.MM.dd'),
    },
    {
      accessorKey: 'courseDateEnd',
      header: 'Закінчення',
      cell: (info: { getValue: () => string | Date }) =>
        format(new Date(info.getValue()), 'yyyy.MM.dd'),
    },
  ];

  const table = useReactTable({
    data: courses,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  interface CourseFormValues {
    courseName: string;
    courseType: string;
    coursePrice: number;
    coursePoints: number;
    department: string;
    courseDateStart: string;
    courseDateEnd: string;
  }

  const onSubmit = async (data: CourseFormValues) => {
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
                    {/* Форма добавления курса */}
                    <CourseForm onSubmit={onSubmit} setOpen={setOpen} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            {/* Table */}
            <CoursesTable
              table={table}
              isLoading={isLoading}
              columns={columns}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              totalItems={totalCourses}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={setRowsPerPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
