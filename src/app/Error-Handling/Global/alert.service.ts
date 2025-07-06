import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private alert$ = new Subject<{ message: string, details: string }>();
    constructor() { }

    getAlert() {
        return this.alert$.asObservable();
    }

    showAlert(message: string, details: string) {
        this.alert$.next({ message, details })
    }
}
