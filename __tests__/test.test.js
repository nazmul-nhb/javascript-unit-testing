// @ts-check

import { describe, expect, it } from 'vitest';

describe('test non-primitives', () => {
	const res = { name: 'NHB' };

	it('test object', () => {
		expect(res).toEqual({ name: 'NHB' });
	});

	it('test object matcher', () => {
		expect(res).toMatchObject({ name: 'NHB' });
	});

	it('test object property matcher', () => {
		expect(res).toHaveProperty('name');
	});
});

describe('good assertions', () => {
	const res = 'Hello there...';

	it('too general', () => {
		// Loose (too general)
		// Not Valuable
		expect(res).toBeDefined();
	});

	it('too specific', () => {
		// Tight (too specific)
		// Not Valuable
		expect(res).toBe('Hello there...');
	});

	it('better assertion', () => {
		// Better assertion
		expect(res).toMatch(/[aA-zZ]/);
	});
});
