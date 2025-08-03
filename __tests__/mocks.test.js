// @ts-check

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getExchangeRate } from '../src/libs/currency';
import { getPriceInCurrency, getShippingInfo, login, renderPage, signUp, submitOrder } from '../src/mocking';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';
import { sendEmail } from '../src/libs/email';
import security from '../src/libs/security';

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

vi.mock('../src/libs/analytics.js')

// Interaction Test
describe('renderPage', () => {
    it('should return correct content', async () => {
        const result = await renderPage();

        expect(result).toMatch(/content/i);
    });

    it('should call analytics', async () => {
        await renderPage();

        expect(trackPageView).toHaveBeenCalledWith('/home');
    });
});

vi.mock("../src/libs/payment.js")

describe('submitOrder', () => {
    const order = { totalAmount: 10 };
    const creditCard = { creditCardNumber: '1234' };

    it('should charge the customer', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'success' });

        await submitOrder(order, creditCard);

        expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
    });

    it('should return success: true when payment is successful', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'success' });

        const result = await submitOrder(order, creditCard);

        expect(result).toEqual({ success: true });
    });

    it('should return success: false when payment is failed', async () => {
        vi.mocked(charge).mockResolvedValue({ status: 'failed' });

        const result = await submitOrder(order, creditCard);

        expect(result).toEqual({ success: false, error: 'payment_error' });
    });
});

// ! Partial mocking

vi.mock('../src/libs/email.js', async (importOriginal) => {
    const original = /** @type {Record<String, unknown>} */ (await importOriginal());

    return {
        ...original, sendEmail: vi.fn()
    }
});

describe('signUp', () => {
    const email = 'name@domain.com';

    // Can be configured through config:
    // beforeEach(() => {
    //     // vi.mocked(sendEmail).mockClear();
    //     // or
    //     vi.clearAllMocks();
    // });

    it('should return false if email is not valid', async () => {
        const result = await signUp('a');

        expect(result).toBe(false);
    });

    it('should return true if email is valid', async () => {
        const result = await signUp(email);

        expect(result).toBe(true);
    });

    it('should send the welcome email if email is valid', async () => {
        await signUp(email);

        expect(sendEmail).toHaveBeenCalledOnce();
        const args = vi.mocked(sendEmail).mock.calls[0];
        expect(args[0]).toBe(email);
        expect(args[1]).toMatch(/welcome/i);
    });
});

describe('login', () => {
    it('should email the one-time login code', async () => {
        const email = 'name@domain.com';
        const spy = vi.spyOn(security, 'generateCode');

        await login(email);

        const securityCode = spy.mock.results[0].value.toString();
        expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
    });
});