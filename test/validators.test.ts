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

    describe('number', () => {
        test('it should return true when a value is not present', () => {
            expect(validators.number('')).toBe(true);
        });

        test('it should return true when a valid number is passed', () => {
            expect(validators.number('123456')).toBe(true);
            expect(validators.number('0')).toBe(true);
            expect(validators.number('-123456')).toBe(true);
            expect(validators.number('123.456')).toBe(true);
            expect(validators.number('0.00000')).toBe(true);
            expect(validators.number('-123.456')).toBe(true);
        });

        test('it should return false when an invalid number is passed', () => {
            expect(validators.number('a123456')).toBe(false);
            expect(validators.number('0ikjh')).toBe(false);
            expect(validators.number('-1234b56')).toBe(false);
            expect(validators.number('123.45,')).toBe(false);
            expect(validators.number('.')).toBe(false);
            expect(validators.number('0.0000.')).toBe(false);
            expect(validators.number('-123.45p')).toBe(false);
            expect(validators.number('+123.45')).toBe(false);
        });
    });

    describe('integer', () => {
        test('it should return true when a value is not present', () => {
            expect(validators.integer('')).toBe(true);
        });

        test('it should return true when a valid integer is passed', () => {
            expect(validators.integer('123456')).toBe(true);
            expect(validators.integer('0')).toBe(true);
            expect(validators.integer('-123456')).toBe(true);
        });

        test('it should return false when a valid decimal is passed', () => {
            expect(validators.integer('123.456')).toBe(false);
            expect(validators.integer('0.00000')).toBe(false);
            expect(validators.integer('-123.456')).toBe(false);
        });

        test('it should return false when an invalid number is passed', () => {
            expect(validators.integer('a123456')).toBe(false);
            expect(validators.integer('0ikjh')).toBe(false);
            expect(validators.integer('-1234b56')).toBe(false);
            expect(validators.integer('123.45,')).toBe(false);
            expect(validators.integer('.')).toBe(false);
            expect(validators.integer('0.0000.')).toBe(false);
            expect(validators.integer('-123.45p')).toBe(false);
            expect(validators.integer('+123.45')).toBe(false);
        });
    });

    describe('minlength', () => {
        test('it should return true when a value is not present', () => {
            expect(validators.minlength('', '6')).toBe(true);
        });

        test('it should return true if a string is longer than the given minlength', () => {
            expect(validators.minlength('hello', '4')).toBe(true);
        });

        test('it should return true if a string is the same length as the given minlength', () => {
            expect(validators.minlength('hello', '5')).toBe(true);
        });

        test('it should return false if a string is shorter than the given minlength', () => {
            expect(validators.minlength('hello', '6')).toBe(false);
        });
    });

    describe('maxlength', () => {
        test('it should return true when a value is not present', () => {
            expect(validators.maxlength('', '6')).toBe(true);
        });

        test('it should return true if a string is shorter than the given maxlength', () => {
            expect(validators.maxlength('hello', '6')).toBe(true);
        });

        test('it should return true if a string is the same length as the given maxlength', () => {
            expect(validators.maxlength('hello', '5')).toBe(true);
        });

        test('it should return false if a string is longer than the given maxlength', () => {
            expect(validators.maxlength('hello', '4')).toBe(false);
        });
    });
});