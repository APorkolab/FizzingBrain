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
  counter = 1;
  langChange!: LangChangeEvent;
  language = 'hu';
  showCount = 0;
  winner = '';

  interval: any;
  thereIsTime = true;
  gameHasStarted = false;
  gameHasEnded = false;
  isRevealAnswer = false;

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
    translate.addLangs(['en', 'hu']);
    translate.setDefaultLang('hu');

    const browserLang = translate.getBrowserLang();

    try {
      translate.use(browserLang?.match(/en|hu/) ? browserLang : 'en');
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {

    // this.gameDifficultySubscription = this.data.currentDifficulty.subscribe((currentDifficulty) => {
    //   this.gameDifficulty = currentDifficulty
    // });
    // this.errorMarginSubscription = this.data.currentErrorMarginEnemy.subscribe((errorMargin) => {
    //   this.errorMargin = errorMargin;
    // });
    this.questionSubscription = this.questionService.getRandomQuestions().subscribe((response) => {
      if (response) {
        this.questions = response;
        // this.actualQuestion = this.questions[0];
      }
      // this.actualQuestion = this.questions[0];
    });

    // this.data.currentTimeLeft.subscribe((timeLeft) => {
    //   this.timeLeft = timeLeft
    // });

    this.translate.onLangChange.subscribe((language) => {
      if (language) {
        this.langChange = language;
      }
    });
    console.log(this.gameDifficulty);
  }

  ngOnDestroy() {
    this.questionSubscription.unsubscribe()
  }

  startGame() {
    if (this.questions.length === 6) {
      this.gameHasStarted = true;
      this.thereIsTime = true;
      this.winner = '';
      this.counter = 0;
      this.showCount = 0;
      this.playerPoint = 0;
      this.computerPoint = 0;
      this.playerGuess = 0;
      this.gameHasEnded = false;
      this.isRevealAnswer = false;
      this.nextQuestion();
      this.startTimer();
      // this.computerGuesses();
      // this.gettingPoint();
    } else {
      this.notifyService.showError('The number of pack of questions are not right.', 'FizzingBrain v.1.0.0')
      console.log(this.questions.length);
    }
    // this.nextQuestion();
  }

  nextQuestion() {
    // this.startTimer();
    if (this.counter >= this.maxRound) {
      this.gettingPoint();
      setTimeout(() => {
        this.evaluation();
      }, 3000);
    } else {
      this.isRevealAnswer = false;
      this.computerGuesses();
      this.gettingPoint();
    }
  }

  //Start timer in the beginning of every game
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

  //After every question
  resetTimer() {
    this.thereIsTime = true;
    this.timeLeft = this.timeStandard;
  }


  //AI guessing
  computerGuesses() {
    // this.computerGuess = 0;
    const solution = Number(this.questions[this.counter].englishAnswer);
    const min = Math.ceil(solution * ((100 - this.errorMargin) / 100));
    const max = Math.floor(solution * ((100 + this.errorMargin) / 100));
    this.computerGuess = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(min);
    console.log(max);
    console.log(this.errorMargin);
    console.log(this.gameDifficulty);
  }

  //Giving points after every question
  gettingPoint() {
    if (this.playerGuess != 0) {
      let solution = Number(this.questions[this.counter].englishAnswer);
      let diffComp = Math.abs(solution - this.computerGuess);
      let diffPlayer = Math.abs(solution - this.playerGuess);
      if (this.gameHasStarted) {
        console.log('solution:' + solution);
        console.log('comp guess' + this.computerGuess);
        console.log('player guess' + this.playerGuess);
        console.log('diffComp' + diffComp);
        console.log('diffPlayer' + diffPlayer);

        if (diffComp === 0 && diffPlayer === 0) {
          this.notifyService.showInfo('Both guesses were equally good. BOTH PLAYERS get points.', 'Fizzingbrain v.1.0.0')
          this.computerPoint += 5;
          this.playerPoint += 5;
        } else if (diffComp < diffPlayer || diffComp === 0) {
          this.notifyService.showInfo('The COMPUTER guess was better. It gets points.', 'Fizzingbrain v.1.0.0')
          this.computerPoint += 5;
        } else if (diffComp > diffPlayer || diffPlayer === 0) {
          this.notifyService.showInfo('The PLAYER\'s guess was better.He\/She gets points.', 'Fizzingbrain v.1.0.0')
          this.playerPoint += 5;
        }
      }
      this.playerGuess = 0;
      this.revealAnswer();
    }
  }

  revealAnswer() {
    clearInterval(this.interval);
    this.resetTimer();
    this.isRevealAnswer = true;
    this.notifyService.showInfo('The answer of this question: ' + this.questions[this.counter].englishAnswer, 'Fizzingbrain v.1.0.0')
    setTimeout(() => {
      this.counter++;
      this.startTimer();
      this.nextQuestion();
    }, 3000);

  }

  //Full game evaluation after 6 questions
  evaluation() {
    this.gameHasEnded = true;
    this.gameHasStarted = false;
    if (this.gameHasEnded && this.showCount < 1) {
      if (this.computerPoint === this.playerPoint) {
        this.notifyService.showWarning('We have reached the end of the game. A draw has been reached.', 'Fizzingbrain v.1.0.0')
        this.winner = 'both player';
        this.showCount++;
      } else if (this.computerPoint > this.playerPoint) {
        this.showCount++;
        this.winner = 'Computer';
        this.notifyService.showError('We have reached the end of the game. It is the computer that wins.', 'Fizzingbrain v.1.0.0')
      } else {
        this.showCount++;
        this.winner = 'Player';
        this.notifyService.showSuccess('We have reached the end of the game. A win has been achieved by the player.', 'Fizzingbrain v.1.0.0')
      }
    }
  }

  //Dificulty settings

  setDifficulty(value: string): void {
    this.gameDifficulty = value;
    this.setDifficultyValues(value);
  }

  randomDifficulty() {
    const difficulties = ['easy', 'medium', 'hard', 'impossible', 'random']
    let item = '';
    do {
      item = difficulties[Math.floor(Math.random() * difficulties.length)];
    } while (item === 'random')
    this.gameDifficulty = item;
    this.notifyService.showInfo('The choosen difficulty is ' + item, 'Fizzingbrain v.1.0.0')
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
      case undefined:
        this.gameDifficulty = 'easy';
        this.timeLeft = 20
        this.timeStandard = 20;
        this.errorMargin = 30;
        break;

      default:
        this.gameDifficulty = 'easy';
        this.timeLeft = 20
        this.timeStandard = 20;
        this.errorMargin = 30;
        break;
    }
  }

  restartGame() {
    window.location.reload();
  }
}
