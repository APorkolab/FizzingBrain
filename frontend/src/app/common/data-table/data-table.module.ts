import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FilterPipe } from 'src/app/pipe/filter.pipe';
import { SorterPipe } from 'src/app/pipe/sorter.pipe';
import { NgxDataTableComponent } from './ngx-data-table/ngx-data-table.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxDataTableComponent,
    FilterPipe,
    SorterPipe,
  ],
  exports: [
    NgxDataTableComponent,
    FilterPipe,
    SorterPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DataTableModule {}
