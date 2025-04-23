import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  products: Product[] = [];
  constructor() { 
    this.addSampleData();
  };

  
  addSampleData() {
    this.products.push(
      new Product(
        '0',
        'Effaclar DUO+M',
        'La Roche-Posay',
        129.99,
        'Soin complet contre les imperfections sévères : réduit boutons, points noirs et marques persistantes.',
        '../assets/image1.jpg',
        ['Niacinamide', 'Procerad', 'LHA', 'Acide salicylique'],
        'Appliquer matin et soir sur le visage nettoyé, en évitant le contour des yeux.',
        2
      )
    );
    this.products.push(
      new Product(
        '1',
        'Hyalu B5 Sérum à l\'Acide Hyaluronique',
        'La Roche-Posay',
        169.99,
        'Sérum réparateur anti-rides repulpant avec de l’acide hyaluronique pur et de la vitamine B5.',
        '../assets/image2.jpg',
        ['Acide Hyaluronique', 'Vitamine B5', 'Madecassoside', 'Eau thermale La Roche-Posay'],
        'Appliquer matin et/ou soir sur le visage et le cou.',
        10
      )
    );
  
    this.products.push(
      new Product(
        '2',
        'Hydreane Légère Crème Hydratante',
        'La Roche-Posay',
        89.99,
        'Crème hydratante pour peaux normales à mixtes, enrichie en Eau Thermale de La Roche-Posay, elle hydrate intensément tout en réduisant la sensibilité cutanée.',
        '../assets/image3.jpg',
        ['Eau Thermale La Roche-Posay', 'Squalane', 'Glycérine', 'Shea Butter'],
        'Appliquer matin et/ou soir sur une peau propre, visage et cou.',
        15
      )
    );
  }

  getProducts(): Product[] {
    return this.products;
  }
 getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }
  
}
