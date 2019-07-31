import { Component, OnInit } from '@angular/core';
import { interval, Observable, of, timer } from 'rxjs';
import { catchError, delayWhen, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { ApiService } from './../api.service';
import { Course } from '../model/course';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  beginnedCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(private ApiService: ApiService) {}

  ngOnInit() {
    const http$ = this.ApiService.createHttpObservable('/api/courses');
    const courses$ = http$.pipe(
      tap(() => console.log('Http request excuted')),
      map(response => Object.values(response['payload'])),
      shareReplay()
    );
    // courses$.subscribe((courses: Course[]) => {
    //   this.beginnedCourses = courses.filter(course => course.category === 'BEGINNER');
    //   this.advancedCourses = courses.filter(course => course.category === 'ADVANCED');
    // });

    this.beginnedCourses$ = courses$.pipe(
      map((courses: Course[]) => courses.filter(course => course.category === 'BEGINNER'))
    );
    this.advancedCourses$ = courses$.pipe(
      map((courses: Course[]) => courses.filter(course => course.category === 'ADVANCED'))
    );
  }
}
