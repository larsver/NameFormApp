import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Account {
  type: string;
  address: string;
}

interface PersonModel {
  id?: number;
  firstName: string;
  lastName: string;
  skills?: string[];
  accounts?: Account[];
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  // private apiUrl =  'https://localhost:7201/api/Persons';
  private apiUrl =  'https://localhost:5001/api/Persons';

  constructor(private http: HttpClient) {}

  // Get persons data from API
  getPersons(): Observable<PersonModel[]> {
    return this.http.get<PersonModel[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching names:', error);
        return throwError(error);
      })
    );
  }

  // Send new person to API
  addPerson(theperson: PersonModel): Observable<PersonModel> {
    return this.http.post<PersonModel>(this.apiUrl, theperson).pipe(
      catchError(error => {
        console.error('Error adding name:', error);
        return throwError(error);
      })
    );
  }
}
