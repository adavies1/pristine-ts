import Pristine from '../src/Pristine';
import PristineForm from '../src/PristineForm';
import { defaultValidators } from '../src/validators';
import { PristineFormConfig } from '../src/types';

describe('Pristine', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="form1">
                <input type="checkbox" name="test1" value="1" id="checkbox1"/>
                <input type="checkbox" name="test1" value="2"/>
                <input type="checkbox" name="test1" value="3"/>
                <input type="checkbox" name="test1" value="4"/>
            </form>
            <form id="form2">
                <input type="checkbox" name="test2" value="1" id="checkbox1"/>
                <input type="checkbox" name="test2" value="2"/>
                <input type="checkbox" name="test2" value="3"/>
                <input type="checkbox" name="test2" value="4"/>
            </form>
        `;
    });

    describe('constructor', () => {
        test('it should return a new PristineForm instance with a default config', () => {
            const form = document.getElementById('form1') as HTMLFormElement;
            const p = new Pristine(form) as PristineForm;

            expect(p instanceof PristineForm);
            expect(p.config).toEqual({
                classTo: 'form-group',
                errorClass: 'has-danger',
                successClass: 'has-success',
                errorTextParent: 'form-group',
                errorTextTag: 'div',
                errorTextClass: 'text-help'
            });
            expect(p.live).toBe(false);
        });

        test('it should return a new PristineForm instance with the overridden config without affecting global defaults', () => {
            const customConfig = {
                classTo: 'form-group-custom',
                errorClass: 'has-danger-custom',
                successClass: 'has-success-custom',
                errorTextParent: 'form-group-custom',
                errorTextTag: 'span',
                errorTextClass: 'text-help-custom'
            }

            const form1 = document.getElementById('form1') as HTMLFormElement;
            const p1 = new Pristine(form1, customConfig, true) as PristineForm;

            expect(p1 instanceof PristineForm);
            expect(p1.config).toEqual(customConfig);
            expect(p1.live).toBe(true);

            // Check that global config is not affected
            const form2 = document.getElementById('form2') as HTMLFormElement;
            const p2 = new Pristine(form2) as PristineForm;

            expect(p2 instanceof PristineForm);
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

    describe('addValidator', () => {
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

    describe('setGlobalConfig', () => {
        test('it should change the global default config', () => {
            const customConfig: PristineFormConfig = {
                classTo: 'form-group-custom',
                errorClass: 'has-danger-custom',
                successClass: 'has-success-custom',
                errorTextParent: 'form-group-custom',
                errorTextTag: 'span',
                errorTextClass: 'text-help-custom'
            };

            const form1 = document.getElementById('form1') as HTMLFormElement;
            Pristine.setGlobalConfig(customConfig);
            const p1 = new Pristine(form1) as PristineForm;

            expect(p1 instanceof PristineForm);
            expect(p1.config).toEqual(customConfig);
            expect(p1.live).toBe(false);
        });
    });
});