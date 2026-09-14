// 実績画像の存在マニフェストを生成する（prebuild / predev で自動実行）。
// 未配置の画像に対して 400 になるリクエストを最初から出さず、
// <WorkImage> が即プレースホルダ表示へフォールバックできるようにする。
// 画像を /public/works/ 等に置いて次のビルドをすれば自動で反映される。
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOTS = ['public/works', 'public/images/works'];
const OUT = 'src/data/worksImageManifest.json';
const IMAGE_RE = /\.(webp|png|jpe?g|avif|gif|svg)$/i;

const files = [];

function walk(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (IMAGE_RE.test(name)) {
      files.push('/' + path.relative('public', p).split(path.sep).join('/'));
    }
  }
}

ROOTS.forEach(walk);
writeFileSync(OUT, JSON.stringify(files.sort(), null, 2) + '\n');
console.log(`works image manifest: ${files.length} file(s) -> ${OUT}`);
