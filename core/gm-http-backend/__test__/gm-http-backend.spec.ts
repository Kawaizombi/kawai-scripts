import { TestBed } from "@angular/core/testing";
import { HttpBackend, HttpClient, HttpClientModule } from "@angular/common/http";
import GMBackend from "..";
import { Injectable } from "@angular/core";

@Injectable()
class TestService {
  constructor(private http: HttpClient) {
  }

  testRequest() {
    return this.http.get('spec://test.com', {observe: 'response'});
  }
}

describe('GMBackend', () => {
  let service: TestService;

  beforeAll(() => {
    (global as any).GM_xmlhttpRequest = jest.fn(({onload, url}) => {
      onload({
        response: "test",
        responseHeaders: "accept: all\ncontent: text",
        status: 200,
        statusCode: "OK",
        urlWithParams: url,
      })
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        {provide: HttpBackend, useClass: GMBackend},
        TestService,
      ],
    });

    service = TestBed.get(TestService);
  });

  it('should resolve', async () => {
    const res = await service.testRequest().toPromise();

    expect(res.body).toBe("test");

  });

  it('should parse headers', async () => {
    const res = await service.testRequest().toPromise();

    expect(res.headers.get('content')).toBe("text");
  });
});
