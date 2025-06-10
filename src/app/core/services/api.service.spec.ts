import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  const baseUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting() // Use HttpClientTesting for mocking HTTP requests
      ],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request', () => {
    const mockData = { foo: 'bar' };
    service.get<any>('test-endpoint').subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${baseUrl}/test-endpoint`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should perform POST request', () => {
    const postData = { foo: 'bar' };
    const mockResponse = { success: true };
    service.post<any>('test-endpoint', postData).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/test-endpoint`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(postData);
    req.flush(mockResponse);
  });

  it('should perform PUT request', () => {
    const putData = { foo: 'baz' };
    const mockResponse = { updated: true };
    service.put<any>('test-endpoint', putData).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/test-endpoint`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(putData);
    req.flush(mockResponse);
  });

  it('should perform DELETE request', () => {
    const mockResponse = { deleted: true };
    service.delete<any>('test-endpoint').subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${baseUrl}/test-endpoint`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });
});