const utils = require('../src/utils');

describe('groupedElemCount', () => {
    test('it should count the correct number of checked checkboxes', () => {
        document.body.innerHTML = `
            <form id="testForm">
                <input id="input" type="checkbox" name="test" value="1"/>
                <input type="checkbox" name="test" value="2"/>
                <input type="checkbox" name="test" value="3"/>
            <form>`;

        const form = document.getElementById('testForm');
        const input = document.getElementById('input');
        expect(utils.groupedElemCount(form, input)).toBe(0);

        (input as HTMLInputElement).checked = true;
        expect(utils.groupedElemCount(form, input)).toBe(1);

        (Array.from(document.querySelectorAll('input')) as HTMLInputElement[]).forEach(input => { input.checked = true; });
        expect(utils.groupedElemCount(form, input)).toBe(3);
    });
})

describe('isFunction', () => {
    test('it should return true when a function is passed', () => {
        const func = () => {};
        expect(utils.isFunction(func)).toBe(true);
    });

    test('is should return false when anything other than a function is passed', () => {
        expect(utils.isFunction(123)).toBe(false);
        expect(utils.isFunction('123')).toBe(false);
        expect(utils.isFunction(null)).toBe(false);
        expect(utils.isFunction(undefined)).toBe(false);
        expect(utils.isFunction([])).toBe(false);
        expect(utils.isFunction({})).toBe(false);
    });
});

describe('tmpl', () => {
    test('it should populate placeholders correctly', () => {
        const text = 'Hello ${0}, I like ${1}. Do you like ${1}, ${0}?';
        expect(utils.tmpl(text, ...['Alex', 'pie'])).toBe('Hello Alex, I like pie. Do you like pie, Alex?');
    });

    test('it should replace bad placeholders with empty strings', () => {
        const text = 'Hello ${2}, I like ${3}. Do you like ${6}, ${7}?';
        expect(utils.tmpl(text, ...['Alex', 'pie'])).toBe('Hello , I like . Do you like , ?');
    });
});

describe('toArray', () => {
    test('it should convert iterables to an array', () => {
        document.body.innerHTML = '<div><p>1</p><p>2</p></div>';
        const paras = document.querySelectorAll('p');
        expect(utils.toArray(paras)).toEqual(Array.from(paras));
    });

    test('it should return arrays the same as they were passed in', () => {
        expect(utils.toArray([])).toEqual([]);
        expect(utils.toArray([123, '123'])).toEqual([123, '123']);
    });

    test('it should put a string into an array and not convert it into an array of chars', () => {
        expect(utils.toArray('hello')).toEqual(['hello']);
    });

    test('it should put non-iterable types into an array', () => {
        expect(utils.toArray(123)).toEqual([123]);
        expect(utils.toArray({})).toEqual([{}]);
    });
});