import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-player-list-item',
    templateUrl: './player-list-item.component.html',
    styleUrls: ['./player-list-item.component.scss']
})
export class PlayerListItemComponent {
    @Input('player') public player: { avatar: string, name: string };
}
