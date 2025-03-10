import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from './event';
import { EventParticipants } from './event-participants';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  baseUrl = 'http://localhost:8080/api/events';

  constructor( private http: HttpClient) { }

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }
}
