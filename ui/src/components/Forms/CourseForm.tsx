// components/Forms/CourseForm.js

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CourseForm = ({ onSubmit }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Ім'я
          </Label>
          <Input id="name" {...register('name')} className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="courseType" className="text-right">
            Тип
          </Label>
          <Input
            id="courseType"
            {...register('courseType')}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="coursePrice" className="text-right">
            Ціна
          </Label>
          <Input
            id="coursePrice"
            {...register('coursePrice')}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="coursePoints" className="text-right">
            Бали
          </Label>
          <Input
            id="coursePoints"
            {...register('coursePoints')}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="courseDepartment" className="text-right">
            Кафедра
          </Label>
          <Input
            id="courseDepartment"
            {...register('courseDepartment')}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="courseDateStart" className="text-right">
            Початок
          </Label>
          <Input
            id="courseDateStart"
            {...register('courseDateStart')}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="courseDateEnd" className="text-right">
            Кінець
          </Label>
          <Input
            id="courseDateEnd"
            {...register('courseDateEnd')}
            className="col-span-3"
          />
        </div>
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
};

export default CourseForm;
