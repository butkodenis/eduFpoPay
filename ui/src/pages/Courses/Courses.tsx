import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import axios from 'axios';

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

import { PaginationRow } from '@/components/Pagination/Pagination';

import { SquarePlus, Filter } from 'lucide-react';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const Courses = () => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      courseName: '',
      courseType: '',
      coursePrice: 0,
      coursePoints: 50,
      courseDepartment: '',
      courseDateStart: '',
      courseDateEnd: '',
    },
  });
  const [courses, setCourses] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/courses/all`
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Ошибка загрузки курсов:', error);
      } finally {
        setIsLoading(false);
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

  const onSubmit = (data) => {
    console.log('Данные формы:', data);
    reset(); // Очистка формы после сохранения
    setOpen(false); // Закрытие модального окна
  };

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
                <Button variant="outline">
                  <Filter />
                  Пошук
                </Button>
              </div>
              <div className="flex items-center py-4 ml-auto">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger>
                    <Button>
                      <SquarePlus />
                      Додати курс
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Додати курс</DialogTitle>
                      <DialogDescription>
                        Введіть інформацію про курс та натисніть "Додати"
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Назва
                          </Label>
                          <Controller
                            control={control}
                            name="courseName"
                            render={({ field }) => (
                              <Input
                                id="courseName"
                                {...field}
                                className="col-span-3"
                              />
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="courseType" className="text-right">
                            Тип
                          </Label>
                          <Controller
                            control={control}
                            name="courseType"
                            render={({ field }) => (
                              <Select
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Выберите тип" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Стажування">
                                    Cтажування
                                  </SelectItem>
                                  <SelectItem value="Спеціалізація">
                                    Спеціалізація
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="coursePrice" className="text-right">
                            Ціна
                          </Label>
                          <Controller
                            control={control}
                            name="coursePrice"
                            render={({ field }) => (
                              <Input
                                id="coursePrice"
                                type="number"
                                step={100}
                                {...field}
                                className="col-span-3"
                              />
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="coursePoints" className="text-right">
                            Бали
                          </Label>
                          <Controller
                            control={control}
                            name="coursePoints"
                            render={({ field }) => (
                              <Input
                                id="coursePoints"
                                type="number"
                                {...field}
                                className="col-span-3"
                              />
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label
                            htmlFor="courseDepartment"
                            className="text-right"
                          >
                            Кафедра
                          </Label>
                          <Controller
                            control={control}
                            name="courseDepartment"
                            render={({ field }) => (
                              <Input
                                id="courseDepartment"
                                {...field}
                                className="col-span-3"
                              />
                            )}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Сохранить</Button>
                      </DialogFooter>
                    </form>
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
                  <div>
                    {' '}
                    <p className="text-lg text-red-600"> Завантаження </p>{' '}
                  </div>
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
            <PaginationRow />
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
