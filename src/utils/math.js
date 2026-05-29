// Factorials

function factorial(n) {
    if (n < 0) {
        throw new Error('Negative factorial');
    }
    let res = 1;
    for (let i = 2; i <= n; i++) {
        res *= i;
    }
    return res;
}

function doubleFactorial(n) {
    if (n <= 0) return 1;
    let result = 1;
    for (let i = n; i > 0; i -= 2) {
        result *= i;
    }
    return result;
}

// Complex Numbers

function complex(re, im) {
    return { re, im };
}

function complexMul(a, b) {
    return {
        re: a.re * b.re - a.im * b.im,
        im: a.re * b.im - a.im * b.re,
    };
}

function complexSq(a) {
    return Math.pow(a.re, 2) + Math.pow(a.im, 2);
}

function complexExp(phi) {
    return {
        re: Math.cos(phi),
        im: Math.sin(phi),
    };
}

// other

function maxValue(points) {
    if (points.lenght === 0) {
        throw new Error('Cannot determine the maxValue of an empty array.');
    }
    let max = points[0].value;
    points.forEach((point) => {
        if (point.value > max) max = point.value;
    });
    return max;
}

function minValue(points) {
    if (points.lenght === 0) {
        throw new Error('Cannot determine the minValue of an empty array.');
    }
    let min = points[0].value;
    points.forEach((point) => {
        if (point.value < min) min = point.value;
    });
    return min;
}

function analyzeArrayOfObjects(array, key, max = true) {
    if (array.length === 0) {
        throw new Error('Cannot analyze an empty array.');
    }

    if (max) {
        let maxVal = array[0][key];
        array.forEach((element) => {
            if (element[key] > maxVal) {
                maxVal = element[key];
            }
        });
        return maxVal;
    } else {
        let minVal = array[0][key];
        array.forEach((element) => {
            if (element[key] < minVal) {
                minVal = element[key];
            }
        });
        return minVal;
    }
}

export {
    factorial,
    doubleFactorial,
    complex,
    complexSq,
    complexExp,
    maxValue,
    minValue,
    analyzeArrayOfObjects,
};
