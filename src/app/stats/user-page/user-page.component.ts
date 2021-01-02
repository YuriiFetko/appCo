import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UsersService} from '../shared/users.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user$: Observable<any>;
  userName;

  constructor(private usersService: UsersService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userName = this.route.snapshot.paramMap.get('name');
    this.user$ = this.usersService.getUser(userId);
    console.log(this.route.snapshot.paramMap);
    console.log(this.route.snapshot.paramMap.get('id'));


  }

}
