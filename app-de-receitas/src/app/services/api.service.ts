import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) { }

  buscarCategorias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories.php`);
  }

  buscarReceitasPorCategoria(categoria: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/filter.php?c=${categoria}`);
  }

  buscarDetalhesReceita(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/lookup.php?i=${id}`);
  }

  pesquisarReceitas(pesquisa: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search.php?s=${pesquisa}`);
  }
}
