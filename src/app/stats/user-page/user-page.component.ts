import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {from, Observable} from 'rxjs';
import {UsersService} from '../shared/users.service';
import {BreadcrumbService} from 'xng-breadcrumb';
import {Chart} from 'node_modules/chart.js';
import {catchError, map, takeWhile} from 'rxjs/operators';
import * as moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  user$: Observable<any>;
  userName;
  userClick: any;
  dates: any;

  // TODO uncomment this code і 6 юзер нічого не повертає
  // public paramsDate = {
  //   fromDate: moment().subtract(7, 'days').format('yyyy-MM-DD'),
  //   toDate: moment().format('yyyy-MM-DD')
  // };

  public paramsDate = {
    fromDate: '2019-10-05',
    toDate: '2019-10-15'
  };

  public rangeForm = new FormGroup({
    fromDate: new FormControl(this.paramsDate.fromDate),
    toDate: new FormControl(this.paramsDate.toDate)
  });

  dataArray = [];

  constructor(private usersService: UsersService,
              private route: ActivatedRoute,
              private router: Router,
              private breadcrumbService: BreadcrumbService) {
  }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('name');
    this.breadcrumbService.set('@user', this.userName);
    this.getUser();
  }

  getUser(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.usersService.getUser(userId, {fromDate: this.paramsDate.fromDate, toDate: this.paramsDate.toDate})
      .subscribe(res => {
        this.dataArray = this.getDates(this.paramsDate.fromDate, this.paramsDate.toDate);
        console.log(this.dataArray);
        console.log(res);
        const a = res;
        let result;
        let testOOOO;
        testOOOO = this.dataArray.map(i => {
          console.log(result);
          a.map(j => {
            console.log(j);
            if ((moment(i.date).format('yyyy-MM-DD') === moment(j.date).format('yyyy-MM-DD'))) {
              console.log('t');
              console.log(j.clicks);
              result = {
                clicks: j.clicks,
                views: j.page_views,
                date: i.date,
              };
            }
          });
          if (!!result) {
            return result;
          } else {
            return i;
          }
        });
        console.log(testOOOO);
        this.chart(testOOOO);
      });
  }

  chart(data): void {
    console.log(data);
    const date = data.map(i => i.date);
    const clicks = data.map(i => i.clicks);
    const views = data.map(i => i.views);
    console.log(views);

    const chartClicks = new Chart('clicks', {
      type: 'line',
      data: {
        labels: date,
        datasets: [{
          data: clicks,
          borderColor: [
            '#3A80BA'
          ],
          borderWidth: 4,
          backgroundColor: 'transparent',
          pointBorderWidth: 10,
          pointHoverBorderWidth: 10,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }
          ],
          xAxes: [
            {
              ticks: {
                padding: 15
              },
              gridLines: false
            }
          ]
        },
        legend: {
          display: false
        },
        gridLines: {
          display: false,
          circular: false
        }
      }
    });

    const chartViews = new Chart('views', {
      type: 'line',
      data: {
        labels: date,
        datasets: [{
          data: views,
          borderColor: [
            '#3A80BA'
          ],
          borderWidth: 4,
          backgroundColor: 'transparent',
          pointBorderWidth: 10,
          pointHoverBorderWidth: 10,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }
          ],
          xAxes: [
            {
              ticks: {
                padding: 15
              },
              gridLines: false
            }
          ]
        },
        legend: {
          display: false
        },
        gridLines: {
          display: false,
          circular: false
        }
      }
    });

  }

  getDates(startDate, stopDate): any {
    const dateArray = [];
    let currentDate = moment(startDate);
    const stopDat = moment(stopDate);
    while (currentDate <= stopDat) {
      dateArray.push({
        clicks: 0,
        views: 0,
        date: moment(currentDate).format('YYYY-MM-DD')
      });
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  changeDate(date): void {
    this.paramsDate = {
      fromDate: moment(date.fromDate).format('YYYY-MM-DD'),
      toDate: moment(date.toDate).format('YYYY-MM-DD')
    };
    console.log(this.paramsDate);
    this.getUser();
  }

}
