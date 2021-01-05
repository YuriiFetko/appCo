import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Users} from '../shared/users.interface';
import {UsersService} from '../shared/users.service';

@Component({
  selector: 'app-stats',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  public users: Users[];
  public usersSub: Subscription;
  public page = 1;
  public count = 0;
  public pageSize = 10;
  public pageSizes = [10, 25, 50];

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
      this.usersSub = null;
    }
  }

  getUsers(): void {
    this.users = null;
    this.usersSub = this.usersService.getUsers(this.page - 1, this.pageSize)
      .subscribe(res => {
          this.users = res['content'];
          this.count = res['totalElements'];
        },
        error => {
          this.users = null;
        });
  }

  handlePageChange(event): void {
    this.page = event;
    this.getUsers();
  }

  handlePageSizeChange(event): void {
    this.pageSize = event.value;
    this.page = 1;
    this.getUsers();
  }

}
