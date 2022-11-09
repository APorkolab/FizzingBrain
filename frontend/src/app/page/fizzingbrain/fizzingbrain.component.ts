import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { QuestionService } from 'src/app/service/question.service';
import { TranslateService } from '@ngx-translate/core';

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
  language = this.translate.currentLang;

  constructor(private config: ConfigService,
    private questionService: QuestionService,
    private router: Router,
    public translate: TranslateService,
    private notifyService: NotificationService) {

  }

  ngOnInit(): void {
    this.questionService.getRandomQuestions().subscribe((response) => {
      this.questions = response;
    });
    console.log(this.language);
    console.log(this.translate.currentLang);
  }

  nextQuestion() {
    if (this.counter > this.questions.length) {
      this.counter = 0;
    }
    if (this.questions.length !== 5) {
      this.notifyService.showError('The number of pack of questions are not right.', 'FizzingBrain v.1.0.0')
    } else {
      this.actualQuestion = this.questions[this.counter];

    }
  }

}

