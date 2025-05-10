import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { CanvasJSAngularStockChartsModule } from '@canvasjs/angular-stockcharts';

@Component({
  selector: 'app-co2',
  imports: [MatIconModule, CanvasJSAngularStockChartsModule, CommonModule],
  templateUrl: './co2.component.html',
  styleUrl: './co2.component.css'
})


export class Co2Component implements OnInit {
  stockChartOptions: any;


  constructor(private router: Router, private apiService: ApiService, private cdr: ChangeDetectorRef,) { }

  ngOnInit(): void {
    // api  
    this.apiService.getCO2().subscribe((response: any) => {
      let dataCo2
        = response.co2
      console.log('dati co2', response);

      const cycle = dataCo2.map((item: any) => ({
        x: new Date(
          Number(item.year),
          Number(item.month),
          Number(item.day),
        ),
        y: parseFloat(item.cycle)
      }))

      const trend = dataCo2.map((item: any) => ({
        x: new Date(
          Number(item.year),
          Number(item.month),
          Number(item.day),
        ),
        y: parseFloat(item.trend)
      }))

      // grafico
      this.cdr.detectChanges();
      this.stockChartOptions = {
        title: {
          text: "CO2 Levels"
        },
        charts: [{
          axisX: {
            interval: 1,
          },
          axisY: {
            title: "Amount of carbon dioxide",
          },
          legend: {
            cursor: "pointer",
            itemclick: this.itemclick.bind(this)
          },
          data: [
            {
              type: "line",
              name: "cycle",
              showInLegend: true,
              dataPoints: cycle
            },
            {
              type: "line",
              name: "trend",
              showInLegend: true,
              dataPoints: trend
            }
          ]
        }],
        navigator: {
          animationEnabled: true,
          slider: {
            minimum: new Date(2015, 1, 25),
            maximum: new Date(2018, 1, 25),
            outlineThickness: 1,
          }
        },
        rangeSelector: {
          inputFields: {
            startValue: 2015,
            endValue: 2018
          },
          buttons: [{
            label: "1 Month",
            range: 1,
            rangeType: "month"
          },
          {
            label: "2 Month",
            range: 2,
            rangeType: "month"
          },
          {
            label: "1 Year",
            range: 10,
            rangeType: "year"
          },
          {
            label: "All",
            rangeType: "all"
          }]
        }
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
