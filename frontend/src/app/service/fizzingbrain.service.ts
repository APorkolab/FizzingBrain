import { IfStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FizzingbrainService {

  private gameHasStarted = new BehaviorSubject<boolean>(false);
  currentGameStartingState = this.gameHasStarted.asObservable();

  private gameHasEnded = new BehaviorSubject<boolean>(false);
  currentGameEndingState = this.gameHasEnded.asObservable();

  constructor() { }

  changeGameEndingState(value: boolean) {
    this.gameHasEnded.next(value);
  }

  changeGameStartingState(value: boolean) {
    this.gameHasStarted.next(value);
  }


}
