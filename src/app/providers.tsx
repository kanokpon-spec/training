"use client";

import { NextIntlClientProvider } from "next-intl";
import { useState, useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState("th"); // ค่าเริ่มต้นเป็นไทย
  const [messages, setMessages] = useState({});

  // โหลดข้อความจากไฟล์ JSON ตามภาษา
  useEffect(() => {
    fetch(`/messages/${locale}.json`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, [locale]);

  // ฟังก์ชันสลับภาษา
  const toggleLanguage = () => {
    setLocale((prevLocale) => (prevLocale === "th" ? "en" : "th"));
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex justify-end p-4">
        {/* ปุ่มสลับภาษา */}
        <button 
          onClick={toggleLanguage} 
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          {locale === "th" ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"}
        </button>
      </div>

      {children}
    </NextIntlClientProvider>
  );
}
