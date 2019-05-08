function reverse(input) {
    if (typeof input != 'string') return input;
    return input.split('').reverse().join('');
}

module.exports = {
    reverse
}
