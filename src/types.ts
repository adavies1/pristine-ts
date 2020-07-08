export type Validator = {
    name: string,
    fn: Function,
    msg: string,
    priority: number,
    halt: boolean
}

export type ValidatorConfig = {
    fn: Function,
    msg?: string,
    priority?: number,
    halt?: boolean
};

export type NamedValidators = {
    [name: string]: ValidatorConfig;
};
