import * as validators from '../src/validators';

describe('Validators', () => {
    describe('text', () => {
        test('it should always return true', () => {
            expect(validators.text('')).toBe(true);
            expect(validators.text('123')).toBe(true);
            expect(validators.text('123 456 abc def')).toBe(true);
        });
    });

    describe('required', () => {
        test('it should return true when a value is present', () => {
            expect(validators.required('123')).toBe(true);
            expect(validators.required('123 456 abc def')).toBe(true);
        });

        test('it should return false if a value is not present', () => {
            expect(validators.required('')).toBe(false);
        });
    });
});