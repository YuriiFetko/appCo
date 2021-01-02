import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UsersService} from '../shared/users.service';
import {filter} from 'rxjs/operators';
import {BreadcrumbService} from 'xng-breadcrumb';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  test;
  user$: Observable<any>;
  userName;

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.usersService.currentMessage
      .subscribe(res => {
        this.test = res;
      });

    const userId = this.route.snapshot.paramMap.get('id');
    // this.userName = this.route.snapshot.paramMap.get('name');
    this.user$ = this.usersService.getUser(userId);
    // console.log(this.route.snapshot.paramMap.get('id'));

    // this.breadcrumbService.breadcrumbs$.subscribe(res => {
    //   console.log(res);
    //   res[2]['label'] = this.userName;
    // });
    // this.breadcrumbService.set('user/6', this.userName);
    this.breadcrumbService.set('@test', this.test);
    // console.log(this.breadcrumbService);


    // console.log(this.userName);

  }

}
