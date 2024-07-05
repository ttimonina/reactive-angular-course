import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CoursesService } from '../services/courses.service';


@Component({
  selector: 'course',
  templateUrl: './search-lessons.component.html',
  styleUrls: ['./search-lessons.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SearchLessonsComponent implements OnInit {

onBackToSearch() {
  this.activeLesson = null;
}

  searchResults$:Observable<Lesson[]>;
  activeLesson:Lesson;

  constructor(private courseService:CoursesService) {


  }

  onSearch(search:string){
    this.searchResults$ = this.courseService.searchLessons(search);
  }

  openLesson(lesson:Lesson){
    this.activeLesson = lesson;
  }

  ngOnInit() {


  }

}











