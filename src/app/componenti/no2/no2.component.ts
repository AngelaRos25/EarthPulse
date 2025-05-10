import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CanvasJSAngularStockChartsModule } from '@canvasjs/angular-stockcharts';

@Component({
  selector: 'app-no2',
  imports: [CommonModule, MatIconModule, CanvasJSAngularStockChartsModule],
  templateUrl: './no2.component.html',
  styleUrl: './no2.component.css'
})
export class No2Component implements OnInit {
  stockChartOptions: any;

  constructor(private apiService: ApiService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // api
    this.apiService.getNO2().subscribe((response: any) => {
      let dataNo2 = response.nitrous;
      console.log('i dati:', dataNo2);

      const averageData = dataNo2.map((item: any) => {
        const [yearStr, monthStr] = item.date.split(".");
        const year = parseInt(yearStr);
        const month = parseInt(monthStr);
        const date = new Date(year, month - 1, 1);

        return {
          x: date,
          y: parseFloat(item.average)
        };
      })

      const trendData = dataNo2.map((item: any) => {
        const [yearStr, monthStr] = item.date.split(".");
        const year = parseInt(yearStr);
        const month = parseInt(monthStr);
        const date = new Date(year, month - 1, 1);

        return {
          x: date,
          y: parseFloat(item.trend)
        };
      })


      // grafico
      this.cdr.detectChanges();
      this.stockChartOptions = {
        title: {
          text: "Nitrous Oxide levels"
        },
        charts: [{
          axisX: {
            interval: 1,
          },
          axisY: {
            title: "Amount of Nitrous Oxiede",
          },
          legend: {
            cursor: "pointer",
            itemclick: this.itemclick.bind(this)
          },
          data: [
            {
              type: "column",
              name: "trend",
              showInLegend: true,
              dataPoints: trendData
            },
            {
              type: "column",
              name: "average",
              showInLegend: true,
              dataPoints: averageData
            }
          ]
        }],
        navigator: {
          animationEnabled: true,
          slider: {
            minimum: new Date(2020, 1, 25),
            maximum: new Date(2025, 1, 25),
            outlineThickness: 1,
          }
        },
        rangeSelector: {
          inputFields: {
            startValue: 2015,
            endValue: 2018
          },
          buttons: [
            {
              label: "1 Year",
              range: 1,
              rangeType: "year"
            },
            {
              label: "2 Year",
              range: 2,
              rangeType: "year"
            },
            {
              label: "All",
              rangeType: "all"
            }]
        },
        rangeChanged: (e: any) => {
          const visibleRange = e.maximum - e.minimum;
          const interval = Math.max(1, Math.floor(visibleRange / 10));
          this.stockChartOptions.charts[0].axisX.interval = interval;
          this.stockChartOptions.navigator.slider.minimum = e.minimum;
          this.stockChartOptions.navigator.slider.maximum = e.maximum;
          this.cdr.detectChanges();
        },
      }
    })
  }


  return() {
    this.router.navigateByUrl('')
  }

  itemclick(e: any) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }
}
