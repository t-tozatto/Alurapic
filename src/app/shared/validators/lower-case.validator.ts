import { AbstractControl } from '@angular/forms';

// tslint:disable-next-line: typedef
export function lowerCaseValidator(control: AbstractControl) {

    if (control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        return { lowerCase: true };
    }
    return null;
}
