import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService, private translate: TranslateService) { }

  showSuccess(message: string, title: string) {
    this.translate.get([message, title]).subscribe(translations => {
      this.toastr.success(translations[message], translations[title]);
    });
  }

  showError(message: string, title: string) {
    this.translate.get([message, title]).subscribe(translations => {
      this.toastr.error(translations[message], translations[title]);
    });
  }

  showInfo(message: string, title: string) {
    this.translate.get([message, title]).subscribe(translations => {
      this.toastr.info(translations[message], translations[title]);
    });
  }

  showWarning(message: string, title: string) {
    this.translate.get([message, title]).subscribe(translations => {
      this.toastr.warning(translations[message], translations[title]);
    });
  }
}
