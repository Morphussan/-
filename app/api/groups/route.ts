console.log('✅ API /api/groups загружен');

import { NextRequest, NextResponse } from 'next/server';
const db = require('../../../db'); // ✅ заменили import на require

export async function GET(request: NextRequest) {
  return new Promise<NextResponse>((resolve, reject) => {
    db.all('SELECT * FROM groups', [], (err: Error | null, rows: any[]) => {
      if (err) {
        console.error('Ошибка при получении групп:', err);
        return reject(NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 }));
      }

      return resolve(NextResponse.json(rows));
    });
  });
}
