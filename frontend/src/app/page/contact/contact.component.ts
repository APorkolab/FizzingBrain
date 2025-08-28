import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IconModule } from 'src/app/common/icon/icon.module';

@Component({
  standalone: true,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [
    CommonModule,
    IconModule, // <i-feather>
  ],
})
export class ContactComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
