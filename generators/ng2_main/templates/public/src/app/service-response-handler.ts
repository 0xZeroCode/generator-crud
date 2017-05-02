import { showSuccessToast, showWarningToast, showFailToast } from './toast';
import { tokenName, loginUrl } from './utils';

import {remove} from 'js-cookie';

const forbiddenMessage = '403 თქვენ არ გაქვთ ამ ფუნქციით სარგებლობის უფლება. გთხოვთ დაუკავშირდეთ ადმინისტრატორს.';

const responseMessages = [
    'მომხმარებელი არ არის გააქტიურებული',
    'მომხმარებლის სახელი ან ელ.ფოსტა უკვე არსებობს',
    'არასწორი მომხმარებლის სახელი ან პაროლი',
    'არასწორი პაროლი',
    'მომხმარებელი არ არსებობს'
];

const firstStatus = 601;
const lastUserErrorStatus = 605;

export function handleResponse(result) {
    if (!result) return;

    if (result.success === false) {
        showWarningToast(result.message);

        return;
    }

    if (result.success) {
        showSuccessToast('ოპერაცია წარმატებით დასრულდა');
    }
}

export function handleError(error) {
    if (error.status === 500) {
        showFailToast('500 სერვერზე დაფიქსირდა შეცდომა. გთხოვთ დაუკავშირდეთ ადმინისტრატორს.');

        throw error;
    }

    if (error.status === 403) {
        if (typeof (error._body) === 'string' && error._body.trim() !== '') {
            showFailToast(error._body);

            throw error;
        }

        showFailToast(forbiddenMessage);

        throw error;
    }

    if (error.status === 401) {
        if (error._body != null) {
            const result = error.json();

            if (result.internalStatus === 609) {
                showFailToast(forbiddenMessage);

                return;
            }
        }

        remove(tokenName);

        this.router.navigateByUrl(loginUrl);

        throw error;
    }

    if (error.status === 400) {
        const errorBody = error.json();
        let message = errorBody.message;

        if (errorBody.internalStatus <= lastUserErrorStatus) {
            message = responseMessages[errorBody.internalStatus - firstStatus];
        }

        showFailToast(message);
    }

    console.error(error);

    throw error;
}
