// Автозаполнение БД тестовыми данными
const db = require('./db'); // Подключение твоего db.js

async function seed() {
  console.log('🚀 Запуск сидирования базы данных...');

  // 1. Очистка старых данных
  await new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('DELETE FROM groups', (err) => {
        if (err) reject(err);
      });
      db.run('DELETE FROM schedule', (err) => {
        if (err) reject(err);
      });
      resolve();
    });
  });

  console.log('✅ Очищены таблицы groups и schedule.');

  // 2. Добавление групп
  const groups = [
    { name: 'Группа A', discipline: 'Математика' },
    { name: 'Группа B', discipline: 'Физика' },
    { name: 'Группа C', discipline: 'Информатика' },
  ];

  await Promise.all(
    groups.map((group) =>
      new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO groups (name, discipline) VALUES (?, ?)',
          [group.name, group.discipline],
          (err) => (err ? reject(err) : resolve())
        );
      })
    )
  );

  console.log('✅ Добавлены группы.');

  // 3. Получаем id групп
  const groupIds = await new Promise((resolve, reject) => {
    db.all('SELECT id, name FROM groups', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });

  const findGroupId = (name) => groupIds.find((g) => g.name === name)?.id;

  // 4. Добавление уроков в расписание
  const lessons = [
    { groupName: 'Группа A', day: 'Понедельник', time: '09:00-10:30', subject: 'Алгебра', teacher: 'Иванов И.И.' },
    { groupName: 'Группа A', day: 'Среда', time: '11:00-12:30', subject: 'Геометрия', teacher: 'Петров П.П.' },
    { groupName: 'Группа B', day: 'Вторник', time: '09:00-10:30', subject: 'Физика', teacher: 'Сидоров С.С.' },
    { groupName: 'Группа C', day: 'Пятница', time: '10:00-11:30', subject: 'Программирование', teacher: 'Кузнецов К.К.' },
  ];

  await Promise.all(
    lessons.map((lesson) =>
      new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO schedule (group_id, day, time, subject, teacher) VALUES (?, ?, ?, ?, ?)',
          [findGroupId(lesson.groupName), lesson.day, lesson.time, lesson.subject, lesson.teacher],
          (err) => (err ? reject(err) : resolve())
        );
      })
    )
  );

  console.log('✅ Добавлены уроки в расписание.');

  console.log('🎉 Сидирование завершено! Теперь в базе есть группы и расписание.');
  process.exit(0); // Завершение процесса
}

seed().catch((err) => {
  console.error('❌ Ошибка сидирования:', err);
  process.exit(1);
});
