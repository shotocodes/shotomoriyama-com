// src/lib/mdx.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_PATH = path.join(process.cwd(), 'src/content/blog');

// 記事のメタデータ型
export interface BlogPostMetadata {
  title: string;
  category: string;
  categoryId: string;
  categoryColor: string;
  date: string;
  readTime: string;
  excerpt: string;
}

// 記事の完全な型
export interface BlogPost {
  slug: string;
  metadata: BlogPostMetadata;
  content: string;  // ← MDXRemoteSerializeResult から string に変更
}

// すべての記事のスラッグを取得
export function getAllPostSlugs(): string[] {
  try {
    const files = fs.readdirSync(BLOG_PATH);
    return files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading blog directory:', error);
    return [];
  }
}

// すべての記事のメタデータを取得（一覧表示用）
export function getAllPostsMetadata(): Array<BlogPostMetadata & { slug: string }> {
  const slugs = getAllPostSlugs();

  const posts = slugs.map((slug) => {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);

    return {
      slug,
      ...(data as BlogPostMetadata)
    };
  });

  // 日付でソート（新しい順）
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// 特定の記事を取得（個別ページ用）
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // serialize 不要！文字列をそのまま返す
    return {
      slug,
      metadata: data as BlogPostMetadata,
      content: content  // ← 文字列のまま
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// カテゴリでフィルタリング
export function getPostsByCategory(categoryId: string): Array<BlogPostMetadata & { slug: string }> {
  const allPosts = getAllPostsMetadata();

  if (categoryId === 'all') {
    return allPosts;
  }

  return allPosts.filter((post) => post.categoryId === categoryId);
}
