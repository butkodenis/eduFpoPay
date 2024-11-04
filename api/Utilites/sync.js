const sequelize = require('./dbConfig');

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('База данных подключена!');
    await sequelize.sync({ force: false });
    console.log('Таблицы синхронизированы!');
  } catch (err) {
    console.error('Ошибка подключения к базе данных:', err);
  }
}
syncDatabase();

module.exports = syncDatabase;
