import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { CoursesService } from '../services/courses.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';
import { CoursesStore } from '../services/courses.store';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;
  intermediateCourses$: Observable<Course[]>;


  constructor(private http: HttpClient,  private coursesService:CoursesService, 
    private loadingService:LoadingService, 
    private messagesService:MessagesService, private coursesStore:CoursesStore
  ) {

  }

  ngOnInit() {
    this.reloadCourses();

  }

  reloadCourses()
  {
    //this.loadingService.loadingOn();

    /* const courses$ = this.coursesService.loadAllCourses()
    .pipe(
      map(courses => courses.sort(sortCoursesBySeqNo)),
      catchError(err => {
        const message = "Could not load courses";
        this.messagesService.showErrors(message);
        console.log(message, err);

        return throwError(err);
      })
      //,
      //finalize(() => this.loadingService.loadingOff())
    ); */

    //const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

    /* this.beginnerCourses$ = loadCourses$//courses$
    .pipe(map(courses => courses.filter(course => course.category == "BEGINNER")

    )); */

    this.beginnerCourses$ = this.coursesStore.filterByCategory("BEGINNER");

    this.intermediateCourses$ = this.coursesStore.filterByCategory("INTERMEDIATE");

    this.advancedCourses$ = this.coursesStore.filterByCategory("ADVANCED");

    /* this.intermediateCourses$ = loadCourses$//courses$
    .pipe(map(courses => courses.filter(course => course.category == "INTERMEDIATE")

    ));

    this.advancedCourses$ = loadCourses$//courses$
    .pipe(map(courses => courses.filter(course => course.category == "ADVANCED")

    )); */
  }

}




