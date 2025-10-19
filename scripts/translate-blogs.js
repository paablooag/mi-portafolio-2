import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const LIBRE_TRANSLATE_API = 'https://libretranslate.com/translate';

// Función para traducir texto usando LibreTranslate (API pública gratuita)
async function translateText(text, sourceLang = 'es', targetLang = 'en') {
  try {
    const response = await fetch(LIBRE_TRANSLATE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      })
    });

    if (!response.ok) {
      throw new Error(`Error en traducción: ${response.statusText}`);
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error('Error al traducir:', error.message);
    return text; // Retornar texto original si falla
  }
}

// Función para dividir texto en chunks más pequeños (LibreTranslate tiene límites)
function chunkText(text, maxLength = 5000) {
  const chunks = [];
  let currentChunk = '';
  
  const lines = text.split('\n');
  
  for (const line of lines) {
    if ((currentChunk + line + '\n').length > maxLength) {
      if (currentChunk) {
        chunks.push(currentChunk);
        currentChunk = '';
      }
    }
    currentChunk += line + '\n';
  }
  
  if (currentChunk) {
    chunks.push(currentChunk);
  }
  
  return chunks;
}

// Función para traducir un archivo markdown
async function translateMarkdownFile(filePath) {
  console.log(`\n📄 Traduciendo: ${path.basename(filePath)}`);
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Separar frontmatter del contenido
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!frontmatterMatch) {
    console.log('⚠️  No se encontró frontmatter, saltando...');
    return null;
  }
  
  const [, frontmatter, markdown] = frontmatterMatch;
  
  // Parsear frontmatter
  const titleMatch = frontmatter.match(/title:\s*['"](.+)['"]/);
  const descriptionMatch = frontmatter.match(/description:\s*['"](.+)['"]/);
  
  if (!titleMatch || !descriptionMatch) {
    console.log('⚠️  Falta título o descripción, saltando...');
    return null;
  }
  
  const originalTitle = titleMatch[1];
  const originalDescription = descriptionMatch[1];
  
  console.log('📝 Traduciendo título y descripción...');
  
  // Traducir título y descripción
  const translatedTitle = await translateText(originalTitle);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Delay para no sobrecargar API
  
  const translatedDescription = await translateText(originalDescription);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('📝 Traduciendo contenido del blog...');
  
  // Dividir markdown en chunks para traducir
  const chunks = chunkText(markdown, 3000);
  const translatedChunks = [];
  
  for (let i = 0; i < chunks.length; i++) {
    console.log(`   Traduciendo chunk ${i + 1}/${chunks.length}...`);
    const translated = await translateText(chunks[i]);
    translatedChunks.push(translated);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Delay entre requests
  }
  
  const translatedMarkdown = translatedChunks.join('');
  
  // Crear nuevo frontmatter con traducciones
  const newFrontmatter = frontmatter
    .replace(/title:\s*['"](.+)['"]/, `title: "${translatedTitle}"`)
    .replace(/description:\s*['"](.+)['"]/, `description: "${translatedDescription}"`);
  
  const translatedContent = `---\n${newFrontmatter}\n---\n${translatedMarkdown}`;
  
  console.log('✅ Traducción completada');
  
  return translatedContent;
}

// Función principal
async function main() {
  console.log('🌐 Iniciando traducción de blogs...\n');
  console.log('⚠️  NOTA: Este proceso puede tomar varios minutos debido a los límites de la API gratuita.\n');
  
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
  
  console.log(`📚 Encontrados ${files.length} archivos de blog\n`);
  
  // Crear directorio para traducciones si no existe
  const translatedDir = path.join(__dirname, '../src/content/blog-en');
  if (!fs.existsSync(translatedDir)) {
    fs.mkdirSync(translatedDir, { recursive: true });
  }
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const file of files) {
    try {
      const filePath = path.join(BLOG_DIR, file);
      const translatedContent = await translateMarkdownFile(filePath);
      
      if (translatedContent) {
        const outputPath = path.join(translatedDir, file);
        fs.writeFileSync(outputPath, translatedContent, 'utf-8');
        console.log(`💾 Guardado en: ${outputPath}`);
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Error al traducir ${file}:`, error.message);
      errorCount++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log(`\n✅ Traducción completada!`);
  console.log(`   Exitosos: ${successCount}`);
  console.log(`   Errores: ${errorCount}`);
  console.log('\n⚠️  IMPORTANTE: Revisa las traducciones antes de publicar.');
  console.log('   Las traducciones automáticas pueden tener errores técnicos.\n');
}

main().catch(console.error);

