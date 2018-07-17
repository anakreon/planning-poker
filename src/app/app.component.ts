import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppMasterService } from './backend/app-master.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {


    constructor () {}

    public ngOnInit (): void {

    }

    public ngOnDestroy () {

    }
}
