
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FizzingbrainService } from 'src/app/service/fizzingbrain.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(public translate: TranslateService) {
    // translate.addLangs(['en', 'hu']);
    // translate.setDefaultLang('en');
  }

  ngOnInit(): void {


  }


}



