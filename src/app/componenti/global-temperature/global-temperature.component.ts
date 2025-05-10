import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';
import { CanvasJSAngularStockChartsModule } from '@canvasjs/angular-stockcharts';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-global-temperature',
  imports: [CommonModule, CanvasJSAngularStockChartsModule, MatIconModule],
  templateUrl: './global-temperature.component.html',
  styleUrl: './global-temperature.component.css'
})
export class GlobalTemperatureComponent implements OnInit {
  stockChartOptions: any;


  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.apiService.getTemperature().subscribe((response: any) => {
      let dataTemperature = response.result;
      console.log('i dati:', dataTemperature);

      const stationData = dataTemperature.map((item: any) => ({
        x: Number(item.time),
        y: parseFloat(item.station)
      }))

      const landData = dataTemperature.map((item: any) => ({
        x: Number(item.time),
        y: parseFloat(item.land)
      }))

      this.cdr.detectChanges();
      this.stockChartOptions = {
        zoomEnabled: true,
        title: {
          text: "Global land-surface air temperature anomalies from 1880 to 2025",
          padding: {
            bottom: 20,
            top: 20
          },
        },
        charts: [{
          axisX: {
            valueFormatString: "####.##",
            intervalType: "year",
            interval: 1,
          },
          axisY: {
            title: "Celsius",
          },
          legend: {
            cursor: "pointer",
            itemclick: this.itemclick.bind(this)
          },
          data: [
            {
              type: "spline",
              name: "Station",
              showInLegend: true,
              dataPoints: stationData,
            },
            {
              type: "spline",
              name: "Land",
              showInLegend: true,
              dataPoints: landData,
            }
          ]
        }],
        navigator: {
          animationEnabled: true,
          slider: {
            minimum: new Date(2020),
            maximum: new Date(2025),
            outlineThickness: 1,
          }
        },
        rangeSelector: {
          inputFields: {
            startValue: new Date(2020),
            endValue: new Date(2025),
            valueFormatString: "####.##",
          },
          buttons: [{
            label: "10",
            range: 10,
            rangeType: "number"
          }, {
            label: "20",
            range: 20,
            rangeType: "number"
          }, {
            label: "50",
            range: 50,
            rangeType: "number"
          }, {
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