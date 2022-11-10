import { FizzingbrainService } from './../../service/fizzingbrain.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { QuestionService } from 'src/app/service/question.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { IconModule } from 'src/app/common/icon/icon.module';
import { combineLatestAll, Subscription } from 'rxjs';
import { ThumbsDown } from 'angular-feather/icons';
import { combineLatest } from 'rxjs/internal/operators/combineLatest';


@Component({
  selector: 'app-fizzingbrain',
  templateUrl: './fizzingbrain.component.html',
  styleUrls: ['./fizzingbrain.component.scss']
})
export class FizzingbrainComponent implements OnInit {
  packOfQuestions$ = this.questionService.getRandomQuestions();
  questions: Question[] = [];
  actualQuestion!: Question;
  counter = 0;
  langChange!: LangChangeEvent;
  language = 'hu';

  interval: any;
  thereIsTime = true;
  gameHasStarted = false;
  gameHasEnded = false;

  computerGuess = 0;
  playerGuess = 0;
  computerPoint = 0;
  playerPoint = 0;
  maxRound = this.questions.length | 6;


  gameDifficulty !: string;
  gameDifficultySubscription!: Subscription;
  timeLeft!: number;
  timeStandard!: number;
  timeLeftSubscription!: Subscription;
  errorMargin!: number;
  errorMarginSubscription!: Subscription;
  questionSubscription!: Subscription;

  constructor(private config: ConfigService,
    private questionService: QuestionService,
    private router: Router,
    public translate: TranslateService,
    private notifyService: NotificationService,
    protected data: FizzingbrainService) {

  }

  startGame() {
    this.gameHasStarted = true;
    this.thereIsTime = true;
    this.counter = 0;
    this.playerPoint = 0;
    this.computerPoint = 0;
    this.playerGuess = 0;
    this.gameHasEnded = false;
    this.nextQuestion();
    this.startTimer();
  }

  ngOnInit(): void {

    // this.gameDifficultySubscription = this.data.currentDifficulty.subscribe((currentDifficulty) => {
    //   this.gameDifficulty = currentDifficulty
    // });
    // this.errorMarginSubscription = this.data.currentErrorMarginEnemy.subscribe((errorMargin) => {
    //   this.errorMargin = errorMargin;
    // });
    this.questionService.getRandomQuestions().subscribe((response) => {
      this.questions = response;
      // this.actualQuestion = this.questions[0];
    });
    // this.data.currentTimeLeft.subscribe((timeLeft) => {
    //   this.timeLeft = timeLeft
    // });

    // this.translate.onLangChange.subscribe((language) => {
    //   this.langChange = language;
    // });
    console.log(this.gameDifficulty);
  }

  nextQuestion() {
    // if (this.questions.length !== 6) {
    //   this.notifyService.showError('The number of pack of questions are not right.', 'FizzingBrain v.1.0.0')
    // } else {

    if (this.counter >= this.maxRound) {
      this.gettingPoint();
      setTimeout(() => {
        this.evaluation();
      }, 3000);
    } else {
      this.actualQuestion = this.questions[this.counter];
      this.resetTimer();
      this.computerGuesses();
      this.gettingPoint();
      this.counter++;
    }
    // evaluation();
    // }

  }

  computerGuesses() {
    // this.computerGuess = 0;
    const solution = Number(this.actualQuestion.englishAnswer);
    const min = Math.ceil(solution * ((100 - this.errorMargin) / 100));
    const max = Math.floor(solution * ((100 + this.errorMargin) / 100));
    this.computerGuess = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(min);
    console.log(max);
    console.log(this.errorMargin);
    console.log(this.gameDifficulty);
  }

  evaluation() {
    this.gameHasEnded = true;
    this.gameHasStarted = false;
    if (this.gameHasEnded) {
      if (this.computerPoint === this.playerPoint) {
        this.notifyService.showWarning('We have reached the end of the game. A draw has been reached.', 'Fizzingbrain v.1.0.0')
      } else if (this.computerPoint > this.playerPoint) {
        this.notifyService.showError('We have reached the end of the game. It is the computer that wins.', 'Fizzingbrain v.1.0.0')
      } else {
        this.notifyService.showSuccess('We have reached the end of the game. A win has been achieved by the player.', 'Fizzingbrain v.1.0.0')
      }
    }
  }

  gettingPoint() {
    let solution = Number(this.actualQuestion.englishAnswer);
    let diffComp = Math.abs(solution - this.computerGuess);
    let diffPlayer = Math.abs(solution - this.playerGuess);
    if (this.gameHasStarted) {
      console.log('comp' + this.computerGuess);
      console.log('player' + this.playerGuess);

      if (diffComp > diffPlayer || diffPlayer === 0) {
        this.notifyService.showInfo('A JÁTÉKOS tippje jobb volt. Ő kap pontot.', 'Fizzingbrain v.1.0.0')
        this.playerPoint += 5;
      } else if (diffComp < diffPlayer || diffComp === 0) {
        this.notifyService.showInfo('A COMPUTER tippje jobb volt. Ő kap pontot.', 'Fizzingbrain v.1.0.0')
        this.computerPoint += 5;
      } else if (diffComp === 0 && diffPlayer === 0) {
        this.notifyService.showInfo('A MINDKÉT tippje ugyanolyan jó volt volt. Mindketten kapnak pontot.', 'Fizzingbrain v.1.0.0')
        this.computerPoint += 5;
        this.playerPoint += 5;
      }
    }
    this.playerGuess = 0;
  }


  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.thereIsTime = false;
        this.nextQuestion();
      }
    }, 1000)
  }

  resetTimer() {
    this.thereIsTime = true;
    this.timeLeft = this.timeStandard;
  }

  restartGame() {
    // this.data.changeNewGameWanted(true);
    // this.data.changeSelectedDeckSize(this.deckSize);

    this.gameHasEnded = true;
    this.playerPoint = 0;
    this.computerPoint = 0;
    this.counter = 0;
    this.startGame();
  }

  setDifficulty(value: string): void {
    this.gameDifficulty = value;
    this.setDifficultyValues(value);
  }

  randomDifficulty() {
    const difficulties = ['easy', 'medium', 'hard', 'impossible', 'random']
    let item = difficulties[Math.floor(Math.random() * difficulties.length)];

    if (item == 'random') {
      item = '';
      item = difficulties[Math.floor(Math.random() * difficulties.length)];
    }
    this.gameDifficulty = item;
    this.setDifficultyValues(item);
  }

  setDifficultyValues(value: string) {
    switch (value) {
      case 'easy':
        this.timeLeft = 20
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
        // this.changeGameDifficulty('easy');
        // this.timeLeft = 20);
        // this.errorMargin = 30;
        break;
    }
  }
}
