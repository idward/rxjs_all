import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor() {}

  createHttpObservable(url: string): Observable<any> {
    return Observable.create(observer => {
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(responseData => {
          observer.next(responseData);
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    });
  }
}
