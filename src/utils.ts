import { PristineFormInputElement } from "./types";

/**
 * Returns the number of elements with the same name that are checked (useful for checkbox groups)
 * @param input - The PristineFormInputElement to match against
 */
export function groupedElemCount(input: PristineFormInputElement): number {
    return input.pristine.form.querySelectorAll(`input[name="${input.getAttribute('name')}"]:checked`).length;
}

/**
 * Returns true or false depending upon if the given object is a function or not
 * @param obj - The object to test
 */
export function isFunction(obj: any): boolean {
    return !!(obj && obj.constructor && obj.call && obj.apply);
}

/**
 * Takes a template string and fills in the parameters with values
 * @param msg - The template string (E.G: "Hello {0}, my name is {1}. Do you like the name {1}?")
 * @param params - The array of values for the string variables to be replaced with. The order is important.
 */
export function tmpl(msg: string, ...params: string[]) {
    return msg.replace(/\${([^{}]*)}/g, (match: string, index: number) => params[index]);
}

/**
 * Will return an array of the given input. If input is an iterable (array, nodelist etc) it will be converted to an array.
 * Otherwise, input will be put into a new array and returned. Strings will not be split into characters.
 * @param input - The item(s) to make into an array
 */
export function toArray<T>(input: Iterable<T> | T): T[] {
    if(typeof input === 'string') return [input];
    const output = Array.from(input as Iterable<T>);
    return output.length ? output : [input as T];
}

