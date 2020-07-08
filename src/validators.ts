import { groupedElemCount } from './utils';
import { NamedValidators } from './types';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Validators
export const text = (val: string): boolean => true;

export const required = function(val: string): boolean {
    return (this.type === 'radio' || this.type === 'checkbox')
        ? Boolean(groupedElemCount(this))
        : val !== undefined && val !== ''
}

export const email = (val: string): boolean => !val || EMAIL_REGEX.test(val);

export const number = (val: string): boolean => !val || !isNaN(parseFloat(val));

export const integer = (val: string): boolean => val && /^\d+$/.test(val);

export const minlength = (val: string, length: string): boolean => !val || val.length >= parseInt(length);

export const maxlength = (val: string, length: string): boolean => !val || val.length <= parseInt(length);

export const min = function(val: string, limit: string): boolean {
    return !val || (this.type === 'checkbox'
        ? groupedElemCount(this) >= parseInt(limit)
        : parseFloat(val) >= parseFloat(limit)
    );
};

export const max = function(val: string, limit: string): boolean {
    return !val || (this.type === 'checkbox'
        ? groupedElemCount(this) <= parseInt(limit)
        : parseFloat(val) <= parseFloat(limit)
    );
}

export const pattern = (val: string, pattern: string) => {
    let m = pattern.match(new RegExp('^/(.*?)/([gimy]*)$'));
    return !val || (new RegExp(m[1], m[2])).test(val);
}

// Validators with their names and config
export const defaultValidators: NamedValidators = {
    text: { fn: text, priority: 0 },
    required: { fn: required, priority: 99, halt: true },
    email: { fn: email },
    number: { fn: number, priority: 2 },
    integer: { fn: integer },
    minlength: { fn: minlength },
    maxlength: { fn: maxlength },
    min: { fn: min },
    max: { fn: max },
    pattern: { fn: pattern }
};
