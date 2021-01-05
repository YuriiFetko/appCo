import {Component, OnInit} from '@angular/core';
import {cards} from './mocks';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public cards;

  constructor() {
  }

  ngOnInit(): void {
    this.cards = cards;
  }

}
