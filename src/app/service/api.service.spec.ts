import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const url = 'https://global-warming.org/api';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get temperature', () => {
    const urlTemperature = `${url}/temperature-api`;

    service.getTemperature().subscribe((data) => {
      expect(data).toBeTruthy()
    })

    const req = httpTestingController.expectOne(urlTemperature);
    expect(req.request.method).toEqual('GET');
    req.flush({});
  })

  it('get CO2', () => {
    const urlCO2 = `${url}/co2-api`;

    service.getCO2().subscribe((data) => {
      expect(data).toBeTruthy()
    })

    const req = httpTestingController.expectOne(urlCO2);
    expect(req.request.method).toEqual('GET');
    req.flush({});
  })

  it('get Methane', () => {
    const urlMethane = `${url}/methane-api`;

    service.getMethane().subscribe((data) => {
      expect(data).toBeTruthy()
    })

    const req = httpTestingController.expectOne(urlMethane);
    expect(req.request.method).toEqual('GET');
    req.flush({});
  })

  it('get NO2', () => {
    const urlNO2 = `${url}/nitrous-oxide-api`;

    service.getNO2().subscribe((data) => {
      expect(data).toBeTruthy()
    })

    const req = httpTestingController.expectOne(urlNO2);
    expect(req.request.method).toEqual('GET');
    req.flush({});
  })

  it('get Polar Ice', () => {
    const urlPolarIce = `${url}/arctic-api`;

    service.getPolarIce().subscribe((data) => {
      expect(data).toBeTruthy()
    })

    const req = httpTestingController.expectOne(urlPolarIce);
    expect(req.request.method).toEqual('GET');
    req.flush({});
  })
});
