import { players } from './models/players';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   turn : boolean = true
   players : players[] = [{name:'player1',score:0},{name:'player2',score:0}]

  turnHandler( turn : boolean ){

    this.turn = turn;

  }
  playersHandler( players : players[] ){

      this.players = players;
  }




}
