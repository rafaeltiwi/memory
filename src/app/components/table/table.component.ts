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
  selectedCards: number[] = [];
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
  getCard(index: number) {
    // algorimt to just compare two cards
    if (this.cond === false) {
      //getting the first card
      this.firstValue = this.cards[index].id;
      this.cond = true;
      this.selectedCards.push(index);

      //showing the first card
      this.cards[index].show = true;
    } else {
      //getting the second card
      this.secondValue = this.cards[index].id;

      this.cond = false;
      this.selectedCards.push(index);

      //showing teh second card
      this.cards[index].show = true;
    }
    if (this.selectedCards.length == 2) {

      setTimeout(() => {
        this.cards[this.selectedCards[0]].show = false;
        this.cards[this.selectedCards[1]].show = false;
        this.selectedCards = []
        this.compareValues(this.firstValue, this.secondValue);
      }, 1000);

    }
  }

  //compare de values (id) of two cards
  compareValues(a: number, b: number) {
    if (a === b) {
      if (this.turn) {
        this.players[0].score++;
        this.matchedCard(a)

      } else {
        this.matchedCard(a)
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

  //turning the matched card into none

  matchedCard(a : number){
    this.cards.filter(e=>e.id == a).forEach( e  => e.match = true )

  }

  // put the cards in a ramdom position...
  ramdomPlay() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}
