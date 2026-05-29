import { readConfig } from '../config/readConfig.js';

function aELOrbSelSubmit(onClick) {
    const form = document.getElementById('view-select');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const config = readConfig();
        onClick(config);
    });
}

export { aELOrbSelSubmit };
