const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require('nodemailer');



const app = express();
// Configuration middleware
app.use(bodyParser.json());
app.use(cors());

const verificationCodes = new Map();

// 💾 Liste des utilisateurs (base simulée)
const users = [
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
    email: "asmae@gmail.com",
    password: "1111",
    role: "Guest"
  }
];

// ✅ GET /api/users?email=... → pour vérifier si l’email existe
app.get("/api/users", (req, res) => {
  const email = req.query.email?.toLowerCase();
  const user = users.find(u => u.email.toLowerCase() === email);
  res.json(user ? [user] : []);
});

// ✅ POST /api/users/login → vérifie mot de passe
app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Email ou mot de passe incorrect" });
  }

  res.status(200).json(user); // Pas de session !
});


let cartItems = [];
app.post('/api/cart', (req, res) => {
  const item = req.body;

  // Vérifie si l'article existe déjà (même id + taille)
  const existing = cartItems.find(i => i.id === item.id && i.size === item.size);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cartItems.push(item);
  }

  res.status(201).json({ message: 'Ajouté au panier' });
});

app.get("/api/products", (req, res) => {
  const products = [
   {
      id: "1",
      name: "Robe de plage brodée",
      price: 299.99,
      color: "Blanc",
      description: "Une robe de plage brodée en popeline de coton unie...",
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
      color: "Bleu marine",
      description: "Polo boutonné à manches courtes avec broderie H...",
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
      color: "Argenté",
      description: "Montre en acier, mouvement extra-plat...",
      image1: "./assets/im15.jpg",
      image2: "./assets/im16.jpg",
      category: "BIJOUTERIE ET MONTRES",
      sizes: [
        { size: "16-18,5 cm", quantity: 3 }
      ]
    },
    {
      id: "4",
      name: "Chaussons en seersucker",
      price: 65.00,
      color: "Blanc et bleu",
      description: "Chaussons en seersucker...",
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
      color: "Blanc",
      description: "Un t-shirt cropped en jersey de coton uni...",
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
      color: "Blanc",
      description: "Une robe prairie en gaze avec motif « Mosaïque »...",
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
      color: "Multicolore",
      description: "Jeu de 9 cubes en érable imprimé...",
      image1: "./assets/im17.jpg",
      image2: "./assets/im18.jpg",
      category: "enfants",
      sizes: [
        { size: "Taille unique", quantity: 10 }
      ]
    },
    {
      id: "8",
      name: "Bracelet jonc en veau Epsom et métal",
      price: 450.00,
      color: "Or rose",
      description: "Bracelet jonc en veau Epsom et métal...",
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
      color: "Beige",
      description: "Pantalon Saint Germain en serge de coton stretch...",
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
      color: "Blanc",
      description: "Chemise en popeline compacte...",
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
  res.send(products);
});
app.get('/api/cart', (req, res) => {
  res.json(cartItems);
});
app.delete('/api/cart/:id/:size', (req, res) => {
  const { id, size } = req.params;
  cartItems = cartItems.filter(item => !(item.id === id && item.size === size));
  res.json({ message: 'Produit supprimé' });
});
// ✅ Enregistrement d'un nouvel utilisateur
app.post("/api/users", (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    gender,
    birthDate,
    address,
    city,
    country
  } = req.body;

  // Vérifie si l'email existe déjà
  const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(400).json({ error: "Cet email est déjà utilisé." });
  }

  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password,
    role,
    phone,
    gender,
    birthDate,
    address,
    city,
    country
  };

  users.push(newUser);
  res.status(201).json(newUser);
});


// ✅ Déconnexion
app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ disconnected: true });
  });
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'asmae.tribakk@gmail.com',
    pass: 'kbeg ehrd pdle jyhk' // ton mot de passe d’application
  }
});
app.post('/send-email', async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  const mailOptions = {
    from: 'asmae.tribakk@gmail.com',
    to: email,
    subject: 'Votre code de confirmation',
    text: `Votre code est : ${code}`
  };

  try {
    await transporter.sendMail(mailOptions);
    verificationCodes.set(email, { code, expiresAt });
    console.log(`✅ Code pour ${email} : ${code}`); // À retirer en prod
    res.send({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false });
  }
});

app.post('/verify-code', (req, res) => {
  const { email, code } = req.body;
  const entry = verificationCodes.get(email);

  if (!entry) {
    return res.status(400).send({ verified: false });
  }

  const { code: savedCode, expiresAt } = entry;

  if (Date.now() > expiresAt) {
    verificationCodes.delete(email);
    return res.status(400).send({ verified: false, reason: "expired" });
  }

  if (savedCode === code) {
    verificationCodes.delete(email);
    return res.send({ verified: true });
  } else {
    return res.status(400).send({ verified: false });
  }
});

app.delete('/api/cart', (req, res) => {
  cartItems = [];
  res.status(200).json({ message: 'Panier vidé avec succès' });
});

let orders = []; // stockage en mémoire

app.post('/api/orders', (req, res) => {
  const order = req.body;

  if (!order || !order.items || !Array.isArray(order.items)) {
    return res.status(400).json({ error: 'Commande invalide' });
  }

  order.id = orders.length + 1;
  order.date = new Date();
  orders.push(order);

  res.status(201).json({ message: 'Commande enregistrée', orderId: order.id });
});
const port = 3000;
app.listen(port, () => console.log(`API Server listening on port ${port}`));
