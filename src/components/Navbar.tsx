import { Home, Search, PlusSquare, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-500">RecipeSocial</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-orange-500">
              <Home className="w-6 h-6" />
            </Link>
            <Link to="/search" className="text-gray-600 hover:text-orange-500">
              <Search className="w-6 h-6" />
            </Link>
            <Link to="/create" className="text-gray-600 hover:text-orange-500">
              <PlusSquare className="w-6 h-6" />
            </Link>
            <Link to={`/profile/${user?.username}`} className="text-gray-600 hover:text-orange-500">
              <User className="w-6 h-6" />
            </Link>
            <button onClick={logout} className="text-gray-600 hover:text-orange-500">
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}