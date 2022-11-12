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



  gameHasEnded!: boolean;
  gameHasEndedSubscription!: Subscription;
  gameHasStarted!: boolean;
  gameHasStartedSubscription!: Subscription;
  constructor(public translate: TranslateService, protected data: FizzingbrainService) {
    translate.addLangs(['en', 'hu']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.gameHasStartedSubscription = this.data.currentGameStartingState.subscribe((current) => {
      this.gameHasStarted = current
    });
    this.gameHasEndedSubscription = this.data.currentGameEndingState.subscribe((current) => {
      this.gameHasEnded = current
    });

  }
}
