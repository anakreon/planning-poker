import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material';

import { DashboardModule } from './dashboard/dashboard.module';
import { RoomModule } from './room/room.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        DashboardModule,
        RoomModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        NavbarComponent,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
