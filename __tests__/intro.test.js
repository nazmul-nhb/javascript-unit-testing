import { describe, expect, it } from "vitest";
import { fizzBuzz, max } from '../src/intro';

// "describe" is called "test suite";
// "it" or "test" is called "test case(s)";
describe('max', () => {
    // it/test - same [test cases]
    it('should return the 1st argument if it is greater', () => {
        // ! AAA
        // ? Arrange
        const a = 5;
        const b = 3;

        // ? Act
        const result = max(a, b);

        // ? Assert
        expect(result).toBe(a);


        // Simpler
        expect(max(5, 3)).toBe(5);
    });

    it('should return the 2nd argument if it is greater', () => {

        expect(max(3, 5)).toBe(5);
    });

    it('should return the 1st argument if it is greater', () => {

        expect(max(2, 2)).toBe(2);
    });
});

describe("fizzBuzz", () => {
    it("should return 'FizzBuzz' if number is divisible by 3 and 5", () => {
        expect(fizzBuzz(15)).toBe("FizzBuzz");
    });

    it("should return 'Fizz' if number is divisible by 3", () => {
        expect(fizzBuzz(9)).toBe("Fizz");
    });

    it("should return 'Buzz' if number is divisible by 5", () => {
        expect(fizzBuzz(20)).toBe("Buzz");
    });

    it("should return 'stringified argument' if number is divisible by neither 3 nor 5", () => {
        expect(fizzBuzz(16)).toBe("16");
    });
})