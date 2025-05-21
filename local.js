const express = require('express');
const path = require('path');

const app = express();
const PORT = 8085;

const LOCALES = ['fr-CA', 'en-US'];

LOCALES.forEach((locale) => {
  const localePath = path.join(__dirname, 'dist/tp4/browser', locale);

  // Sert les fichiers statiques pour chaque langue
  app.use(`/${locale}`, express.static(localePath));

  // Fallback vers index.csr.html pour le routing Angular
  app.get(`/${locale}/*`, (req, res) => {
    res.sendFile(path.join(localePath, 'catalog/index.html'));
  });
});

// Redirige vers fr-CA par défaut
app.get('/', (req, res) => {
  res.redirect('/fr-CA');
});

app.listen(PORT, () => {
  console.log(`🌍 App localisée disponible sur :`);
  console.log(`➡️  http://localhost:${PORT}/fr-CA`);
  console.log(`➡️  http://localhost:${PORT}/en-US`);
});
