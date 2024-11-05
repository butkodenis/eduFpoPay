import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Students from './pages/Students/Students';
import About from './pages/About/About';
import Courses from './pages/Courses/Courses';
import Layout from './pages/Layout/Layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
