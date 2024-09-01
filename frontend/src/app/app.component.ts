import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {
    translate.addLangs(['hu', 'en']);
    translate.setDefaultLang('hu');
  }

  ngOnInit() {
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/hu|en/) ? browserLang : 'hu');
  }
}
