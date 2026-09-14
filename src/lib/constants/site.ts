// src/lib/constants/site.ts
// サイト全体で使う正規 URL・サイト名の単一ソース。
// ドメインを www 付きへ変更する場合はここだけ書き換える。
export const SITE_URL = 'https://www.shotomoriyama.com';
export const SITE_NAME = '森山翔登 | Web制作・デザイン';
export const SITE_DESCRIPTION =
  'フリーランスとして、企業様や個人事業主様のWebサイト制作・デザインを承っております。一から丁寧に、想いを形に。';

// 連絡先メールアドレスの単一ソース。変更時はここだけ書き換える。
export const CONTACT_EMAIL = 'studio@shotomoriyama.com';
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

// 無料診断CTA。mailto の件名は自動挿入（メーラーで文字化けしないよう URL エンコード）
export const FREE_AUDIT_LABEL = '無料診断を申し込む';
export const FREE_AUDIT_MAILTO = `${CONTACT_MAILTO}?subject=${encodeURIComponent('無料診断希望')}`;
export const FREE_AUDIT_DESCRIPTION =
  '工務店・不動産会社のサイトの改善点を、スマホ表示速度・問い合わせ導線・実績の見せ方の3点から無料で診断します';
