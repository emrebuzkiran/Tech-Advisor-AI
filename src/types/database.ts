export interface Profile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan_id: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface UsageLimit {
  id: string;
  user_id: string;
  monthly_recommendations_count: number;
  last_reset_date: string;
}

export interface StoredRecommendation {
  id: string;
  user_id: string;
  project_requirements: Record<string, any>;
  recommendations: Record<string, any>;
  created_at: string;
}