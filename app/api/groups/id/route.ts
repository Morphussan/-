import { NextRequest, NextResponse } from 'next/server';
import db from '../../../../db'; // Импорт БД

export async function GET(request: NextRequest) {
  try {
    const groupName = request.nextUrl.searchParams.get('name');

    if (!groupName) {
      return NextResponse.json({ error: 'Название группы не указано' }, { status: 400 });
    }

    const sql = `SELECT id FROM groups WHERE name = ?`;

    return new Promise((resolve, reject) => {
      db.get(sql, [groupName], (err: Error | null, row: { id: number } | undefined) => {
        if (err) {
          console.error('Ошибка запроса к базе:', err);
          reject(NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 }));
        } else if (!row) {
          resolve(NextResponse.json({ error: 'Группа не найдена' }, { status: 404 }));
        } else {
          resolve(NextResponse.json({ id: row.id }, { status: 200 }));
        }
      });
    });
  } catch (error) {
    console.error('Ошибка обработки запроса:', error);
    return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
  }
}
