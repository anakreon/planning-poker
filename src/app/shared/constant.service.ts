import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Constant {
    public readonly collection = Object.freeze({
        rooms: 'rooms',
        players: 'players',
        status: 'status'
    });
    public readonly playerRole = Object.freeze({
        moderator: 'moderator',
        player: 'player',
        observer: 'observer'
    });
    public readonly storage = Object.freeze({
        defaultPlayerNameKey: 'defaultPlayerName'
    });
    public readonly cards = Object.freeze({
        selection: ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '∞', '☕', '?'],
        preSelected: ['1', '2', '3', '5', '8', '13', '21', '34', '55', '89']
    });
}
