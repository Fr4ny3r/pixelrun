export const GAME_COSTS = {
  CLICK_RISK: 10,
  DOUBLE: 2,
} as const;

export const REWARDS = {
  AD_WATCHED: 1,
  DAILY_BONUS: 10,
  LEVEL_UP: 5,
  CLICK_RISK_WIN: 5,
  DOUBLE_WIN: 8,
} as const;

export type GameType = keyof typeof GAME_COSTS;
export type RewardType = keyof typeof REWARDS;
