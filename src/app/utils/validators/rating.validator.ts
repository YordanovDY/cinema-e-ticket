import { ValidatorFn } from "@angular/forms";

export function ratingValidator(): ValidatorFn {
    const pattern = new RegExp(`^[0-9]{1}$|^([0-9]{1}\.[0-9]{1})$|^10$`,'m');

    return (control) => {
        const value = control.value;
        const isValid = value === '' || pattern.test(value);

        if (isValid) {
            return null;
        }

        return { ratingValidator: true };
    }
}