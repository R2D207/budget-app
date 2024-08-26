import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {LocalStorageService} from "../services/local-storage.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    public form: FormGroup;

    private dataSubscription!: Subscription;

    constructor(public fb: FormBuilder, public router: Router, public storage: LocalStorageService) {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]], // Nombre obligatorio y mínimo 3 caracteres
            value: [0, [Validators.required, Validators.min(0)]], // Value obligatorio y debe ser mayor o igual a 0
            active: [false] // Checkbox
        });
    }

    // eslint-disable-next-line @angular-eslint/contextual-lifecycle
    ngOnInit(): void {
        this.createForm();
    }

    public createForm() {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]], // Nombre obligatorio y mínimo 3 caracteres
            value: [0, [Validators.required, Validators.min(0)]], // Value obligatorio y debe ser mayor o igual a 0
            active: [false] // Checkbox
        });
    }

    // eslint-disable-next-line @angular-eslint/contextual-lifecycle
    onSubmit(): void {

        console.log(this.form.valid);
        if (this.form.valid) {
            this.storage.setData(this.form.value);
            this.createForm();
            this.router.navigate(['/']).then(r => {});
        }
    }

}
