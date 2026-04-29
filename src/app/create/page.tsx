"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";
import { CATEGORIES, PLATFORMS, TARGET_CUSTOMERS } from "@/types";
import { cn } from "@/lib/utils";

export default function CreatePage() {
  const router = useRouter();
  const { createProject } = useProjectStore();
  const [form, setForm] = useState({ productName: "", brandName: "", category: "", targetCustomer: "", platform: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  function handleNext() {
    const errs: Record<string, string> = {};
    if (!form.productName.trim()) errs.productName = "상품명을 입력해 주세요";
    if (!form.brandName.trim()) errs.brandName = "브랜드명을 입력해 주세요";
    if (!form.category) errs.category = "카테고리를 선택해 주세요";
    if (!form.targetCustomer) errs.targetCustomer = "타깃 고객을 선택해 주세요";
    if (!form.platform) errs.platform = "용도를 선택해 주세요";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const id = createProject({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...form });
    router.push(`/style?id=${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center gap-3">
        <Link href="/" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-4 h-4 text-gray-600" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-gray-900">jayoung</span>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold text-gray-400 tracking-widest">STEP 1 / 2</span>
            <div className="flex gap-1.5">
              <div className="w-10 h-1.5 bg-gray-900 rounded-full" />
              <div className="w-10 h-1.5 bg-gray-200 rounded-full" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">상품 정보 입력</h1>
          <p className="text-gray-500 mt-1 text-sm">어떤 상품의 상세페이지를 만들까요?</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-7 space-y-6">
          <Field label="상품명" error={errors.productName} required>
            <input type="text" value={form.productName} onChange={(e) => set("productName", e.target.value)}
              placeholder="예: 프리미엄 캐시미어 니트"
              className={cn("w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors", errors.productName ? "border-red-300" : "border-gray-200 focus:border-gray-900")} />
          </Field>

          <Field label="브랜드명" error={errors.brandName} required>
            <input type="text" value={form.brandName} onChange={(e) => set("brandName", e.target.value)}
              placeholder="예: 소프트무드"
              className={cn("w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors", errors.brandName ? "border-red-300" : "border-gray-200 focus:border-gray-900")} />
          </Field>

          <Field label="카테고리" error={errors.category} required>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => set("category", cat)}
                  className={cn("px-3 py-1.5 rounded-lg text-sm border transition-colors", form.category === cat ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400")}>
                  {cat}
                </button>
              ))}
            </div>
          </Field>

          <Field label="타깃 고객" error={errors.targetCustomer} required>
            <div className="flex flex-wrap gap-2">
              {TARGET_CUSTOMERS.map((t) => (
                <button key={t} onClick={() => set("targetCustomer", t)}
                  className={cn("px-3 py-1.5 rounded-lg text-sm border transition-colors", form.targetCustomer === t ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400")}>
                  {t}
                </button>
              ))}
            </div>
          </Field>

          <Field label="상세페이지 용도" error={errors.platform} required>
            <div className="flex flex-wrap gap-2">
              {PLATFORMS.map((p) => (
                <button key={p.value} onClick={() => set("platform", p.value)}
                  className={cn("px-3 py-1.5 rounded-lg text-sm border transition-colors", form.platform === p.value ? "bg-gray-900 text-white border-gray-900" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400")}>
                  {p.label}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={handleNext} className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
            다음: 디자인 스타일 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}

function Field({ label, error, required, children }: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}
