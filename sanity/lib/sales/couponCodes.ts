export const COUPON_CODES = {
  BLACKFRIDAY: "BLACKFRIDAY",
  EID: "EID2024",
  RAMZAN: "RAMZAN2024",
  NEWYEAR: "NEWYEAR2025", // New coupon code added
} as const;

export type CouponCode = keyof typeof COUPON_CODES;
