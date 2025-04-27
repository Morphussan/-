// src/app/api/metadata/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Здесь вы можете получить реальные данные, например, из базы данных или другого источника
  const metaData = {
    totalUsers: 150,
    cpuUsage: 45,
    ramUsage: 70,
    storageUsage: {
      totalStorage: 500, // в ГБ
      freeStorage: 200, // в ГБ
    },
  };

  return NextResponse.json(metaData);
}