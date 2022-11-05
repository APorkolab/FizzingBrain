
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from 'src/app/pipe/filter.pipe';

import { NgxDataTableComponent } from './ngx-data-table/ngx-data-table.component';
import { SorterPipe } from 'src/app/pipe/sorter.pipe';
const toastr = require('toastr')

@NgModule({
  declarations: [NgxDataTableComponent, FilterPipe, SorterPipe],
  imports: [
    CommonModule,
    RouterModule,
    toastr.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [NgxDataTableComponent, FilterPipe, SorterPipe],
})
export class DataTableModule { }