
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public translate: TranslateService) {
    //   translate.addLangs(['en', 'hu']);
    //   translate.setDefaultLang('hu');

    //   const browserLang = translate.getBrowserLang();

    //   try {
    //     translate.use(browserLang?.match(/en|hu/) ? browserLang : 'en');
    //   } catch (error) {
    //     console.log(error);
    //   }
  }

  ngOnInit(): void {

  }

}



