import Pristine from "../src/Pristine";
import { PristineConfig, PristineInputElement, ValidatorConfig } from "../src/types";
import { defaultValidators } from '../src/validators';

const config = {
    classTo: 'form-group',
    errorClass: 'pristine-error.text-help',
    successClass: 'has-success',
    errorTextParent: 'form-group',
    errorTextTag: 'div',
    errorTextClass: 'text-help'
}

describe('Pristine', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div class="form1Container">
                <form id="form1">
                    <div class="form-group">
                        <input type="text" name="test1"/>
                    </div>

                    <div class="form-group">
                        <input type="email" name="test2" data-pristine-required/>
                    </div>

                    <div class="form-group">
                        <input type="tel" name="test3" />
                    </div>

                    <div class="form-group">
                        <select name="test4" data-pristine-required>
                            <option diabled selected value="">Please select an option</option>
                            <option value="1">abc</option>
                            <option value="2">bcd</option>
                            <option value="3">cde</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <input type="checkbox" name="test5" value="1" id="checkbox1"/>
                        <input type="checkbox" name="test5" value="2"/>
                        <input type="checkbox" name="test5" value="3"/>
                        <input type="checkbox" name="test5" value="4"/>
                    </div>

                    <div class="form-group">
                        <input type="radio" name="test6" value="1" id="radio1"/>
                        <input type="radio" name="test6" value="2"/>
                        <input type="radio" name="test6" value="3"/>
                        <input type="radio" name="test6" value="4"/>
                    </div>

                    <div class="form-group">
                        <textarea name="test7">hello</textarea>
                    </div>
                </form>
            </div>

            <div class="form2Container">
                <form id="form2">
                    <input type="checkbox" name="test2" value="1" id="checkbox1"/>
                    <input type="checkbox" name="test2" value="2"/>
                    <input type="checkbox" name="test2" value="3"/>
                    <input type="checkbox" name="test2" value="4"/>
                </form>
            </div>
        `;
    });

    describe('constructor', () => {
        test('it should return a new Pristine instance', () => {
            const form = document.getElementById('form1') as HTMLFormElement;
            const pf = new Pristine(form, config, true);

            expect(pf.form).toBe(form);
            expect(pf.config).toEqual(config);
            expect(pf.live).toBe(true);
        });

        test('it should return a new Pristine instance with the overridden config without affecting global defaults', () => {
            const customConfig = {
                classTo: 'form-group-custom',
                errorClass: 'has-danger-custom',
                successClass: 'has-success-custom',
                errorTextParent: 'form-group-custom',
                errorTextTag: 'span',
                errorTextClass: 'text-help-custom'
            }

            const form1 = document.getElementById('form1') as HTMLFormElement;
            const p1 = new Pristine(form1, customConfig, true);

            expect(p1 instanceof Pristine);
            expect(p1.config).toEqual(customConfig);
            expect(p1.live).toBe(true);

            // Check that global config is not affected
            const form2 = document.getElementById('form2') as HTMLFormElement;
            const p2 = new Pristine(form2);

            expect(p2 instanceof Pristine);
            expect(p2.config).toEqual({
                classTo: 'form-group',
                errorClass: 'has-danger',
                successClass: 'has-success',
                errorTextParent: 'form-group',
                errorTextTag: 'div',
                errorTextClass: 'text-help'
            });
            expect(p2.live).toBe(false);
        });
    });

    describe('static addValidator', () => {
        test('it should add a validator to the global validators', () => {
            // Check default values for optional parameters work
            const testFunc1 = () => {};
            Pristine.addValidator('test', testFunc1);

            const testValidator1 = defaultValidators['test'];
            expect(typeof testValidator1).toBe('object');
            expect(testValidator1.name).toBe('test');
            expect(testValidator1.fn).toBe(testFunc1);
            expect(testValidator1.msg).toBe('This field is invalid');
            expect(testValidator1.priority).toBe(1);
            expect(testValidator1.halt).toBe(false);

            // Check overriding optional parameters work
            const testFunc2 = () => {};
            Pristine.addValidator('test2', testFunc2, 'hello', 7, true);

            const testValidator2 = defaultValidators['test2'];
            expect(typeof testValidator2).toBe('object');
            expect(testValidator2.name).toBe('test2');
            expect(testValidator2.fn).toBe(testFunc2);
            expect(testValidator2.msg).toBe('hello');
            expect(testValidator2.priority).toBe(7);
            expect(testValidator2.halt).toBe(true);
        });
    });

    describe('static setGlobalConfig', () => {
        test('it should change the global default config', () => {
            const customConfig: PristineConfig = {
                classTo: 'form-group-custom',
                errorClass: 'has-danger-custom',
                successClass: 'has-success-custom',
                errorTextParent: 'form-group-custom',
                errorTextTag: 'span',
                errorTextClass: 'text-help-custom'
            };

            const form1 = document.getElementById('form1') as HTMLFormElement;
            Pristine.setGlobalConfig(customConfig);
            const p1 = new Pristine(form1);

            expect(p1 instanceof Pristine);
            expect(p1.config).toEqual(customConfig);
            expect(p1.live).toBe(false);
        });
    });

    describe('addError', () => {
        test('it should add and show the error message on the given field', () => {
            let errors = document.querySelectorAll('.pristine-error.text-help');
            const input = document.querySelector('input[name="test1"]') as PristineInputElement;

            const form = document.getElementById('form1') as HTMLFormElement;
            const pf = new Pristine(form, config, true);

            expect(errors.length).toBe(0);

            // Test that an error message is created and displayed
            pf.addError(input, 'Test error message');
            errors = document.querySelectorAll('.pristine-error.text-help');
            expect(errors.length).toBe(1);

            // Test that the error displays the correct message
            const error = document.querySelector('.pristine-error.text-help') as HTMLDivElement;
            expect(error.tagName).toBe('DIV');
            expect(error.textContent.trim()).toBe('Test error message');
        });

        test('it should log an error to console if the field is not part of the form', () => {
            console.error = jest.fn();
            const input = document.querySelector('input[name="test1"]') as PristineInputElement;
            const form = document.getElementById('form1') as HTMLFormElement;

            // Move input outside of form, so that pristine shouldn't touch it
            document.body.appendChild(input);

            const pf = new Pristine(form, config, true);

            // Test that an error message is not created and displayed
            pf.addError(input, 'Test error message');
            const errors = document.querySelectorAll('.pristine-error.text-help');
            expect(errors.length).toBe(0);

            // Test that an error message was put into the console
            expect(console.error).toHaveBeenCalledTimes(1);
            expect(console.error).toHaveBeenCalledWith('The given element is not part of a Pristine validated form', input);
        });
    });

    describe('addValidator', () => {
        test('it should add the custom validator to the field without adding a global validator', () => {
            const input = document.querySelector('input[name="test1"]') as PristineInputElement;
            const form = document.getElementById('form1') as HTMLFormElement;
            const oldDefaultCount = Object.keys(defaultValidators).length;
            const pf = new Pristine(form, config, true);
            const validator = {
                name: 'custom',
                fn: () => {},
                msg: 'Test error message',
                priority: 1,
                halt: false
            } as ValidatorConfig;

            pf.addValidator(input, validator.fn, validator.msg as string);
            expect(input.pristineInput.validators.length).toBe(2);
            expect(input.pristineInput.validators[1]).toEqual(validator);

            // Check global validators have not changed
            expect(typeof defaultValidators['custom']).toBe('undefined');
            expect(Object.keys(defaultValidators).length).toBe(oldDefaultCount);
        });

        test('it should log an error to console if the field is not part of the form', () => {
            const input = document.querySelector('input[name="test1"]') as PristineInputElement;
            document.body.appendChild(input); // Move input outside of form, so that pristine shouldn't touch it
            const form = document.getElementById('form1') as HTMLFormElement;
            const pf = new Pristine(form, config, true);
            const validator = {
                name: 'custom',
                fn: () => {},
                msg: 'Test error message',
                priority: 1,
                halt: false
            } as ValidatorConfig;

            console.error = jest.fn();
            pf.addValidator(input, validator.fn, validator.msg as string);
            expect(typeof input.pristineInput).toBe('undefined');

            // Test that an error message was put into the console
            expect(console.error).toHaveBeenCalledTimes(1);
            expect(console.error).toHaveBeenCalledWith('The given element is not part of a Pristine validated form', input);
        });
    });

    describe('destroy', () => {
        test('it should leave the form the way it was before the pristine instance was created', () => {
            const form = document.getElementById('form1') as HTMLFormElement;
            const input = document.querySelector('input[name="test1"]') as PristineInputElement;
            const oldStructure = form.outerHTML;
            const pf = new Pristine(form, config, true);

            pf.addError(input, 'test');
            expect(form.outerHTML).not.toBe(oldStructure);
            pf.destroy();
            expect(form.outerHTML).toBe(oldStructure);
        });
    });

    describe('getErrors', () => {
        test('it should return an array of objects when called without a parameter', () => {
            const form = document.getElementById('form1') as HTMLFormElement;
            const input1 = document.querySelector('input[name="test1"]') as PristineInputElement;
            const input2 = document.querySelector('input[name="test5"]') as PristineInputElement;
            const pf = new Pristine(form, config, true);

            pf.addError(input1, 'Test error 1');
            pf.addError(input2, 'Test error 2');

            expect(pf.getErrors()).toEqual([
                {
                    input: input1,
                    errors: ['Test error 1']
                },
                {
                    input: input2,
                    errors: ['Test error 2']
                }
            ]);
        });

        test('it should return an array of error messages when a particular field is passed', () => {
            const form = document.getElementById('form1') as HTMLFormElement;
            const input = document.querySelector('input[name="test1"]') as PristineInputElement;
            const pf = new Pristine(form, config, true);

            pf.addError(input, 'Test error 1');
            expect(pf.getErrors(input)).toEqual(['Test error 1']);
        });

        test('it should log an error to console if the field is not part of the form', () => {
            console.error = jest.fn();
            const input = document.querySelector('input[name="test1"]') as PristineInputElement;
            const form = document.getElementById('form1') as HTMLFormElement;

            // Move input outside of form, so that pristine shouldn't touch it
            document.body.appendChild(input);

            const pf = new Pristine(form, config, true);

            // Test that an error message was put into the console
            pf.getErrors(input)
            expect(console.error).toHaveBeenCalledTimes(1);
            expect(console.error).toHaveBeenCalledWith('The given element is not part of a Pristine validated form', input);
        });
    });

    describe('reset', () => {
        test('it should remove all error messages', () => {
            const form = document.getElementById('form1') as HTMLFormElement;
            const input = document.querySelector('input[name="test1"]') as PristineInputElement;
            const pf = new Pristine(form, config, true);
            const oldStructure = form.outerHTML;

            pf.addError(input, 'test');
            expect(form.outerHTML).not.toBe(oldStructure);
            pf.reset();
            expect(form.outerHTML).toBe(oldStructure);
        });
    });

    describe('validate', () => {
        test('it should validate only the fields that are passed in', () => {
            const input = document.querySelector('input[name="test2"]') as PristineInputElement;
            const form = document.getElementById('form1') as HTMLFormElement;
            const pf = new Pristine(form, config, true);

            // Check we have no errors
            let errors = document.querySelectorAll('.pristine-error.text-help');
            expect(errors.length).toBe(0);

            // Make email field invalid, validate, then check error count
            input.value = '123';
            pf.validate(input);
            errors = document.querySelectorAll('.pristine-error.text-help');
            expect(errors.length).toBe(1);
        });

        test('it should validate all fields of the form if no fields are passed in', () => {
            const form = document.getElementById('form1') as HTMLFormElement;
            const pf = new Pristine(form, config, true);

            // Check we have no errors
            let errors = document.querySelectorAll('.pristine-error.text-help');
            expect(errors.length).toBe(0);

            pf.validate();
            errors = document.querySelectorAll('.pristine-error.text-help');
            expect(errors.length).toBe(2);
        });

        test('it should log an error message to the console for every field passed in that is not part of a pristine form', () => {
            console.error = jest.fn();
            const input = document.querySelector('input[name="test1"]') as PristineInputElement;
            const form = document.getElementById('form1') as HTMLFormElement;
            const container = document.querySelector('.form1Container');

            // Move input outside of form, so that pristine shouldn't touch it
            container.appendChild(input);

            const pf = new Pristine(form, config, true);

            // Test that an error message is not created and displayed
            pf.validate(Array.from(container.querySelectorAll('input, select, textarea')));
            const errors = container.querySelectorAll('.pristine-error.text-help');
            expect(errors.length).toBe(2);

            // Test that an error message was put into the console
            expect(console.error).toHaveBeenCalledTimes(1);
            expect(console.error).toHaveBeenCalledWith('The given element is not part of a Pristine validated form', input);
        });

        test('it should not highlight fields as invalid if silent is true', () => {
            const form = document.getElementById('form1') as HTMLFormElement;
            const pf = new Pristine(form, config, true);

            // Check we have no errors
            let errors = document.querySelectorAll('.pristine-error.text-help');
            expect(errors.length).toBe(0);

            pf.validate(undefined, true);
            errors = document.querySelectorAll('.pristine-error.text-help');
            expect(errors.length).toBe(0);
        });

        test('it should return false if one or more of the fields are invalid', () => {
            const form = document.getElementById('form1') as HTMLFormElement;
            const pf = new Pristine(form, config, true);
            expect(pf.validate()).toBe(false);
        });

        test('it should return true if all of the fields are valid', () => {
            const form = document.getElementById('form1') as HTMLFormElement;
            const pf = new Pristine(form, config, true);
            expect(pf.validate()).toBe(false);

            const input2 = document.querySelector('[name="test2"]') as HTMLInputElement;
            input2.value = "test@test.com";

            const input4 = document.querySelector('[name="test4"]') as HTMLInputElement;
            input4.value = "2";

            expect(pf.validate()).toBe(true);
        });
    });
})