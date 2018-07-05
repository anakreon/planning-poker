import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {
    MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatInputModule, MatStepperModule, MatTabsModule, 
    MatToolbarModule
} from '@angular/material';
import { RoomModule } from './room/room.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatGridListModule,
        MatInputModule,
        MatStepperModule,
        MatTabsModule,
        MatToolbarModule,
        RoomModule
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
