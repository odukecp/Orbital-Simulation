function showLoader(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (container.querySelector('.loader')) return;

    container.style.position = 'relative';

    const loader = document.createElement('div');

    loader.className = 'loader';

    loader.innerHTML = `
        <div class="loader-spinner"></div>
    `;

    container.appendChild(loader);
}

function hideLoader(containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;

    const loader = container.querySelector('.loader');

    if (loader) {
        loader.remove();
    }
}

export { showLoader, hideLoader };
