import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

import { Card } from '../../models/Card';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  pairnum: string;
  cards: Card[];
  flippedCards: Card[];
  matchedCards: Card[];
  icons: string[];

  isGameOver: boolean;
  clickCounter: number;
  canClick: boolean;


  constructor(private route: ActivatedRoute,
    private router: Router) {
       this.icons=['home', 'play_circle', 'favorite', 'info', 'settings', 'search', 'schedule', 'mic', 'visibility', 'store'];

     }

  ngOnInit(): void {
    this.pairnum = this.route.snapshot.paramMap.get('pairnum');
    this.isGameOver = false;
    this.clickCounter = 0;
    this.canClick=true;
    this.generateCards(this.pairnum);
    this.shuffleArray(this.cards);
  }

  generateCards(pn) {
    this.flippedCards = new Array();
    this.matchedCards = new Array();
    this.cards = new Array();
    for (let i = 0; i < pn; i++) {
      this.cards.push(new Card(this.icons[i]));
      this.cards.push(new Card(this.icons[i]));
    }
  }

  clickedOnCard(card: Card) {
    if (!card.flipped && this.canClick) {
      card.flipped = true;
      this.flippedCards.push(card);
      if (this.flippedCards.length == 2) {
        this.clickCounter++;
        this.checkMatch();
      }
    }

  }

  checkMatch() {
    this.canClick=false;
    if (this.flippedCards[0].value === this.flippedCards[1].value) {
      this.correct(this.flippedCards[0]);
      this.canClick=true;
    }
    else {
      var that = this;
      setTimeout(() => {
        that.flippedCards[0].flipped = false;
        that.flippedCards[1].flipped = false;
        that.flippedCards = [];
        this.canClick=true;
      }, 2000);
    }

    if (this.matchedCards.length == parseInt(this.pairnum)) {
      this.gameOver();
    }
  }

  gameOver() {
    this.isGameOver = true;
  }

  correct(card: Card) {
    this.matchedCards.push(card);
    this.flippedCards = [];
  }

  replay(){
    this.ngOnInit();
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }
  navToMain(){
    this.router.navigate(['']);
  }

}
