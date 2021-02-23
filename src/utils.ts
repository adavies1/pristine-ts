/**
 * Returns the number of elements with the same name that are checked (useful for checkbox groups)
 * @param input - The PristineFormInputElement to match against
 */
export function groupedElemCount(form: HTMLElement, input: HTMLElement): number {
    return form.querySelectorAll(`input[name="${input.getAttribute('name')}"]:checked`).length;
}

/**
 * Takes a template string and fills in the parameters with values
 * @param msg - The template string (E.G: "Hello ${0}, my name is ${1}. Do you like the name ${1}?")
 * @param params - The array of values for the string variables to be replaced with. The order is important.
 */
export function tmpl(msg: string, ...params: string[]) {
    return msg.replace(/\${([^{}]*)}/g, (match: string, index: number) => params[index] || '');
}

/**
 * Will return an array of the given input. If input is an iterable (array, nodelist etc) it will be converted to an array.
 * Otherwise, input will be put into a new array and returned. Strings will not be split into characters.
 * @param input - The item(s) to make into an array
 */
export function toArray<T>(input: Iterable<T> | T): T[] {
    if(typeof input === 'string') return [input]; // Return strings inside a new array (avoid splitting into an array of chars)
    if(Array.isArray(input)) return input as T[]; // Return normal arrays as they are
    const arr = Array.from(input as Iterable<T>); // Array.from() will return an array of items if input is iterable, [] if not
    if(!arr.length) arr.push(input as T);         // If array is empty (input not iterable), add input to array
    return arr;
}

