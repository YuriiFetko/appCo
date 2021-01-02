import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Pagination, Users} from '../shared/users.interface';
import {UsersService} from '../shared/users.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-stats',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {

  public users: Users[];
  public usersSub: Subscription;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'gender', 'ip_address', 'total_clicks', 'total_page_views'];
  dataSource = new MatTableDataSource<any>();
  // pagination, my realization
  // public activePage = 0;
  // public pageData: Pagination;

  // pagination tutorial
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 25, 50];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    // this.usersSub = this.usersService.getUsers()
    //   .subscribe((res) => {
    //     // this.users = res;
    //     this.dataSource.data = res;
    //     console.log(this.dataSource.data);
    //   });
    this.getUsers();
  }

  ngOnDestroy(): void {
    if (this.usersSub) {
      this.usersSub.unsubscribe();
      this.usersSub = null;
    }
  }

  getUsers(): void {
    this.users = undefined;
    this.usersService.getUsers(this.page - 1, this.pageSize)
      .subscribe(res => {
          console.log(res);
          this.users = res['content'];
          this.count = res['totalElements'];
        },
        error => {
          console.log(error);
        });
  }

  handlePageChange(event: number): void {
    this.page = event;
    console.log('event page ', this.page);
    this.getUsers();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    console.log('event pageSize ', this.pageSize);
    this.page = 1;
    this.getUsers();
  }
}
