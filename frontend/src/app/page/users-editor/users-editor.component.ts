import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-editor',
  templateUrl: './users-editor.component.html',
  styleUrls: ['./users-editor.component.scss']
})
export class UsersEditorComponent implements OnInit {
  user$!: Observable<User>;
  userForm!: FormGroup;
  entity = 'User';
  actionText!: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotificationService,
    private translate: TranslateService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
    console.log('Form initialized:', this.userForm);
    this.route.params.subscribe({
      next: (param) => {
        if (param['id'] === '0') {
          this.userForm.reset(new User());
          this.actionText = this.translate.instant('createUser');
          this.addPasswordValidators();
          console.log('Form reset for new user:', this.userForm);
        } else {
          this.user$ = this.userService.getOne(param['id']);
          this.user$.subscribe({
            next: (user) => {
              if (user) {
                this.userForm.patchValue(user);
                this.actionText = this.translate.instant('updateUser');
                this.removePasswordValidators();
                console.log('Form patched with existing user:', this.userForm);
              }
            },
          });
        }
      },
    });
  }

  initForm() {
    this.userForm = this.fb.group({
      id: [null],
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  addPasswordValidators() {
    this.userForm.get('password')?.setValidators([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{7,}$')]);
    this.userForm.get('password')?.updateValueAndValidity();
  }

  removePasswordValidators() {
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
  }

  onSubmit() {
    console.log('Form submitted:', this.userForm);
    console.log('Form status:', this.userForm.status);
    console.log('Form errors:', this.userForm.errors);

    for (const control in this.userForm.controls) {
      if (this.userForm.controls.hasOwnProperty(control)) {
        console.log(`${control} validity:`, this.userForm.get(control)?.valid);
        console.log(`${control} errors:`, this.userForm.get(control)?.errors);
      }
    }

    if (this.userForm.valid) {
      if (this.userForm.get('id')?.value) {
        this.onUpdate();
      } else {
        this.onCreate();
      }
    } else {
      console.log('Form is invalid:', this.userForm);
    }
  }

  onUpdate() {
    this.userService.update(this.userForm.value).subscribe({
      next: () => this.router.navigate(['/', 'user']),
      error: (err) => this.showError(err),
      complete: () => this.showSuccessEdit(),
    });
  }

  onCreate() {
    this.userService.create(this.userForm.value).subscribe({
      next: () => this.router.navigate(['/', 'user']),
      error: (err) => this.showError(err),
      complete: () => this.showSuccessCreate(),
    });
  }

  showSuccessEdit() {
    this.notifyService.showSuccess(
      this.translate.instant(`${this.entity} edited successfully!`),
      this.translate.instant('FizzingBrain v.1.0.0')
    );
  }

  showSuccessCreate() {
    this.notifyService.showSuccess(
      this.translate.instant(`${this.entity} created successfully!`),
      this.translate.instant('FizzingBrain v.1.0.0')
    );
  }

  showError(err: string) {
    this.notifyService.showError(
      this.translate.instant('Something went wrong. Details:') + err,
      this.translate.instant('FizzingBrain v.1.0.0')
    );
  }
}
