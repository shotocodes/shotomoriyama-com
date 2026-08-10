# 実績画像の置き場所

`src/data/worksData.ts` の `thumbnail` / `gallery` が参照するフォルダ。
画像が未配置でもサイトは壊れず「画像準備中」のプレースホルダが表示され、
ここにファイルを置くだけで自動的に差し替わる（コード変更不要）。

## 命名規約

```
/public/works/<クライアントslug>/main.webp   ← サムネイル（16:9）
/public/works/<クライアントslug>/logo.webp 等 ← ギャラリー画像（4:3で表示）
```

## 現在必要な素材

| ファイル | 内容 | 推奨サイズ |
| --- | --- | --- |
| `yk-realty/main.webp` | サイトのスクリーンショット等 | 1600×900px（16:9） |
| `yk-realty/logo.webp` | ロゴ | 1200×900px（4:3） |
| `yk-realty/meishi.webp` | 名刺 | 1200×900px（4:3） |
| `otakarahiroba/meishi.webp` | 名刺 | 1200×900px（4:3） |

- 形式は webp 推奨（png/jpg でも可。その場合は worksData.ts のパスも合わせる）
- 200KB 以下を目安に圧縮
