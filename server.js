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
      id: "0",
      name_product: "Effaclar DUO+M",
      brand: "La Roche-Posay",
      price: 129.99,
      description: "Soin complet contre les imperfections sévères : réduit boutons, points noirs et marques persistantes.",
      image: "./assets/image1.jpg",
      ingredients: ["Niacinamide", "Procerad", "LHA", "Acide salicylique"],
      how_to_use: "Appliquer matin et soir sur le visage nettoyé, en évitant le contour des yeux.",
      quantity: 2
    },
    {
      id: "1",
      name_product: "Hyalu B5 Sérum à l'Acide Hyaluronique",
      brand: "La Roche-Posay",
      price: 169.99,
      description: "Sérum réparateur anti-rides repulpant avec de l’acide hyaluronique pur et de la vitamine B5.",
      image: "./assets/image2.jpg",
      ingredients: ["Acide Hyaluronique", "Vitamine B5", "Madecassoside", "Eau thermale La Roche-Posay"],
      how_to_use: "Appliquer matin et/ou soir sur le visage et le cou.",
      quantity: 10
    },
    {
      id: "2",
      name_product: "Hydreane Légère Crème Hydratante",
      brand: "La Roche-Posay",
      price: 89.99,
      description: "Crème hydratante pour peaux normales à mixtes, enrichie en Eau Thermale de La Roche-Posay.",
      image: "./assets/image3.jpg",
      ingredients: ["Eau Thermale La Roche-Posay", "Squalane", "Glycérine", "Shea Butter"],
      how_to_use: "Appliquer matin et/ou soir sur une peau propre, visage et cou.",
      quantity: 15
    }
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
