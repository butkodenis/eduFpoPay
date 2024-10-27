import { Link } from 'react-router-dom';

// Menu items.

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="text-lg hover:bg-gray-700 p-2 rounded">
          Home
        </Link>
        <Link to="/about" className="text-lg hover:bg-gray-700 p-2 rounded">
          About
        </Link>
      </nav>
    </aside>
  );
}
