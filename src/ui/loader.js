function showLoader(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (container.querySelector('.loader')) return;

    container.style.position = 'relative';

    const loader = document.createElement('div');

    loader.className = 'loader';

    if (containerId === 'viewport-wrap') {
        loader.innerHTML = `
            <div class="loader-spinner"></div>
            <p id="loader-text"></p>
        `;
    } else {
        loader.innerHTML = `
            <div class="loader-spinner"></div>
        `;
    }

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

function updateLoaderText(text) {
    const loaderText = document.getElementById('loader-text') || null;
    if (!loaderText) {
        console.warn('There was no loader text element');
        return;
    }
    loaderText.innerHTML = text;
}

export { showLoader, hideLoader, updateLoaderText };
