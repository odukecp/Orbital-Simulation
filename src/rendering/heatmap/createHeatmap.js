import { getHeatmapWrap } from '../../ui/base.js';
import Plotly from 'plotly.js-dist';

const colors = [
    { r: 0, g: 0, b: 0 },
    { r: 0, g: 0, b: 80 },
    { r: 20, g: 255, b: 255 },
    { r: 20, g: 255, b: 235 },
    { r: 20, g: 255, b: 216 },
    { r: 20, g: 255, b: 196 },
    { r: 20, g: 255, b: 177 },
    { r: 20, g: 255, b: 59 },
    { r: 98, g: 255, b: 20 },
    { r: 216, g: 255, b: 20 },
    { r: 255, g: 177, b: 20 },
    { r: 255, g: 138, b: 20 },
    { r: 255, g: 98, b: 20 },
    { r: 255, g: 59, b: 20 },
    { r: 255, g: 20, b: 20 },
];

function createHeatmap(matrix, id) {
    const customColorscale = colors.map((color, index) => [
        index / (colors.length - 1),
        `rgb(${color.r},${color.g},${color.b})`,
    ]);

    Plotly.newPlot(
        `heatmap-${id}`,
        [
            {
                z: matrix,
                type: 'heatmap',
                colorscale: customColorscale,
                showscale: false,
                zsmooth: 'best',
            },
        ],
        {
            margin: {
                l: 0,
                r: 0,
                t: 0,
                b: 0,
            },
            xaxis: {
                visible: false,
            },
            yaxis: {
                visible: false,
            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'black',
        },

        {
            displayModeBar: false,
            staticPlot: true,
            responsive: true,
        },
    );
}

export { createHeatmap };
