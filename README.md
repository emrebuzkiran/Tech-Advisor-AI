# Tech Stack Advisor AI 🚀

Tech Stack Advisor AI, yapay zeka destekli teknoloji yığını önerme platformudur. Projeleriniz için en uygun teknolojileri seçmenize yardımcı olur.

## 🌟 Özellikler

- 🤖 Yapay zeka destekli teknoloji önerileri
- 📊 Detaylı proje analizi
- 📈 Performans değerlendirmesi
- 🔒 Güvenli kullanıcı kimlik doğrulama
- 💳 Stripe ile abonelik sistemi (tamamlanmamış)

## 🛠️ Teknolojiler

- **Frontend:**
  - React
  - TypeScript
  - Tailwind CSS
  - React Router
  - Zustand (State Management)

- **Kimlik Doğrulama:**
  - Supabase Authentication

- **Ödeme Sistemi:**
  - Stripe

## 🚀 Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/kullaniciadi/tech-stack-advisor.git
cd tech-stack-advisor
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Gerekli ortam değişkenlerini ayarlayın:
`.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. Uygulamayı başlatın:

```bash
npm run dev
```

## 📁 Proje Yapısı

```
src/
├── components/
│   ├── auth/
│   ├── home/
│   └── subscription/
├── store/
├── services/
└── utils/
```

## 🔑 Kullanıcı Rolleri

- **Ücretsiz Kullanıcı:**
  - Aylık 5 teknoloji önerisi
  - Temel AI analizi
  - Basit öneriler

- **Premium Kullanıcı:**
  - Sınırsız teknoloji önerisi
  - Gelişmiş AI analizi
  - Detaylı içgörüler
  - Öncelikli destek
  - Raporları dışa aktarma

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim


- Email: emrebuzkiran59@gmail.com


## 🙏 Teşekkürler

Bu projeyi geliştirmemize yardımcı olan tüm katkıda bulunanlara teşekkür ederiz.

---

⭐️ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! 