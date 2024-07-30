export function toggleSpinnerModal(show) {
    const contentElm = document.querySelector('.jl-content-wrap');
    if (show === true) {
        if (contentElm) {
            contentElm.classList.add('loading');
        }
    } else {
        if (contentElm) {
            contentElm.classList.remove('loading');
        }
    }
}