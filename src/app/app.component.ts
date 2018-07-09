import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppMasterService } from './app-master.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    private appMasterSubscription: Subscription;

    constructor (private appMasterService: AppMasterService) {}

    public ngOnInit (): void {
        this.appMasterSubscription = this.appMasterService.runMasterFunctions().subscribe((results) => {
            console.log('app master results: ', results);
        });
    }

    public ngOnDestroy () {
        this.appMasterSubscription.unsubscribe();
    }
}
