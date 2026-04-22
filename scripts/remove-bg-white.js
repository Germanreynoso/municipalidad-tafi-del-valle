const sharp = require('sharp');
const path = require('path');

const inputPath = process.argv[2];
const outputPath = process.argv[3];

sharp(inputPath)
  .ensureAlpha()
  .toFormat('png')
  .toBuffer()
  .then(buffer => {
    return sharp(buffer)
      .composite([{
        input: Buffer.from([255, 255, 255, 255]),
        blend: 'dest-out',
        tile: true,
        raw: { width: 1, height: 1, channels: 4 }
      }])
      .toFile(outputPath);
  })
  .then(() => console.log('Done'))
  .catch(err => console.error(err));
