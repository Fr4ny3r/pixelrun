// lib/rewards.ts
export const REWARDS : Record<RewardType, number> = {
  AD_WATCHED: 1,
  DAILY_BONUS: 10,
  LEVEL_UP: 5,
  PLAY_CHARGE: -2,
};

export type RewardType = keyof typeof REWARDS;