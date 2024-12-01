import { supabase } from '../config/supabase';
import { Subscription, UsageLimit } from '../types/database';

export async function checkUserSubscription(userId: string): Promise<boolean> {
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  return !!subscription;
}

export async function checkUserUsageLimit(userId: string): Promise<boolean> {
  const { data: usageLimit } = await supabase
    .from('usage_limits')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (!usageLimit) return false;

  // Reset counter if it's a new month
  const lastReset = new Date(usageLimit.last_reset_date);
  const now = new Date();
  if (lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {
    await supabase
      .from('usage_limits')
      .update({
        monthly_recommendations_count: 0,
        last_reset_date: now.toISOString()
      })
      .eq('user_id', userId);
    return true;
  }

  // Check if user has reached the limit
  const isPremium = await checkUserSubscription(userId);
  const monthlyLimit = isPremium ? Infinity : 5;
  
  return usageLimit.monthly_recommendations_count < monthlyLimit;
}

export async function incrementUsageCount(userId: string): Promise<void> {
  await supabase.rpc('increment_usage_count', { user_id: userId });
}