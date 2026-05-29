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

        heatmap: {
            radius: getConfig('form-radius') ?? defaultConfig.heatmap.radius,
            maxopacity: getConfig('form-maxopacity') ?? defaultConfig.heatmap.maxopacity,
            minopacity: getConfig('form-minopacity') ?? defaultConfig.heatmap.minopacity,
            blur: getConfig('form-blur') ?? defaultConfig.heatmap.blur,
        },

        threeD: {
            threshold: getConfig('form-threshold') ?? defaultConfig.threeD.threshold,
            reduce: getConfig('form-reduce') ?? defaultConfig.threeD.reduce,
        },

        colors: defaultConfig.colors,
    };
}

function getConfig(id) {
    const element = document.getElementById(id);
    if (element.value === '') return null;
    return element ? Number(element.value) : null;
}

export { readConfig };
