import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';

import { MatButtonModule, MatCardModule, MatToolbarModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        NavbarComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
