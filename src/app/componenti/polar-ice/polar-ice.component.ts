import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CanvasJSAngularStockChartsModule } from '@canvasjs/angular-stockcharts';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';


@Component({
  selector: 'app-polar-ice',
  imports: [CommonModule, MatIconModule, CanvasJSAngularStockChartsModule],
  templateUrl: './polar-ice.component.html',
  styleUrl: './polar-ice.component.css'
})

export class PolarIceComponent implements OnInit {

  stockChartOptions: any;

  constructor(private router: Router, private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.apiService.getPolarIce().subscribe((response: any) => {
      let dataPolarIce = response.arcticData.data;
      console.log('i dati:', dataPolarIce);

      const valueData = Object.entries(dataPolarIce).map(([key, val]: [string, any]) => {
        const year = parseInt(key.substring(0, 4));
        const month = parseInt(key.substring(4, 6));
        const date = new Date(year, month - 1, 1);

        return {
          x: date,
          y: parseFloat(val.value)
        };
      })

      const anomData = Object.entries(dataPolarIce).map(([key, val]: [string, any]) => {
        const year = parseInt(key.substring(0, 4));
        const month = parseInt(key.substring(4, 6));
        const date = new Date(year, month - 1, 1);

        return {
          x: date,
          y: parseFloat(val.anom)
        };
      })


      const monthlyData = Object.entries(dataPolarIce).map(([key, val]: [string, any]) => {
        const year = parseInt(key.substring(0, 4));
        const month = parseInt(key.substring(4, 6));
        const date = new Date(year, month - 1, 1);

        return {
          x: date,
          y: parseFloat(val.monthlyMean)
        };
      })

      // grafico
      this.cdr.detectChanges();
      this.stockChartOptions = {
        title: {
          text: "Polar Temperature Anomalies"
        },
        charts: [{
          axisX: {
            interval: 1,
          },

          legend: {
            cursor: "pointer",
            itemclick: this.itemclick.bind(this)
          },
          data: [
            {
              type: "splineArea",
              name: "value",
              color: "#c0504e",
              showInLegend: true,
              dataPoints: valueData
            },
            {
              type: "splineArea",
              name: "anom",
              showInLegend: true,
              color: "#4f81bc",
              dataPoints: anomData
            },
            {
              type: "line",
              name: "monthlyMean",
              showInLegend: true,
              dataPoints: monthlyData
            },
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
          ]
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
    this.router.navigateByUrl('');
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
