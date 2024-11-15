import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex items-center justify-between py-4">
      {/* Кнопки Назад и Вперед */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Информация о текущей странице */}
      <div className="flex items-center space-x-2 text-sm">
        <span>
          {(currentPage - 1) * rowsPerPage + 1}–
          {Math.min(currentPage * rowsPerPage, totalItems)} из {totalItems}
        </span>
      </div>

      {/* Выбор количества строк на странице */}
      <Select
        value={String(rowsPerPage)}
        onValueChange={(value) => onRowsPerPageChange(Number(value))}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={`${rowsPerPage} на сторінці`} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Рядків на сторінці</SelectLabel>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Pagination;
