import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FizzingBrain';
  constructor(public translate: TranslateService) {

    translate.addLangs(['en', 'hu']);
    translate.setDefaultLang('hu');

    const browserLang = translate.getBrowserLang();

    try {
      translate.use(browserLang?.match(/en|hu/) ? browserLang : 'en');
    } catch (error) {
      console.log(error);
    }
  }
}
