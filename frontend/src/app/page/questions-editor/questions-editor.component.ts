import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from 'src/app/model/question';
import { NotificationService } from 'src/app/service/notification.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-questions-editor',
  templateUrl: './questions-editor.component.html',
  styleUrls: ['./questions-editor.component.scss']
})
export class QuestionsEditorComponent implements OnInit {
  question$!: Observable<Question>;
  question: Question = new Question();
  entity = 'Question';

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (param) => {
        if (param['id'] == '0') {
          return of(new Question());
        }
        this.question$ = this.questionService.getOne(param['id']);
        return this.questionService.getOne(param['id']);
      },
    });
    this.question$.subscribe({
      next: (question) => (this.question = question ? question : this.question),
    });
  }

  onUpdate(question: Question) {
    this.questionService.update(question).subscribe({
      next: (category) => this.router.navigate(['/', 'question']),
      error: (err) => this.showError(err),
      complete: () => this.showSuccessEdit(),
    });
  }

  onCreate(question: Question) {
    this.questionService.create(question).subscribe({
      next: (category) => this.router.navigate(['/', 'question']),
      error: (err) => this.showError(err),
      complete: () => this.showSuccessCreate(),
    });
  }

  showSuccessEdit() {
    this.notifyService.showSuccess(
      `${this.entity} edited successfully!`,
      'FizzingBrain v.1.0.0'
    );
  }

  showSuccessCreate() {
    this.notifyService.showSuccess(
      `${this.entity} created successfully!`,
      'FizzingBrain v.1.0.0'
    );
  }

  showError(err: String) {
    this.notifyService.showError(
      'Something went wrong. Details:' + err,
      'FizzingBrain v.1.0.0'
    );
  }
}
function of(arg0: Question): void {
  throw new Error('Function not implemented.');
}

