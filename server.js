// ✅ Serveur Node.js avec stockage dans des fichiers JSON (aucune base de données nécessaire)
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const nodemailer = require("nodemailer");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const path = require("path");

const readData = (filename) => {
  const filePath = path.join(__dirname, "data", filename);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const writeData = (filename, data) => {
  const filePath = path.join(__dirname, "data", filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// ✅ Initialisation fichiers si non présents
const initFiles = ["users.json", "products.json", "orders.json", "cart.json"];
initFiles.forEach(file => {
  const filePath = path.join(__dirname, "data", file);
  if (!fs.existsSync(filePath)) {
    writeData(file, []);
  }
});
// ✅ Mise à jour d'une commande par ID (ex: pour marquer comme Livrée)
app.put("/api/orders/:id", (req, res) => {
  const orders = readData("orders.json");
  const orderId = parseInt(req.params.id);

  const index = orders.findIndex(order => order.id === orderId);
  if (index === -1) {
    return res.status(404).json({ error: "Commande non trouvée" });
  }

  // Met à jour les champs de la commande
  orders[index] = { ...orders[index], ...req.body };
  writeData("orders.json", orders);
  res.json({ message: "Commande mise à jour ✅" });
});

// ✅ Routes utilisateurs
app.get("/api/users", (req, res) => {
  const email = req.query.email?.toLowerCase();
  const users = readData("users.json");
  const user = users.find(u => u.email.toLowerCase() === email);
  res.json(user ? [user] : []);
});

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;
  const users = readData("users.json");
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Email ou mot de passe incorrect" });
  }
  res.status(200).json(user);
});
// ✅ Mise à jour d’un produit par ID

app.put("/api/products/:id", (req, res) => {
  const products = readData("products.json");
  const index = products.findIndex(p => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Produit non trouvé" });
  }

  // Garde l'ID original et met à jour les autres champs
  const updatedProduct = {
    ...products[index],
    ...req.body,
    id: req.params.id // On conserve l'ID original
  };

  products[index] = updatedProduct;
  writeData("products.json", products);
  res.json(updatedProduct);
});
// Ajoutez cette route avec les autres routes produits
app.get("/api/products/:id", (req, res) => {
  const products = readData("products.json");
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Produit non trouvé" });
  }
  res.json(product);
});
// ✅ Supprimer un produit par ID
app.delete("/api/products/:id", (req, res) => {
  let products = readData("products.json");
  const initialLength = products.length;
  products = products.filter(p => p.id !== req.params.id);

  if (products.length === initialLength) {
    return res.status(404).json({ error: "Produit non trouvé" });
  }

  writeData("products.json", products);
  res.json({ message: "🗑️ Produit supprimé" });
});


app.post("/api/users", (req, res) => {
  const users = readData("users.json");
  const exists = users.find(u => u.email.toLowerCase() === req.body.email.toLowerCase());
  if (exists) return res.status(400).json({ error: "Cet email est déjà utilisé." });
  const newUser = { ...req.body, id: (users.length + 1).toString() };
  users.push(newUser);
  writeData("users.json", users);
  res.status(201).json(newUser);
});

// ✅ Produits
app.get("/api/products", (req, res) => {
  const products = readData("products.json");
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const products = readData("products.json");
  const newId = Date.now().toString();

  const newProduct = {
    ...req.body,
    id: newId,
    createdAt: new Date().toISOString(), // 🆕 Date d’ajout
    sizes: req.body.sizes || [{ size: '', quantity: 0 }]
  };

  products.push(newProduct);
  writeData("products.json", products);

  res.status(201).json({ ...newProduct, message: "Produit ajouté" });
});

// ✅ Panier
app.get("/api/cart", (req, res) => {
  const cart = readData("cart.json");
  res.json(cart);
});

app.post("/api/cart", (req, res) => {
  let cart = readData("cart.json");
  const item = req.body;
  const existing = cart.find(i => i.id === item.id && i.size === item.size);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }
  writeData("cart.json", cart);
  res.status(201).json({ message: "Ajouté au panier" });
});

app.delete("/api/cart/:id/:size", (req, res) => {
  let cart = readData("cart.json");
  cart = cart.filter(i => !(i.id === req.params.id && i.size === req.params.size));
  writeData("cart.json", cart);
  res.json({ message: "Produit supprimé" });
});

app.delete("/api/cart", (req, res) => {
  writeData("cart.json", []);
  res.json({ message: "Panier vidé avec succès" });
});

// ✅ Commandes
app.get("/api/orders", (req, res) => {
  const orders = readData("orders.json");
  res.json(orders);
});
app.post("/api/orders", (req, res) => {
  const orders = readData("orders.json");
  const products = readData("products.json"); // On lit les produits

  const newOrder = {
    ...req.body,
    id: orders.length + 1,
    date: new Date()
  };

  // 🔁 Met à jour le stock pour chaque article de la commande
  let stockError = false;
  newOrder.items.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      const sizeObj = product.sizes.find(s => s.size === item.size);
      if (sizeObj && sizeObj.quantity >= item.quantity) {
        sizeObj.quantity -= item.quantity;

        // ⚠️ Optionnel : log stock faible
        if (sizeObj.quantity <= 2) {
          console.log(`⚠️ Stock faible : ${product.name} taille ${sizeObj.size}`);
        }

      } else {
        stockError = true;
      }
    }
  });

  if (stockError) {
    return res.status(400).json({ message: "Stock insuffisant pour un ou plusieurs articles." });
  }

  // ✅ Enregistrement
  orders.push(newOrder);
  writeData("orders.json", orders);
  writeData("products.json", products); // sauvegarde le nouveau stock

  res.status(201).json({ message: "Commande enregistrée et stock mis à jour ✅" });
});


// ✅ Email (code de vérification)
const verificationCodes = new Map();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "asmae.tribakk@gmail.com",
    pass: "kbeg ehrd pdle jyhk"
  }
});

app.post("/send-email", async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const mailOptions = {
    from: "asmae.tribakk@gmail.com",
    to: email,
    subject: "Code de confirmation",
    text: `Votre code est : ${code}`
  };
  try {
    await transporter.sendMail(mailOptions);
    verificationCodes.set(email, { code, expiresAt: Date.now() + 5 * 60 * 1000 });
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false });
  }
});

app.post("/verify-code", (req, res) => {
  const { email, code } = req.body;
  const entry = verificationCodes.get(email);
  if (!entry) return res.status(400).send({ verified: false });
  if (Date.now() > entry.expiresAt) return res.status(400).send({ verified: false, reason: "expired" });
  if (entry.code === code) {
    verificationCodes.delete(email);
    return res.send({ verified: true });
  }
  res.status(400).send({ verified: false });
});

// ✅ Lancement du serveur
const port = 3000;
app.listen(port, () => console.log(`✅ Serveur Node.js avec fichiers JSON sur http://localhost:${port}`));
