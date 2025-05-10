import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Co2Component } from './co2.component';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { of } from 'rxjs';


describe('Co2Component', () => {
  let component: Co2Component;
  let fixture: ComponentFixture<Co2Component>;
  let routerSpy: jasmine.SpyObj<Router>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getCO2']);


    apiServiceSpy.getCO2.and.returnValue(of({
      co2: [
        { year: '2020', month: '1', day: '1', cycle: '1.0', trend: '1.5' },
        { year: '2021', month: '2', day: '2', cycle: '1.1', trend: '1.6' }
      ]
    }));

    await TestBed.configureTestingModule({
      imports: [Co2Component],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ApiService, useValue: apiServiceSpy },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Co2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load chart data on init', () => {
    expect(apiServiceSpy.getCO2).toHaveBeenCalled();
    expect(component.stockChartOptions).toBeDefined();
    expect(component.stockChartOptions.charts[0].data[0].dataPoints.length).toBe(2);
    expect(component.stockChartOptions.charts[0].data[1].dataPoints.length).toBe(2);
  });


  it('should be able to navigate to other components', () => {
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
