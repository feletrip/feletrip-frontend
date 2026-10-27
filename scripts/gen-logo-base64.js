const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
const targetPath = path.join(__dirname, '..', 'lib', 'feletrip-logo-base64.ts');

const buf = fs.readFileSync(logoPath);
const base64Str = buf.toString('base64');
const content = `export const FELETRIP_LOGO_BASE64 = "data:image/png;base64,${base64Str}";\n`;

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Successfully wrote feletrip-logo-base64.ts, size:', content.length);
