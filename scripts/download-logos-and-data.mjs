import fs from 'fs';
import path from 'path';

async function extractAndDownload() {
  const res = await fetch('https://srinivasa-pandian-s.vercel.app/assets/index-DDPFCvL9.js');
  const js = await res.text();

  // Find all asset paths matching backticks, double quotes, or single quotes
  const webpMatches = [...js.matchAll(/([a-zA-Z0-9_$]+)=[`"'](\/assets\/([a-zA-Z0-9_\-\.]+\.webp))[`"']/g)];
  const logoVarMap = {};
  for (const m of webpMatches) {
    logoVarMap[m[1]] = m[2];
    console.log(m[1], '=>', m[2]);
  }

  // Also catch d=`data:image/svg+xml...` if any
  const svgMatches = [...js.matchAll(/([a-zA-Z0-9_$]+)=[`"'](data:image\/svg\+xml;[^`"']+)[`"']/g)];
  for (const m of svgMatches) {
    logoVarMap[m[1]] = m[2];
  }

  // Create public/assets directory
  const assetsDir = path.resolve('public/assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  // Download all webp files
  for (const [varName, assetPath] of Object.entries(logoVarMap)) {
    if (assetPath.startsWith('/assets/')) {
      const filename = path.basename(assetPath);
      const destPath = path.join(assetsDir, filename);
      try {
        const imgRes = await fetch(`https://srinivasa-pandian-s.vercel.app${assetPath}`);
        if (imgRes.ok) {
          const buffer = Buffer.from(await imgRes.arrayBuffer());
          fs.writeFileSync(destPath, buffer);
          console.log(`Downloaded ${filename} (${buffer.length} bytes)`);
        }
      } catch (err) {
        console.error(`Failed to download ${assetPath}:`, err);
      }
    }
  }

  // Extract the project list D
  const startIdx = js.indexOf('D=[{name:');
  const endIdx = js.indexOf('],ue=', startIdx);
  const rawArray = js.slice(startIdx + 2, endIdx + 1);

  // Parse items
  const items = [];
  const itemMatches = [...rawArray.matchAll(/\{name:`([^`]+)`,url:`([^`]+)`(?:,logo:([a-zA-Z0-9_$]+))?(?:,featured:!0)?,\.\.\.([a-zA-Z0-9_$]+)\}/g)];

  const categoryMap = {
    oe: { category: 'Business & Static Websites', technology: 'HTML' },
    w: { category: 'React.js / Next.js Websites', technology: 'React' },
    T: { category: 'React.js / Next.js Websites', technology: 'Next.js' },
    se: { category: 'Shopify', technology: 'Shopify' },
    ce: { category: 'WordPress', technology: 'WordPress' },
    le: { category: 'Wix', technology: 'Wix' },
    E: { category: 'Embedded Ordering', technology: 'React' },
  };

  for (const m of itemMatches) {
    const name = m[1];
    const url = m[2];
    const logoVar = m[3];
    const catVar = m[4];
    const catInfo = categoryMap[catVar] || { category: 'React.js / Next.js Websites', technology: 'React' };
    const logoPath = logoVar && logoVarMap[logoVar] ? logoVarMap[logoVar] : null;

    items.push({
      name,
      url,
      category: catInfo.category,
      technology: catInfo.technology,
      logo: logoPath,
    });
  }

  console.log(`Extracted ${items.length} projects!`);

  // Write TypeScript file
  const tsContent = `export interface WorkedProject {
  name: string;
  url: string;
  category: string;
  technology: 'React' | 'Next.js' | 'HTML' | 'Shopify' | 'WordPress' | 'Wix';
  logo?: string | null;
}

export const workedProjects: WorkedProject[] = ${JSON.stringify(items, null, 2)};
`;

  fs.writeFileSync('src/data/workedProjects.ts', tsContent);
  console.log('Saved src/data/workedProjects.ts with full assets and metadata!');
}

extractAndDownload().catch(console.error);
