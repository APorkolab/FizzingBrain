import { FizzingbrainService } from './../../service/fizzingbrain.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { QuestionService } from 'src/app/service/question.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { IconModule } from 'src/app/common/icon/icon.module';
import { Subscription } from 'rxjs';
import { ThumbsDown } from 'angular-feather/icons';


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

  interval: any;
  thereIsTime = true;

  computerGuess = 0;
  playerGuess = 0;
  computerPoint = 0;
  playerPoint = 0;


  gameDifficulty !: string;
  gameDifficultySubscription!: Subscription;
  timeLeft!: number;
  timeLeftSubscription!: Subscription;
  errorMargin!: number | 30;
  errorMarginSubscription!: Subscription;


  constructor(private config: ConfigService,
    private questionService: QuestionService,
    private router: Router,
    public translate: TranslateService,
    private notifyService: NotificationService,
    private data: FizzingbrainService) {

  }

  ngOnInit(): void {
    this.thereIsTime = true;
    this.questionService.getRandomQuestions().subscribe((response) => {
      this.questions = response;
      this.actualQuestion = this.questions[0];
      this.startTimer();
      this.computerGuesses();
    });
    this.translate.onLangChange.subscribe((language) => {
      this.langChange = language;
    });
    this.gameDifficultySubscription = this.data.currentDifficulty.subscribe(currentDifficulty => this.gameDifficulty = currentDifficulty)
    this.timeLeftSubscription = this.data.currentTimeLeft.subscribe(timeLeft => this.timeLeft = timeLeft)
    this.errorMarginSubscription = this.data.currentErrorMarginEnemy.subscribe(errorMargin => this.errorMargin = errorMargin)
    console.log(this.gameDifficulty);
  }

  changeInput(event: Event) {
    this.playerGuess = Number(event.target?.addEventListener.toString);
  }

  nextQuestion() {
    // if (this.counter > this.questions.length - 1) {
    //   this.counter = 0;
    //   this.startTimer();
    // }
    if (this.counter = this.questions.length) {
      this.evaluation();
    }
    if (this.questions.length !== 6) {
      this.notifyService.showError('The number of pack of questions are not right.', 'FizzingBrain v.1.0.0')
    } else {
      this.actualQuestion = this.questions[this.counter];
      this.resetTimer();
      this.computerGuesses();
      this.gettingPoint();
      // evaluation();
    }
    this.counter++;

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
    if (this.computerPoint = this.playerPoint) {
      this.notifyService.showWarning('We have reached the end of the game. A draw has been reached.', 'Fizzingbrain v.1.0.0')
    } else {
      if (this.computerPoint > this.playerPoint) {
        this.notifyService.showError('We have reached the end of the game. It is the computer that wins.', 'Fizzingbrain v.1.0.0')
      } else {
        this.notifyService.showSuccess('We have reached the end of the game. A win has been achieved by the player.', 'Fizzingbrain v.1.0.0')
      }
    }
  }

  gettingPoint() {
    if (this.playerGuess != 0 || this.playerGuess != null) {
      const solution = Number(this.actualQuestion.englishAnswer);
      const diffComp = solution - this.computerGuess;
      const diffPlayer = solution - this.playerGuess;
      if (diffComp > diffPlayer) {
        this.playerPoint += 5;
      } else {
        this.computerPoint += 5;
      }
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.thereIsTime = false;
      }
    }, 1000)
  }

  resetTimer() {
    this.thereIsTime = true;
    this.timeLeft = 15;
  }

}
