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
    this.setDifficultyValues(message);
    console.log(this.changePlayerTime);
  }

  changePlayerTime(value: number) {
    this.timeLeft.next(value);
  }

  changeErrorMarginEnemy(value: number) {
    this.errorMarginEnemy.next(value);
  }

  randomDifficulty() {
    const difficulties = ['easy', 'medium', 'hard', 'impossible', 'random']
    let item = difficulties[Math.floor(Math.random() * difficulties.length)];

    if (item == 'random') {
      item = '';
      item = difficulties[Math.floor(Math.random() * difficulties.length)];
    }
    this.changeGameDifficulty(item);
  }

  setDifficultyValues(value: string) {
    switch (value) {
      case 'easy':
        this.changePlayerTime(20);
        this.changeErrorMarginEnemy(30);
        break;
      case 'medium':
        this.changePlayerTime(15);
        this.changeErrorMarginEnemy(20);
        break;
      case 'hard':
        this.changePlayerTime(10);
        this.changeErrorMarginEnemy(10);
        break;
      case 'impossible':
        this.changePlayerTime(5);
        this.changeErrorMarginEnemy(5);
        break;
      case 'random':
        this.randomDifficulty();
        break;

      default:
        this.changeGameDifficulty('easy');
        this.changePlayerTime(20);
        this.changeErrorMarginEnemy(30);
        break;
    }
  }
}
