import PristineForm from "./PristineForm";
import PristineFormInput from "./PristineFormInput";

export type ValidatorConfig = {
    name: string,
    fn: Function,
    msg: string | ValidatorMessageFunction,
    priority: number,
    halt: boolean
}

export type ValidatorOptions = {
    name?: string,
    fn?: Function,
    msg?: string | ValidatorMessageFunction,
    priority?: number,
    halt?: boolean
};

export type ValidatorMessageFunction = (value: string, params: string[]) => string;

export type NamedValidators = {
    [name: string]: ValidatorConfig;
};

export type PristineFormConfig = {
    classTo: string,
    errorClass: string,
    successClass: string,
    errorTextParent: string,
    errorTextTag: string,
    errorTextClass: string
};

export type PristineFormOptions = {
    classTo?: string,
    errorClass?: string,
    successClass?: string,
    errorTextParent?: string,
    errorTextTag?: string,
    errorTextClass?: string
};

export type PristineFormInputElement = HTMLInputElement & {
    pristine: PristineForm;
    pristineInput: PristineFormInput;
}

export type PristineFormErrorTextElement = HTMLElement & {
    pristineDisplay: string
};