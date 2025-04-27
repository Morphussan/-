'use client';

import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';

interface CalendarProps {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
}

export default function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
    const [currentWeek, setCurrentWeek] = useState(startOfWeek(selectedDate));
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

    const handlePrevWeek = () => {
        setCurrentWeek(addDays(currentWeek, -7));
    };

    const handleNextWeek = () => {
        setCurrentWeek(addDays(currentWeek, 7));
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handlePrevWeek}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                    ←
                </button>
                <span className="font-semibold">
                    {format(currentWeek, 'd MMMM', { locale: ru })}
                </span>
                <button
                    onClick={handleNextWeek}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                >
                    →
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                    <button
                        key={day.toString()}
                        onClick={() => onDateSelect(day)}
                        className={`
                            p-2 rounded-lg text-center transition-colors
                            ${isSameDay(day, selectedDate) ? 'bg-blue-500 text-white' : ''}
                            ${isToday(day) ? 'border-2 border-blue-500' : ''}
                            hover:bg-gray-100
                        `}
                    >
                        <div className="text-sm font-medium">
                            {format(day, 'EEE', { locale: ru })}
                        </div>
                        <div className="text-lg">
                            {format(day, 'd')}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
} 