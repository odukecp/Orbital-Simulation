import { readConfig } from '../config/readConfig.js';

function aELOrbSelSubmit(onClick) {
    const form = document.getElementById('view-select');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const config = readConfig();
        onClick(config);
    });
}

function aELAdvSet() {
    const checkbox = document.getElementById('advanced-toggle');
    const advancedElements = document.querySelectorAll('.advanced');

    checkbox.addEventListener('change', () => {
        advancedElements.forEach((el) => {
            el.classList.toggle('hidden');
        });
    });
}

export { aELOrbSelSubmit, aELAdvSet };
