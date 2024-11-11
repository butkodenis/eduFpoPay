import { useForm, Controller } from 'react-hook-form';
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

const CourseForm = ({ onSubmit, setOpen }) => {
  const [departments, setDepartments] = useState([]);

  const { handleSubmit, control, reset } = useForm({
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
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="courseName" className="text-right">
            Назва
          </Label>
          <Controller
            control={control}
            name="courseName"
            render={({ field }) => (
              <Input id="courseName" {...field} className="col-span-3" />
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
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Стажування">Cтажування</SelectItem>
                  <SelectItem value="Спеціалізація">Спеціалізація</SelectItem>
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
          <Label htmlFor="courseDepartment" className="text-right">
            Кафедра
          </Label>
          <Controller
            control={control}
            name="courseDepartment"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="col-span-3">
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
            )}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="courseDateStart" className="text-right">
            Початок
          </Label>
          <Controller
            control={control}
            name="courseDateStart"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      ' justify-start text-left font-normal  col-span-3', // Класс w-full для растягивания на всю ширину
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon />
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      // Проверка, что `date` определен и отличается от текущего значения
                      if (date && format(date, 'yyyy-MM-dd') !== field.value) {
                        field.onChange(format(date, 'yyyy-MM-dd'));
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="courseDateEnd" className="text-right">
            Закінчення
          </Label>
          <Controller
            control={control}
            name="courseDateEnd"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      ' justify-start text-left font-normal  col-span-3', // Класс w-full для растягивания на всю ширину
                      !field.value && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon />
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      // Проверка, что `date` определен и отличается от текущего значения
                      if (date && format(date, 'yyyy-MM-dd') !== field.value) {
                        field.onChange(format(date, 'yyyy-MM-dd'));
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
};

export default CourseForm;
