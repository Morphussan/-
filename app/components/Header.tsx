'use client';

import { useState } from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleActions = () => setIsActionsOpen(!isActionsOpen);

  return (
    <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4 md:px-6 relative">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold">All sites</h1>
        <button 
          className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={toggleDropdown}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
        
        {/* Выпадающий список при нажатии на стрелку */}
        {isDropdownOpen && (
          <div className="absolute top-14 left-0 bg-white shadow-lg rounded-lg py-2 z-50 w-48">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Site 1</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Site 2</button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Site 3</button>
          </div>
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <select className="appearance-none bg-transparent border border-gray-300 rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last week</option>
            <option>Last month</option>
            <option>Last year</option>
          </select>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <button className="px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Set up dashboard
        </button>

        <div className="flex items-center space-x-3">
          <button className="text-gray-500 hover:text-gray-700">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Mobile view - кнопка меню */}
      <div className="md:hidden flex items-center">
        <button 
          className="text-gray-500 hover:text-gray-700 ml-2 focus:outline-none"
          onClick={toggleActions}
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Выпадающее меню для мобильных */}
        {isActionsOpen && (
          <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg py-2 z-50 w-48">
            <div className="px-4 py-2">
              <select className="w-full appearance-none bg-transparent border border-gray-300 rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last week</option>
                <option>Last month</option>
                <option>Last year</option>
              </select>
            </div>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
              <Search className="w-4 h-4 mr-2" />
              <span>Search</span>
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              <span>Notifications</span>
            </button>
            <div className="px-4 py-2">
              <button className="w-full px-4 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Set up dashboard
              </button>
            </div>
          </div>
        )}
        
        <div className="w-8 h-8 bg-gray-200 rounded-full ml-3"></div>
      </div>
    </div>
  );
} 