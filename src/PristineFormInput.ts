import PristineForm from './PristineForm';
import { ValidatorConfig, PristineFormErrorTextElement, PristineFormInputElement, ValidatorMessageFunction } from './types';
import { isFunction, tmpl } from './utils';
import { defaultValidators } from './validators';

const ALLOWED_ATTRIBUTES = ["required", "min", "max", 'minlength', 'maxlength', 'pattern'];
const PRISTINE_ERROR = 'pristine-error';

export class PristineFormInput {
    errorClassElement: HTMLElement;
    _errorTextElement: PristineFormErrorTextElement; // Don't access this when reading, use getter instead
    errorTextParent: HTMLElement;
    errors: string[];
    input: PristineFormInputElement;
    messages: {[name: string]: string};
    params: {[name: string]: string[]};
    pristine: PristineForm;
    validators: ValidatorConfig[];

    constructor(input: HTMLInputElement, pristineForm: PristineForm) {
        this.errors = [] as string[];
        this.input = input as PristineFormInputElement;
        this.messages = {} as {[name: string]: string};
        this.pristine = pristineForm;
        this.validators = [] as ValidatorConfig[];

        // Init validators
        Array.from(this.input.attributes).forEach(attr => {
            if(attr.name === 'data-pristine-type') {
                this._initValidator(attr.value);
            }
            else if(/^data-pristine-(.+)-message/.test(attr.name)) {
                this.messages[attr.name.slice(0, attr.name.length - 8)] = attr.value;
            }
            else if (/^data-pristine-/.test(attr.name)) {
                this._initValidator(attr.name.substr(14), attr.value);
            }
            else if (ALLOWED_ATTRIBUTES.indexOf(attr.name)){
                this._initValidator(attr.name, attr.value);
            }
            else if (attr.name === 'type'){
                this._initValidator(attr.value);
            }
        });
        this.validators.sort((a, b) => b.priority - a.priority);

        // Init error elements
        this.errorClassElement = this.input.closest(this.pristine.config.classTo);
        if (this.pristine.config.classTo === this.pristine.config.errorTextParent) {
            this.errorTextParent = this.errorClassElement;
        } else {
            this.errorTextParent = this.errorClassElement.querySelector(`.${this.pristine.config.errorTextParent}`);
        }

        // Set up references on input DOM element
        this.input.pristine = this.pristine;
        this.input.pristineInput = this;

        // If this is live, set up event listener to react to a field being changed
        if(this.pristine.live) {
            const eventName: string = !~['radio', 'checkbox'].indexOf(this.input.getAttribute('type')) ? 'input' : 'change';
            this.input.addEventListener(eventName, e => this.validate());
        }
    }

    /**
     * Attaches a specific validator from the global validators to this field
     * @param name - The name of the validator to attach
     * @param value - A CSV string, which will be split and used as parameters for the validator
     */
    private _initValidator(name: string, value: string = ''): void {
        if (defaultValidators.hasOwnProperty(name)) {
            this.validators.push(defaultValidators[name]);
            this.params[name] = value.split(',');
        }
    }

    // ****************************
    // *     Public functions     *
    // ****************************

    /**
     * Adds an error message to this field
     * @param error - The message to add
     */
    addError(error: string) {
        this.errors.push(error);
    }

    /**
     * Adds a custom validator to this field only (it will not be added to the global validators)
     * @param validator - ValidatorConfig object containing all data needed for validator
     */
    addValidator(validator: ValidatorConfig): void {
        this.validators.push(validator);
    }

    /**
     * Removes all error messages and references to DOM elements, leaving field clean
     */
    destroy() {
        this.removeError(true);
        this.errorClassElement = undefined;
        this.errorTextParent = undefined;
        this.pristine = undefined;
        delete this.input.pristine;
        delete this.input.pristineInput;
    }

    /**
     * This getter allows the errorTextElement element to be created on demand
     */
    get errorTextElement(): PristineFormErrorTextElement {
        if (this.errorTextParent && !this._errorTextElement) {
            this._errorTextElement = document.createElement(this.pristine.config.errorTextTag) as PristineFormErrorTextElement;
            this._errorTextElement.className = `${PRISTINE_ERROR} ${this.pristine.config.errorTextClass}`;
            this.errorTextParent.appendChild(this._errorTextElement);
            this._errorTextElement.pristineDisplay = this._errorTextElement.style.display;
        }

        return this._errorTextElement;
    }

    /**
     * Returns all of the error messages this field currently has
     */
    getErrors(): string[] {
        return this.errors;
    }

    /**
     * Returns the HTML element this instance is attached to
     */
    getInput(): PristineFormInputElement {
        return this.input;
    }

    /**
     * Returns true or false depending on if this field has errors
     */
    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    /**
     * Removes all error messages from the field and removes error/success CSS classes
     * @param destroyErrorTextElement - Optional, the errorTextElement will be removed from the DOM if true
     */
    removeError(destroyErrorTextElement: boolean = false): void {
        if (this.errorClassElement) {
            // IE > 9 doesn't support multiple class removal
            this.errorClassElement.classList.remove(this.pristine.config.errorClass);
            this.errorClassElement.classList.remove(this.pristine.config.successClass);
        }
        if (this.errorTextElement) {
            this.errorTextElement.innerHTML = '';
            this.errorTextElement.style.display = 'none';

            if(destroyErrorTextElement) {
                this._errorTextElement.parentElement.removeChild(this.errorTextElement);
                this._errorTextElement = undefined;
            }
        }
    }

    /**
     * Shows all error messages this field currently has
     */
    showError(): void {
        if(this.errorClassElement){
            this.errorClassElement.classList.remove(this.pristine.config.successClass);
            this.errorClassElement.classList.add(this.pristine.config.errorClass);
        }
        if (this.errorTextElement){
            this.errorTextElement.innerHTML = this.errors.join('<br/>');
            this.errorTextElement.style.display = this.errorTextElement.pristineDisplay || '';
        }
    }

    /**
     * Removes all error messages and shows this field as successfully validated
     */
    showSuccess(): void {
        this.removeError();
        this.errorClassElement && this.errorClassElement.classList.add(this.pristine.config.successClass);
    }

    /***
     * Validates this field, all validator functions are called and error messages are generated
     * @returns {boolean}
     */
    validate(): boolean {
        let i;
        let valid = true;

        this.errors = [];

        for(i=0; i<this.validators.length; i++) {
            let validator = this.validators[i];
            let params = [this.input.value, ...(this.params[validator.name] || [])];

            if (!validator.fn.apply(this.input, params)){
                valid = false;

                if (isFunction(validator.msg)) {
                    this.errors.push((validator.msg as ValidatorMessageFunction)(this.input.value, params))
                } else {
                    let msg = this.messages[validator.name] || validator.msg;
                    this.errors.push(tmpl(msg as string, ...params));
                }

                if (validator.halt === true) break;
            }
        }
        return valid;
    }
};

export default PristineFormInput;