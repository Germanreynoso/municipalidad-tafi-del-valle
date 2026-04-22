const sharp = require('sharp');
async function test() {
  const image = sharp(process.argv[2]);
  const buffer = await image.raw().toBuffer();
  console.log('Pixel 0,0:', buffer[0], buffer[1], buffer[2]);
  console.log('Pixel 0,10:', buffer[40], buffer[41], buffer[42]);
}
test();
