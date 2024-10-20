import { Component, OnInit } from '@angular/core';
import { Vetement } from '../modele/vetements.modele';
import { VetementService } from '../services/vetement.service';

import { AuthService } from '../auth.service';
import { Boutique } from '../modele/boutique.model';

@Component({
  selector: 'app-vetements',
  templateUrl: './vetements.component.html',
})
export class VetementsComponent implements OnInit {
  vetements?: Vetement[]; //un tableau de chînes de caractères
  boutiques?: Boutique[];
  constructor(
    private vetementService: VetementService,
    public authService: AuthService
  ) {}
  supprimerVetement(v: Vetement) {
  
    let conf = confirm('Etes-vous sûr ?');
    if (conf)
      this.vetementService.supprimerVetement(v.idVet!).subscribe(() => {
        console.log('Vetement supprimé');
        this.chargerVetements();
      });
  }
  ngOnInit(): void {
    this.chargerVetements();
  }
  chargerVetements() {
    this.vetementService.listeVetement().subscribe((vets) => {
      console.log(vets);
      this.vetements = vets;
    });
  }
}
