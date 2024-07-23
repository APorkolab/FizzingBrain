import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { ConfigService } from 'src/app/service/config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { QuestionService } from 'src/app/service/question.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  columns = this.config.questionsColumn;
  list$ = this.questionService.getAll();
  packOfQuestions$ = this.questionService.getRandomQuestions();
  entity: string = 'question';

  constructor(
    private config: ConfigService,
    private questionService: QuestionService,
    private router: Router,
    private notifyService: NotificationService
  ) { }

  ngOnInit(): void { }

  showSuccessDelete() {
    this.notifyService.showSuccess(
      `${this.entity} delete successfully!`,
      'Fizzingbrain v.1.0.0'
    );
  }

  showError(err: String) {
    this.notifyService.showError(
      'Something went wrong. Details:' + err,
      'Fizzingbrain v.1.0.0'
    );
  }

  onSelectOne(question: Question): void {
    this.router.navigate(['/', 'question', 'edit', question.id]);
  }

  onDeleteOne(questions: Question) {
    this.questionService.delete(questions).subscribe({
      next: () => (this.list$ = this.questionService.getAll()),
      error: (err) => this.showError(err),
      complete: () => this.showSuccessDelete(),
    });
  }
}