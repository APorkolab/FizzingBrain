import { Component, OnInit } from '@angular/core';
import { FizzingbrainService } from 'src/app/service/fizzingbrain.service';
import { Subscription } from 'rxjs';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.scss']
})
export class HeadbarComponent implements OnInit {
  user$ = this.auth.user$;
  gameHasEnded!: boolean;
  gameHasEndedSubscription!: Subscription;
  gameHasStarted!: boolean;
  gameHasStartedSubscription!: Subscription;
  constructor(protected data: FizzingbrainService, private auth: AuthService) {
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
