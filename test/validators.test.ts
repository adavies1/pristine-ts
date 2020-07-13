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

    describe('min', () => {
        describe('For text inputs', () => {
            test('it should return true when a value is not present', () => {
                expect(validators.min('', '100')).toBe(true);
            });

            test('it should return false when an invalid number is passed', () => {
                expect(validators.min('a12345', '-1000000')).toBe(false);
                expect(validators.min('0ikj', '-1000000')).toBe(false);
                expect(validators.min('-1234b5', '-1000000')).toBe(false);
                expect(validators.min('123.45,', '-1000000')).toBe(false);
                expect(validators.min('.', '-1000000')).toBe(false);
                expect(validators.min('0.0000.', '-1000000')).toBe(false);
                expect(validators.min('-123.45p', '-1000000')).toBe(false);
                expect(validators.min('+123.4', '-1000000')).toBe(false);
            });

            test('it should return false when a valid number below the given min value is passed', () => {
                expect(validators.min('123456', '1000000')).toBe(false);
                expect(validators.min('0', '1000')).toBe(false);
                expect(validators.min('-123456', '1000')).toBe(false);
                expect(validators.min('123.456', '1000')).toBe(false);
                expect(validators.min('0.00000', '1000')).toBe(false);
                expect(validators.min('-123.456', '1000')).toBe(false);
            });

            test('it should return true when a valid number above the given min value is passed', () => {
                expect(validators.min('123456', '-1000')).toBe(true);
                expect(validators.min('0', '-1000')).toBe(true);
                expect(validators.min('-123456', '-1000000')).toBe(true);
                expect(validators.min('123.456', '-1000')).toBe(true);
                expect(validators.min('0.00000', '-1000')).toBe(true);
                expect(validators.min('-123.456', '-1000')).toBe(true);
            });
        });

        describe('For checkbox inputs', () => {
            test('it should return true if the checkbox has no name', () => {
                document.body.innerHTML = `
                    <form id="form">
                        <input id="checkbox1" type="checkbox" value="1"/>
                        <input type="checkbox" value="2"/>
                        <input type="checkbox" value="3"/>
                        <input type="checkbox" value="4"/>
                    </form>
                `;

                const form = document.getElementById('form');
                const input = document.getElementById('checkbox1');
                // @ts-ignore
                input.pristine = { form };

                expect(validators.min.apply(input, ['notused', '5'])).toBe(true);
            });

            test('it should return false if there are fewer checkboxes selected than the given min value', () => {
                document.body.innerHTML = `
                    <form id="form">
                        <input id="checkbox1" name="test" type="checkbox" value="1"/>
                        <input type="checkbox" name="test" value="2"/>
                        <input type="checkbox" name="test" value="3"/>
                        <input type="checkbox" name="test" value="4"/>
                    </form>
                `;

                const form = document.getElementById('form');
                const input = document.getElementById('checkbox1');
                // @ts-ignore
                input.pristine = { form };

                const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];
                checkboxes.forEach(cb => { cb.checked = true; });
                expect(validators.min.apply(input, ['notused', '5'])).toBe(false);
            });

            test('it should return true if there are the same amount of checkboxes selected as the given min value', () => {
                document.body.innerHTML = `
                    <form id="form">
                        <input id="checkbox1" name="test" type="checkbox" value="1"/>
                        <input type="checkbox" name="test" value="2"/>
                        <input type="checkbox" name="test" value="3"/>
                        <input type="checkbox" name="test" value="4"/>
                    </form>
                `;

                const form = document.getElementById('form');
                const input = document.getElementById('checkbox1');
                // @ts-ignore
                input.pristine = { form };

                const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];
                checkboxes.forEach(cb => { cb.checked = true; });
                expect(validators.min.apply(input, ['notused', '4'])).toBe(true);
            });

            test('it should return true if there are more checkboxes selected than the given min value', () => {
                document.body.innerHTML = `
                    <form id="form">
                        <input id="checkbox1" name="test" type="checkbox" value="1"/>
                        <input type="checkbox" name="test" value="2"/>
                        <input type="checkbox" name="test" value="3"/>
                        <input type="checkbox" name="test" value="4"/>
                    </form>
                `;

                const form = document.getElementById('form');
                const input = document.getElementById('checkbox1');
                // @ts-ignore
                input.pristine = { form };

                const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')) as HTMLInputElement[];
                checkboxes.forEach(cb => { cb.checked = true; });
                expect(validators.min.apply(input, ['notused', '3'])).toBe(true);
            });
        });
    });
});