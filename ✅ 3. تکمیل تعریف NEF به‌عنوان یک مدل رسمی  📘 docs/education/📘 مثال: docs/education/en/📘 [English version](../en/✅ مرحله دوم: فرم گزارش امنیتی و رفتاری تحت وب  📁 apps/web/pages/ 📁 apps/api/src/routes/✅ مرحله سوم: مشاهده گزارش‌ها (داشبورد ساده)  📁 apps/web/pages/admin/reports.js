import React, { useEffect, useState } from 'react';

export default function ReportsDashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('/report')
      .then(res => res.json())
      .then(data => setReports(data.reports || []));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📋 گزارش‌های دریافتی</h1>
      {reports.length === 0 ? (
        <p>هیچ گزارشی ثبت نشده است.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>نوع</th>
              <th>شرح</th>
              <th>تماس</th>
              <th>وضعیت</th>
              <th>زمان</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id}>
                <td>{r.type}</td>
                <td>{r.description}</td>
                <td>{r.contact || '-'}</td>
                <td>{r.status}</td>
                <td>{new Date(r.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
