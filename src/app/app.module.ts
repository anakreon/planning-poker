import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';

import { MatButtonModule, MatCardModule, MatGridListModule, MatToolbarModule } from '@angular/material';
import { CardComponent } from './card/card.component';
import { CardContainerComponent } from './card-container/card-container.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerListItemComponent } from './player-list-item/player-list-item.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatToolbarModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        NavbarComponent,
        CardComponent,
        CardContainerComponent,
        PlayerListComponent,
        PlayerListItemComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
