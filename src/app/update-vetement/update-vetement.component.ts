import { Component, OnInit } from '@angular/core';
import { VetementService } from '../services/vetement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vetement } from '../modele/vetements.modele';
import { Boutique } from '../modele/boutique.model';
 

@Component({
  selector: 'app-update-vetement',
  templateUrl: './update-vetement.component.html',
  styles: ``,
})
export class UpdateVetementComponent implements OnInit {
  currentVetement = new Vetement();
  boutiques!: Boutique[];
  updatedBouId?: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,

    private vetementService: VetementService
  ) {}
  ngOnInit(): void {
    this.vetementService.listeBoutiques().subscribe((bouts) => {
      console.log(bouts);
      this.boutiques = bouts._embedded.boutiques;
    });
    this.vetementService
      .consulterVetement(this.activatedRoute.snapshot.params['id'])
      .subscribe((vet) => {
        this.currentVetement = vet;
        this.updatedBouId = this.currentVetement.boutique?.idBou;
      });
  }
  updateVetement() {
    this.currentVetement.boutique = this.boutiques.find(
      (bou) => bou.idBou == this.updatedBouId
    )!;
    this.vetementService
      .updateVetement(this.currentVetement)
      .subscribe((vet) => {
        console.log(vet);
        this.router.navigate(['vetements']);
      });
  }
}
