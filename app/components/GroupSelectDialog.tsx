'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface Group {
  id: number;
  name: string;
  discipline: string;
}

interface GroupSelectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (group: string) => void;
}

export default function GroupSelectDialog({ isOpen, onClose, onSelect }: GroupSelectDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [groupsByDiscipline, setGroupsByDiscipline] = useState<Record<string, Group[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchGroups();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/app/admin/api/groups');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке групп');
      }

      const groups: Group[] = await response.json();

      const groupedByDiscipline = groups.reduce((acc, group) => {
        const discipline = group.discipline || 'Без дисциплины';
        if (!acc[discipline]) {
          acc[discipline] = [];
        }
        acc[discipline].push(group);
        return acc;
      }, {} as Record<string, Group[]>);

      setGroupsByDiscipline(groupedByDiscipline);
    } catch (err: any) {
      setError('Ошибка при получении списка групп');
      console.error('Ошибка при получении групп:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const filteredGroups = searchQuery.trim() === '' 
    ? groupsByDiscipline 
    : Object.entries(groupsByDiscipline).reduce((acc, [discipline, groups]) => {
        const filteredGroupsForDiscipline = groups.filter(group => 
          group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          discipline.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredGroupsForDiscipline.length > 0) {
          acc[discipline] = filteredGroupsForDiscipline;
        }
        return acc;
      }, {} as Record<string, Group[]>);

  const hasResults = Object.keys(filteredGroups).length > 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.3 }}
        className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center p-2 md:p-4 z-50"
      >
        <motion.div
          initial={{ y: 10, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 10, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] md:max-h-[80vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Выберите группу</h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">
                Выберите группу, для которой хотите изменить расписание
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="px-4 md:px-6 py-3 md:py-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск группы..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm"
              />
            </div>
          </div>

          {/* Groups List */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {loading ? (
              <div className="text-center py-8 text-gray-500 text-sm md:text-base">
                Загрузка списка групп...
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500 text-sm md:text-base">
                {error}
              </div>
            ) : !hasResults ? (
              <div className="text-center py-8 text-gray-500 text-sm md:text-base">
                Группы не найдены
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {Object.entries(filteredGroups).map(([discipline, groups]) => (
                  <div key={discipline}>
                    <h3 className="text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 md:mb-3">
                      {discipline}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3">
                      {groups.map((group) => (
                        <button
                          key={group.id}
                          onClick={() => {
                            onSelect(group.name);
                            onClose();
                          }}
                          className="p-2 md:p-3 text-center border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                        >
                          <span className="text-base md:text-lg font-medium text-gray-900">{group.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 md:p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors text-center text-sm md:text-base"
            >
              Отмена
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
