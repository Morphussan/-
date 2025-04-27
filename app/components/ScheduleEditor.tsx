'use client';

import { useEffect, useState } from 'react';
import { lessonService } from '../api/services/lessonService';
import { ScheduleLesson } from '../api/types';

interface ScheduleEditorProps {
  group: string;
  week: 'current' | 'next';
}

export default function ScheduleEditor({ group, week }: ScheduleEditorProps) {
  const [lessons, setLessons] = useState<ScheduleLesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (group) {
      fetchLessons();
    }
  }, [group]);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      const data = await lessonService.getLessonsByGroup(group);
      setLessons(data);
    } catch (err) {
      console.error(err);
      setError('Ошибка при загрузке расписания');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await lessonService.saveSchedule(group, {
        added: [],
        updated: lessons,
        deleted: [],
      });
      alert('Расписание успешно сохранено!');
    } catch (error) {
      console.error(error);
      alert('Ошибка при сохранении расписания.');
    }
  };

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-gray-500">Загрузка расписания...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          <ul className="space-y-2">
            {lessons.map((lesson) => (
              <li key={lesson.id} className="border p-2 rounded">
                <div className="font-semibold">{lesson.subject}</div>
                <div className="text-sm text-gray-600">{lesson.day} - {lesson.time}</div>
                <div className="text-sm text-gray-600">Преподаватель: {lesson.teacher}</div>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Сохранить изменения
          </button>
        </div>
      )}
    </div>
  );
}
