import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Users} from './users.interface';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) {
  }

  getUsers(page: number, size: number): Observable<Users[]> {
    return this.http.get<any>(`http://174.138.34.176:8080/task/api/v1/users?page=${page}&range=${size}`);
    // .pipe(
    //   pluck('content'),
    //   catchError(() => {
    //     return of([]);
    //   })
    // );
  }

  getUser(id, date): any {
    return this.http.get<any>(`http://174.138.34.176:8080/task/api/v1/users/statistic?id=${id}&from=${date.fromDate}&to=${date.toDate}`);
  }

  // getUser(id, date?): any {
  //   return this.http.get<any>(`http://174.138.34.176:8080/task/api/v1/users/statistic?id=${id}&from=2019-10-10&to=2019-10-15`)
  //     .pipe(
  //       catchError((err) => {
  //         console.log(err);
  //         return [];
  //       })
  //     );
  // }
}
