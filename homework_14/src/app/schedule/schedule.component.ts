import { Component, OnInit } from '@angular/core';
import { Lesson } from '../lesson';
import { LESSONS } from '../data'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  lessons: Lesson[] = LESSONS;
  constructor() { }

  ngOnInit() {
  };

  addLesson() {
    let newLesson = {
      id: this.lessons.length + 1,
      topic: '-',
      date: '-',
      lecturer: '-'
    };
    this.lessons.push(newLesson);
  };

  removeLesson(id) {
    let removeIndex = this.lessons.findIndex((element) => element.id === id);
    this.lessons.splice(removeIndex, 1);
  };
}
