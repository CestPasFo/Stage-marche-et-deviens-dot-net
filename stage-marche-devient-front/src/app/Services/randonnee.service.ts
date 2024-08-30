import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { Randonnee } from '../Models/randonnee.model';
import { environment } from '../Environment/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RandonneeService {
  private readonly RANDONNEE_ENDPOINT = '/api/Randonnee';

  constructor(private api: ApiService) { }

  getRandos(): Observable<Randonnee[]> {
    const url = `${environment.apiBaseUrl}${this.RANDONNEE_ENDPOINT}`;
    console.log('Calling API at:', url);
    return this.api.get<Randonnee[]>(url).pipe(
      catchError(error => {
        console.error('Erreur détaillée:', error);
        return throwError(() => new Error(`Échec de la récupération des randonnées: ${error.message}`));
      })
    );
  }
}
