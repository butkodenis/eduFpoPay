import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Courses = () => {
  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full  px-2 mb-2">
        <div className="p-1 shadow rounded border border-slate-300 ">
          <h5 className="text-xl font-bold mb-1">Курси</h5>
        </div>
      </div>
      <div className="w-full  px-2 mb-2">
        <div className="p-1 shadow rounded border border-slate-300 ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Курс</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Метод</TableHead>
                <TableHead className="text-right">Ціна</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Курс 1</TableCell>
                <TableCell>Оплачено</TableCell>
                <TableCell>Кредитна карта</TableCell>
                <TableCell className="text-right">250.00$</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Курс 2</TableCell>
                <TableCell>Оплачено</TableCell>
                <TableCell>Кредитна карта</TableCell>
                <TableCell className="text-right">250.00$</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Courses;
