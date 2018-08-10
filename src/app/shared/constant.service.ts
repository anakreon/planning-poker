import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Constant {
    public readonly collection = {
        rooms: 'rooms',
        players: 'players',
        status: 'status'
    };
    public readonly playerRole = {
        moderator: 'moderator',
        player: 'player',
        observer: 'observer'
    };
    public readonly storage = {
        defaultPlayerNameKey: 'defaultPlayerName'
    };
}
