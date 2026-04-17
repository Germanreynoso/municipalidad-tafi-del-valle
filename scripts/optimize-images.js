const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/assets');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.match(/\.(jpe?g|png)$/i)) {
        results.push(file);
      }
    }
  });
  return results;
}

const images = walk(inputDir);

async function optimize() {
  console.log(`🚀 Iniciando optimización de ${images.length} imágenes...`);
  
  for (const file of images) {
    const webpPath = file.replace(/\.(jpe?g|png)$/i, '.webp');
    
    try {
      await sharp(file)
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      console.log(`✅ Convertida: ${path.relative(inputDir, webpPath)}`);
      
      // Opcional: Eliminar original si quieres ahorrar espacio
      // fs.unlinkSync(file); 
    } catch (err) {
      console.error(`❌ Error en ${file}:`, err);
    }
  }
  
  console.log('✨ Optimización completada.');
}

optimize();
