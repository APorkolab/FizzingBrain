import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FizzingbrainService {

  private gameDifficulty = new BehaviorSubject('');
  currentDifficulty = this.gameDifficulty.asObservable();

  private timeLeft = new BehaviorSubject<number>(0);
  currentTimeLeft = this.timeLeft.asObservable();

  private errorMarginEnemy = new BehaviorSubject<number>(0);
  currentErrorMarginEnemy = this.errorMarginEnemy.asObservable();

  constructor() { }

  changeGameDifficulty(message: string) {
    this.gameDifficulty.next(message);
    console.log(this.changePlayerTime);
  }

  changePlayerTime(value: number) {
    this.timeLeft.next(value);
  }

  changeErrorMarginEnemy(value: number) {
    this.errorMarginEnemy.next(value);
  }


}
