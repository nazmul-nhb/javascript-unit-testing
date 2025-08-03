// @ts-check

import { describe, expect, it, vi } from 'vitest';
import { getExchangeRate } from '../src/libs/currency';
import { getPriceInCurrency, getShippingInfo } from '../src/mocking';
import { getShippingQuote } from '../src/libs/shipping';

// vi.fn();
// mockReturnValue
// mockResolvedValue
// mockImplementation

describe('mock mock test', () => {
    it('test case', () => {
        // Create a mock for the following function
        const sendText = vi.fn();
        sendText.mockReturnValue('ok');

        // Call the mock function
        const result = sendText('message');

        // Assert that the mock function is called
        expect(sendText).toHaveBeenCalledWith('message');
        // Assert that the result is 'ok'
        expect(result).toBe('ok');
    });
});

vi.mock('../src/libs/currency');

describe('getPriceInCurrency', () => {
    it('should return price in target currency', () => {
        vi.mocked(getExchangeRate).mockReturnValue(1.5);

        const price = getPriceInCurrency(10, 'AUD');

        expect(price).toBe(15);
    });
});

vi.mock('../src/libs/shipping.js')

describe('getShippingInfo', () => {
    it('should return shipping unavailable if quote cannot be fetched', () => {
        // @ts-expect-error
        vi.mocked(getShippingQuote).mockReturnValue(null);

        const result = getShippingInfo('London');

        expect(result).toMatch(/unavailable/i);
    });

    it('should return shipping info if quote can be fetched', () => {
        vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });

        const result = getShippingInfo('London');

        expect(result).toMatch('$10');
        expect(result).toMatch(/2 days/i);
        expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
    });
});