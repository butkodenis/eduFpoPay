import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import courseSchema from './courseValidationSchema';
import axios from 'axios';

import { uk } from 'date-fns/locale';
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
import { CalendarIcon, Save } from 'lucide-react';

import { Calendar } from '@/components/ui/calendar';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const CourseForm = ({ onSubmit, setOpen, initialValues = null }) => {
  const [departments, setDepartments] = useState([]);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: initialValues?.courseName || '',
      courseType: initialValues?.courseType || '',
      coursePrice: initialValues?.coursePrice || 0,
      coursePoints: initialValues?.coursePoints || 50,
      departmentId: initialValues?.department.id || '',
      courseDateStart: initialValues?.courseDateStart || '',
      courseDateEnd: initialValues?.courseDateEnd || '',
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

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
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
                      <SelectValue placeholder="Оберіть тип" />
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
                    min={0}
                    max={100000}
                    step={100}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Преобразуем строку в число
                    value={field.value}
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
                    min={0}
                    max={100}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Преобразуем строку в число
                    value={field.value}
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
                      <SelectValue placeholder="Оберіть кафедру" />
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
                          ? format(new Date(field.value), 'yyyy-MM-dd', {
                              locale: uk,
                            })
                          : 'Оберіть дату'}
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
                        locale={uk}
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
                          ? format(new Date(field.value), 'yyyy-MM-dd')
                          : 'Оберіть дату'}
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
                        locale={uk}
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
        <Save />
        {initialValues ? 'Обновить' : 'Сохранить'}
      </Button>
    </form>
  );
};

export default CourseForm;
