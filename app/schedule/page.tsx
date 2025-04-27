'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import GroupSelectDialog from '../components/GroupSelectDialog';
import ScheduleEditor from '../components/ScheduleEditor';

export default function SchedulePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState<'current' | 'next'>('current');

  const handleGroupSelect = (group: string) => {
    setSelectedGroup(group);
    setIsDialogOpen(false); // Закрываем диалог после выбора
  };

  const toggleWeek = () => {
    setCurrentWeek(currentWeek === 'current' ? 'next' : 'current');
  };

  return (
    <div className="flex-1 p-4 md:p-6 bg-gray-50 overflow-auto">
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Расписание</h1>
        <p className="text-sm md:text-base text-gray-600">
          {selectedGroup
            ? `Редактирование расписания группы ${selectedGroup}`
            : 'Выберите группу для редактирования расписания'}
        </p>
      </div>

      {/* Если группа не выбрана, показываем кнопку выбора */}
      {!selectedGroup && (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] px-4">
          <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm text-center max-w-md w-full">
            <Calendar className="w-10 h-10 md:w-12 md:h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Выберите группу</h2>
            <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
              Для начала работы с расписанием необходимо выбрать учебную группу
            </p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 w-full hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Выбрать группу
            </button>
          </div>
        </div>
      )}

      {/* Если группа выбрана, показываем редактор расписания */}
      {selectedGroup && (
        <div className="space-y-4 md:space-y-6 animate-fade-in">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 transform transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 space-y-4 md:space-y-0">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Группа {selectedGroup}</h2>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Редактирование расписания занятий
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full md:w-auto px-4 py-2 text-blue-500 hover:text-blue-600 transition-all duration-300 border border-blue-200 rounded-lg hover:bg-blue-50 transform hover:-translate-y-0.5 hover:shadow-md text-sm"
                >
                  Сменить группу
                </button>
              </div>
            </div>

            {/* Компонент редактора расписания */}
            <div className="transform transition-opacity duration-300 overflow-x-auto">
              <ScheduleEditor group={selectedGroup} week={currentWeek} />
            </div>
          </div>
        </div>
      )}

      {/* Диалог выбора группы */}
      <GroupSelectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSelect={handleGroupSelect}
      />
    </div>
  );
}
