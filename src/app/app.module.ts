import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VetementsComponent } from './vetements/vetements.component';
import { AddVetementsComponent } from './add-vetements/add-vetements.component';
import { FormsModule } from '@angular/forms';
import { UpdateVetementComponent } from './update-vetement/update-vetement.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RechercheParBoutiqueComponent } from './recherche-par-boutique/recherche-par-boutique.component';
import { RechercheParMarqueComponent } from './recherche-par-marque/recherche-par-marque.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ListeBoutiquesComponent } from './liste-boutiques/liste-boutiques.component';
import { UpdateBoutiqueComponent } from './update-boutique/update-boutique.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { TokenInterceptor } from './services/token.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    VetementsComponent,
    AddVetementsComponent,
    UpdateVetementComponent,
    RechercheParBoutiqueComponent,
    RechercheParMarqueComponent,
    SearchFilterPipe,
    ListeBoutiquesComponent,
    UpdateBoutiqueComponent,
    LoginComponent,
    ForbiddenComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
