import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

class GMBackend implements HttpHandler {
  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return new Observable((subscriber) => {

    });
  }
}
