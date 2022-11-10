import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { FizzingbrainService } from 'src/app/service/fizzingbrain.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.scss']
})
export class HeadbarComponent implements OnInit {
  gameDifficulty !: string;
  gameDifficultySubscription!: Subscription;
  errorMargin!: number | 30;
  errorMarginSubscription!: Subscription;
  timeLeft!: number;
  timeLeftSubscription!: Subscription;

  constructor(public translate: TranslateService, protected data: FizzingbrainService) {

  }

  ngOnInit(): void {
    this.errorMarginSubscription = this.data.currentErrorMarginEnemy.subscribe(errorMargin => this.errorMargin = errorMargin)
    this.gameDifficultySubscription = this.data.currentDifficulty.subscribe(currentDifficulty => this.gameDifficulty = currentDifficulty)
    this.timeLeftSubscription = this.data.currentTimeLeft.subscribe(timeLeft => this.timeLeft = timeLeft)
  }

  setDifficulty(value: string): void {
    this.gameDifficulty = value;
    this.data.changeGameDifficulty(value);
  }
}


