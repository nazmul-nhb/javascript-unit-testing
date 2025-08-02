// @ts-check

import { describe, expect, it } from "vitest";
import { calculateDiscount, canDrive, fetchData, getCoupons, isPriceInRange } from "../src/core";


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
});

// Data driven/Parameterized test
describe('canDrive', () => {
    it('should return error for invalid country code', () => {
        expect(canDrive(20, 'FR')).toMatch(/invalid/i);
    });

    const cases = [
        { age: 15, country: 'US', result: false },
        { age: 16, country: 'US', result: true },
        { age: 17, country: 'US', result: true },
        { age: 16, country: 'UK', result: false },
        { age: 17, country: 'UK', result: true },
        { age: 18, country: 'UK', result: true }
    ];

    it.each(cases)('should return $result for $age, $country', ({ age, country, result }) => {
        expect(canDrive(age, country)).toBe(result);
    });
});

describe('isPriceInRange', () => {
    const cases = [
        { scenario: 'price < min', price: -10, result: false },
        { scenario: 'price = min', price: 0, result: true },
        {
            scenario: 'price between min and max',
            price: 50,
            result: true
        },
        { scenario: 'price = max', price: 100, result: true },
        { scenario: 'price > max', price: 200, result: false }
    ];

    it.each(cases)('should return $result when $scenario', ({ price, result }) => {
        expect(isPriceInRange(price, 0, 100)).toBe(result);
    });
});

// Test asynchronous functions
// Case: Rejected
describe('fetchData', () => {
    it('should return a promise that is rejected', async () => {
        try {
            await fetchData();
        } catch (error) {
            expect(error).toHaveProperty('reason');
            expect(error.reason).toMatch(/fail/i);
        }
    });
});

// Case: Resolved
describe('fetchData', async () => {
    const result = /** @type {number[]} */ (await fetchData());

    it('should return a promise that will resolve to an array of numbers', () => {
        expect(Array.isArray(result)).toBeTruthy();
    });

    it.each(result)('%s should be of type number', (element) => {
        expect(typeof element).toBe('number')
    });
});