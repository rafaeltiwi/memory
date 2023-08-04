import { players } from './../../models/players';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  @Input() turn : boolean = true;
  @Input() players : players[] = [{name:'player1',score:0},{name:'player2',score:0}];





}
