import * as validators from '../src/validators';

describe('Validators', () => {
    describe('text', () => {
        test('it should always return true', () => {
            expect(validators.text('')).toBe(true);
            expect(validators.text('123')).toBe(true);
            expect(validators.text('123 456 abc def')).toBe(true);
        });
    });
});