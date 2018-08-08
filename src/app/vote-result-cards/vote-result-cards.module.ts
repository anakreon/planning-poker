import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatCardModule } from '@angular/material';

import { CardComponent } from './card/card.component';
import { CardContainerComponent } from './card-container/card-container.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatCardModule
    ],
    declarations: [
        CardComponent,
        CardContainerComponent
    ],
    exports: [
        CardContainerComponent
    ]
})
export class VoteResultCardsModule { }
