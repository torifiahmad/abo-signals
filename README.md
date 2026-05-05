# Abo AlShabab Signals

## نشر الموقع على Vercel (مجاناً)

### الخطوات:

**1. إنشاء حساب Vercel**
- اذهب إلى: https://vercel.com/signup
- سجّل دخول بحساب GitHub (أو أي طريقة)

**2. رفع المشروع**
- اضغط "Add New Project"
- اختر "Upload" وارفع مجلد المشروع كاملاً (هذا المجلد)

**3. إضافة API Key**
- بعد الرفع، اذهب إلى: Settings → Environment Variables
- أضف متغير جديد:
  - Name:  `ANTHROPIC_API_KEY`
  - Value: مفتاح API من https://console.anthropic.com

**4. Deploy**
- اضغط Deploy — سيعطيك رابط مثل: `https://abo-signals.vercel.app`
- افتح الرابط من أي جهاز أو موبايل ✅

---

## هيكل المشروع

```
abo-signals/
├── api/
│   └── analyze.js      ← Backend proxy (يخفي API key)
├── public/
│   └── index.html      ← الموقع الكامل
└── vercel.json         ← إعدادات Vercel
```

## الحصول على Anthropic API Key
1. اذهب إلى: https://console.anthropic.com
2. سجّل حساب مجاني
3. API Keys → Create Key
4. انسخ المفتاح وضعه في Vercel كما في الخطوة 3
