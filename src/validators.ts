import lang from './lang'
import { groupedElemCount } from './utils';
import { NamedValidators, ValidatorConfig, ValidatorOptions } from './types';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/***
 *
 * @param name => Name of the global validator
 * @param fn => validator function
 * @param msg => message to show when validation fails. Supports templating. ${0} for the input's value, ${1} and
 * so on are for the attribute values
 * @param priority => priority of the validator function, higher valued function gets called first.
 * @param halt => whether validation should stop for this field after current validation function
 */
export const addGlobalValidator = (name: string, fn: Function, msg: string = 'This field is invalid', priority: number =  1, halt: boolean = false) => {
    return defaultValidators[name] = { fn, name, msg: lang[name] || msg, priority, halt } as ValidatorConfig;
}

// Validators
export const text = (val: string): boolean => true;
export const email = (val: string): boolean => !val || EMAIL_REGEX.test(val);
export const integer = (val: string): boolean => !val || /^\d+$/.test(val);
export const number = (val: string): boolean => !val || (/^-?[0-9]+(\.[0-9]*)?$/.test(val) && !isNaN(parseFloat(val)));
export const minlength = (val: string, length: string): boolean => !val || val.length >= parseInt(length);
export const maxlength = (val: string, length: string): boolean => !val || val.length <= parseInt(length);

export const required = function(val: string): boolean {
    return (this.type === 'radio' || this.type === 'checkbox')
        ? Boolean(groupedElemCount(this.pristine.form, this))
        : val !== undefined && val !== ''
}

export const min = function(val: string, limit: string): boolean {
    return !val || (this.type === 'checkbox'
        ? groupedElemCount(this.pristine.form, this) >= parseInt(limit)
        : parseFloat(val) >= parseFloat(limit)
    );
};

export const max = function(val: string, limit: string): boolean {
    return !val || (this.type === 'checkbox'
        ? groupedElemCount(this.pristine.form, this) <= parseInt(limit)
        : parseFloat(val) <= parseFloat(limit)
    );
}

export const pattern = (val: string, pattern: string) => {
    let m = pattern.match(new RegExp('^/(.*?)/([gimy]*)$'));
    return !val || (new RegExp(m[1], m[2])).test(val);
}

export const defaultValidators: NamedValidators = { } as NamedValidators;
addGlobalValidator('text', text, undefined, 0 );
addGlobalValidator('required', required, undefined, 99, true);
addGlobalValidator('email', email);
addGlobalValidator('number', number, undefined, 2);
addGlobalValidator('integer', integer);
addGlobalValidator('minlength', minlength);
addGlobalValidator('maxlength', maxlength);
addGlobalValidator('min', min);
addGlobalValidator('max', max);
addGlobalValidator('pattern', pattern);

