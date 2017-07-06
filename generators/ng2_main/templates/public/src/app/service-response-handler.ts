import { showSuccessToast, showWarningToast, showFailToast } from './toast';

const successMessage = '<%= successMessage %>';
const internalServerErrorMessage = '<%= internalServerErrorMessage %>';

export function handleResponse(result) {
    if (!result) return;

    if (result.success === false) {
        showWarningToast(result.message);

        return;
    }

    if (result.success) {
        showSuccessToast(successMessage);
    }
}

export function handleError(error) {
    if (error.status === 500) {
        showFailToast(internalServerErrorMessage);

        throw error;
    }

    console.error(error);

    throw error;
}
