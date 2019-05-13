function reverse(input) {
    if (typeof input != 'string') return input;
    return input.split('').reverse().join('');
}

function yearlySalary(salary) {
    return Math.ceil(salary * 12);
}

export {
    reverse,
    yearlySalary,
}
