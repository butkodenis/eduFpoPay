import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const courseSchema = z.object({
  courseName: z
    .string()
    .min(2, 'Назва курса должна содержать минимум 2 символа'),
  courseType: z
    .enum(['Стажування', 'Спеціалізація'])
    .nonempty('Выберите тип курса'),
  coursePrice: z
    .number()
    .positive('Цена должна быть положительным числом')
    .max(100000, 'Цена не может превышать 100 000'),
  coursePoints: z
    .number()
    .min(1, 'Бали не могут быть меньше 1')
    .max(100, 'Бали не могут превышать 100'),
  departmentId: z.string().nonempty('Выберите кафедру'),
  courseDateStart: z.string().nonempty('Выберите дату начала курса'),
  courseDateEnd: z.string().nonempty('Выберите дату окончания курса'),
});

const CourseForm = ({ onSubmit, setOpen }) => {
  const [departments, setDepartments] = useState([]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: '',
      courseType: undefined,
      coursePrice: 0,
      coursePoints: 50,
      departmentId: '',
      courseDateStart: '',
      courseDateEnd: '',
    },
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/departments/all`
        );
        setDepartments(response.data.departments);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid gap-4 py-4">
        {/* Course Name */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="courseName" className="col-span-1 text-right">
            Назва
          </Label>
          <div className="col-span-3">
            <Controller
              control={control}
              name="courseName"
              render={({ field }) => (
                <>
                  <Input id="courseName" {...field} className="w-full" />
                  <p className="text-red-500 text-sm mt-1 h-5">
                    {errors.courseName ? errors.courseName.message : ''}
                  </p>
                </>
              )}
            />
          </div>
        </div>

        {/* Course Type */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="courseType" className="text-right">
            Тип
          </Label>
          <div className="col-span-3">
            <Controller
              control={control}
              name="courseType"
              render={({ field }) => (
                <>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Стажування">Стажування</SelectItem>
                      <SelectItem value="Спеціалізація">
                        Спеціалізація
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-red-500 text-sm mt-1 h-5">
                    {errors.courseType ? errors.courseType.message : ''}
                  </p>
                </>
              )}
            />
          </div>
        </div>

        {/* Course Price */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="coursePrice" className="text-right">
            Ціна
          </Label>
          <div className="col-span-3">
            <Controller
              control={control}
              name="coursePrice"
              render={({ field }) => (
                <>
                  <Input
                    id="coursePrice"
                    type="number"
                    step={100}
                    min={0}
                    max={100000}
                    {...field}
                    className="w-full"
                  />
                  <p className="text-red-500 text-sm mt-1 h-5">
                    {errors.coursePrice ? errors.coursePrice.message : ''}
                  </p>
                </>
              )}
            />
          </div>
        </div>

        {/* Course Points */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="coursePoints" className="text-right">
            Бали
          </Label>
          <div className="col-span-3">
            <Controller
              control={control}
              name="coursePoints"
              render={({ field }) => (
                <>
                  <Input
                    id="coursePoints"
                    type="number"
                    {...field}
                    className="w-full"
                  />
                  <p className="text-red-500 text-sm mt-1 h-5">
                    {errors.coursePoints ? errors.coursePoints.message : ''}
                  </p>
                </>
              )}
            />
          </div>
        </div>

        {/* Department */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="departmentId" className="text-right">
            Кафедра
          </Label>
          <div className="col-span-3">
            <Controller
              control={control}
              name="departmentId"
              render={({ field }) => (
                <>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите кафедру" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department.id} value={department.id}>
                          {department.departmentName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-red-500 text-sm mt-1 h-5">
                    {errors.departmentId ? errors.departmentId.message : ''}
                  </p>
                </>
              )}
            />
          </div>
        </div>

        {/* Start Date */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="courseDateStart" className="text-right">
            Початок
          </Label>
          <div className="col-span-3">
            <Controller
              control={control}
              name="courseDateStart"
              render={({ field }) => (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon />
                        {field.value
                          ? format(new Date(field.value), 'PPP')
                          : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          date && field.onChange(format(date, 'yyyy-MM-dd'))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-red-500 text-sm mt-1 h-5">
                    {errors.courseDateStart
                      ? errors.courseDateStart.message
                      : ''}
                  </p>
                </>
              )}
            />
          </div>
        </div>

        {/* End Date */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="courseDateEnd" className="text-right">
            Закінчення
          </Label>
          <div className="col-span-3">
            <Controller
              control={control}
              name="courseDateEnd"
              render={({ field }) => (
                <>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon />
                        {field.value
                          ? format(new Date(field.value), 'PPP')
                          : 'Pick a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          date && field.onChange(format(date, 'yyyy-MM-dd'))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-red-500 text-sm mt-1 h-5">
                    {errors.courseDateEnd ? errors.courseDateEnd.message : ''}
                  </p>
                </>
              )}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full text-cyan-50">
        Сохранить
      </Button>
    </form>
  );
};

export default CourseForm;
