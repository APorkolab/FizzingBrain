import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user';

export interface INgxTableColumn {
  title: string;
  key: string;
}

@Component({
  selector: 'ngx-data-table',
  templateUrl: './ngx-data-table.component.html',
  styleUrls: ['./ngx-data-table.component.scss'],
})
export class NgxDataTableComponent<T extends { [key: string]: any }> implements OnInit {
  @Input() list: T[] = [];
  @Input() columns: INgxTableColumn[] = [];
  @Input() entity: string = '';

  @Output() selectOne = new EventEmitter<T>();
  @Output() deleteOne = new EventEmitter<T>();

  keys: { [key: string]: string } = {};
  phrase: string = '';
  filterKey: string = '';
  changeText = true;
  pageSize = 25;

  startSlice = 0;
  endSlice = 25;
  page = 1;
  isLoggedIn: boolean = false;

  get pageList(): number[] {
    const pageCount = Math.ceil(this.list.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  columnKey: string = '';
  sortDir = -1;

  user$: BehaviorSubject<User | null>;

  constructor(
    private notifyService: NotificationService,
    public auth: AuthService,
    public router: Router
  ) {
    this.user$ = this.auth.user$;
  }

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      // console.log('isLoggedIn:', this.isLoggedIn);
    });
  }


  onSelect(entity: T): void {
    this.selectOne.emit(entity);
  }

  onDelete(entity: T): void {
    if (this.auth.user$.getValue()) {
      const confirmed = confirm('Do you really want to delete this record? This process cannot be undone.');
      if (!confirmed) {
        return;
      }
      this.deleteOne.emit(entity);
    } else {
      this.router.navigate(['forbidden']);
    }
  }

  jumptoPage(pageNum: number): void {
    this.page = pageNum;
    this.startSlice = this.pageSize * (pageNum - 1);
    this.endSlice = this.startSlice + this.pageSize;
  }

  showInfoAboutSorting(): void {
    this.notifyService.showInfo(
      'Click the icons next to the column titles to sort the entire table by this column.',
      'Fizzingbrain v.1.0.0'
    );
  }
}
