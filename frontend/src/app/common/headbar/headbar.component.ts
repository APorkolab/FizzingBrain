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
  }

}


