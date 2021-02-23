import Pristine from "./Pristine";
import PristineInput from "./PristineInput";

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

export type PristineConfig = {
    classTo: string,
    errorClass: string,
    successClass: string,
    errorTextParent: string,
    errorTextTag: string,
    errorTextClass: string
};

export type PristineOptions = {
    classTo?: string,
    errorClass?: string,
    successClass?: string,
    errorTextParent?: string,
    errorTextTag?: string,
    errorTextClass?: string
};

export type PristineInputElement = HTMLInputElement & {
    pristine: Pristine;
    pristineInput: PristineInput;
}

export type PristineErrorTextElement = HTMLElement & {
    pristineDisplay: string
};