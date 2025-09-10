import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertSvgToPng() {
  const svgPath = path.join(__dirname, 'public', 'custom-elements-house-logo.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  try {
    // Convert to 512px PNG
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(path.join(__dirname, 'public', 'custom-elements-house-logo-512.png'));
    
    console.log('✅ Created custom-elements-house-logo-512.png');

    // Convert to 192px PNG
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(path.join(__dirname, 'public', 'custom-elements-house-logo-192.png'));
    
    console.log('✅ Created custom-elements-house-logo-192.png');

    console.log('🎉 SVG to PNG conversion completed successfully!');
  } catch (error) {
    console.error('❌ Error converting SVG to PNG:', error);
  }
}

convertSvgToPng();