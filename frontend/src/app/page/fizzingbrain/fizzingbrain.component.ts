import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { QuestionService } from 'src/app/service/question.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FizzingbrainService } from 'src/app/service/fizzingbrain.service';

@Component({
  selector: 'app-fizzingbrain',
  templateUrl: './fizzingbrain.component.html',
  styleUrls: ['./fizzingbrain.component.scss']
})
export class FizzingbrainComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  counter = 1;
  langChange!: LangChangeEvent;
  language = 'hu'; // Alapértelmezett nyelv beállítása
  showCount = 0;
  winner = '';

  executed!: boolean;

  interval: any;
  thereIsTime = true;
  gameHasStarted = false;
  gameHasEnded = false;
  isRevealAnswer = false;

  computerGuess = 0;
  playerGuess = 0;
  computerPoint = 0;
  playerPoint = 0;
  maxRound!: number;

  gameHasEndedSubscription!: Subscription;
  gameHasStartedSubscription!: Subscription;

  gameDifficulty!: string;
  gameDifficultySubscription!: Subscription;
  timeLeft!: number;
  timeStandard!: number;
  timeLeftSubscription!: Subscription;
  errorMargin!: number;
  errorMarginSubscription!: Subscription;
  questionSubscription!: Subscription;

  constructor(
    private config: ConfigService,
    private questionService: QuestionService,
    public translate: TranslateService,
    private notifyService: NotificationService,
    private data: FizzingbrainService
  ) {
    this.translate.setDefaultLang('hu'); // Alapértelmezett nyelv beállítása
    this.translate.use('hu'); // Alapértelmezett nyelv használata
  }

  ngOnInit(): void {
    this.questionSubscription = this.questionService.getRandomQuestions().subscribe((response) => {
      if (response) {
        this.questions = response;
        this.maxRound = this.questions.length || 6;
      }
    });
    this.gameHasStartedSubscription = this.data.currentGameStartingState.subscribe((current: boolean) => {
      this.gameHasStarted = current;
    });
    this.gameHasEndedSubscription = this.data.currentGameEndingState.subscribe((current: boolean) => {
      this.gameHasEnded = current;
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.langChange = event;
      this.language = event.lang;
    });
  }

  ngOnDestroy() {
    this.questionSubscription.unsubscribe();
    this.gameHasEndedSubscription.unsubscribe();
    this.gameHasStartedSubscription.unsubscribe();
  }

  startGame() {
    if (this.questions.length === 6) {
      this.data.changeGameStartingState(true);
      this.thereIsTime = true;
      this.winner = '';
      this.counter = 0;
      this.showCount = 0;
      this.playerPoint = 0;
      this.computerPoint = 0;
      this.playerGuess = 0;
      this.data.changeGameEndingState(false);
      this.isRevealAnswer = false;
      this.setDifficulty(this.gameDifficulty);
      this.nextQuestion();
      this.startTimer();
    } else {
      this.notifyService.showError(
        this.translate.instant('FIZZINGBRAIN.PACKERROR'),
        this.translate.instant('FIZZINGBRAIN.FIZZINGBRAIN_TITLE')
      );
      console.log(this.questions.length);
    }
  }

  nextQuestion() {
    if (this.counter >= this.maxRound) {
      this.gettingPoint();
      setTimeout(() => {
        this.executed = false;
        this.evaluation();
      }, 3000);
    } else if (this.questions.length > this.counter) {
      this.isRevealAnswer = false;
      this.computerGuesses();
      this.gettingPoint();
      this.executed = false;
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.thereIsTime = false;
        if (!this.executed) {
          this.executed = true;
          this.nextQuestion();
        }
      }
    }, 1000);
  }

  resetTimer() {
    this.thereIsTime = true;
    this.timeLeft = this.timeStandard;
  }

  computerGuesses() {
    const solution = Number(this.questions[this.counter]?.englishAnswer);
    const min = Math.ceil(solution * ((100 - this.errorMargin) / 100));
    const max = Math.floor(solution * ((100 + this.errorMargin) / 100));
    this.computerGuess = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  gettingPoint() {
    if (this.playerGuess != 0 || !this.thereIsTime) {
      const solution = Number(this.questions[this.counter]?.englishAnswer);
      const diffComp = Math.abs(solution - this.computerGuess);
      const diffPlayer = Math.abs(solution - this.playerGuess);
      if (this.data.currentGameStartingState) {
        if (diffComp === 0 && diffPlayer === 0) {
          this.notifyService.showInfo(
            this.translate.instant('FIZZINGBRAIN.BOTHGETPOINT'),
            this.translate.instant('FIZZINGBRAIN.FIZZINGBRAIN_TITLE')
          );
          this.computerPoint += 5;
          this.playerPoint += 5;
        } else if (diffComp < diffPlayer || diffComp === 0) {
          this.notifyService.showInfo(
            this.translate.instant('FIZZINGBRAIN.COMPUTERGETSPOINT'),
            this.translate.instant('FIZZINGBRAIN.FIZZINGBRAIN_TITLE')
          );
          this.computerPoint += 5;
        } else if (diffComp > diffPlayer || diffPlayer === 0) {
          this.notifyService.showInfo(
            this.translate.instant('FIZZINGBRAIN.PLAYERGETSPOINT'),
            this.translate.instant('FIZZINGBRAIN.FIZZINGBRAIN_TITLE')
          );
          this.playerPoint += 5;
        }
      }
      this.playerGuess = 0;
      this.revealAnswer();
    }
  }

  revealAnswer() {
    if (this.gameHasEnded) return; // Ellenőrzés, hogy a játék véget ért-e

    clearInterval(this.interval);
    this.resetTimer();
    this.isRevealAnswer = true;
    this.notifyService.showInfo(
      this.translate.instant('FIZZINGBRAIN.ANSWER') + ': ' + this.questions[this.counter]?.englishAnswer,
      this.translate.instant('FIZZINGBRAIN.FIZZINGBRAIN_TITLE')
    );
    setTimeout(() => {
      if (!this.gameHasEnded) { // Ellenőrzés, hogy a játék véget ért-e
        this.counter++;
        this.startTimer();
        this.nextQuestion();
      }
    }, 3000);
  }

  evaluation() {
    this.data.changeGameEndingState(true);
    this.data.changeGameStartingState(false);
    if (this.data.currentGameEndingState && this.showCount < 1) {
      if (this.computerPoint === this.playerPoint) {
        this.notifyService.showWarning(
          this.translate.instant('FIZZINGBRAIN.DRAW'),
          this.translate.instant('FIZZINGBRAIN.FIZZINGBRAIN_TITLE')
        );
        this.winner = 'both player';
        this.showCount++;
      } else if (this.computerPoint > this.playerPoint) {
        this.showCount++;
        this.winner = 'Computer';
        this.notifyService.showError(
          this.translate.instant('FIZZINGBRAIN.COMPUTERWINS'),
          this.translate.instant('FIZZINGBRAIN.FIZZINGBRAIN_TITLE')
        );
      } else {
        this.showCount++;
        this.winner = 'Player';
        this.notifyService.showSuccess(
          this.translate.instant('FIZZINGBRAIN.PLAYERWINS'),
          this.translate.instant('FIZZINGBRAIN.FIZZINGBRAIN_TITLE')
        );
      }
    }
  }

  setDifficulty(value: string): void {
    this.gameDifficulty = value;
    this.setDifficultyValues(value);
  }

  setDifficultyValues(value: string) {
    switch (value) {
      case 'easy':
        this.timeLeft = 20;
        this.timeStandard = 20;
        this.errorMargin = 30;
        break;
      case 'medium':
        this.timeLeft = 15;
        this.timeStandard = 15;
        this.errorMargin = 20;
        break;
      case 'hard':
        this.timeLeft = 10;
        this.timeStandard = 10;
        this.errorMargin = 10;
        break;
      case 'impossible':
        this.timeLeft = 5;
        this.timeStandard = 5;
        this.errorMargin = 5;
        break;
      case 'random':
        this.randomDifficulty();
        break;
      default:
        this.gameDifficulty = 'easy';
        this.timeLeft = 20;
        this.timeStandard = 20;
        this.errorMargin = 30;
        break;
    }
  }

  randomDifficulty() {
    const difficulties = ['easy', 'medium', 'hard', 'impossible', 'random'];
    let item = '';
    do {
      item = difficulties[Math.floor(Math.random() * difficulties.length)];
    } while (item === 'random');
    this.gameDifficulty = item;
    this.notifyService.showInfo(
      this.translate.instant('FIZZINGBRAIN.CHOSEN_DIFFICULTY') + ': ' + item,
      this.translate.instant('FIZZINGBRAIN.FIZZINGBRAIN_TITLE')
    );
    this.setDifficultyValues(item);
  }

  restartGame() {
    window.location.reload();
  }
}
