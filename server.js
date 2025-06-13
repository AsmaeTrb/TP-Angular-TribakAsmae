const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

let cart = [];

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: "1",
      name: "Robe de plage brodée",
      price: 299.99,
      description: "Une robe de plage brodée en popeline de coton unie (100 % coton)\n\n- Col avec bouton en nacre gravé Clou de Selle\n- Broderie inspiration « Arlésienne » sur le devant\n- Bas des manches avec liens de serrage dans le même tissu\n\nCe modèle a une coupe ajustée, pour un porté plus ample nous vous conseillons de prendre une taille au-dessus de votre taille habituelle.\n\nFabriqué en Italie",
      image1: "./assets/im1.jpg",
      image2: "./assets/im2.jpg",
      category: "femmes",
      sizes: [
        { size: "S", quantity: 5 },
        { size: "M", quantity: 8 },
        { size: "L", quantity: 3 },
        { size: "XL", quantity: 1 },
        { size: "XXL", quantity: 0 }
      ]
    },
    {
      id: "2",
      name: "Polo boutonné à manches courtes avec broderie H",
      price: 159.00,
      description: "Polo boutonné à manches courtes avec broderie H, en piqué de coton, poche poitrine (100 % coton). Less is more : le polo cache bien son jeu. Rien de plus simple en effet que cette pièce essentielle du vestiaire masculin. Celui-ci recèle cependant quelques détails uniques : son coton prélavé donne plus de douceur et de résistance à la fibre et ses doubles coutures plates assurent confort, tenue et élégance. Conseil de style : plus le polo est coloré, plus votre teint paraîtra hâlé ; ne relevez pas le col et n’ajoutez pas de nœud papillon. Fabriqué en Italie.",
      image1: "./assets/im11.jpg",
      image2: "./assets/im12.jpg",
      category: "hommes",
      sizes: [
        { size: "S", quantity: 6 },
        { size: "M", quantity: 10 },
        { size: "L", quantity: 7 },
        { size: "XL", quantity: 4 }
      ]
    },
    {
      id: "3",
      name: "Montre en acier, mouvement extra-plat Hermès H1950",
      price: 7800.00,
      description: "Montre en acier, mouvement extra-plat de Manufacture Hermès H1950, cadran argenté opalin, bracelet long en alligator mat havane. Fabriqué en Suisse. Finition métallique : Acier.",
      image1: "./assets/im15.jpg",
      image2: "./assets/im16.jpg",
      category: "BIJOUTERIE ET MONTRES",
      sizes: [
        { size: "16-18,5 cm", quantity: 3 }
      ]
    }
,    
{
  id: "4",
  name: "Chaussons en seersucker",
  price: 65.00,
  description: "Chaussons en seersucker. 100 % coton. Intérieur en éponge (100 % coton). Broderie sous le chausson (96 % polyester, 4 % céramique). Fabriqué en France. Dessiné par Alice Charbin. Convient aux enfants âgés de 6 à 12 mois. Taille 19.",
  image1: "./assets/im19.jpg",
  image2: "./assets/im20.jpg",
  category: "enfants",
  sizes: [
    { size: "19", quantity: 6 }
  ]
},
    {
      id: "5",
      name: "T-shirt cropped en jersey de coton uni",
      price: 79.99,
      description: "Un t-shirt cropped en jersey de coton uni (100 % coton). Col rond avec bord-côte. Sérigraphie « Les Clefs » sur le devant. Ce modèle taille normalement, nous vous conseillons de prendre votre taille habituelle. Fabriqué en France.",
      image1: "./assets/im3.jpg",
      image2: "./assets/im4.jpg",
      category: "femmes",
      sizes: [
        { size: "S", quantity: 6 },
        { size: "M", quantity: 10 },
        { size: "L", quantity: 4 },
        { size: "XL", quantity: 2 },
        { size: "XXL", quantity: 0 }
      ]
    },
    {
      id: "6",
      name: "Robe prairie en gaze avec motif « Mosaïque »",
      price: 349.99,
      description: "Une robe prairie en gaze avec motif « Mosaïque » (100 % coton). Fermeture patte de boutonnage milieu devant avec boutons en nacre gravés Clou de Selle. Ceinture en gaze avec motif « Mosaïque » nouée à la taille. Ce modèle taille normalement, nous vous conseillons de prendre votre taille habituelle. Fabriqué en France.",
      image1: "./assets/im5.jpg",
      image2: "./assets/im6.jpg",
      category: "femmes",
      sizes: [
        { size: "S", quantity: 7 },
        { size: "M", quantity: 9 },
        { size: "L", quantity: 5 },
        { size: "XL", quantity: 2 },
        { size: "XXL", quantity: 1 }
      ]
    },
    {
      id: "7",
      name: "Jeu de 9 cubes en érable imprimé",
      price: 120.00,
      description: "Jeu de 9 cubes en érable imprimé. Fabriqué en Allemagne. Dessiné par Jan Bajtlik. Dimensions jeu complet : L 13,5 x H 13,5 cm. Dimensions cube individuel : L 4,5 x H 4,5 cm.",
      image1: "./assets/im17.jpg",
      image2: "./assets/im18.jpg",
      category: "enfants",
      sizes: [
        { size: "Taille unique", quantity: 10 }
      ]
    }
,    
    {
      id: "8",
      name: "Bracelet jonc en veau Epsom et métal",
      price: 450.00,
      description: "Bracelet jonc en veau Epsom et métal. La ligne Athéna met à l'honneur notre emblématique signature Médor, en réinterprétant le clou sur une ligne de bijoux en métal et cuir. Une invitation tout en finesse aux portés en accumulation. Fabriqué en France. Finition métallique : Or rose. Tour de poignet de 13,5 cm à 14,5 cm | Largeur : 0,3 cm.",
      image1: "./assets/im7.jpg",
      image2: "./assets/im8.jpg",
      category: "BIJOUTERIE ET MONTRES",
      sizes: [
        { size: "T1", quantity: 4 },
        { size: "T2", quantity: 6 },
        { size: "T3", quantity: 2 }
      ]
    },
    {
      id: "9",
      name: "Pantalon Saint Germain en serge de coton stretch",
      price: 299.99,
      description: "Pantalon Saint Germain en serge de coton stretch (97 % coton, 3 % élasthanne). Coupe ajustée. Poches boutonnées au dos. Détails de découpe. Ce modèle taille normalement, nous vous conseillons de prendre votre taille habituelle. Fabriqué en Italie. Longueur : 113,5 cm | Bas : 19 cm | Montant : 23 cm. Les dimensions indiquées correspondent à une taille 40, elles peuvent varier de +/- 1 cm en fonction de la taille.",
      image1: "./assets/im9.jpg",
      image2: "./assets/im10.jpg",
      category: "hommes",
      sizes: [
        { size: "38", quantity: 5 },
        { size: "40", quantity: 8 },
        { size: "42", quantity: 3 },
        { size: "44", quantity: 2 }
      ]
    },
    {
      id: "10",
      name: "Chemise en popeline compacte",
      price: 210.00,
      description: "Chemise en popeline compacte (100 % coton). Coupe ajustée. Boutons en pure nacre. Poignets simples avec boutons Clou de Selle en palladium, coutures renforcées, 7 points par cm. Ce modèle taille normalement, nous vous conseillons de prendre votre taille habituelle. Fabriqué en France. Longueur : 78 cm. Les dimensions indiquées correspondent à une taille 39, elles peuvent varier de +/- 1 cm en fonction de la taille.",
      image1: "./assets/im13.jpg",
      image2: "./assets/im14.jpg",
      category: "hommes",
      sizes: [
        { size: "38", quantity: 50 },
        { size: "39", quantity: 7 },
        { size: "40", quantity: 6 },
        { size: "41", quantity: 4 },
        { size: "42", quantity: 3 },
        { size: "43", quantity: 2 },
        { size: "44", quantity: 1 }
      ]
    }
    
    
  
  ]
  let users = [
    {
      id: "1",
      name: "Admin",
      email: "admin@admin.com",
      password: "admin",
      role: "Admin"
    },
    {
      id: "2",
      name: "Asmae",
      email: "Asmae@gmail.com",
      password: "1111",
      role: "Guest"
    },
  
  ];
  res.send(products);
});

app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

app.get("/api/cart", (req, res) => res.send(cart));

const port = 3000;
app.listen(port, () => console.log(`API Server listening on port ${port}`));
