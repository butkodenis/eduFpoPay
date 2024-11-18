import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

import { SquarePlus, MoreHorizontal, Trash2, Pen } from 'lucide-react';

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  const [formValues, setFormValues] = useState(null);

  const { toast } = useToast();

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

  const chengeCourse = async (data) => {
    try {
      console.log('Данны формы:', data);
      setOpen(true);
      setFormValues(data);
    } catch (error) {
      console.error('Ошибка редактирования курса:', error);
    }
  };

  const deleteCourse = async (id: number) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/courses/delete/${id}`
      );
      console.log('Ответ сервера:', response.data.message || response.data);

      toast({
        title: 'Курс удален успешно',
        description: response.data.message,
      });
      fetchCourses(currentPage);
    } catch (error) {
      console.error('Ошибка удаления курса:', error);
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
    {
      accessorKey: 'department',
      header: 'Кафедра',
      cell: (info) => info.getValue().departmentName,
    },
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
    {
      accessorKey: 'actions',
      header: 'Дії',
      cell: (info) => {
        const courseId = info.row.original.id; // Получаем id курса из данных строки
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => chengeCourse(info.row.original)}>
                <Pen />
                Редагувати
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteCourse(courseId)}>
                <Trash2 /> Видалити
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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
    try {
      if (formValues) {
        // Редактирование существующего курса
        const response = await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/courses/update/${
            formValues.id
          }`,
          data
        );

        toast({
          title: 'Курс обновлен успешно',
          description: response.data.message,
        });
      } else {
        // Создание нового курса
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/courses/create`,
          data
        );
        toast({
          title: 'Курс добавлен успешно',
          description: response.data.message,
        });
      }
      console.log('Данные формы:', data);
      setOpen(false); // Закрытие модального окна
      setFormValues(null); // Сброс данных формы
      fetchCourses(currentPage); // Перезагрузка таблицы
    } catch (error) {
      console.error('Ошибка при сохранении курса:', error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap -mx-2">
        <div className="w-full px-2 mb-2">
          <div className="p-1 shadow rounded border border-slate-300">
            <h5 className="text-xl font-bold mb-1">Курсів: {totalCourses}</h5>
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
                <Dialog
                  open={open}
                  onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                      setFormValues(null); // Сбрасываем значения формы при закрытии модального окна
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <SquarePlus />
                      Додати курс
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[680px]">
                    <DialogHeader>
                      <DialogTitle>
                        {formValues ? 'Змімити курс' : 'Додати курс'}
                      </DialogTitle>
                      <DialogDescription>
                        {formValues
                          ? 'Змініть інформацію про курс'
                          : 'Введіть інформацію про курс'}
                      </DialogDescription>
                    </DialogHeader>
                    {/* Форма добавления курса */}
                    <CourseForm
                      onSubmit={onSubmit}
                      setOpen={setOpen}
                      initialValues={formValues}
                    />
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
