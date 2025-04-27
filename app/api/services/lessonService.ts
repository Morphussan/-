import { ScheduleLesson } from '../types';

export const lessonService = {
  async getLessonsByGroup(groupName: string): Promise<ScheduleLesson[]> {
    const res = await fetch(`/app/admin/api/lesson?group=${encodeURIComponent(groupName)}`);
    if (!res.ok) {
      throw new Error('Ошибка загрузки уроков');
    }
    return res.json();
  },

  async saveSchedule(groupName: string, { added, updated, deleted }: {
    added: ScheduleLesson[];
    updated: ScheduleLesson[];
    deleted: number[];
  }) {
    const res = await fetch('/app/admin/api/lesson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupName, added, updated, deleted }),
    });
    if (!res.ok) {
      throw new Error('Ошибка сохранения расписания');
    }
    return res.json();
  },
};
