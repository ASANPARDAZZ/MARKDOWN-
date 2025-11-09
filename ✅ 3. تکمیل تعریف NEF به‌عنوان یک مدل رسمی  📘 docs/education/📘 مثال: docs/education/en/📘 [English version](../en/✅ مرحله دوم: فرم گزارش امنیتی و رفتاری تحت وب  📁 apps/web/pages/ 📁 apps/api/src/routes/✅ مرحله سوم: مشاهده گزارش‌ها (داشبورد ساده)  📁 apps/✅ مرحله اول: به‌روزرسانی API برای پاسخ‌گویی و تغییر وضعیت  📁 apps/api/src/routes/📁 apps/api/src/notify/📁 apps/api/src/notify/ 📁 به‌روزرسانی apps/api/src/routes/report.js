const { notifyTelegram } = require('../notify/telegram');
const { notifyDiscord } = require('../notify/discord');

// داخل POST /report بعد از ذخیره در DB:
await Promise.all([
  sendReportNotification({ id, type, description, contact }), // ایمیل
  notifyTelegram({ type, description, contact }),
  notifyDiscord({ type, description, contact })
]);
