import { ValidatorFn } from "@angular/forms";

export interface FormFields {
    controlName: string,
    controlType: string,
    controlLabel: string,
    controlWidth: string,
    initialValue: string,
    placeholder?: string,
    selectOptions?: {[key: string]: string},
    validators?: ValidatorFn[],
    order: number
}