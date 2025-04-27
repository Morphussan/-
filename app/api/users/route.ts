import { NextRequest, NextResponse } from 'next/server';
import db from '../../../db'; // Путь к твоему db.js

// Получить всех пользователей
export async function GET() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        reject(NextResponse.json({ error: 'Ошибка при получении пользователей' }, { status: 500 }));
      } else {
        resolve(NextResponse.json(rows));
      }
    });
  });
}

// Добавить нового пользователя
export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.run(query, [name, email, password], function (err) {
      if (err) {
        reject(NextResponse.json({ error: 'Ошибка при добавлении пользователя' }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ id: this.lastID, name, email }));
      }
    });
  });
}
