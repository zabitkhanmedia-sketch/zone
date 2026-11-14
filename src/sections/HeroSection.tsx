"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { motion, useInView, animate, type Variants } from "framer-motion";

interface HeroProps {
  onPrimaryClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration,
        ease: "easeOut",
        onUpdate(value) {
          setCount(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function HeroSection({ onPrimaryClick }: HeroProps) {
  const stats = [
    { value: <CountUp to={100} suffix="%" duration={1} />, label: "خدمة مجانية بالكامل", accent: "text-emerald-700", borderHover: "hover:border-emerald-300", glow: "bg-emerald-500/10" },
    { value: <CountUp to={24} suffix=" ساعة" duration={0.8} />, label: "متوسط وقت الاستجابة", accent: "text-black", borderHover: "hover:border-black/20", glow: "bg-black/10" },
    { value: "تأطير كامل", label: "صياغة قانونية للشكوى", accent: "text-red-700", borderHover: "hover:border-red-300", glow: "bg-red-500/10" },
    { value: <CountUp to={10000} prefix="+" duration={1.2} />, label: "طلب تم توثيقه", accent: "text-amber-700", borderHover: "hover:border-amber-300", glow: "bg-amber-500/10" },
  ];

  return (
    <div className="w-full bg-white py-6 md:py-10 dir-rtl text-right">
      <div className="container-page space-y-12 md:space-y-16">

        {/* 1. HERO CARD */}
        <section className="relative w-full rounded-3xl overflow-hidden bg-neutral-950 text-white p-8 sm:p-12 md:p-16 border border-neutral-800 shadow-xl">
          
          {/* الصورة بألوانها الطبيعية مع طبقة عزل شفافة ونظيفة للقراءة */}
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <img
              src="ff.jpg"
              alt="منصة حماية المستهلك"
              className="w-full h-full object-cover object-left opacity-40"
            />
            {/* طبقة شفافة ناعمة لتوفير تباين كافٍ لقراءة النصوص فوق الصورة الملونة دون طمسها */}
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-l from-neutral-950/90 via-neutral-950/50 to-neutral-950/20" />
          </div>

          {/* محتوى الهيرو الرئيسي */}
          <div className="relative z-10 max-w-2xl space-y-6">
            
            {/* الشارة */}
            <motion.div 
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700/60 bg-neutral-900/90 px-3.5 py-1 text-xs font-medium text-neutral-200 backdrop-blur-md shadow-sm"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>منصة رقمية لتوثيق الشكاوى — دولة الإمارات</span>
            </motion.div>

            {/* العنوان والوصف */}
            <div className="space-y-3">
              <motion.h1 
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.15]"
              >
                منصة حماية المستهلك
              </motion.h1>

              <motion.p 
                custom={3}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal"
              >
منصة رقمية لتقديم شكاوى المستهلكين وملاحظاتهم بسهولة، مع تنظيم بيانات الشكوى وتسهيل متابعة الطلب من مكان واحد.
              </motion.p>
            </div>

            {/* الأزرار */}
            <motion.div 
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <a
                href="#complaint-form"
                onClick={onPrimaryClick}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white text-neutral-950 hover:bg-neutral-100 font-semibold px-7 py-3.5 text-sm transition-all duration-200 shadow-md hover:shadow-lg group active:scale-95"
              >
                <span>تقديم طلب توثيق شكوى</span>
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/60 hover:bg-neutral-800 px-6 py-3.5 text-sm font-medium text-neutral-200 transition-all duration-200 backdrop-blur-sm active:scale-95"
              >
                دليل الإجراءات
              </a>
            </motion.div>

          </div>
        </section>

   
        {/* 2. ABOUT & STATS SECTION (ارتفاع أقل، تدرجات فضية مع لمسات حيوية) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">

          {/* بطاقة من نحن */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200/70 border border-slate-200/90 flex flex-col justify-center space-y-2 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-br-full pointer-events-none" />
            
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 relative z-10">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              من نحن
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal relative z-10">
              خدمة إلكترونية متخصصة في إعادة تأطير وصياغة الشكاوى التجارية في دولة الإمارات، لضمان استيفائها للبيانات والمستندات المطلوبة قبل رفعها للجهات المعنية.
            </p>
          </motion.div>

          {/* شبكة الأرقام بتدرجات الفضي ولمسات لونية حيوية */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {stats.map((item, idx) => (
              <div 
                key={idx}
                className={`p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-slate-100 via-gray-50 to-zinc-200/75 border border-slate-200/90 ${item.borderHover} flex flex-col justify-between space-y-1.5 shadow-2xs hover:shadow-sm transition-all duration-200 group relative overflow-hidden`}
              >
                {/* هالة لونية ناعمة في الزاوية تعطي حيوية */}
                <div className={`absolute -top-4 -left-4 w-14 h-14 ${item.glow} rounded-full blur-md pointer-events-none`} />

                <span className={`text-lg sm:text-xl font-black ${item.accent} tracking-tight group-hover:scale-105 origin-right transition-transform relative z-10`}>
                  {item.value}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-600 font-semibold leading-snug relative z-10">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

        </section>
      </div>
    </div>
  );
}