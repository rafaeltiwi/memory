import { players } from './../../models/players';
import { cards } from './../../Cards';
import { Component,Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  constructor() {
    this.ramdomPlay();
  }

  firstValue = 0;
  secondValue = 0;
  cond = false;
  turn = true;
  players : players[]  = [
    {
      name: 'player 1',
      score: 0,
    },
    {
      name: 'player 2',
      score: 0,
    },
  ];

  @Output() turnChange: EventEmitter<boolean> = new EventEmitter();
  @Output() playersChange : EventEmitter<players[]> = new EventEmitter()

  cards = [...cards, ...cards];

  getCard(id: number) {
    if (this.cond === false) {
      this.firstValue = id;
      this.cond = true;
    } else {
      this.secondValue = id;
      this.compareValues(this.firstValue, this.secondValue);
      this.cond = false;
    }
  }

  compareValues(a: number, b: number) {
    if (a === b) {
      console.log(a, 'Es igual a ==> ', b, '      ', this.turn);

      if (this.turn) {
        this.players[0].score ++;
        console.log( this.players[0].name,' - ', this.players[0].score)
      }else{
        this.players[1].score ++;
        console.log(this.players[1].name,' - ',this.players[1].score)

      }
      this.turn = !this.turn;
      this.turnChange.emit(this.turn);
      this.playersChange.emit(this.players)
    } else {
      console.log('MISS!!!!!!', this.turn);
      this.turn = !this.turn;
      this.turnChange.emit(this.turn);
    }
  }


  ramdomPlay() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
    //  console.log(this.cards)
  }
}
