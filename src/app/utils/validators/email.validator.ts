import { ValidatorFn } from "@angular/forms";

export function emailValidator(domains: string[]): ValidatorFn {
    const domainsStr = domains.join('|');
    const pattern = new RegExp(`^[a-z]{1}[a-z0-9\.]{5,}@(${domainsStr})$`,'gm');

    return (control) => {
        const value = control.value;
        const isValid = value === '' || pattern.test(value);

        if (isValid) {
            return null;
        }

        return { emailValidator: true };
    }
}