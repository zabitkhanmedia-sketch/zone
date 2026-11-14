"use client";

import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft, ChevronDown, Shield } from "lucide-react";

const navItems: ReadonlyArray<{
  to: string;
  label: string;
  hasDropdown?: boolean;
}> = [
  { to: "/", label: "الرئيسية" },
  { to: "/about", label: "عن المنصة" },
  {
    to: "/how-it-works",
    label: "كيف تعمل المنصة",
    hasDropdown: true,
  },
  { to: "/faq", label: "الأسئلة الشائعة" },
  { to: "/contact", label: "تواصل معنا" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // مراقبة التمرير لإضافة تأثير الظل والشفافية بسلاسة
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 dir-rtl ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-[0_4px_24px_rgba(0,0,0,0.04)] py-2.5"
          : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* 1. الشعار وهوية المنصة بتصميم مدمج وأنيق */}
        <Link
          to="/"
          className="group flex items-center gap-3.5 shrink-0 focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-neutral-950 text-white shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <img
              src="/header.png"
              alt="شعار منصة حماية المستهلك"
              className="h-7 w-auto object-contain"
              // @ts-ignore
              fetchpriority="high"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base md:text-lg font-extrabold text-neutral-950 tracking-tight">
                منصة حماية المستهلك
              </span>
            </div>
            <span className="text-[11px] font-medium text-neutral-500">
              دولة الإمارات العربية المتحدة
            </span>
          </div>
        </Link>

        {/* 2. روابط التنقل: بدون خلفيات ثقيلة، مع مؤشر سفلي متحرك وعصري */}
        <nav
          aria-label="التنقل الرئيسي"
          className="hidden lg:flex items-center gap-7"
        >
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="relative py-2 text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors duration-200 flex items-center gap-1 group"
              activeProps={{
                className: "text-neutral-950 font-bold",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {({ isActive }) => (
                <>
                  <span>{n.label}</span>
                  {n.hasDropdown && (
                    <ChevronDown className="h-3.5 w-3.5 text-neutral-400 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                  
                  {/* الخط السفلي العصري */}
                  <span
                    className={`absolute bottom-0 right-0 h-[2px] rounded-full bg-neutral-950 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </Link>
          ))}
        </nav>

        {/* 3. الإجراءات الجانبية: زر تقديم الشكوى بتصميم انسيابي */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              hash="complaint-form"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-950/15 active:scale-95"
            >
              <Shield className="h-4 w-4 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
              <span>تقديم طلب شكوى</span>
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </div>

          {/* زر قائمة الموبايل بتصميم مربع ناعم */}
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-xl border border-neutral-200/80 bg-neutral-50/50 text-neutral-900 lg:hidden transition-all hover:bg-neutral-100 active:scale-95"
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* قائمة الموبايل بتصميم عائم ونظيف */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[450px] opacity-100 border-t border-neutral-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-1.5 bg-white">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950 transition-colors"
              activeProps={{
                className: "bg-neutral-100/80 text-neutral-950 font-bold",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              <span>{n.label}</span>
              {n.hasDropdown && <ChevronDown className="h-4 w-4 text-neutral-400" />}
            </Link>
          ))}

          <div className="pt-3 mt-2 border-t border-neutral-100">
            <Link
              to="/"
              hash="complaint-form"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 py-3.5 text-sm font-semibold text-white shadow-md active:scale-98"
            >
              <Shield className="h-4 w-4 text-emerald-400" />
              <span>تقديم طلب شكوى</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}