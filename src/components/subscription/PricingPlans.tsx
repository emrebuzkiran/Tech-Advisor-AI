import React from 'react';
import { CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuthStore } from '../../store/authStore';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic technology recommendations',
      'Limited AI analysis',
      '5 recommendations per month',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 5,
    features: [
      'Unlimited recommendations',
      'Advanced AI analysis',
      'Detailed insights and explanations',
      'Priority support',
      'Export recommendations',
    ],
    isPopular: true,
  },
];

export default function PricingPlans() {
  const { user } = useAuthStore();

  const handleSubscribe = async (planId: string) => {
    if (!user) return;
    
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Here you would typically make an API call to your backend to create a Stripe checkout session
      // For demo purposes, we'll just show an alert
      alert('Subscription system will be integrated with your backend!');
    } catch (error) {
      console.error('Subscription error:', error);
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                plan.isPopular ? 'border-2 border-blue-500' : ''
              }`}
            >
              <div className="p-6">
                {plan.isPopular && (
                  <span className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-blue-100 text-blue-600 mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <CheckCircle className="flex-shrink-0 w-6 h-6 text-green-500" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`mt-8 w-full py-3 px-6 rounded-md shadow-sm text-center text-sm font-medium ${
                    plan.isPopular
                      ? 'text-white bg-blue-600 hover:bg-blue-700'
                      : 'text-blue-600 bg-white hover:bg-gray-50 border border-blue-600'
                  }`}
                >
                  {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}