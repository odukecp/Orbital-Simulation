const defaultConfig = {
    n: 4,
    l: 2,
    m: 1,

    graphic: {
        size: 100,
        count: 300,
    },

    heatmap: {
        radius: 10,
        maxopacity: 1,
        minopacity: 0,
        blur: 0.75,
    },

    threeD: {
        threshold: 0.01,
        reduce: 0.875,
    },

    colors: [
        { r: 20, g: 255, b: 255 },
        { r: 0, g: 246, b: 213 },
        { r: 27, g: 234, b: 165 },
        { r: 82, g: 221, b: 114 },
        { r: 120, g: 204, b: 59 },
        { r: 153, g: 185, b: 0 },
        { r: 184, g: 162, b: 0 },
        { r: 212, g: 133, b: 0 },
        { r: 237, g: 95, b: 0 },
        { r: 255, g: 20, b: 20 },
    ],
};

export { defaultConfig };
