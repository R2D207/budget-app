import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    // Creamos un BehaviorSubject para mantener el estado de los datos
    private dataSubject = new BehaviorSubject<any>(this.getData());
    data$ = this.dataSubject.asObservable();

    constructor() { }

    // Método para obtener datos de localStorage
    getData(): any {
        return JSON.parse(localStorage.getItem('data') || '[]');
    }

    // Método para actualizar datos en localStorage y emitir cambios
    setData(value: any) {
        let data = this.getData();
        data.push(value);

        localStorage.setItem('data', JSON.stringify(data));
        // Emitimos el nuevo valor para que los suscriptores puedan actualizarse
        this.dataSubject.next(data);
    }
}
