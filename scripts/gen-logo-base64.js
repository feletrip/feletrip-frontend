const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
const targetPath = path.join(__dirname, '..', 'lib', 'obeo-logo-base64.ts');

const buf = fs.readFileSync(logoPath);
const base64Str = buf.toString('base64');
const content = `export const OBEO_LOGO_BASE64 = "data:image/png;base64,${base64Str}";\n`;

fs.writeFileSync(targetPath, content, 'utf8');
console.log('Successfully wrote obeo-logo-base64.ts with quotes, size:', content.length);
