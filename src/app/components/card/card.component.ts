import { card } from './../../models/card.model';
import { Component, Input, Output } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent  {


  @Input() card : card = {
    id:0,
    img:'',
    show:false

  };










  }



