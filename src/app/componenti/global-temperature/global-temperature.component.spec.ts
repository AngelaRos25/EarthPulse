import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { GlobalTemperatureComponent } from './global-temperature.component';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service'; 
import { of } from 'rxjs';

describe('GlobalTemperatureComponent', () => {
  let component: GlobalTemperatureComponent;
  let fixture: ComponentFixture<GlobalTemperatureComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getTemperature']);

    apiServiceSpy.getTemperature.and.returnValue(of({
      result: [
        { time: '2020', station: '1.0', land: '1.5' },
        { time: '2021', station: '1.1', land: '1.6' }
      ]
    }));

    await TestBed.configureTestingModule({
      imports: [GlobalTemperatureComponent],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: ApiService, useValue: apiServiceSpy},
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlobalTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load chart data on init', () => {
    expect(apiServiceSpy.getTemperature).toHaveBeenCalled();
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
