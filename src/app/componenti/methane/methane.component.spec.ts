import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MethaneComponent } from './methane.component';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { of } from 'rxjs';

describe('MethaneComponent', () => {
  let component: MethaneComponent;
  let fixture: ComponentFixture<MethaneComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getMethane']);

    apiServiceSpy.getMethane.and.returnValue(of({
      methane: [
        { date: '2020.1', average: '1.0', trend: '1.5' },
        { date: '2021.2', average: '1.1', trend: '1.6' }
      ]
    }));


    await TestBed.configureTestingModule({
      imports: [MethaneComponent],
      providers: [
       { provide: Router, useValue: routerSpy },
       { provide: ApiService, useValue: apiServiceSpy },
      ]

    })
    .compileComponents();


    fixture = TestBed.createComponent(MethaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load chart data on init', () => {
    expect(apiServiceSpy.getMethane).toHaveBeenCalled();
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
