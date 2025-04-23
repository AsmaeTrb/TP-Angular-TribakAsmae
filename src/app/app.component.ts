import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatalogCompnentComponent } from '../catalog-compnent/catalog-compnent.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CatalogCompnentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
  title = 'tp4';

  constructor() {}
    
  
}
