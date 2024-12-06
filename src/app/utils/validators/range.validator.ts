import { ValidatorFn } from "@angular/forms";

export function rangeValidator(range: [number, number]): ValidatorFn {
    const[min, max] = range;

    if(min>max){
        throw new RangeError('min is greater than max!');
    }

    return (control) => {
        if(!control.value){
            return null;
        }

        const value = Number(control.value);
        const isValid = value >= min && value <= max;

        if (isValid) {
            return null;
        }

        return { rangeValidator: true };
    }
}