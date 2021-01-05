import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UsersService} from '../shared/users.service';
import {BreadcrumbService} from 'xng-breadcrumb';
import {Chart} from 'node_modules/chart.js';
import * as moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';
import {DateArray} from '../shared/users.interface';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit, OnDestroy {

  public userSub: Subscription;
  public userName;
  public dates: any;
  public dateArray = [];
  public errorMessage = false;

  // TODO uncomment this code to get data for the last week from the current date
  // TODO api doesn't return anything, falls on a timeout if you enter data for 2020
  // TODO there are many such cases, for example: ID of the 6th user does not return anything
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

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
      this.userSub = null;
    }
  }

  getUser(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.userSub = this.usersService.getUser(userId, {fromDate: this.paramsDate.fromDate, toDate: this.paramsDate.toDate})
      .subscribe(res => {
        if (res === null) {
          this.errorMessage = true;
          return;
        } else {
          this.errorMessage = false;
        }
        const outputData = res;
        this.dateArray = this.getDates(this.paramsDate.fromDate, this.paramsDate.toDate);

        let statByDay;
        let dataToChart;
        dataToChart = this.dateArray.map(day => {
          outputData.map(dayOutput => {
            if ((moment(day.date).format('yyyy-MM-DD') === moment(dayOutput.date).format('yyyy-MM-DD'))) {
              statByDay = {
                clicks: dayOutput.clicks,
                views: dayOutput.page_views,
                date: day.date,
              };
            }
          });
          if (!!statByDay) {
            return statByDay;
          } else {
            return day;
          }
        });
        this.drawChart(dataToChart);
      });
  }

  drawChart(data): void {
    const date = data.map(day => day.date);
    const clicks = data.map(click => click.clicks);
    const views = data.map(view => view.views);

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

  getDates(startDate, stopDate): DateArray[] {
    const dateArray = [];
    let currentDate = moment(startDate);
    const stopData = moment(stopDate);
    while (currentDate <= stopData) {
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
    this.getUser();
  }
}
