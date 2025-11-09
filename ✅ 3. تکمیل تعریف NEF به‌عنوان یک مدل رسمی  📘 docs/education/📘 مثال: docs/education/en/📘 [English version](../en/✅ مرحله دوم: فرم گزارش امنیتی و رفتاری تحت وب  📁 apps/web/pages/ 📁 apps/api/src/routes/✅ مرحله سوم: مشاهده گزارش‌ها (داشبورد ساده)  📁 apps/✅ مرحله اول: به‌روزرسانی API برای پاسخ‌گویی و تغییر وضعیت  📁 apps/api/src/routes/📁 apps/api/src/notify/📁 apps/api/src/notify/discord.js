const fetch = require('node-fetch');
require('dotenv').config();

async function notifyDiscord(report) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;
  if (!webhook) return;

  const payload = {
    username: 'APZ Reports',
    content: `📢 **New ${report.type} report**\n\n📝 ${report.description}\n👤 ${report.contact || 'N/A'}`
  };

  try {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('Discord notification sent');
  } catch (err) {
    console.error('Discord error:', err);
  }
}

module.exports = { notifyDiscord };
