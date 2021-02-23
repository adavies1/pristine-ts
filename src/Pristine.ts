import PristineInput from './PristineInput';
import { PristineConfig, PristineInputElement, PristineOptions, ValidatorMessageFunction } from './types';
import { addGlobalValidator } from './validators';
import { toArray } from './utils';

const defaultConfig: PristineConfig = {
    classTo: 'form-group',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'form-group',
    errorTextTag: 'div',
    errorTextClass: 'text-help'
};

const NOT_PRISTINE_ELEMENT_MSG = 'The given element is not part of a Pristine validated form';
const SELECTOR = "input:not([type^=hidden]):not([type^=submit]), select, textarea";

let currentConfig: PristineConfig = {...defaultConfig};

export class Pristine {
    form: HTMLElement;
    config: PristineConfig;
    live: boolean;
    oldNoValidateValue: string;
    fields: PristineInput[];

    constructor(form: HTMLElement, config: PristineConfig = currentConfig, live: boolean = false) {
        this.oldNoValidateValue = form.getAttribute('novalidate');
        form.setAttribute('novalidate', 'true');

        this.form = form;
        this.config = config;
        this.live = live;
        this.fields = (Array.from(form.querySelectorAll(SELECTOR)) as HTMLInputElement[])
            .map(input => new PristineInput(input, this));
    }

    /***
     * Adds a global validator, which will be used by any future Pristine instances
     * @param name - Name of the global validator
     * @param fn - Validator function
     * @param msg - Message to show when validation fails. Supports templating. ${0} for the input's value, ${1} and so on are for the attribute values
     * @param priority - Priority of the validator function, higher valued function gets called first.
     * @param halt - Whether validation should stop for this field after current validation function
     */
    static addValidator(name: string, fn: Function, msg?: string, priority?: number, halt?: boolean): void {
        addGlobalValidator(name, fn, msg, priority, halt);
    }

    /**
     * Sets the global (default) configuration, which will be used by any future Pristine instances
     * @param config - The new configuration to use
     */
    static setGlobalConfig(config: PristineOptions): void {
        currentConfig = {...defaultConfig, ...config};
    };

    /***
     * Adds error to a specific field
     * @param input - input element to add the error message to (jQuery selectors accepted)
     * @param error - The error message to add
     */
    addError(input: HTMLElement | Iterable<HTMLElement>, error: string) {
        const elem = toArray(input)[0] as PristineInputElement;
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
            const pie = toArray(elem)[0] as PristineInputElement;
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
        this.fields = [] as PristineInput[];

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
    getErrors(input?: HTMLElement | Iterable<HTMLElement>): {input: PristineInputElement, errors: string[]}[] | string[] {
        if (!input) {
            return this.fields
                .filter(f => f.hasErrors())
                .map(f => ({input: f.getInput(), errors: f.getErrors()}))
        }

        try {
            return (toArray(input) as PristineInputElement[])[0].pristineInput.errors;
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
        const fields = (input ? toArray(input) as PristineInputElement[] : this.fields.map(f => f.input))
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

export default Pristine;