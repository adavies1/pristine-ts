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
    constructor(form: HTMLElement, config:PristineFormConfig = currentConfig, live = false) {
        return new PristineForm(form, config, live);
    }

    static addValidator(name: string, fn: Function, msg?: string, priority?: number, halt?: boolean): void {
        addGlobalValidator(name, fn, msg, priority, halt);
    }

    static setGlobalConfig(config: PristineFormOptions): void {
        currentConfig = {...defaultConfig, ...config};
    };
};

export default Pristine;