// seed.js
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'seed');
const targetDir = path.join(__dirname, 'data');

const files = ['products.json', 'orders.json', 'cart.json', 'users.json'];

files.forEach(file => {
  fs.copyFileSync(
    path.join(sourceDir, file),
    path.join(targetDir, file)
  );
});

console.log("✅ Données restaurées depuias /seed vers /data");
