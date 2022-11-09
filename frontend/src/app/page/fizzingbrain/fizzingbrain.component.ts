import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { QuestionService } from 'src/app/service/question.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { IconModule } from 'src/app/common/icon/icon.module';


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
  timeLeft: number = 15;
  interval: any;
  thereIsTime = true;


  constructor(private config: ConfigService,
    private questionService: QuestionService,
    private router: Router,
    public translate: TranslateService,
    private notifyService: NotificationService) {

  }

  ngOnInit(): void {
    this.questionService.getRandomQuestions().subscribe((response) => {
      this.questions = response;
      this.actualQuestion = this.questions[0];
    });
    this.translate.onLangChange.subscribe((language) => {
      this.langChange = language;
      this.startTimer();
    });
  }

  nextQuestion() {
    if (this.counter > this.questions.length) {
      this.counter = 0;
      this.startTimer();
    }
    if (this.questions.length !== 6) {
      this.notifyService.showError('The number of pack of questions are not right.', 'FizzingBrain v.1.0.0')
    } else {
      this.actualQuestion = this.questions[this.counter];
      this.resetTimer();
      // evaluation();
    }
    this.counter++;

  }

  evaluation() {
    throw new Error('Function not implemented.');
    this.gettingPoint();

  }

  gettingPoint() {
    throw new Error('Function not implemented.');
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
