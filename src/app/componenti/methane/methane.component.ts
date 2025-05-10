import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';;
import { CanvasJSAngularStockChartsModule } from '@canvasjs/angular-stockcharts';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-methane',
  imports: [CanvasJSAngularStockChartsModule, CommonModule, MatIconModule],
  templateUrl: './methane.component.html',
  styleUrl: './methane.component.css'
})
export class MethaneComponent implements OnInit {
  stockChartOptions: any

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    // api
    this.apiService.getMethane().subscribe((response: any) => {
      let dataMethane = response.methane;
      console.log('i dati:', dataMethane);


      const averageData = dataMethane.map((item: any) => {
        const [yearStr, monthStr] = item.date.split(".");
        const year = parseInt(yearStr);
        const month = parseInt(monthStr);
        const date = new Date(year, month - 1, 1);

        return {
          x: date,
          y: parseFloat(item.average)
        };
      });

      const trendData = dataMethane.map((item: any) => {
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
          text: "Methane Levels"
        },
        charts: [{
          axisX: {
            interval: 1,
          },
          axisY: {
            title: "Amount of methane",
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
              type: "line",
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
