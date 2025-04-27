'use client';

import { useEffect, useState } from 'react';

type StatItem = {
  label: string;
  value: string;
  total?: number;
  used?: number;
};

type MetaData = {
  totalUsers: number;
  cpuUsage: number;
  ramUsage: number;
  storageUsage: {
    totalStorage: number;
    freeStorage: number;
  };
};

export default function Dashboard() {
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetaData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/metadata.ts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data) {
          setMetaData(data);
        } else {
          setError('Не удалось загрузить данные');
        }
      } catch (err) {
        setError('Ошибка при получении данных дашборда');
        console.error('Ошибка:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetaData();
  }, []);

  // Формируем массив статистики на основе полученных метаданных
  const stats: StatItem[] = metaData
    ? [
        { label: 'Пользователи', value: `${metaData.totalUsers}` },
        { 
          label: 'Загруженность ЦПУ', 
          value: `${metaData.cpuUsage}%`,
          total: 100,
          used: metaData.cpuUsage
        },
        { 
          label: 'Загруженность ОЗУ', 
          value: `${metaData.ramUsage}%`,
          total: 100,
          used: metaData.ramUsage
        },
        { 
          label: 'Свободное пространство', 
          value: `${metaData.storageUsage.freeStorage} ГБ`,
          total: metaData.storageUsage.totalStorage,
          used: metaData.storageUsage.totalStorage - metaData.storageUsage.freeStorage,
        },
      ]
    : [];

  return (
    <div className="flex-1 p-4 md:p-6 bg-gray-50 relative overflow-auto">
      {/* Отображение заглушки или состояния загрузки */}
      {(loading || error || !metaData) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          {loading && (
            <p className="text-gray-700 font-semibold text-xl md:text-2xl mb-2">Загрузка данных...</p>
          )}
          {error && (
            <>
              <p className="text-red-500 font-semibold text-xl md:text-2xl mb-2">(×﹏×)</p>
              <p className="text-red-500 tracking-wide text-sm md:text-base">{error}</p>
            </>
          )}
          {!loading && !error && !metaData && (
            <>
              <p className="text-gray-700 font-semibold text-xl md:text-2xl mb-2">(ﾉ´ヮ`)ﾉ*: ･ﾟ</p>
              <p className="text-gray-700 tracking-wide text-sm md:text-base">Для начала работы, выберите нужную категорию</p>
            </>
          )}
        </div>
      )}

      {/* Карточки статистики - отображаются только если данные загружены */}
      {metaData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat ) => (
            <div key={stat.label} className="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <h3 className="text-gray-600 text-xs md:text-sm font-medium tracking-wide">{stat.label}</h3>
              </div>
              <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">{stat.value}</p>
              {stat.total !== undefined && stat.used !== undefined && (
                <div className="space-y-2">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(stat.used / stat.total) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between text-xs md:text-sm text-gray-500">
                    <span className="font-medium">
                      {stat.label === 'Загруженность ЦПУ' || stat.label === 'Загруженность ОЗУ'
                        ? `Загружено: ${stat.used}%`
                        : `Использовано: ${stat.used} ГБ`}
                    </span>
                    <span className="font-medium mt-1 sm:mt-0">
                      {stat.label === 'Загруженность ЦПУ' || stat.label === 'Загруженность ОЗУ'
                        ? `Всего: ${stat.total}%`
                        : `Всего: ${stat.total} ГБ`}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}