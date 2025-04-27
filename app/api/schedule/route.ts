import { NextRequest, NextResponse } from 'next/server';
const db = require('../../../db'); // ✅ require вместо import

export async function GET(request: NextRequest) {
  try {
    const groupName = request.nextUrl.searchParams.get('group');

    if (!groupName) {
      return NextResponse.json({ error: 'Не указана группа' }, { status: 400 });
    }

    const sql = `
      SELECT schedule.*, groups.name AS groupName
      FROM schedule
      JOIN groups ON schedule.group_id = groups.id
      WHERE groups.name = ?
      ORDER BY schedule.day, schedule.time
    `;

    return new Promise<NextResponse>((resolve, reject) => {
      db.all(sql, [groupName], (err: Error | null, rows: any[]) => {
        if (err) {
          console.error('Ошибка получения расписания:', err);
          reject(NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 }));
        } else {
          resolve(NextResponse.json(rows));
        }
      });
    });
  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка запроса' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { groupId, day, time, subject, teacher } = await request.json();

    const sql = `
      INSERT INTO schedule (group_id, day, time, subject, teacher)
      VALUES (?, ?, ?, ?, ?)
    `;

    return new Promise<NextResponse>((resolve, reject) => {
      db.run(sql, [groupId, day, time, subject, teacher], function (this: any, err: Error | null) {
        if (err) {
          console.error('Ошибка добавления урока:', err);
          reject(NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ id: this.lastID, groupId, day, time, subject, teacher }, { status: 201 }));
        }
      });
    });
  } catch (error) {
    console.error('Ошибка:', error);
    return NextResponse.json({ error: 'Ошибка запроса' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Не указан id урока' }, { status: 400 });
    }

    return new Promise<NextResponse>((resolve, reject) => {
      db.run('DELETE FROM schedule WHERE id = ?', [id], function (this: any, err: Error | null) {
        if (err) {
          console.error('Ошибка удаления урока:', err);
          reject(NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 }));
        } else {
          resolve(NextResponse.json({ message: 'Урок удалён', id }, { status: 200 }));
        }
      });
    });
  } catch (error) {
    console.error('Ошибка удаления урока:', error);
    return NextResponse.json({ error: 'Ошибка запроса' }, { status: 500 });
  }
}
