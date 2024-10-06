import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vetement } from '../modele/vetements.modele';
import { Boutique } from '../modele/boutique.model';
import { BoutiqueWrapper } from '../modele/BoutiqueWrapped.model';
 const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class VetementService {
  apiURL: string = 'http://localhost:8080/vetements/api';
  apiURLBou: string = 'http://localhost:8080/vetements/bou';
  vetement!: Vetement;
  vetements!: Vetement[]; //un tableau de chînes de caractères
  boutiques!: Boutique[];
  constructor(private http: HttpClient) {}

  listeVetement(): Observable<Vetement[]> {
    return this.http.get<Vetement[]>(this.apiURL);
  }

  ajouterVetement(empl: Vetement): Observable<Vetement> {
    return this.http.post<Vetement>(this.apiURL, empl, httpOptions);
  }

  supprimerVetement(id: number | undefined) {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  trierVetements() {
    this.vetements = this.vetements.sort((n1, n2) => {
      if (n1.idVet! > n2.idVet!) {
        return 1;
      }
      if (n1.idVet! < n2.idVet!) {
        return -1;
      }
      return 0;
    });
  }

  consulterVetement(id: number): Observable<Vetement> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Vetement>(url);
  }
  updateVetement(v: Vetement): Observable<Vetement> {
    return this.http.put<Vetement>(this.apiURL, v, httpOptions);
  }

  listeBoutiques(): Observable<BoutiqueWrapper> {
    return this.http.get<BoutiqueWrapper>(this.apiURLBou);
  }
  rechercherParBoutique(idBou: number): Observable<Vetement[]> {
    const url = `${this.apiURL}/vetsbou/${idBou}`;
    return this.http.get<Vetement[]>(url);
  }
  rechercherParMarque(marque: string): Observable<Vetement[]> {
    const url = `${this.apiURL}/vetMarque/${marque}`;
    return this.http.get<Vetement[]>(url);
  }
  ajouterBoutique(bou: Boutique): Observable<Boutique> {
    return this.http.post<Boutique>(this.apiURLBou, bou, httpOptions);
  }
}
