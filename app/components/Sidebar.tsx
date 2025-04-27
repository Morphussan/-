'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Database, 
  Bell,
  LayoutDashboard,
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  { name: 'Дашборд', icon: LayoutDashboard, href: '/' },
  { name: 'Изменение расписания', icon: Calendar, href: '/schedule' },
  { name: 'Выполнить SQL запрос', icon: Database, href: '/sql' },
  { name: 'Разослать уведомление', icon: Bell, href: '/notifications' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    // Начальная проверка
    checkScreenSize();
    
    // Обновление при изменении размера окна
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Кнопка-гамбургер для мобильных устройств */}
      <button 
        onClick={toggleSidebar} 
        className={`md:hidden fixed top-4 left-4 z-50 bg-[#1C1C1C] text-white p-2 rounded-md transition-all duration-300 ${isOpen ? 'left-[16rem]' : 'left-4'}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Затемнение фона при открытой боковой панели на мобильных устройствах */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-10"
          onClick={toggleSidebar}
        />
      )}

      {/* Боковая панель */}
      <div 
        className={`
          fixed md:static flex flex-col h-screen w-64 bg-[#1C1C1C] bg-opacity-50 text-white z-20
          transition-all duration-300 transform backdrop-blur-sm
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="p-6">
          <span className="text-lg font-semibold leading-tight">
            Краснодарский Кооперативный Техникум
          </span>
        </div>

        {/* Main Menu */}
        <div className="flex-1">
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 hover:bg-opacity-70 rounded-lg group"
                onClick={() => isMobile && setIsOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
} 