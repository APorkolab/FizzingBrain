import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IconModule } from 'src/app/common/icon/icon.module';
import { Question } from 'src/app/model/question';
import { ConfigService } from 'src/app/service/config.service';
import { FizzingbrainService } from 'src/app/service/fizzingbrain.service';
import { NotificationService } from 'src/app/service/notification.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  standalone: true,
  selector: 'app-fizzingbrain',
  templateUrl: './fizzingbrain.component.html',
  styleUrls: ['./fizzingbrain.component.scss'],
  imports: [
    CommonModule, // ngIf, ngFor, ngClass, number pipe alapok
    DecimalPipe, // hibaüzenet ezt külön kérte
    FormsModule, // ngModel
    TranslateModule, // | translate
    IconModule, // <i-feather>
  ],
})
export class FizzingbrainComponent implements OnInit, OnDestroy {
  questions: Question[] = [];
  counter = 0;
  language: string;
  showCount = 0;
  winner = '';
  executed = false;
  interval: any;
  thereIsTime = true;
  gameHasStarted = false;
  gameHasEnded = false;
  isRevealAnswer = false;
  computerGuess = 0;
  playerGuess = 0;
  computerPoint = 0;
  playerPoint = 0;
  maxRound = 6;
  private subscriptions = new Subscription();
  gameDifficulty = 'easy';
  timeLeft = 20;
  timeStandard = 20;
  errorMargin = 30;

  constructor(
    private config: ConfigService,
    private questionService: QuestionService,
    private translate: TranslateService,
    private notifyService: NotificationService,
    private data: FizzingbrainService,
  ) {
    this.language = this.translate.currentLang || 'hu';
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event) => {
      this.language = event.lang;
    });
    this.initializeSubscriptions();
    window.addEventListener('beforeunload', this.onBeforeUnload);
  }

  ngOnDestroy() {
    this.cleanup();
  }

  private initializeSubscriptions(): void {
    this.subscriptions.add(
      this.questionService.getRandomQuestions().subscribe((response) => {
        if (response) {
          this.questions = response;
          this.maxRound = Math.max(this.questions.length, 6);
        }
      }),
    );

    this.subscriptions.add(
      this.data.currentGameStartingState.subscribe((current: boolean) => {
        if (!this.gameHasStarted && current) {
          this.gameHasStarted = current;
        }
      }),
    );

    this.subscriptions.add(
      this.data.currentGameEndingState.subscribe((current: boolean) => {
        if (!this.gameHasEnded && current) {
          this.gameHasEnded = current;
          this.evaluateGame();
        }
      }),
    );

    this.subscriptions.add(
      this.translate.onLangChange.subscribe((event) => {
        this.language = event.lang;
      }),
    );
  }

  private cleanup(): void {
    this.subscriptions.unsubscribe();
    if (this.interval) clearInterval(this.interval);
    this.resetGame();
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

  private onBeforeUnload = (event: BeforeUnloadEvent): void => {
    this.cleanup();
    event.returnValue = 'Are you sure you want to leave?';
  };

  startGame(): void {
    if (this.questions.length === 0) {
      this.showNotification('error', 'FIZZINGBRAIN.NOQUESTIONS');
      return;
    }
    this.data.changeGameStartingState(true);
    this.resetGame();
    this.setDifficulty(this.gameDifficulty);
    this.nextQuestion();
    this.startTimer();
  }

  private resetGame(): void {
    if (this.interval) clearInterval(this.interval);
    Object.assign(this, {
      thereIsTime: true,
      winner: '',
      counter: 0,
      showCount: 0,
      playerPoint: 0,
      computerPoint: 0,
      playerGuess: 0,
      gameHasEnded: false,
      isRevealAnswer: false,
    });
  }

  public nextQuestion(): void {
    if (this.counter >= this.maxRound) {
      this.gettingPoint();
      setTimeout(() => {
        this.executed = false;
        this.evaluateGame();
      }, 3000);
    } else {
      this.isRevealAnswer = false;
      this.computerGuesses();
      this.gettingPoint();
      this.executed = false;
    }
  }

  private startTimer(): void {
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

  private resetTimer(): void {
    this.thereIsTime = true;
    this.timeLeft = this.timeStandard;
  }

  private computerGuesses(): void {
    const question = this.questions[this.counter];
    if (question) {
      const solution = Number(question.englishAnswer);
      if (!isNaN(solution)) {
        const { min, max } = this.calculateRange(solution);
        this.computerGuess = this.getRandomInt(min, max);
      } else {
        this.showNotification('error', 'FIZZINGBRAIN.INVALIDANSWER');
      }
    } else {
      this.showNotification('error', 'FIZZINGBRAIN.QUESTIONERROR');
    }
  }

  private calculateRange(solution: number): { min: number; max: number } {
    return {
      min: Math.ceil(solution * ((100 - this.errorMargin) / 100)),
      max: Math.floor(solution * ((100 + this.errorMargin) / 100)),
    };
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private gettingPoint(): void {
    if (this.playerGuess === 0 && this.thereIsTime) return;

    const question = this.questions[this.counter];
    if (question) {
      const solution = Number(question.englishAnswer);
      if (!isNaN(solution)) {
        const { diffComp, diffPlayer } = this.calculateDifferences(solution);
        this.updateScores(diffComp, diffPlayer);
        this.playerGuess = 0;
        this.revealAnswer();
      }
    }
  }

  private calculateDifferences(solution: number): {
    diffComp: number;
    diffPlayer: number;
  } {
    return {
      diffComp: Math.abs(solution - this.computerGuess),
      diffPlayer: Math.abs(solution - this.playerGuess),
    };
  }

  private updateScores(diffComp: number, diffPlayer: number): void {
    if (diffComp === 0 && diffPlayer === 0) {
      this.showNotification('info', 'FIZZINGBRAIN.BOTHGETPOINT');
      this.computerPoint += 5;
      this.playerPoint += 5;
    } else if (diffComp < diffPlayer || diffComp === 0) {
      this.showNotification('info', 'FIZZINGBRAIN.COMPUTERGETSPOINT');
      this.computerPoint += 5;
    } else {
      this.showNotification('info', 'FIZZINGBRAIN.PLAYERGETSPOINT');
      this.playerPoint += 5;
    }
  }

  private revealAnswer(): void {
    if (this.gameHasEnded) return;

    clearInterval(this.interval);
    this.resetTimer();
    this.isRevealAnswer = true;
    const question = this.questions[this.counter];
    if (question) {
      const answerText = this.translate.instant('FIZZINGBRAIN.ANSWER');
      const answer =
        this.language === 'hu'
          ? question.hungarianAnswer
          : question.englishAnswer;
      this.showNotification('info', `${answerText}: ${answer}`);
    } else {
      console.error('Question is undefined at counter:', this.counter);
    }
    setTimeout(() => {
      if (!this.gameHasEnded) {
        this.counter++;
        if (this.counter < this.questions.length) {
          this.startTimer();
          this.nextQuestion();
        } else {
          this.evaluateGame();
        }
      }
    }, 3000);
  }

  private evaluateGame(): void {
    if (this.showCount >= 1 || this.gameHasEnded) return;

    this.data.changeGameEndingState(true);
    this.data.changeGameStartingState(false);

    if (this.computerPoint === this.playerPoint) {
      if (this.language === 'hu') {
        this.showNotification('warning', 'FIZZINGBRAIN.DRAW');
        this.winner = 'mindkét játékos';
      } else {
        this.showNotification('warning', 'FIZZINGBRAIN.DRAW');
        this.winner = 'both players';
      }
    } else if (this.computerPoint > this.playerPoint) {
      if (this.language === 'hu') {
        this.showNotification('error', 'FIZZINGBRAIN.COMPUTERWINS');
        this.winner = 'Számítógép';
      } else {
        this.showNotification('error', 'FIZZINGBRAIN.COMPUTERWINS');
        this.winner = 'Computer';
      }
    } else {
      if (this.language === 'hu') {
        this.showNotification('success', 'FIZZINGBRAIN.PLAYERWINS');
        this.winner = 'Játékos';
      } else {
        this.showNotification('success', 'FIZZINGBRAIN.PLAYERWINS');
        this.winner = 'Player';
      }
    }
    this.showCount++;
  }

  setDifficulty(value: string): void {
    this.gameDifficulty = value;
    this.applyDifficultySettings(value);
  }

  private applyDifficultySettings(value: string): void {
    const difficultySettings: Record<
      string,
      { timeLeft: number; timeStandard: number; errorMargin: number }
    > = {
      easy: { timeLeft: 20, timeStandard: 20, errorMargin: 30 },
      medium: { timeLeft: 15, timeStandard: 15, errorMargin: 20 },
      hard: { timeLeft: 10, timeStandard: 10, errorMargin: 10 },
      impossible: { timeLeft: 5, timeStandard: 5, errorMargin: 5 },
    };

    if (value === 'random') {
      this.randomizeDifficulty();
    } else {
      const settings = difficultySettings[value] || difficultySettings['easy'];
      Object.assign(this, settings);
    }
  }

  private randomizeDifficulty(): void {
    const difficulties = ['easy', 'medium', 'hard', 'impossible'];
    this.gameDifficulty =
      difficulties[Math.floor(Math.random() * difficulties.length)];
    this.showNotification(
      'info',
      `FIZZINGBRAIN.CHOSEN_DIFFICULTY: ${this.gameDifficulty}`,
    );
    this.applyDifficultySettings(this.gameDifficulty);
  }

  private showNotification(
    type: 'info' | 'error' | 'success' | 'warning',
    messageKey: string,
  ): void {
    const message = this.translate.instant(messageKey);
    const title = this.translate.instant('FIZZINGBRAIN.FIZZINGBRAIN_TITLE');
    const notificationFunctions = {
      info: () => this.notifyService.showInfo(message, title),
      warning: () => this.notifyService.showWarning(message, title),
      error: () => this.notifyService.showError(message, title),
      success: () => this.notifyService.showSuccess(message, title),
    };
    notificationFunctions[type]();
  }

  restartGame(): void {
    this.resetGame();
    this.startGame();
  }
}
