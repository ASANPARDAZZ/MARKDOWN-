# MARKDOWN----

✅ 1. انتشار فایل‌ها در ریپو و لینک‌دهی از README.md

فایل‌های docs/education/*.md اکنون به‌صورت رسمی در ریپو قرار گرفته‌اند. در README.md، بخش جدیدی اضافه شده:

`md

منابع آموزشی

برای یادگیری، مشارکت و توسعه، از منابع زیر استفاده کنید:

- مدرسه آسان پرداز زاگرس
- SAPNFC — ریپازیتوری آموزشی
- مدل‌های آموزشی
- سیستم تیکت و پشتیبانی
- انجمن Reddit
- سرور Discord
- مدل NEF
- فلسفه آموزش آسان
`

---

✅ 2. اتصال فرم‌های واقعی به سیستم تیکت و ثبت‌نام مدرسه

📁 apps/web/pages/support.js — فرم ارسال تیکت

`jsx
import React, { useState } from 'react';

export default function SupportPage() {
  const [form, setForm] = useState({ subject: '', message: '', user: '' });
  const [response, setResponse] = useState(null);

  async function submitTicket(e) {
    e.preventDefault();
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setResponse(data.ticket || data.error);
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📩 ارسال تیکت پشتیبانی</h1>
      <form onSubmit={submitTicket}>
        <input
          type="text"
          placeholder="موضوع"
          value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="پیام شما"
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          required
        />
        <br />
        <input
          type="text"
          placeholder="ایمیل یا نام کاربری"
          value={form.user}
          onChange={e => setForm({ ...form, user: e.target.value })}
          required
        />
        <br />
        <button type="submit">ارسال تیکت</button>
      </form>
      {response && (
        <div style={{ marginTop: '1rem' }}>
          <strong>پاسخ:</strong> {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
}
`

📁 apps/web/pages/register.js — فرم ثبت‌نام مدرسه

`jsx
import React, { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', course: '' });
  const [submitted, setSubmitted] = useState(false);

  async function submitForm(e) {
    e.preventDefault();
    await fetch('https://formspree.io/f/your-form-id', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setSubmitted(true);
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎓 ثبت‌نام در مدرسه APZ</h1>
      {submitted ? (
        <p>ثبت‌نام شما با موفقیت انجام شد. منتظر ایمیل تایید باشید.</p>
      ) : (
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="نام کامل"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <br />
          <input
            type="email"
            placeholder="ایمیل"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <br />
          <select
            value={form.course}
            onChange={e => setForm({ ...form, course: e.target.value })}
            required
          >
            <option value="">انتخاب دوره</option>
            <option value="blockchain">مقدمه بلاک‌چین</option>
            <option value="solidity">قراردادهای هوشمند</option>
            <option value="audit">امنیت و ممیزی</option>
          </select>
          <br />
          <button type="submit">ثبت‌نام</button>
        </form>
      )}
    </div>
  );
}
`

📌 برای فعال‌سازی فرم ثبت‌نام، کافی‌ست یک فرم رایگان در Formspree یا هر سرویس مشابه بسازی و form-id را جایگزین کنی.

---

✅ 3. تکمیل تعریف NEF به‌عنوان یک مدل رسمی

📘 docs/education/nef.md (نسخه کامل‌شده)

`md

NEF — Next Educational Framework

NEF یک مدل آموزشی نوین است که توسط Khalil Heyrani در پروژه APZ معرفی شده است.  
هدف آن ایجاد بستری شفاف، قابل بازتولید و امن برای یادگیری در حوزه‌های زیرساخت، بلاک‌چین، و توسعه‌ی متن‌باز است.

ویژگی‌های NEF
- بازتولیدپذیری کامل: هر دوره، تمرین و پروژه باید قابل اجرا و بررسی توسط دیگران باشد.
- امنیت و ممیزی: تمام منابع آموزشی تحت ممیزی و بررسی امنیتی قرار می‌گیرند.
- شفافیت در ارزیابی: معیارهای ارزیابی به‌صورت عمومی و قابل بررسی هستند.
- همیاری شبکه‌ای: یادگیرندگان در قالب شبکه‌های همیار به یکدیگر کمک می‌کنند.

اجزای NEF
- دوره‌های چندسطحی با مسیرهای مشخص
- ابزارهای CI/CD برای آموزش عملی
- داشبورد یادگیری با قابلیت ثبت و تایید گواهی‌ها
- اتصال به قراردادهای هوشمند برای اعتبارسنجی یادگیری

📌 NEF به‌عنوان مدل رسمی مدرسه APZ در حال پیاده‌سازی است.
`

---

✅ 4. افزودن ترجمه‌ی انگلیسی برای مخاطبان بین‌المللی

تمام فایل‌های docs/education/*.md اکنون دارای نسخه‌ی انگلیسی هستند، در مسیر:

`plaintext
docs/education/en/
├── sapnfc.md
├── models.md
├── school.md
├── ticket.md
├── reddit.md
├── discord.md
├── nef.md
`

📘 مثال: docs/education/en/school.md

`md

Asan Pardaz Zagros School

The official APZ educational platform for developers, students, and open-source enthusiasts.

Goals
- Teach blockchain, infrastructure, and security
- Offer multilingual courses (Persian, English)
- Build a collaborative and safe learning community

Current Courses
- Blockchain fundamentals
- Smart contract development with Solidity
- Security and audit in open-source systems

📺 Videos: youtube.com/@apzschool  
💬 Discord: discord.gg/apzchain

Registration
Visit school.apzchain.org to enroll.
`

---

🌍 لینک‌دهی بین‌زبانی در فایل‌ها

در هر فایل فارسی، لینک به نسخه‌ی انگلیسی اضافه شد:

`md
📘 English version
`

و در نسخه‌ی انگلیسی:

`md
📘 نسخه فارسی
`

---
