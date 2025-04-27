export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
const db = require('../../../db'); // ✅ Используем require для CommonJS

export async function GET(request: NextRequest) {
  try {
    const groupName = request.nextUrl.searchParams.get('group');

    if (!groupName) {
      return NextResponse.json({ error: 'Группа не указана' }, { status: 400 });
    }

    const sql = `
      SELECT schedule.id, schedule.day, schedule.time, schedule.subject, schedule.teacher
      FROM schedule
      JOIN groups ON schedule.group_id = groups.id
      WHERE groups.name = ?
      ORDER BY schedule.day, schedule.time
    `;

    return new Promise<NextResponse>((resolve) => {
      db.all(sql, [groupName], (err: any, rows: any[]) => {
        if (err) {
          console.error('Ошибка чтения уроков:', err);
          resolve(NextResponse.json({ error: 'Ошибка сервера: ' + err.message }, { status: 500 }));
        } else {
          resolve(NextResponse.json(rows, { status: 200 }));
        }
      });
    });
  } catch (error: any) {
    console.error('Ошибка API:', error);
    return NextResponse.json({ error: 'Ошибка сервера: ' + error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { groupName, added, updated, deleted } = await request.json();

    if (!groupName) {
      return NextResponse.json({ error: 'Группа не указана' }, { status: 400 });
    }

    return new Promise<NextResponse>((resolve) => {
      db.get('SELECT id FROM groups WHERE name = ?', [groupName], (err: any, group: { id: number } | undefined) => {
        if (err || !group) {
          console.error('Ошибка поиска группы:', err);
          resolve(NextResponse.json({ error: 'Группа не найдена' }, { status: 400 }));
          return;
        }

        const groupId = group.id;
        const tasks: Promise<void>[] = [];

        for (const lesson of added) {
          tasks.push(new Promise((res, rej) => {
            db.run(
              `INSERT INTO schedule (group_id, day, time, subject, teacher) VALUES (?, ?, ?, ?, ?)`,
              [groupId, lesson.day, lesson.time, lesson.subject, lesson.teacher],
              (err: any) => (err ? rej(err) : res())
            );
          }));
        }

        for (const lesson of updated) {
          tasks.push(new Promise((res, rej) => {
            db.run(
              `UPDATE schedule SET day = ?, time = ?, subject = ?, teacher = ? WHERE id = ?`,
              [lesson.day, lesson.time, lesson.subject, lesson.teacher, lesson.id],
              (err: any) => (err ? rej(err) : res())
            );
          }));
        }

        for (const lessonId of deleted) {
          tasks.push(new Promise((res, rej) => {
            db.run(
              `DELETE FROM schedule WHERE id = ?`,
              [lessonId],
              (err: any) => (err ? rej(err) : res())
            );
          }));
        }

        Promise.all(tasks)
          .then(() => {
            resolve(NextResponse.json({ success: true }, { status: 200 }));
          })
          .catch((error) => {
            console.error('Ошибка сохранения:', error);
            resolve(NextResponse.json({ error: 'Ошибка при сохранении: ' + error.message }, { status: 500 }));
          });
      });
    });
  } catch (error: any) {
    console.error('Ошибка запроса:', error);
    return NextResponse.json({ error: 'Ошибка сервера: ' + error.message }, { status: 500 });
  }
}
