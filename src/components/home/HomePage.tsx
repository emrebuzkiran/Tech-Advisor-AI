import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code2, Brain, Zap, Database } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Akıllı Teknoloji Önerileri",
      description: "Yapay zeka destekli sistemimiz, projenize en uygun teknoloji yığınını önerir."
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Kod Analizi",
      description: "Mevcut kodunuzu analiz ederek iyileştirme önerileri sunar."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Hızlı Entegrasyon",
      description: "Önerilen teknolojileri projenize hızlıca entegre etmeniz için rehberlik eder."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Detaylı Raporlama",
      description: "Teknoloji seçimlerinizin etkisini ölçen detaylı raporlar sunar."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Aktif Kullanıcı" },
    { number: "50,000+", label: "Analiz Edilen Proje" },
    { number: "98%", label: "Müşteri Memnuniyeti" },
    { number: "24/7", label: "Destek" }
  ];

  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "Senior Developer",
      company: "Tech Co.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      quote: "Bu platform sayesinde projelerimiz için en uygun teknoloji seçimlerini yapabiliyoruz."
    },
    {
      name: "Ayşe Kaya",
      role: "CTO",
      company: "Startup Inc.",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      quote: "Yapay zeka destekli öneriler, karar verme sürecimizi önemli ölçüde hızlandırdı."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Teknoloji Seçimlerinizi Akıllandırın
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Yapay zeka destekli platformumuz ile projeniz için en uygun teknolojileri keşfedin
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Hemen Başlayın
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Özelliklerimiz</h2>
            <p className="mt-4 text-xl text-gray-600">
              Size en iyi hizmeti sunmak için geliştirdiğimiz özellikler
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Kullanıcılarımız Ne Diyor?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Hemen Başlayın</h2>
          <button
            onClick={() => navigate('/pricing')}
            className="bg-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
          >
            Planları İncele
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 