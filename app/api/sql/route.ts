import { NextRequest, NextResponse } from 'next/server';
const db = require('../../../db'); // ✅ require вместо import

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    return new Promise<NextResponse>((resolve, reject) => {
      db.all(query, [], (err: Error | null, rows: any[]) => {
        if (err) {
          console.error('Ошибка SQL запроса:', err.message);
          reject(NextResponse.json({ error: err.message }, { status: 400 }));
        } else {
          resolve(NextResponse.json({ results: rows }, { status: 200 }));
        }
      });
    });
  } catch (error) {
    console.error('Ошибка выполнения запроса:', error);
    return NextResponse.json({ error: 'Неверный запрос' }, { status: 400 });
  }
}
