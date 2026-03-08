# 📊 GDPVal RealWorks ダッシュボード

> GDPVal ベンチマーク向けのインタラクティブ実験分析ダッシュボードです。
> **[→ ライブダッシュボード](https://hyeonsangjeon.github.io/gdpval-realworks/)**

🇺🇸 [English](README.md) · 🇰🇷 [한국어](README_KR.md)

---

## これは何か

11業種・55職種にまたがる **220件の実務タスク** に対するLLM実験結果を可視化するReactダッシュボードです。プロンプト戦略の比較、セクター単位の性能追跡、個別タスク結果の掘り下げまで、バックエンドサーバーなしで実現しています。

- **静的JSON** をビルド時に生成し、ランタイムのAPI呼び出しは不要
- **GitHub Pages** に `main` へのpushごとに自動デプロイ
- **HuggingFace** から実験詳細ページでタスク単位データを遅延読み込み

---

## データフロー

<p align="center">
  <img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBzdWJncmFwaCBTMV9bIlNvdXJjZXMiXQogICAgICAgIFJbInJlc3VsdHMvcmVwb3J0X2RhdGEuanNvbiJdCiAgICAgICAgRVsiZXhwZXJpbWVudHMvKi55YW1sIl0KICAgICAgICBQWyJwcm9tcHRzLyoueWFtbCJdCiAgICAgICAgR1siZGF0YS9ncmFkZXMvKi5qc29uIl0KICAgIGVuZAogICAgc3ViZ3JhcGggUzJfWyJucG0gcnVuIGFnZ3JlZ2F0ZSJdCiAgICAgICAgQTFbImFnZ3JlZ2F0ZS1yZXBvcnRzLm1qcyJdCiAgICAgICAgQTJbImFnZ3JlZ2F0ZS1ncmFkZXMubWpzIl0KICAgICAgICBBM1siYWdncmVnYXRlLWV4cGVyaW1lbnRzLm1qcyJdCiAgICBlbmQKICAgIHN1YmdyYXBoIFMzX1sicHVibGljL2dlbmVyYXRlZC8iXQogICAgICAgIEoxWyJyZXBvcnRzLWluZGV4Lmpzb24iXQogICAgICAgIEoyWyJncmFkZXMtaW5kZXguanNvbiJdCiAgICAgICAgSjNbInByb21wdC1hcmNoaXRlY3R1cmUuanNvbiJdCiAgICBlbmQKICAgIHN1YmdyYXBoIFM0X1siUmVhY3QgSG9va3MiXQogICAgICAgIEgxWyJ1c2VSZXBvcnRzIl0KICAgICAgICBIMlsidXNlR3JhZGVzIl0KICAgICAgICBIM1sidXNlRXhwZXJpbWVudFByb21wdCJdCiAgICBlbmQKICAgIHN1YmdyYXBoIFM1X1siRGFzaGJvYXJkIl0KICAgICAgICBEWyJEYXNoYm9hcmQudHN4Il0KICAgICAgICBYWyJFeHBlcmltZW50RGV0YWlsLnRzeCJdCiAgICBlbmQKICAgIFIgJiBFIC0tPiBBMSAtLT4gSjEKICAgIEcgLS0-IEEyIC0tPiBKMgogICAgRSAmIFAgLS0-IEEzIC0tPiBKMwogICAgSjEgLS0-IEgxIC0tPiBEICYgWAogICAgSjIgLS0-IEgyIC0tPiBECiAgICBKMyAtLT4gSDMgLS0-IFg=" alt="Data Flow" width="700" />
</p>

> タスク単位の詳細データ（各実験220行）はバンドルに **含めません**。実験詳細ページを開いたときに、必要に応じて HuggingFace から取得します。

---

## 主な機能

### リーダーボード + セクターヒートマップ

<p align="center">
  <img src="../docs/images/dashboard-leaderboard.png" alt="Leaderboard — KPIカード、実験ランキング表、セクターヒートマップ" width="640" />
</p>

### 実験詳細

<p align="center">
  <img src="../docs/images/dashboard-experiment-top.png" alt="Experiment Detail — KPIカード、実行サマリー" width="640" />
</p>

<p align="center">
  <img src="../docs/images/dashboard-experiment-sectors.png" alt="Sector Breakdown table and Quality Analysis" width="640" />
</p>

### プロンプトアーキテクチャビューア

<p align="center">
  <img src="../docs/images/dashboard-prompt-architecture.png" alt="Prompt Architecture — system message, user prompt assembly, QA, config" width="640" />
</p>

| 機能 | タブ / ページ | 表示内容 |
|---------|-----------|-------------|
| **KPIカード** | main | 最高成功率、実験数、タスク数、最高QAスコア |
| **Leaderboard** | Leaderboard | 実験ランキング。戦略、モデル、進捗、成功率、Δ best、QA を表示 |
| **Sector Heatmap** | Leaderboard | 9セクター × N実験の色分け成功率マトリクス |
| **Trend Charts** | Trends | 実験横断の成功率 / QAスコア / レイテンシ推移 |
| **Execution Errors** | Execution Errors | エラー分布、CONFIDENCE NameError バナー、復旧ファネル |
| **Grading Analysis** | Grading Analysis | 外部評価スコア（OpenAI Evals 連携） |
| **Experiment Detail** | /experiment/:id | 220タスク表、セクター/状態フィルタ、QA分布、再開ラウンド |
| **Prompt Architecture** | /experiment/:id | System → User Prompt → QA → Config のアコーディオンビューア |
| **Dark / Light Theme** | global | ヘッダーのトグルで切り替え |

---

## 技術スタック

```
React 18 · TypeScript · Vite · Tailwind CSS · Recharts · Framer Motion
```

- **ビルド時** に aggregate スクリプトが YAML + JSON を静的データへ変換
- **ランタイム** は純粋なクライアントサイド React。Node サーバーなし、DBなし
- **デプロイ** は GitHub Actions → GitHub Pages

---

## プロジェクト構成

```
src/
├── pages/
│   ├── Dashboard.tsx              # メインダッシュボード（タブルーティング）
│   ├── ExperimentDetail.tsx       # 実験ごとの詳細画面
│   └── GradeDetail.tsx            # 外部評価の詳細
├── components/
│   ├── dashboard/
│   │   ├── LeaderboardView.tsx    # リーダーボード + セクターヒートマップ
│   │   ├── TrendView.tsx          # トレンドチャート
│   │   ├── ErrorAnalysisView.tsx  # エラー分析
│   │   ├── GradingAnalysisView.tsx# 評価結果表示
│   │   └── PromptArchitectureView.tsx # プロンプト構造ビューア
│   ├── ExperimentCard.tsx         # 実験サマリーカード
│   ├── ScopeBadge.tsx             # 自己評価 / 採点済みバッジ
│   ├── Header.tsx                 # グローバルヘッダー
│   └── ui/                        # shadcn/ui の基本部品
├── hooks/
│   ├── useReports.ts              # reports-index.json を取得
│   ├── useGrades.ts               # grades-index.json を取得
│   ├── useExperimentPrompt.ts     # prompt-architecture.json を取得
│   ├── useExperiments.ts          # experiments-index.json を取得
│   └── useIsMobile.ts             # レスポンシブ判定
├── types/
│   └── report.ts                  # TypeScript インターフェース
├── contexts/
│   └── ThemeContext.tsx           # ダーク / ライトテーマ状態
├── data/
│   └── tooltipTexts.ts            # UI ツールチップ文言
└── utils/
```

---

## ローカル開発

```bash
# 依存関係をインストール
npm install

# ビルド時データを生成（初回起動前に必須）
npm run aggregate

# ホットリロード開発サーバー
npm run dev
# → http://localhost:5173/gdpval-realworks/

# 本番ビルド
npm run build
npm run preview
```

> `npm run dev` は `predev` フック経由で全 aggregate スクリプトを自動実行します。

---

## 新しい実験が表示されるまで

実験からダッシュボード反映までの流れは自動化されています。

```
1. GitHub Actions でバッチ実験を実行（Actions タブから手動起動）
2. パイプライン完了 → 結果を HuggingFace にアップロード → PR を自動作成
3. そのPRをレビューしてマージ
4. main への push で deploy.yml が自動起動 → aggregate スクリプトが JSON を再生成 → GitHub Pages を再デプロイ
5. 次回ページ読込時に新しい実験がダッシュボードへ反映
```

> 手動のデプロイボタンは不要です。実験起動後に人が行う作業は PR マージだけです。

---

## デザインシステム

ダッシュボードUIに手を入れる人向けの簡易ガイドです。

| 要素 | 値 |
|---------|-------|
| ページ背景 | `bg-[#0a0a1a]`（dark）· `bg-gray-50`（light） |
| カード境界線 | `rgba(255,255,255,0.06)` |
| 数値 / メトリクス | `font-mono` |
| 成功率カラー | ≥96% `emerald` · ≥90% `amber` · <90% `red` |
| チャート | Recharts、ダークツールチップ `bg: #1a1a2e` |
| アニメーション | Framer Motion による fade-in + slide-up |
| テーマ切替 | `ThemeContext.tsx` ・ class ベースの dark mode |