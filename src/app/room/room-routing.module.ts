import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RoomLoaderComponent } from './room-loader/room-loader.component';
import { RoomResolver } from './room-resolver.service';

const roomRoutes: Routes = [{
    path: 'room/:id',
    component: RoomLoaderComponent,
    resolve: {
        room: RoomResolver
    }
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(roomRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RoomRoutingModule { }
