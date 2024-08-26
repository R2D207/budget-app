import {Component, OnDestroy, OnInit} from '@angular/core';
import {LocalStorageService} from "../services/local-storage.service";
import {Subscription} from "rxjs";

interface dataInterface {
    active: boolean;
    name: string;
    value: number;
}

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

    public data: dataInterface[] = [];

    public suma: Number = 0;

    private dataSubscription!: Subscription;

    constructor(public storage: LocalStorageService) {
        this.getData();
    }

    ngOnDestroy(): void {
        this.data = [];
    }

    ngOnInit(): void {
        this.getData();
    }

    public getData() {

        this.dataSubscription = this.storage.data$.subscribe(data => {
            this.data = data;
            this.calculate();
        });

        this.calculate();

    }

    // estructura {"name": string, value: int, active: bool}
    public calculate() {

        if (this.data.length > 0) {
            let suma = 0;

            for (const data of this.data) {

                if (data['active']) {
                    suma = suma + data.value;
                }
            }

            this.suma = suma;
        }
        else {
            this.suma = 0;
        }
    }

}
