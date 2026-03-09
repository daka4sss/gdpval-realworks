<p align="center">
  <img src="https://img.shields.io/badge/GDPVal-Real%20Work%20Benchmark-blueviolet?style=for-the-badge" alt="GDPVal RealWorks" />
</p>

<h1 align="center">GDPVal RealWorks</h1>

<p align="center">
  <strong>学術的な課題ではなく、実際の専門業務でLLMをベンチマークします。</strong><br/>
  <em><a href="https://arxiv.org/abs/2510.04374">GDPVal</a> Gold Subset（220タスク）向けの、YAML駆動実験パイプラインとライブダッシュボードです。</em>
</p>

<p align="center">
  <a href="https://github.com/hyeonsangjeon/gdpval-realworks/actions/workflows/deploy.yml">
    <img src="https://github.com/hyeonsangjeon/gdpval-realworks/actions/workflows/deploy.yml/badge.svg" alt="Deploy" />
  </a>
  <a href="https://github.com/hyeonsangjeon/gdpval-realworks/actions/workflows/batch-run.yml">
    <img src="https://github.com/hyeonsangjeon/gdpval-realworks/actions/workflows/batch-run.yml/badge.svg" alt="Batch Run" />
  </a>
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License" />
  </a>
</p>

<p align="center">
  <a href="https://hyeonsangjeon.github.io/gdpval-realworks/">🌐 ライブダッシュボード</a> · 
  <a href="README.md">🇺🇸 English</a> · 
  <a href="README_KR.md">🇰🇷 한국어</a> · 
  <a href="batch-runner/README.md">📖 Batch Runner ドキュメント</a> · 
  <a href="https://arxiv.org/abs/2510.04374">📄 論文</a>
</p>

---

> 📊 **[ライブダッシュボード → https://hyeonsangjeon.github.io/gdpval-realworks/](https://hyeonsangjeon.github.io/gdpval-realworks/)**
>
> Leaderboard・Trends・Execution Errors・Grading Analysis をひとつの場所で確認できます。

---

## 課題意識

多くのLLMベンチマークは、**学術的な推論**、つまり数学、コードパズル、雑学クイズを評価します。  
しかし、それだけではモデルが実際に**あなたの仕事をこなせるか**は分かりません。

**GDPVal**（GDP-level Validation）はそこが違います。11業種・55職種にまたがる **220件の実務タスク** を扱います。Excelレポート、法務文書、営業資料など、人が実際に報酬を得て作る成果物が対象です。

このリポジトリは、**設定 → 実行 → 収集 → 可視化** までの一連の流れを自動化します。単一のYAMLで設定し、GitHub Actionsで実行し、その結果をライブダッシュボードに表示します。

> 🎯 YAML 1つ。ボタンクリック 1回。実験ライフサイクル全体を自動化。

<p align="center">
  <img src="docs/images/dashboard-leaderboard.png" alt="Leaderboard — 実験ランキング、KPIカード、セクターヒートマップ" width="720" />
</p>
<p align="center"><em>ライブダッシュボード — リーダーボード、成功率、QAスコアを実験ごとに比較</em></p>

<p align="center">
  <img src="docs/images/dashboard-experiment-tasks.png" alt="Task Detail — 実務タスク、参照ファイル、成果物" width="480" />
</p>
<p align="center"><em>タスク詳細 — 実務タスクの説明、参照ファイル、生成された成果物</em></p>

---

## 仕組み

<table>
<tr>
<td align="center"><img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBBWyJTdGVwIDA6IEJvb3RzdHJhcDxicj5IRiByZXBvICsgc25hcHNob3QiXSAtLT4gQlsiU3RlcCAxOiBQcmVwYXJlPGJyPkZpbHRlciArIGxvYWQgdGFza3MiXQ==" alt="Preparation" width="350" /></td>
<td align="center" style="font-size:2em;">→</td>
<td align="center"><img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBDWyJTdGVwIDI6IEluZmVyZW5jZTxicj5MTE0gKyBTZWxmLVFBIl0gLS0-IERbIlN0ZXAgMzogRm9ybWF0PGJyPkpTT04gKyBNYXJrZG93biJd" alt="Execution" width="350" /></td>
</tr>
<tr>
<td></td>
<td align="center" style="font-size:2em;">↓</td>
<td></td>
</tr>
<tr>
<td align="center"><img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBFWyJTdGVwIDQ6IFBhcnF1ZXQ8YnI-TWVyZ2Ugc3VibWlzc2lvbiJdIC0tPiBGWyJTdGVwIDU6IFZhbGlkYXRlPGJyPkludGVncml0eSBjaGVjayJd" alt="Delivery" width="350" /></td>
<td align="center" style="font-size:2em;">→</td>
<td align="center"><img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRECiAgICBHWyJTdGVwIDY6IFJlcG9ydDxicj5IVE1MICsgSlNPTiJdIC0tPiBIWyJTdGVwIDc6IFVwbG9hZDxicj5IRiArIEF1dG8gUFIiXQ==" alt="Report & Upload" width="350" /></td>
</tr>
</table>


---

## ⚡ クイックスタート

### 1. Fork と Clone

```bash
git clone https://github.com/hyeonsangjeon/gdpval-realworks.git
cd gdpval-realworks
```

### 2. GitHub リポジトリ設定

#### 🔑 Secrets

**Settings → Secrets and variables → Actions → New repository secret** を開き、必要なシークレットを追加します。

| Secret 名 | 値 | 必須? |
|---|---|---|
| `AZURE_OPENAI_API_KEY` | Azure OpenAI API キー | ✅ Azure を使う場合 |
| `AZURE_OPENAI_ENDPOINT` | `https://your-resource.openai.azure.com/` | ✅ Azure を使う場合 |
| `OPENAI_API_KEY` | OpenAI API キー | OpenAI を使う場合 |
| `ANTHROPIC_API_KEY` | Anthropic API キー | Anthropic を使う場合 |
| `HF_TOKEN` | HuggingFace の書き込みトークン（[取得はこちら](https://huggingface.co/settings/tokens)） | ✅ アップロード用 |

> 💡 すべてを登録する必要はありません。実際に使うプロバイダーのものだけで十分です。  
> Azure 利用時の最小構成は `AZURE_OPENAI_API_KEY`、`AZURE_OPENAI_ENDPOINT`、`HF_TOKEN` です。

#### 📄 GitHub Pages

**Settings → Pages → Source** を **GitHub Actions** に変更します。"Deploy from a branch" ではありません。

#### 🔓 Workflow Permissions

**Settings → Actions → General → Workflow permissions:**

- ✅ **Read and write permissions** を選択
- ✅ **Allow GitHub Actions to create and approve pull requests** を有効化
- 保存

#### 🧹 自動クリーンアップ（推奨）

**Settings → General** で **Automatically delete head branches** を有効にします。

> PRマージ後に実験ブランチが自動で削除されます。

---

### 3. 最初の実験を実行する

1. **Actions** タブで **Run GDPVal Batch Experiment** を開く
2. **Run workflow** をクリック
3. 次を入力
   - `experiment_yaml`: `exp998_smoke_baseline_sample`（スモークテスト、3タスク）
   - `dry_run`: ✅ チェックあり（初回はアップロードをスキップ）
4. **Run workflow** をクリック 🚀

```
✅ Step 0: Bootstrap        → HF リポジトリ準備完了
✅ Step 1: Prepare tasks    → 3タスクを抽出
✅ Step 2: Run inference    → 各タスクでLLMを実行
✅ Step 3: Format results   → JSON + Markdown を生成
✅ Step 4: Fill parquet     → 提出用Parquetを作成
⏭️ Step 5: Validate        → スモークテストのためスキップ
⏭️ Step 6: Upload          → dry run のためスキップ
```

> 🎉 問題なく通ったら `dry_run` を外して本番実験を回してください。

---

## 📝 独自実験を書く

`batch-runner/experiments/` にYAMLファイルを作成します。

```yaml
experiment:
  id: "exp001_GPT52Chat_baseline"
  name: "GPT-5.2 Chat Baseline (全220タスク)"
  description: "code_interpreter と Self-QA を使ったフルベースライン実行。"

data:
  source: "HyeonSang/exp001_GPT52Chat_baseline"
  filter:
    sector: null          # null = 全セクター
    sample_size: null     # null = 全220タスク

condition_a:
  name: "Baseline"
  model:
    provider: "azure"
    deployment: "gpt-5.4"  # 例: gpt-5.2-chat | gpt-5.4
    temperature: 0.0
    seed: 42
  prompt:
    system: "You are a helpful assistant that completes professional tasks."
    suffix: "Generate actual files, not descriptions."
  qa:
    enabled: true
    min_score: 6
    max_retries: 3

# condition_b:            ← A/B 比較用（任意）

execution:
  mode: "code_interpreter"
  max_retries: 5
  resume_max_rounds: 3
```

その後、**Actions → Run workflow** で `experiment_yaml: exp001_GPT52Chat_baseline` を指定して実行します。

> 補足: gpt-5.4 は追加対応です。既存の gpt-5.2 実験はそのまま残しつつ、`deployment` を `gpt-5.4` にした新規 YAML で切り替えて使えます。

---

## 🧠 実行モード

| モード | 仕組み | 向いている用途 |
|---|---|---|
| **`code_interpreter`** | LLMがAzure/OpenAIの**安全なサンドボックス**内でコードを書いて実行します。ファイルはクラウド上で生成されます。 | ✅ 本番用途。安全で強力 |
| **`subprocess`** | LLMがコードを生成し、ローカルの隔離された一時ディレクトリで実行します。 | OpenAI以外のモデル（Anthropicなど） |
| **`json_renderer`** | LLMがJSON仕様を出力し、**固定レンダラー**がファイルを生成します。全モデルで同一レンダラーを使います。 | モデル間の公平なA/B比較 |

> 🐳 `subprocess` モードは、時間とコーヒーが許せば **コンテナベース** 実行へ発展させる予定です。

---

## 🔬 Self-QA: 内蔵セルフレビューゲート

成果物を受け入れる前に、同じLLMが自分の出力を検査します。  
Self-QA は各出力をルーブリックベースで 0〜10 点評価します。スコアが設定しきい値（デフォルト 6）未満なら、リフレクションループに入り再試行します。

<img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IExSCiAgICB0YXNrWyJUYXNrIl0gLS0-IGdlblsiTExNIEdlbmVyYXRlcyBPdXRwdXQiXSAtLT4gcWFbIlNlbGYtUUEgSW5zcGVjdHMiXSAtLT4gZ2F0ZXsiU2NvcmUgPj0gNj8ifQogICAgZ2F0ZSAtLT58WWVzfCBhY2NlcHRbIkFjY2VwdCJdCiAgICBnYXRlIC0tPnxOb3wgcmV0cnlbIlJldHJ5ICh1cCB0byAzeCkiXQo=" alt="Self-QA Flow" />


Self-QA の確認項目: すべての要件を満たしているか、ファイルは実際に生成されているか、成果物として十分にプロフェッショナルか。

---

## 🏗️ アーキテクチャ

<img src="https://mermaid.ink/img/Zmxvd2NoYXJ0IFRCCiAgICByb290WyJnZHB2YWwtcmVhbHdvcmtzLyJdCgogICAgd2ZbIi5naXRodWIvd29ya2Zsb3dzLzxici8-YmF0Y2gtcnVuLnltbCwgZGVwbG95LnltbCJdCiAgICBiclsiYmF0Y2gtcnVubmVyLzxici8-c3RlcCBzY3JpcHRzLCBjb3JlLCBleHBlcmltZW50cywgcHJvbXB0cywgdGVzdHMiXQogICAgc3JjWyJzcmMvPGJyLz5wYWdlcywgY29tcG9uZW50cyJdCiAgICBkYXRhWyJkYXRhLzxici8-dGVzdHMsIGdyYWRlcyJdCiAgICBzY3JpcHRzWyJzY3JpcHRzLzxici8-YWdncmVnYXRlLXRlc3RzLm1qcywgYWdncmVnYXRlLWdyYWRlcy5tanMiXQoKICAgIHJvb3QgLS0-IHdmCiAgICByb290IC0tPiBicgogICAgcm9vdCAtLT4gc3JjCiAgICByb290IC0tPiBkYXRhCiAgICByb290IC0tPiBzY3JpcHRzCg==" alt="Architecture" />


---

## 🔄 GitHub Actions ワークフロー

### `batch-run.yml` — 実験実行

| 項目 | 内容 |
|---|---|
| **トリガー** | Actions タブから手動実行（`workflow_dispatch`） |
| **入力** | 実験YAMLファイル名 + 任意の dry_run フラグ |
| **パイプライン** | Step 0 → Step 7（bootstrap → upload） |
| **スマートスキップ** | スモークテストでは validation をスキップ。dry_run では upload と PR をスキップ |
| **自動PR** | 実験サマリー付きの Pull Request を自動作成 |
| **Artifacts** | ワークスペース全体を30日間保存 |
| **Timeout** | 最大5時間 |

### `deploy.yml` — ダッシュボード配信

| 項目 | 内容 |
|---|---|
| **トリガー** | `main` への push で自動、または手動実行 |
| **ビルド** | テスト・採点データを集計 → React ビルド → GitHub Pages |
| **対象範囲** | `data/`、`src/`、`scripts/` が変更されたときのみ実行 |

---

## 🖥️ ダッシュボード

> **[→ ライブダッシュボード](https://hyeonsangjeon.github.io/gdpval-realworks/)**

インタラクティブな実験分析機能を提供します。リーダーボード、セクターヒートマップ、エラー分析、プロンプト構造ビューアを備えています。

| 機能 | 説明 |
|---------|-------------|
| **Leaderboard** | 戦略、成功率、QAスコア付きの実験ランキング |
| **Sector Heatmap** | 9セクター × N実験の成功率マトリクス |
| **Trends** | 実験横断の成功率 / QA / レイテンシ推移 |
| **Execution Errors** | エラー分布、復旧ファネル、CONFIDENCE NameError の追跡 |
| **Prompt Viewer** | LLMに送信されたプロンプトをそのまま確認。system、user、QA、config を表示 |
| **Grading** | 外部評価スコア（OpenAI Evals） |
| **Experiment Detail** | 220タスクを掘り下げ可能。セクター・状態フィルタ、検索対応 |

React 18 + TypeScript + Vite + Tailwind + Recharts + Framer Motion で構築。  
`main` への push ごとに GitHub Pages へ自動デプロイされます。

📖 **[ダッシュボード文書 →](src/README_JP.md)** · 🇺🇸 **[English →](src/README.md)** · 🇰🇷 **[한국어 →](src/README_KR.md)**

---

## 🧪 テスト

```bash
cd batch-runner
pip install -r requirements.txt

# ユニットテストのみ（APIキー不要）
pytest

# 統合テスト（実際の認証情報が必要）
pytest -m integration

# カバレッジ付き
pytest --cov=core --cov-report=html
```

### 🖥️ ローカル実行（手順別）

```bash
cd batch-runner
export HF_TOKEN="hf_xxx"
export AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com"
export AZURE_OPENAI_API_KEY="xxx"

./step0_bootstrap.sh experiments/exp998_smoke_baseline_sample.yaml
./step1_prepare_tasks.sh experiments/exp998_smoke_baseline_sample.yaml
./step2_run_inference.sh condition_a
./step3_format_results.sh
./step4_fill_parquet.sh
./step5_validate.sh
./step6_report.sh
./step7_upload_hf.sh --test
```

> 💡 ローカル実行も可能ですが、全220タスクを回すなら **GitHub Actions** を推奨します。  
> バッチワークフローは TPM（1分あたりトークン数）上限の範囲で並列化されるので、重い処理はクラウドに任せるのが実用的です。

> 出力言語ポリシー: データセット本文や入力プロンプトは英語のまま維持し、Step 6 の実験サマリーと結果解釈の narrative のみ日本語で生成します。評価に使う構造化データや JSON キーは変更しません。

---

## 📚 参考資料

- **GDPVal 論文**: [arXiv:2510.04374](https://arxiv.org/abs/2510.04374)
- **GDPVal データセット**: [openai/gdpval](https://huggingface.co/datasets/openai/gdpval)
- **GDPVal Grading**: [evals.openai.com](https://evals.openai.com/)
- **Azure OpenAI Responses API**: [公式ドキュメント](https://learn.microsoft.com/azure/ai-services/openai/)

---

## 👤 作者

**Hyeonsang Jeon**  
Sr. Solution Engineer · Global Black Belt — AI Apps | Microsoft Asia, Korea  
[![GitHub](https://img.shields.io/badge/GitHub-hyeonsangjeon-181717?logo=github)](https://github.com/hyeonsangjeon)
[![Dashboard](https://img.shields.io/badge/Live%20Dashboard-GDPVal-blueviolet?logo=react)](https://hyeonsangjeon.github.io/gdpval-realworks/)

---

## 📄 ライセンス

MIT。詳細は [LICENSE](LICENSE) を参照してください。