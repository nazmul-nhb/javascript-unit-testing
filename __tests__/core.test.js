// @ts-check

import { describe, expect, it } from "vitest";
import { calculateDiscount, getCoupons } from "../src/core";


describe("getCoupons", () => {
    const coupons = getCoupons();

    it('should be an array', () => {
        expect(Array.isArray(coupons)).toBeTruthy()
    })

    it('should not be an empty array', () => {
        expect(coupons.length).toBeGreaterThan(0)
    });


    it('should have properties "code" and "discount"', () => {
        coupons.forEach(coupon => {
            expect(coupon).toHaveProperty("code")
            expect(coupon).toHaveProperty("discount")
        })
    });

    it('typeof "code" should be string and "discount" should be number and between 0 and 1', () => {
        coupons.forEach(coupon => {
            expect(typeof coupon.code).toBe("string");
            expect(coupon.code).toBeTruthy();
            expect(typeof coupon.discount).toBe("number");
            expect(coupon.discount).toBeGreaterThanOrEqual(0);
            expect(coupon.discount).toBeLessThanOrEqual(1);
        })
    });


});

describe('calculateDiscount', () => {
    it('should return 9 after applying "SAVE10" coupon', () => {
        expect(calculateDiscount(10, 'SAVE10')).toBe(9)
    });

    it('should return 8 after applying "SAVE20" coupon', () => {
        expect(calculateDiscount(10, 'SAVE20')).toBe(8)
    });

    it('should handle non-numeric price', () => {
        expect(calculateDiscount("10", 'SAVE10')).toMatch(/invalid/i)
    });

    it('should handle negative price', () => {
        expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i)
    });

    it('should handle non-string discount', () => {
        expect(calculateDiscount(10, 100)).toMatch(/invalid/i)
    });

    it('should handle invalid discount', () => {
        expect(calculateDiscount(10, 'XYZ')).toBe(10)
    });
})