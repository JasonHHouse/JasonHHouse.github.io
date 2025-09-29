import pngToIco from 'png-to-ico';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateFavicon() {
  const sourcePath = path.join(__dirname, 'public', 'logo192.png');
  const faviconPath = path.join(__dirname, 'public', 'favicon.ico');
  const tempDir = path.join(__dirname, 'temp-favicon');

  try {
    // Create temp directory
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    console.log('🖼️  Creating multiple sizes from logo192.png...');

    // Create multiple sizes for the ICO file
    const sizes = [16, 24, 32, 48, 64];
    const pngPaths = [];

    for (const size of sizes) {
      const sizePath = path.join(tempDir, `favicon-${size}x${size}.png`);
      await sharp(sourcePath)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(sizePath);
      
      pngPaths.push(sizePath);
      console.log(`✅ Created ${size}x${size} favicon`);
    }

    console.log('🔄 Converting to ICO format...');

    // Convert all PNGs to a single ICO file
    const icoBuffer = await pngToIco(pngPaths);
    fs.writeFileSync(faviconPath, icoBuffer);

    console.log('✅ Successfully created favicon.ico from logo192.png');

    // Clean up temp files
    fs.rmSync(tempDir, { recursive: true });
    console.log('🧹 Cleaned up temporary files');

    // Verify the ICO file
    const stats = fs.statSync(faviconPath);
    console.log(`📊 New favicon.ico size: ${stats.size} bytes`);
    console.log('🎉 Favicon update completed!');
    
  } catch (error) {
    console.error('❌ Error updating favicon:', error);
    
    // Clean up temp directory on error
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
  }
}

updateFavicon();