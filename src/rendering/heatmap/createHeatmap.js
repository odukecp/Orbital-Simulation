import { getHeatmapWrap } from '../../ui/base';
import Plotly from 'plotly.js-dist';

function createHeatmap(matrix, id) {
    Plotly.newPlot(
        `heatmap-${id}`,
        [
            {
                z: matrix,
                type: 'heatmap',
                colorscale: 'Viridis',
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
