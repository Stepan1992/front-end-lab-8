import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Lesson } from '../lesson'

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  editing: boolean = false;
  currentObj: Lesson
  @Input() lesson: Lesson;
  @Input() i: number;
  @Output() removeFlag: EventEmitter<any> = new EventEmitter<any>();

  constructor() { };

  ngOnInit() {
  };

  edit() {
    this.editing = true;
    this.currentObj = Object.assign({}, this.lesson);
  };

  save() {
    this.editing = false;
  };

  discard() {
    for (let props in this.currentObj) {
      if (this.currentObj[props] !== this.lesson[props]) {
        this.editing = false;
        return this.lesson = this.currentObj;
      };
    };
    this.editing = false;
  };

  remove(id) {
    this.removeFlag.emit(id);
  };
}
