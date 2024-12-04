import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Backpack } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Gamepad2 className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold">Pokédex</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md ${
                location.pathname === '/'
                  ? 'text-blue-500'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              All Pokémon
            </Link>
            <Link
              to="/collection"
              className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                location.pathname === '/collection'
                  ? 'text-blue-500'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <Backpack className="w-5 h-5" />
              <span>My Collection</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}