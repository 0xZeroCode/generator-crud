function showToast(text, type) {
    const snackbar = document.getElementById('snackbar');

    snackbar.className = `show ${type}`;

    snackbar.innerText = text;

    setTimeout(() => {
        snackbar.className = snackbar.className.replace(`show ${type}`, '');
        snackbar.innerText = '';
    }, 4000);
}

export function showSuccessToast(text) {
    showToast(text, 'success');
}

export function showWarningToast(text) {
    showToast(text, 'warning');
}

export function showFailToast(text) {
    showToast(text, 'fail');
}
