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
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Запрос данных с сервера
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

  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full px-2 mb-2">
        <div className="p-1 shadow rounded border border-slate-300">
          <h5 className="text-xl font-bold mb-1">Курси ({courses.length})</h5>
        </div>
      </div>
      <div className="w-full px-2 mb-2">
        <div className="p-1 shadow rounded border border-slate-300">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Цена</TableHead>
                <TableHead>Баллы</TableHead>
                <TableHead>Кафедра</TableHead>
                <TableHead>Начало</TableHead>
                <TableHead>Окончание</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    {course.courseName}
                  </TableCell>
                  <TableCell>{course.courseType}</TableCell>
                  <TableCell className="text-right">
                    {course.coursePrice}₴
                  </TableCell>
                  <TableCell className="text-right">
                    {course.coursePoints}
                  </TableCell>
                  <TableCell>{course.courseDepartment}</TableCell>
                  <TableCell>
                    {new Date(course.courseDateStart).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(course.courseDateEnd).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Courses;
