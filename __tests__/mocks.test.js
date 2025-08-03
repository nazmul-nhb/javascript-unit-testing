import { describe, expect, it, vi } from 'vitest';

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