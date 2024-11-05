import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { CustomTable } from '@/components/Table/CustomTable';

const Students: React.FC = () => {
  return (
    <div className="flex flex-wrap -mx-2">
      <div className="w-full md:w-1/2 lg:w-1/3 px-1 mb-2">
        <div className="p-2 shadow rounded border border-slate-300">
          <h2 className="text-xl font-bold mb-2">Имя студента 1</h2>
          <p>Описание студента 1</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 px-1 mb-2">
        <div className="p-2 shadow rounded border border-slate-300">
          <h2 className="text-xl font-bold mb-2">Имя студента 2</h2>
          <p>Описание студента 2</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 px-1 mb-2">
        <div className="p-2 shadow rounded border border-slate-300">
          <h2 className="text-xl font-bold mb-2">Имя студента 3</h2>
          <p>Описание студента 3</p>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-2/3 px-1 mb-2">
        <div className="p-2 shadow rounded border border-slate-300">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-2/3 px-1 mb-2">
        <div className="p-2 shadow rounded border border-slate-300"></div>
      </div>
    </div>
  );
};

export default Students;
