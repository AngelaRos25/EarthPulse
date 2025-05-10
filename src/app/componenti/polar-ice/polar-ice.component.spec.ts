import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PolarIceComponent } from './polar-ice.component';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { of } from 'rxjs';

describe('PolarIceComponent', () => {
  let component: PolarIceComponent;
  let fixture: ComponentFixture<PolarIceComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getPolarIce']);

    apiServiceSpy.getPolarIce.and.returnValue(of({
      arcticData: {
        data: {
          '202001': { value: 11.11, anom: 1.10, monthlyMean: 11.11 },
          '202002': { value: 12.12, anom: 1.20, monthlyMean: 12.12 }
        }
      }
    }));

    await TestBed.configureTestingModule({
      imports: [PolarIceComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ApiService, useValue: apiServiceSpy },
      ]
    })
    .compileComponents();


    fixture = TestBed.createComponent(PolarIceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load chart data on init', () => {
    expect(apiServiceSpy.getPolarIce).toHaveBeenCalled();
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
