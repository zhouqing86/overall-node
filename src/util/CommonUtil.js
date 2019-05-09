function reverse(input) {
    if (typeof input != 'string') return input;
    return input.split('').reverse().join('');
}

export {
    reverse
}
