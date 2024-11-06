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
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
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
              {table.getRowModel().rows.map((row) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Courses;
