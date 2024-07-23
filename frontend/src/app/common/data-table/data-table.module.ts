import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from 'src/app/pipe/filter.pipe';

import { NgxDataTableComponent } from './ngx-data-table/ngx-data-table.component';
import { SorterPipe } from 'src/app/pipe/sorter.pipe';

@NgModule({
  declarations: [NgxDataTableComponent, FilterPipe, SorterPipe],
  imports: [
    AppRoutingModule,
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [NgxDataTableComponent, FilterPipe, SorterPipe],
})
export class DataTableModule { }
