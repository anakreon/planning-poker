import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { RoomService, Room } from '../room.service';
import { VoteService } from '../vote.service';

@Component({
    selector: 'app-room-cards',
    templateUrl: './room-cards.component.html',
    styleUrls: ['./room-cards.component.css']
})
export class RoomCardsComponent implements OnInit, OnDestroy {
    @Input() private roomId: string;
    @Input() private currentPlayerId: string;
    public room: Observable<Room>;
    public vote: string;
    private voteSubscription: Subscription;

    constructor (private roomService: RoomService, private voteService: VoteService) {}

    public ngOnInit (): void {
        this.room = this.roomService.getRoom(this.roomId);
        this.voteSubscription = this.voteService.getVotedValue(this.roomId, this.currentPlayerId).subscribe((vote: string) => {
            this.vote = vote;
        });
    }

    public ngOnDestroy (): void {
        this.voteSubscription.unsubscribe();
    }

    public selectCardValue (value: string): void {
        this.voteService.vote(this.roomId, this.currentPlayerId, value);
    }

}
