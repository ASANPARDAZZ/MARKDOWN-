import React, { useEffect, useState } from 'react';

export default function ReportsDashboard() {
  const [reports, setReports] = useState([]);
  const [selected, setSelected] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('/report')
      .then(res => res.json())
      .then(data => setReports(data.reports || []));
  }, []);

  async function loadReplies(id) {
    const res = await fetch(`/report/${id}/replies`);
    const data = await res.json();
    setReplies(data.replies || []);
  }

  async function sendReply() {
    await fetch(`/report/${selected.id}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: replyText, responder: 'admin' })
    });
    setReplyText('');
    loadReplies(selected.id);
  }

  async function updateStatus() {
    await fetch(`/report/${selected.id}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    setStatus('');
    const updated = await fetch('/report').then(res => res.json());
    setReports(updated.reports || []);
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📋 مدیریت گزارش‌ها</h1>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>نوع</th>
            <th>شرح</th>
            <th>تماس</th>
            <th>وضعیت</th>
            <th>زمان</th>
            <th>مدیریت</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td>{r.type}</td>
              <td>{r.description.slice(0, 50)}...</td>
              <td>{r.contact || '-'}</td>
              <td>{r.status}</td>
              <td>{new Date(r.created_at).toLocaleString()}</td>
              <td>
                <button onClick={() => {
                  setSelected(r);
                  loadReplies(r.id);
                }}>مدیریت</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <h2>📝 گزارش انتخاب‌شده</h2>
          <p><strong>نوع:</strong> {selected.type}</p>
          <p><strong>شرح:</strong> {selected.description}</p>
          <p><strong>تماس:</strong> {selected.contact || '-'}</p>
          <p><strong>وضعیت فعلی:</strong> {selected.status}</p>

          <h3>📨 پاسخ‌ها</h3>
          <ul>
            {replies.map(r => (
              <li key={r.id}>
                <strong>{r.responder}</strong>: {r.message} <em>({new Date(r.created_at).toLocaleString()})</em>
              </li>
            ))}
          </ul>

          <textarea
            placeholder="پاسخ جدید..."
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            rows={3}
            style={{ width: '100%' }}
          />
          <br />
          <button onClick={sendReply}>ارسال پاسخ</button>

          <h3>🔄 تغییر وضعیت</h3>
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">انتخاب وضعیت</option>
            <option value="pending">در انتظار</option>
            <option value="resolved">حل‌شده</option>
            <option value="closed">بسته‌شده</option>
          </select>
          <button onClick={updateStatus}>اعمال وضعیت</button>
        </div>
      )}
    </div>
  );
}
