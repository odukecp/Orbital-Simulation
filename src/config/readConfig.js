import { defaultConfig } from './defaultConfig.js';

function readConfig() {
    return {
        n: getConfig('form-n') ?? defaultConfig.n,
        l: getConfig('form-l') ?? defaultConfig.l,
        m: getConfig('form-m') ?? defaultConfig.m,

        graphic: {
            size: getConfig('form-size') ?? defaultConfig.graphic.size,
            count: getConfig('form-count') ?? defaultConfig.graphic.count,
        },

        display: {
            orbitaltype: getStringConfig('form-orbitaltype') ?? defaultConfig.display.orbitaltype,
        },

        threeD: {
            threshold: getConfig('form-threshold') ?? defaultConfig.threeD.threshold,
            reduce: getConfig('form-reduce') ?? defaultConfig.threeD.reduce,
            rotationspeed: getConfig('form-rotationspeed') ?? defaultConfig.threeD.rotationspeed,
        },

        colors: defaultConfig.colors,
    };
}

function getConfig(id) {
    const element = document.getElementById(id);
    if (element.value === '') return null;
    return element ? Number(element.value) : null;
}

function getStringConfig(id) {
    const element = document.getElementById(id);
    if (element.value === '') return null;
    return element ? String(element.value) : null;
}

export { readConfig };
