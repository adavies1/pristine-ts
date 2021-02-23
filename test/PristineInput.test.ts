import PristineInput from "../src/PristineInput";
import Pristine from "../src/Pristine";

const config = {
    classTo: 'form-group',
    errorClass: 'pristine-error.text-help',
    successClass: 'has-success',
    errorTextParent: 'form-group',
    errorTextTag: 'div',
    errorTextClass: 'text-help'
}

describe('PristineInput', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="form1">
                <div class="form-group">
                    <input type="text" name="test1"/>
                </div>

                <div class="form-group">
                    <input type="email" name="test2" id="test2" data-pristine-required/>
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
        `;
    });

    describe('constructor', () => {
        test('it should return a new PristineInput instance', () => {
            const input = document.getElementById('test2') as HTMLInputElement;
            const pf = {config} as Pristine;
            const pfi = new PristineInput(input, pf);

            expect(pfi instanceof PristineInput);
            expect(pfi.pristine).toBe(pf);
        });

        test('it should add pristine and pristineInput references onto the input DOM element', () => {

        });

        test('it should register all necessary validators for the given field', () => {

        });

        test('it should allow multiple comma-separated parameters to be passed to a validator', () => {
            // Special case - regex's can have commas, which creates a bug in original pristine!
        });

        test('it should add an event listener to the input if live is true', () => {

        });
    });

    describe('addError', () => {
        test('it should add an error message underneath the input element', () => {

        });

        test('it should allow adding multiple error messages underneath the input element', () => {

        });
    });

    describe('addValidator', () => {
        test('it should add the given validator to the field', () => {

        });
    })

    describe('destroy', () => {
        test('it should remove all error messages', () => {

        });

        test('it should remove success and error CSS classes', () => {

        });

        test('it should leave the input DOM element the same as it was before instantiation', () => {

        });
    })

    describe('errorTextElement getter', () => {
        test('it should create the _errorTextElement if it does not exist, and then return it', () => {

        });

        test('it should not re-create the _errorTextElement if it already exists', () => {

        });
    });

    describe('getErrors', () => {
        test('it should return an array of error strings', () => {

        });
    });

    describe('getInput', () => {
        test('it should return the input DOM element the instance is attached to', () => {

        });
    });

    describe('hasErrors', () => {
        test('it should return true if the field has errors', () => {

        });

        test('it should return false if the field does not have errors', () => {

        })
    });

    describe('removeError', () => {
        test('it should remove success and error CSS classes', () => {

        });

        test('it should remove all error messages and hide the _errorTextElement', () => {

        });

        test('it should destroy the _errorTextElement if destroyErrorTextElement is passed', () => {

        });

        test('it should not cause the _errorTextElement to be created if it does not already exist', () => {

        });
    });

    describe('showError', () => {
        test('it should add the error CSS class', () => {

        });

        test('it should show the error messages the field has', () => {

        });

        test('it should not show the _errorTextElement if the field does not have errors', () => {

        });
    });

    describe('showSuccess', () => {
        test('it should add the success CSS class', () => {

        });

        test('it should remove any error messages the field has', () => {

        });

        test('it should hide the _errorTextElement', () => {

        });
    });

    describe('validate', () => {
        test('it should run all validators against the input', () => {

        });

        test('it should store any validation errors the field has', () => {

        });

        test('it should run the error message function to generate an error message if the validator has one', () => {

        });

        test('it should correctly replace placeholder values in error message strings', () => {

        });

        test('it should stop running through the list of validators if the current one has halt set to true', () => {

        });

        test('it should return true if the field is valid', () => {

        });

        test('it should returen false if the field is invalid', () => {

        });

        test('it should show any error messages',() => {

        });

        test('it should not change any CSS classes', () => {

        });
    });
})