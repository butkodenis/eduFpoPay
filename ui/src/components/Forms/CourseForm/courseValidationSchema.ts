// courseValidationSchema.js
import { z } from 'zod';

const courseSchema = z.object({
  courseName: z
    .string()
    .min(2, 'Назва курсу повинна містити принаймні 2 символи'),
  courseType: z.string().nonempty('Оберіть тип курсу'),
  coursePrice: z
    .number()
    .positive('Ціна повинна бути додатним числом')
    .max(100000, 'Ціна не може перевищувати 100 000'),
  coursePoints: z
    .number()
    .min(0, 'Бали не можуть бути менше 0')
    .max(10000, 'Бали не можуть перевищувати 10000'),
  departmentId: z.string().nonempty('Оберіть кафедру'),
  courseDateStart: z.string().nonempty('Оберіть дату початку курсу'),
  courseDateEnd: z.string().nonempty('Оберіть дату закінчення курсу'),
});

export default courseSchema;
