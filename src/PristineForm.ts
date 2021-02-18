import PristineFormInput from './PristineFormInput';
import { PristineFormConfig, PristineFormInputElement, ValidatorMessageFunction } from './types';
import { toArray } from './utils';

const NOT_PRISTINE_ELEMENT_MSG = 'The given element is not part of a Pristine validated form';
const SELECTOR = "input:not([type^=hidden]):not([type^=submit]), select, textarea";

export class PristineForm {
    form: HTMLElement;
    config: PristineFormConfig;
    live: boolean;
    oldNoValidateValue: string;
    fields: PristineFormInput[];

    constructor(form: HTMLElement, config: PristineFormConfig, live: boolean) {
        this.oldNoValidateValue = form.getAttribute('novalidate');
        form.setAttribute('novalidate', 'true');

        this.form = form;
        this.config = config;
        this.live = live;
        this.fields = ([...form.querySelectorAll(SELECTOR)] as HTMLInputElement[])
            .map(input => new PristineFormInput(input, this));
    }

    /***
     * Adds error to a specific field
     * @param input - input element to add the error message to (jQuery selectors accepted)
     * @param error - The error message to add
     */
    addError(input: HTMLElement | Iterable<HTMLElement>, error: string) {
        const elem = toArray(input)[0] as PristineFormInputElement;
        try {
            elem.pristineInput.addError(error);
            elem.pristineInput.showError();
        } catch(e) {
            console.error(NOT_PRISTINE_ELEMENT_MSG, input);
        }
    };

    /***
     * Adds a custom validator to the specified form field element
     * @param elem - The dom element where the validator is applied to
     * @param fn - validator function
     * @param msg - message to show when validation fails. Supports templating. ${0} for the input's value, ${1} and
     * so on are for the attribute values. Supports functions.
     * @param priority - priority of the validator function, higher valued function gets called first.
     * @param halt - whether validation should stop for this field after current validation function
     */
    addValidator(elem: HTMLElement | Iterable<HTMLElement>, fn: Function, msg: string | ValidatorMessageFunction, priority = 1, halt = false) {
        try {
            const pie = toArray(elem)[0] as PristineFormInputElement;
            pie.pristineInput.addValidator({name: 'custom', fn, msg, priority, halt});
        } catch(e) {
            console.error(NOT_PRISTINE_ELEMENT_MSG, elem);
        }
    };

    /***
     * Resets the errors and deletes all pristine fields
     */
    destroy() {
        this.fields.forEach(field => field.destroy());
        this.fields = [] as PristineFormInput[];

        if(this.oldNoValidateValue === null) {
            this.form.removeAttribute('novalidate');
        } else {
            this.form.setAttribute('novalidate', this.oldNoValidateValue);
        }
    };

    /***
     * Get errors of a specific field or the whole form
     * @param input - An element / collection of elements (inc jQuery selector)
     */
    getErrors(input?: HTMLElement | Iterable<HTMLElement>): {input: PristineFormInputElement, errors: string[]}[] | string[] {
        if (!input) {
            return this.fields
                .filter(f => f.hasErrors())
                .map(f => ({input: f.getInput(), errors: f.getErrors()}))
        }

        try {
            return (toArray(input) as PristineFormInputElement[])[0].pristineInput.errors;
        } catch(e) {
            console.error(NOT_PRISTINE_ELEMENT_MSG, input);
        }
    };

    /***
     * Resets the errors of all fields associated with this pristine instance
     */
    reset() {
        this.fields.forEach(field => field.removeError(true));
    };

    /***
     * Checks whether the form/input elements are valid
     * @param input - input element(s), null/undefined for full form validation
     * @param silent - do not show error messages, just return true/false
     * @returns {boolean} return true when valid false otherwise
     */
    validate(input?: HTMLElement | Iterable<HTMLElement>, silent: boolean = false): boolean {
        const fields = (input ? toArray(input) as PristineFormInputElement[] : this.fields.map(f => f.input))
        let valid = true;

        fields.forEach(field => {
            try {
                if (field.pristineInput.validate()) {
                    !silent && field.pristineInput.showSuccess();
                } else {
                    valid = false;
                    !silent && field.pristineInput.showError();
                }
            } catch(e) {
                console.error(NOT_PRISTINE_ELEMENT_MSG, field);
            }
        });

        return valid;
    };
};

export default PristineForm;