import fs from 'fs';

const raw = fs.readFileSync('src/data/workedProjects.ts', 'utf-8');
const startIdx = raw.indexOf('workedProjects: WorkedProject[] = ');
const jsonPart = raw.slice(startIdx + 'workedProjects: WorkedProject[] = '.length).trim().replace(/;$/, '');
const list = JSON.parse(jsonPart);

const filtered = list.filter(p => !['WordPress', 'Shopify', 'Wix'].includes(p.technology));
console.log('Original count:', list.length, 'Filtered count:', filtered.length);

const newTs = `export interface WorkedProject {
  name: string;
  url: string;
  category: string;
  technology: 'React' | 'Next.js' | 'HTML';
  logo?: string | null;
}

export const workedProjects: WorkedProject[] = ${JSON.stringify(filtered, null, 2)};
`;

fs.writeFileSync('src/data/workedProjects.ts', newTs);
console.log('Successfully saved filtered workedProjects.ts without WordPress, Shopify, or Wix!');
