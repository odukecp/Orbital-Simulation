import { factorial, doubleFactorial, complex, complexSq, complexExp } from './math.js';

function validateQuantumNumbers(n, l, m) {
    if (n < 1) {
        alert('n must be >= 1');
        throw new Error('n must be >= 1');
    }

    if (l < 0 || l >= n) {
        alert('l must satisfy 0 <= l < n');
        throw new Error('l must satisfy 0 <= l < n');
    }

    if (Math.abs(m) > l) {
        alert('|m| must be <= l');
        throw new Error('|m| must be <= l');
    }
}

function associatedLaguerre(n, alpha, x) {
    let sum = 0;
    for (let k = 0; k <= n; k++) {
        const f1 = Math.pow(-1, k);
        const f2 = factorial(n + alpha) / (factorial(n - k) * factorial(alpha + k) * factorial(k));
        const f3 = Math.pow(x, k);
        sum += f1 * f2 * f3;
    }
    return sum;
}

function associatedLegendre(l, m, x) {
    const absM = Math.abs(m);

    if (absM > l) {
        throw new Error('Require |m| <= l');
    }

    let pmm = Math.pow(-1, absM) * doubleFactorial(2 * absM - 1) * Math.pow(1 - x * x, absM / 2);

    if (l === absM) {
        return pmm;
    }

    let pmmp1 = x * (2 * absM + 1) * pmm;

    if (l === absM + 1) {
        return pmmp1;
    }

    let pll = 0;

    for (let ll = absM + 2; ll <= l; ll++) {
        pll = ((2 * ll - 1) * x * pmmp1 - (ll + absM - 1) * pmm) / (ll - absM);

        pmm = pmmp1;
        pmmp1 = pll;
    }

    return pll;
}

function sphericalHarmonic(l, m, theta, phi) {
    const absM = Math.abs(m);
    const f1 = Math.sqrt(((2 * l + 1) * factorial(l - absM)) / (4 * Math.PI * factorial(l + absM)));
    const f2 = associatedLegendre(l, m, Math.cos(theta));
    const f3 = complexExp(m * phi);

    let res = {
        re: f1 * f2 * f3.re,
        im: f1 * f2 * f3.im,
    };

    if (m < 0) {
        const sign = absM % 2 === 0 ? 1 : -1;
        result = {
            re: sign * res.re,
            im: -sign * res.im,
        };
    }
    return res;
}

function radialWavefunction(n, l, r, a0 = 1) {
    const rho = (2 * r) / (n * a0);
    const f1 = Math.sqrt(
        (Math.pow(2 / (n * a0), 3) * factorial(n - l - 1)) / (2 * n * factorial(n + 1)),
    );
    const f2 = Math.exp(-rho / 2);
    const f3 = Math.pow(rho, l);
    const f4 = associatedLaguerre(n - l - 1, 2 * l + 1, rho);

    let res = f1 * f2 * f3 * f4;

    return res;
}

function wavefunction(n, l, m, r, theta, phi) {
    let psi2 =
        Math.pow(radialWavefunction(n, l, r), 2) * complexSq(sphericalHarmonic(l, m, theta, phi));
    if (!Number.isFinite(psi2)) {
        psi2 = 0;
        console.log(
            `Psi^2 was ${psi2} (not finite) for n=${n}; l=${l}; m=${m}; r=${r}; theta=${theta}; phi=${phi}`,
        );
    }
    return psi2;
}

export {
    validateQuantumNumbers,
    associatedLaguerre,
    associatedLegendre,
    sphericalHarmonic,
    radialWavefunction,
    wavefunction,
};
