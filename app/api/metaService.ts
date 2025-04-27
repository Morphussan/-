// src/api/metaService.ts
import initDB from '../../db';

export const metaService = {
  getMetaData: async () => {
    const db = await initDB();
    const totalUsers = await db.get('SELECT COUNT(*) as cnt FROM users');

    // Замените на получение действительных метрик
    const cpuUsage = 30;
    const ramUsage = 40;

    const storageUsage = {
      totalStorage: 100, // Замените на фактические данные
      freeStorage: 50    // Замените на фактические данные
    };

    return {
      totalUsers: totalUsers.cnt,
      cpuUsage,
      ramUsage,
      storageUsage
    };
  }
};
