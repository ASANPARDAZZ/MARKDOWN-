const fetch = require('node-fetch');
require('dotenv').config();

async function notifyTelegram(report) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const message = `📢 New ${report.type} report\n\n📝 ${report.description}\n👤 ${report.contact || 'N/A'}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message })
    });
    console.log('Telegram notification sent');
  } catch (err) {
    console.error('Telegram error:', err);
  }
}

module.exports = { notifyTelegram };
