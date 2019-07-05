import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Result } from './models';

@Injectable()
export class MapService {

  private messageSource = new BehaviorSubject('0');
  public currentMessage = this.messageSource.asObservable();

  selected: Array<Result>;

  constructor() {
    this.selected = [];
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }


  setSelected(data: Array<Result>) {
    this.selected = data;
  }


  getSelected(): Array<Result> {
    return this.selected;
  }

}