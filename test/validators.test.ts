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

    describe('email', () => {
        test('it should return true when a value is not present', () => {
            expect(validators.email('')).toBe(true);
        });

        test('it should return true when a valid email address is passed', () => {
            expect(validators.email('hello@gmail.com')).toBe(true);
            expect(validators.email('hello-there@gmail.com')).toBe(true);
            expect(validators.email('my.email@gmail.com')).toBe(true);
            expect(validators.email('my.email123@gmail.com')).toBe(true);
            expect(validators.email('£mail123!#$%&\'*+-/=?^_`{|}~hfghf@gmail.com')).toBe(true);
            expect(validators.email('email+label@gmail.net')).toBe(true);
        });

        test('it should return false when an invalid email address is passed', () => {
            expect(validators.email('hgdfhgdfhfhf')).toBe(false);
            expect(validators.email('frgdfg*&%%$££!"()')).toBe(false);
            expect(validators.email('hello@gmail')).toBe(false);
            expect(validators.email('my.email@gmail.com^')).toBe(false);
            expect(validators.email('email+label()@gmail.com')).toBe(false);
        });
    });
});