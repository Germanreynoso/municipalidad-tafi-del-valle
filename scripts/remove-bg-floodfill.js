import sharp from 'sharp';

async function floodFillTolerance(inputPath, outputPath, tolerance = 40) {
  const image = sharp(inputPath);
  const { width, height } = await image.metadata();

  const buffer = await image.ensureAlpha().raw().toBuffer();
  const idx = (x, y) => (y * width + x) * 4;

  // Sample background color at the 4 corners (average)
  const sampleCorners = () => {
    const corners = [
      [0, 0], [width - 1, 0], [0, height - 1], [width - 1, height - 1]
    ];
    let totalR = 0, totalG = 0, totalB = 0;
    for (const [x, y] of corners) {
      const i = idx(x, y);
      totalR += buffer[i]; totalG += buffer[i+1]; totalB += buffer[i+2];
    }
    return [totalR / 4, totalG / 4, totalB / 4];
  };

  const [bgR, bgG, bgB] = sampleCorners();
  console.log(`Sampled background color: rgb(${Math.round(bgR)}, ${Math.round(bgG)}, ${Math.round(bgB)})`);

  const isBg = (x, y) => {
    const i = idx(x, y);
    const a = buffer[i+3];
    if (a < 10) return true; // already transparent

    const r = buffer[i], g = buffer[i+1], b = buffer[i+2];

    // Match against sampled background color with tolerance
    const dist = Math.sqrt(
      Math.pow(r - bgR, 2) +
      Math.pow(g - bgG, 2) +
      Math.pow(b - bgB, 2)
    );
    if (dist < tolerance) return true;

    // Also catch the OTHER checkerboard color (~204,204,204 or ~192,192,192)
    const isGray = Math.abs(r - g) < 8 && Math.abs(g - b) < 8 && r > 150 && r < 230;
    if (isGray) {
      // Make sure it's not near center (could be the animal's light areas)
      // Basic heuristic: if it's near an already-transparent pixel, it's background
      const hasTransparentNeighbor = () => {
        for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1]]) {
          const nx = x + dx, ny = y + dy;
          if (nx >= 0 && ny >= 0 && nx < width && ny < height) {
            if (buffer[idx(nx, ny)+3] === 0) return true;
          }
        }
        return false;
      };
      if (hasTransparentNeighbor()) return true;
    }

    return false;
  };

  const visited = new Uint8Array(width * height);

  // Seed from ALL border pixels
  const queue = [];
  for (let x = 0; x < width; x++) {
    if (isBg(x, 0)) queue.push([x, 0]);
    if (isBg(x, height - 1)) queue.push([x, height - 1]);
  }
  for (let y = 1; y < height - 1; y++) {
    if (isBg(0, y)) queue.push([0, y]);
    if (isBg(width - 1, y)) queue.push([width - 1, y]);
  }

  console.log(`Starting BFS with ${queue.length} seed pixels...`);

  // Mark seeds visited
  for (const [x, y] of queue) visited[y * width + x] = 1;

  let qi = 0;
  while (qi < queue.length) {
    const [x, y] = queue[qi++];
    const i = idx(x, y);
    buffer[i+3] = 0; // make transparent

    for (const [dx, dy] of [[-1,0],[1,0],[0,-1],[0,1]]) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const ni = ny * width + nx;
      if (!visited[ni] && isBg(nx, ny)) {
        visited[ni] = 1;
        queue.push([nx, ny]);
      }
    }
  }

  console.log(`Removed ${qi} background pixels.`);

  await sharp(buffer, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(outputPath);

  console.log('Saved:', outputPath);
}

floodFillTolerance(process.argv[2], process.argv[3], 50).catch(console.error);
