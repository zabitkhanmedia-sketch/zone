"use client";

import { ShieldCheck, Clock, Scale, Users, ArrowLeft, LucideIcon } from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const whyUs: FeatureItem[] = [
  {
    icon: ShieldCheck,
    title: "منصة معتمدة وموثوقة",
    desc: "معايير مهنية وقانونية صارمة لضمان موثوقية وحماية كافة الأطراف.",
  },
  {
    icon: Clock,
    title: "معالجة سريعة وفعالة",
    desc: "بدء مراجعة الشكوى واتخاذ الإجراءات الأولية خلال 24 ساعة عمل.",
  },
  {
    icon: Scale,
    title: "توثيق قانوني متكامل",
    desc: "إصدار ملف مرجعي موحد للشكوى يمكن استخدامه في المتابعات الرسمية.",
  },
  {
    icon: Users,
    title: "دعم مخصص للمستهلك",
    desc: "فريق عمل يتفهم القوانين المحلية ويدعم المستهلك خطوة بخطوة.",
  },
];

interface WhyUsSectionProps {
  onPrimaryClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function WhyUsSection({ onPrimaryClick }: WhyUsSectionProps) {
  return (
    <section
      dir="rtl"
      className="border-y border-neutral-200 bg-neutral-50 py-20 md:py-28"
    >
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center">

        {/* العنوان والنص + الزر */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-neutral-300" />
            <span className="text-xs font-semibold text-neutral-500">مميزات المنصة</span>
          </div>

          <div className="border-s-4 border-neutral-950 ps-5">
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-neutral-950">
              لماذا تعتبر منصتنا الخيار الأفضل لتوثيق شكواك؟
            </h2>
            <p className="mt-4 text-sm md:text-base leading-loose text-neutral-600">
              نوفر لك منصة متكاملة وسلسة تجمع بين السرعة والشفافية التامة في التعامل مع القضايا والشكاوى التجارية في كافة إمارات الدولة.
            </p>
          </div>

          <div className="mt-8">
            <a
              href="#complaint-form"
              onClick={onPrimaryClick}
              className="group inline-flex items-center gap-2.5 rounded-full bg-neutral-950 px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-neutral-800 hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
            >
              <span>تقديم شكوى جديدة</span>
              <ArrowLeft
                className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {/* شبكة البطاقات */}
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {whyUs.map((w, idx) => (
            <div
              key={idx}
              className="group relative flex min-h-[200px] flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition-colors duration-200 hover:border-neutral-950"
            >
              {/* رقم تسلسلي */}
              <span
                dir="ltr"
                className="absolute top-5 end-6 text-4xl font-extrabold tracking-tight text-neutral-100 transition-colors duration-200 group-hover:text-neutral-200"
              >
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="relative grid h-11 w-11 place-items-center rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-800 transition-colors duration-200 group-hover:border-neutral-950 group-hover:bg-neutral-950 group-hover:text-white">
                <w.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              </div>

              <div className="relative mt-6">
                <h3 className="text-base font-bold text-neutral-950">{w.title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-neutral-600">
                  {w.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}