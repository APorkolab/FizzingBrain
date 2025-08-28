import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FizzingbrainService {
  private gameStartingState = new BehaviorSubject<boolean>(false);
  private gameEndingState = new BehaviorSubject<boolean>(false);

  currentGameStartingState = this.gameStartingState.asObservable();
  currentGameEndingState = this.gameEndingState.asObservable();

  changeGameStartingState(state: boolean): void {
    if (this.gameStartingState.getValue() !== state) {
      //  console.log('changeGameStartingState called with state:', state);
      this.gameStartingState.next(state);
    }
  }

  changeGameEndingState(state: boolean): void {
    if (this.gameEndingState.getValue() !== state) {
      //  console.log('changeGameEndingState called with state:', state);
      this.gameEndingState.next(state);
    }
  }
}