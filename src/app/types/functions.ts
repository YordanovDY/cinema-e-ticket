import { NgModel, NgModelGroup } from "@angular/forms";

export type VoidFn = () => void;

export type SimpleValidator = (control: NgModel) => boolean;

export type GroupValidator = (control: NgModel, controlGroup: NgModelGroup) => boolean;