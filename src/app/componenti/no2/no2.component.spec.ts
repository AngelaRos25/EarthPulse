import { ComponentFixture, TestBed } from '@angular/core/testing';

import { No2Component } from './no2.component';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { of } from 'rxjs';


describe('No2Component', () => {
  let component: No2Component;
  let fixture: ComponentFixture<No2Component>;
  let routerSpy: jasmine.SpyObj<Router>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getNO2']);

    apiServiceSpy.getNO2.and.returnValue(of({
      nitrous: [
        { date: '2020.01', average: '1.0', trend: '1.5' },
        { date: '2021.02', average: '1.1', trend: '1.6' }
      ]
    }));

    await TestBed.configureTestingModule({
      imports: [No2Component],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ApiService, useValue: apiServiceSpy },
      ]

    })
    .compileComponents();


    fixture = TestBed.createComponent(No2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load chart data on init', () => {
    expect(apiServiceSpy.getNO2).toHaveBeenCalled();
    expect(component.stockChartOptions).toBeDefined();
    expect(component.stockChartOptions.charts[0].data[0].dataPoints.length).toBe(2); 
    expect(component.stockChartOptions.charts[0].data[1].dataPoints.length).toBe(2);
  });

  it('should be able to navigate to other components', ()=>{
    component.return();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('');
  })

  it('should make data series visible again when clicked twice', () => {
    const mockDataSeries = {
      visible: false,
    };

    const mockChart = {
      render: jasmine.createSpy('render'),
    };

    const mockEvent = {
      dataSeries: mockDataSeries,
      chart: mockChart
    };
    component.itemclick(mockEvent);
    expect(mockDataSeries.visible).toBeTrue();
    expect(mockChart.render).toHaveBeenCalled();
  });
  
});
