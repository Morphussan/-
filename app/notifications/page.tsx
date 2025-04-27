'use client';

import { useState } from 'react';

type NotificationType = 'all' | 'students' | 'teachers' | 'staff';

export default function NotificationsPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<NotificationType>('all');

  const handleSend = () => {
    // TODO: Implement notification sending
    console.log('Sending notification:', { title, message, type });
  };

  return (
    <div className="flex-1 p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Отправка уведомлений</h1>
        <p className="text-gray-600">Отправьте уведомление выбранной группе пользователей</p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
            {/* Recipient Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Получатели
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as NotificationType)}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="all">Все пользователи</option>
                <option value="students">Только студенты</option>
                <option value="teachers">Только преподаватели</option>
                <option value="staff">Только персонал</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Заголовок уведомления
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Введите заголовок..."
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Текст уведомления
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Введите текст уведомления..."
              />
            </div>

            {/* Preview */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Предпросмотр</h3>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                {title ? (
                  <h4 className="font-medium mb-2 text-gray-900">{title}</h4>
                ) : (
                  <div className="h-6 bg-gray-100 rounded w-1/2 mb-2"></div>
                )}
                {message ? (
                  <p className="text-gray-600 text-sm">{message}</p>
                ) : (
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Отправить уведомление
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 