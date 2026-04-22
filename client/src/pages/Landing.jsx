import React, { useState } from "react";
import { CalendarDays, Mail, MessageCircle, Phone, PlayCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import programView from "../assets/landing-program-view.png";
import editorView from "../assets/landing-editor-view.png";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function tryDemo() {
    setLoading(true);
    setError("");
    try {
      await login("coach@example.com", "password123");
      navigate("/app");
    } catch {
      setError("الديمو غير جاهز الآن. تأكد من إضافة بيانات التجربة ثم حاول مرة أخرى.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="landing-page" dir="rtl">
      <nav className="landing-nav">
        <div className="landing-brand">مدير البرامج التدريبية</div>
        <Link className="secondary-button" to="/login?form=1">تسجيل الدخول</Link>
      </nav>

      <section className="landing-hero">
        <div className="landing-copy">
          <p className="eyebrow">للمدربين الشخصيين ومدربي اللياقة</p>
          <h1>إدارة برامج تمارين عملائك في مكان واحد</h1>
          <p>استبدل ملفات Excel ورسائل WhatsApp بنظام بسيط ومنظم.</p>

          <div className="landing-actions">
            <button className="primary-button" onClick={tryDemo} disabled={loading}>
              <PlayCircle size={18} /> {loading ? "جاري فتح الديمو..." : "جرّب الديمو"}
            </button>
            <a className="secondary-button" href="mailto:meshal.alhawiti@gmail.com?subject=Book%20a%20Demo&body=Hello%20Meshal,%20I%20would%20like%20to%20book%20a%20demo.">
              <CalendarDays size={18} /> احجز عرضًا تجريبيًا
            </a>
          </div>
          {error && <div className="error-box">{error}</div>}
          <div className="landing-contact">
            <a href="mailto:meshal.alhawiti@gmail.com">
              <Mail size={17} /> meshal.alhawiti@gmail.com
            </a>
            <a href="tel:0549053918">
              <Phone size={17} /> 0549053918
            </a>
          </div>
        </div>

        <div className="landing-screenshots">
          <figure>
            <img src={programView} alt="واجهة البرنامج مع أيام التدريب وجدول التمارين" />
            <figcaption>عرض البرنامج: الأيام، الإحماء، جدول التمارين والكارديو</figcaption>
          </figure>
          <figure>
            <img src={editorView} alt="واجهة تعديل برنامج التدريب" />
            <figcaption>واجهة نظيفة لتعديل التمارين والخطط التدريبية</figcaption>
          </figure>
        </div>
      </section>

      <section className="landing-points">
        <div>
          <MessageCircle size={20} />
          <span>لا مزيد من تعليمات WhatsApp المتفرقة</span>
        </div>
        <div>
          <CalendarDays size={20} />
          <span>خطة تدريب يومية واضحة لكل عميل</span>
        </div>
        <div>
          <PlayCircle size={20} />
          <span>ديمو جاهز للتجربة من المدربين</span>
        </div>
      </section>
    </main>
  );
}
