import { players } from './../../models/players';
import { cards } from './../../Cards';
import { Component,Output,EventEmitter, } from '@angular/core';


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
  players: players[] = [
    {
      name: 'player 1',
      score: 0,
    },
    {
      name: 'player 2',
      score: 0,
    },
  ];
//passing the data to nav
  @Output() turnChange: EventEmitter<boolean> = new EventEmitter();
  @Output() playersChange: EventEmitter<players[]> = new EventEmitter();

  //setting the cards
  cards = [...cards];

  //get de id of teh card
  getCard(index: number  ) {
    // algorimt to just compare two cards
    if (this.cond === false) {
      this.firstValue = this.cards[index].id;
      this.cond = true;
      this.cards[index].show = true
      setTimeout(() => {
       this.cards[index].show = false

      }, 1000);


    } else {

      this.cards[index].show = true
      setTimeout(() => {
        this.cards[index].show = false

       }, 1000);

      this.secondValue =  this.cards[index].id;
      this.compareValues(this.firstValue, this.secondValue);
      this.cond = false;

    }
  }




  //compare de values (id) of two cards
  compareValues(a: number, b : number) {
    if (a === b) {
      if (this.turn) {
        this.players[0].score++;
      } else {
        this.players[1].score++;
      }

      this.turn = !this.turn;
      this.turnChange.emit(this.turn);
      this.playersChange.emit(this.players);
    } else {
      //handle when they miss!!
      this.turn = !this.turn;
      this.turnChange.emit(this.turn);
    }
  }

  // put the cards in a ramdom position...
  ramdomPlay() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }


}
