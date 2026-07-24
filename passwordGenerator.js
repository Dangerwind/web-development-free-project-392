

    const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const DIGITS = "0123456789";
    const SPECIAL = "!@#$%^&*";

const nextRandom = (num) => {
        return (16807 * num) % 2147483647;
}

// const generatePassword = (length, s = 1, options = {useUppercase = true, useDigits = true, useSpecial = false}) => {
const generatePassword = (length, s = 1, options = {}) => {
    const {
        useUppercase = true,
        useDigits = true,
        useSpecial = false
    } = options;

        if (length <= 0) return "";      

        var seed = Math.abs(s) % 2147483647; 
        if (seed === 0) { seed = 1; }


        let alphabet = LOWERCASE;

        if (useUppercase) {
            alphabet += UPPERCASE;
        }
        if (useDigits) {
            alphabet += DIGITS;
        }
        if (useSpecial) {
            alphabet += SPECIAL;
        }

        var current = seed;    

        var retStr = ''
        for (var i = 0; i < length; i++) {
            current = nextRandom(current);
            let index = (current % alphabet.length);    

            retStr += alphabet[index];
        }
        return retStr;
    }

 const checkPassword = (password) => {
    // Создаем массив из 5 нулей (аналог int[5] в Java)
    const poents = [0,0,0,0,0]

    // 1. Проверка длины
    if (password.length >= 8) poents[0] = 1;

    // 2. Проверки на типы символов с помощью регулярных выражений
    if (/[a-z]/.test(password)) poents[1] = 1; // строчные буквы
    if (/[A-Z]/.test(password)) poents[2] = 1; // заглавные буквы
    if (/[0-9]/.test(password)) poents[3] = 1; // цифры
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) poents[4] = 1; // спецсимволы

    // Считаем сумму всех элементов массива
    const score = poents.reduce((sum, current) => sum + current, 0);

    // Определяем вердикт
    let verdict = "";
    if (score <= 2) verdict = "Слабый";
    else if (score === 3) verdict = "Средний";
    else if (score === 4) verdict = "Надёжный";
    else if (score === 5) verdict = "Очень надёжный";

    // Возвращаем строку через шаблонные литералы ``
    return `${verdict} пароль (оценка ${score} из 5)`;
}


export { generatePassword, checkPassword }
