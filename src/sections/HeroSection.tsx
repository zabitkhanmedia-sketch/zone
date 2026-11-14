"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, BadgeCheck, Clock, FileCheck2, ShieldCheck } from "lucide-react";
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
 const stats = {
  free: { value: <CountUp to={100} suffix="%" duration={1} />, label: "خدمة مجانية بالكامل" },
  response: { value: <CountUp to={24} suffix=" ساعة" duration={0.8} />, label: "متوسط وقت الاستجابة" },
  legal: { value: "تأطير كامل", label: "صياغة قانونية للشكوى" },
  docs: { value: <CountUp to={10000} prefix="+" duration={1.2} />, label: "طلب تم توثيقه" },
};

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
              <span>منصة مستقلة لتوثيق الشكاوى — دولة الإمارات</span>
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
                منصة رقمية مستقلة وغير تابعة لأي جهة حكومية لتوثيق وتنظيم الشكاوى ضد المنشآت التجارية، لتسهيل متابعتها وإيصالها للجهات المختصة بوضوح وسرعة.
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

       {/* 2. ABOUT & STATS SECTION */}
<section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch pt-2">

  {/* النص — أسلوب تحريري */}
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4 }}
    className="lg:col-span-5 flex flex-col justify-center"
  >
    <div className="flex items-center gap-3 mb-5">
      <span className="text-xs font-bold tracking-widest text-neutral-400">01</span>
      <span className="h-px w-10 bg-neutral-300" />
      <span className="text-xs font-semibold text-neutral-500">عن المنصة</span>
    </div>

    <div className="border-s-4 border-neutral-950 ps-5 space-y-4">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight">
        من نحن
      </h2>
      <p className="text-neutral-600 text-base sm:text-lg leading-loose">
        خدمة إلكترونية متخصصة في إعادة تأطير وصياغة الشكاوى التجارية في دولة الإمارات، لضمان استيفائها للبيانات والمستندات المطلوبة قبل رفعها للجهات المعنية.
      </p>
    </div>
  </motion.div>

  {/* شبكة Bento غير متناظرة */}
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.4, delay: 0.1 }}
    className="lg:col-span-7 grid grid-cols-2 gap-3 auto-rows-[minmax(120px,auto)]"
  >
    {/* البطاقة الكبيرة السوداء */}
  <div className="col-span-1 row-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 text-neutral-950 p-6 sm:p-8 flex flex-col justify-between min-h-[260px] border border-neutral-300 shadow-sm">
  {/* لمعة فضية ناعمة */}
  <div className="absolute inset-0 bg-gradient-to-tr from-white/60 via-transparent to-transparent pointer-events-none" />
  <div className="absolute -bottom-10 -start-10 h-40 w-40 rounded-full border border-neutral-400/40" />
  <div className="absolute -bottom-20 -start-20 h-64 w-64 rounded-full border border-neutral-400/25" />

  <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 border border-neutral-300">
    <BadgeCheck className="h-6 w-6 text-neutral-800" />
  </div>

  <div className="relative space-y-2">
    <div dir="ltr" className="text-5xl sm:text-6xl font-extrabold tracking-tight text-right text-neutral-950">
      {stats.free.value}
    </div>
    <p className="text-sm text-neutral-600 font-medium">{stats.free.label}</p>
  </div>
</div>

    {/* الاستجابة */}
    <div className="rounded-3xl bg-neutral-100 border border-neutral-200 p-5 sm:p-6 flex flex-col justify-between">
      <Clock className="h-5 w-5 text-neutral-500" />
      <div className="space-y-1 mt-4">
        <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
          {stats.response.value}
        </div>
        <p className="text-xs text-neutral-500 font-medium">{stats.response.label}</p>
      </div>
    </div>

    {/* التأطير القانوني */}
    <div className="rounded-3xl bg-white border border-neutral-200 p-5 sm:p-6 flex flex-col justify-between">
      <FileCheck2 className="h-5 w-5 text-neutral-500" />
      <div className="space-y-1 mt-4">
        <div className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
          {stats.legal.value}
        </div>
        <p className="text-xs text-neutral-500 font-medium">{stats.legal.label}</p>
      </div>
    </div>

    {/* الشريط العريض */}
    <div className="col-span-2 rounded-3xl bg-neutral-100 border border-neutral-200 px-6 sm:px-8 py-5 flex items-center justify-between gap-4">
      <p className="text-sm sm:text-base text-neutral-600 font-semibold">{stats.docs.label}</p>
      <div dir="ltr" className="text-4xl sm:text-5xl font-extrabold text-neutral-950 tracking-tight">
        {stats.docs.value}
      </div>
    </div>
  </motion.div>

</section>

      </div>
    </div>
  );
}