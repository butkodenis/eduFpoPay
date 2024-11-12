import useSWR, { mutate } from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export const useCourses = () => {
  const { data, error } = useSWR(
    `${import.meta.env.VITE_BASE_URL}/api/courses/all`,
    fetcher
  );

  return {
    courses: data ? data.courses : [],
    isLoading: !error && !data,
    isError: error,
    mutate: () => mutate(`${import.meta.env.VITE_BASE_URL}/api/courses/all`),
  };
};

export const useDepartments = () => {
  const { data, error } = useSWR(
    `${import.meta.env.VITE_BASE_URL}/api/departments/all`,
    fetcher
  );

  return {
    departments: data?.departments || [],
    isLoading: !error && !data,
    isError: error,
  };
};

// Хук для создания курса
export const useCreateCourse = () => {
  return async (courseData) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/courses/create`,
        courseData
      );
      // Обновляем кэш после успешного создания курса
      mutate(`${import.meta.env.VITE_BASE_URL}/api/courses/all`);
    } catch (error) {
      console.error('Ошибка создания курса:', error);
      throw error;
    }
  };
};
