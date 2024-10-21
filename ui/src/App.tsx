import './App.css';
import { useState } from 'react';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

import { Button } from '@/components/ui/button';

function App() {
  const [selected, setSelected] = useState<Date>();
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div
        className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
      >
        <span className="font-medium">Info alert!</span> Change a few things up
        and try submitting again.
      </div>
      <Button>Click me</Button>
      <Button variant="link">Link</Button>
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={setSelected}
        footer={
          selected
            ? `Selected: ${selected.toLocaleDateString()}`
            : 'Pick a day.'
        }
      />
    </>
  );
}

export default App;
