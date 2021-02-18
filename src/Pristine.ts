import PristineForm from "./PristineForm";
import { PristineFormOptions, PristineFormConfig } from "./types";
import { addGlobalValidator } from './validators';

const defaultConfig: PristineFormConfig = {
    classTo: 'form-group',
    errorClass: 'has-danger',
    successClass: 'has-success',
    errorTextParent: 'form-group',
    errorTextTag: 'div',
    errorTextClass: 'text-help'
};

let currentConfig: PristineFormConfig = {...defaultConfig};

export class Pristine {
    constructor(form: HTMLElement, config:PristineFormConfig = currentConfig, live:boolean = false) {
        return new PristineForm(form, config, live);
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
    static setGlobalConfig(config: PristineFormOptions): void {
        currentConfig = {...defaultConfig, ...config};
    };
};

export default Pristine;