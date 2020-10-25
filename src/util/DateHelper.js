export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export function addDays(pDate, pExtraDays) {
    const newDate = new Date(pDate.getTime());
    newDate.setDate(pDate.getDate() + pExtraDays);
    return newDate;
}

export function substractDays(pDate, pSubtractedDays) {
    const newDate = new Date(pDate.getTime());
    newDate.setDate(pDate.getDate() - pSubtractedDays);
    return newDate;
}

export const isSameDay = (a, b) => {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
}

export const toDateISOFormatt = (date) => {
    const extraZero = (val) => "0".concat(val);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) month = extraZero(month);
    if (day < 10) day = extraZero(day);
    return `${date.getFullYear()}-${month}-${day}`;
}

export const toTimeISOFormatt = (date) => {
    const extraZero = (val) => "0".concat(val);
    let houres = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return [houres, minutes, seconds].map(num => {
        if (num < 10) {
            return extraZero(num);
        }
        return num;
    }).join(":");
}
