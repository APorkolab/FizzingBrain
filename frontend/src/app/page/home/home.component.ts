
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FizzingbrainService } from 'src/app/service/fizzingbrain.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  gameDifficulty !: string;
  gameDifficultySubscription!: Subscription;

  constructor(public translate: TranslateService, protected data: FizzingbrainService) {
    //   translate.addLangs(['en', 'hu']);
    //   translate.setDefaultLang('hu');

    //   const browserLang = translate.getBrowserLang();

    //   try {
    //     translate.use(browserLang?.match(/en|hu/) ? browserLang : 'en');
    //   } catch (error) {
    //     console.log(error);
    //   }
  }

  ngOnInit(): void {
    this.gameDifficultySubscription = this.data.currentDifficulty.subscribe(currentDifficulty => this.gameDifficulty = currentDifficulty)

  }

  difficultyChange() {
    this.data.changeGameDifficulty(this.gameDifficulty);
  }
}



