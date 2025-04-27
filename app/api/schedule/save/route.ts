import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../db';

export async function POST(request: NextRequest) {
  try {
    const { groupId, week, changes } = await request.json();

    if (!changes) {
      return NextResponse.json({ error: 'Нет данных для сохранения' }, { status: 400 });
    }

    // Добавление новых занятий
    if (changes.added && changes.added.length > 0) {
      for (const lesson of changes.added) {
        await new Promise((resolve, reject) => {
          db.run(
            'INSERT INTO schedule (group_id, day, time, subject, teacher) VALUES (?, ?, ?, ?, ?)',
            [groupId, lesson.day, `${lesson.time.start}-${lesson.time.end}`, lesson.subject, lesson.teacher],
            (err: Error | null) => {
              if (err) reject(err);
              else resolve(true);
            }
          );
        });
      }
    }

    // Удаление уроков
    if (changes.deleted && changes.deleted.length > 0) {
      for (const id of changes.deleted) {
        await new Promise((resolve, reject) => {
          db.run('DELETE FROM schedule WHERE id = ?', [id], (err: Error | null) => {
            if (err) reject(err);
            else resolve(true);
          });
        });
      }
    }

    // Обновление уроков
    if (changes.updated && changes.updated.length > 0) {
      for (const lesson of changes.updated) {
        await new Promise((resolve, reject) => {
          db.run(
            'UPDATE schedule SET day = ?, time = ?, subject = ?, teacher = ? WHERE id = ?',
            [lesson.day, `${lesson.time.start}-${lesson.time.end}`, lesson.subject, lesson.teacher, lesson.id],
            (err: Error | null) => {
              if (err) reject(err);
              else resolve(true);
            }
          );
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка при сохранении расписания:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
