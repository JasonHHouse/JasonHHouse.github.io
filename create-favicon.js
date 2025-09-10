import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createFavicon() {
  const pngPath = path.join(__dirname, 'public', 'custom-elements-house-logo-192.png');
  const faviconPath = path.join(__dirname, 'public', 'favicon.ico');

  try {
    // Convert PNG to 32x32 ICO format
    await sharp(pngPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, 'public', 'favicon-temp.png'));
    
    // Note: Sharp doesn't directly support ICO format, so we'll create a 32px PNG
    // and rename it as favicon for now. For true ICO support, you'd need another library
    await sharp(pngPath)
      .resize(16, 16)
      .png()
      .toFile(path.join(__dirname, 'public', 'favicon-16.png'));
      
    await sharp(pngPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, 'public', 'favicon-32.png'));
    
    console.log('✅ Created favicon-16.png and favicon-32.png');
    console.log('📝 Note: For true .ico format, consider using a specialized tool');
    console.log('🎉 Favicon creation completed!');
  } catch (error) {
    console.error('❌ Error creating favicon:', error);
  }
}

createFavicon();