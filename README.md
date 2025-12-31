# What is this?

モノレポ学習用リポジトリ。
フロントエンド（Next.js）とバッチ処理用Lambdaから構成される。


# Memo

- Yarn workspacesを使う方法
  - ルートディレクトリにpackage.jsonを配置し、workspacesの配列を追加
  - 配列内に必要なpackageを記載していく。`lambda/*` のようなワイルドカード表記も可能
  - 切り出したパッケージを利用するには、利用側のpackage.jsonのdependenciesやdevDependenciesに追記する
- Yarn workspacesを使用するとルートディレクトリのnode_modulesに依存パッケージがインストールされる 
  - 全パッケージ分の依存関係が集約される
  - 特定workspaceのみのインストールをしたい場合は `yarn workspaces focus ${workspace_name}` 
    - `yarn workspaces focus` はBerry（v2以降）で追加された
- 特定のworkspaceのスクリプトを実行するにはルートディレクトリで `yarn workspace ${workspace_name} ${script_name}`
  - `cd ${workspace_dir} && yarn run ${script_name}` でも動くようだ
- workspaceのpackage.jsonにおいて、 `installConfig.hoistingLimits` の値をworkspaceにしておくと、hoistingを回避できる
  - hoisting: yarn installしたときにルートディレクトリのnode_modulesに依存がインストールされること


# Commands

```bash
cd ${repository_root}

# フロントエンドの依存パッケージのみをインストールしたい
# yarn stableバージョン(v4)で動作確認。classic(v1)には存在しない
yarn workspaces focus frontend

# フロントエンドをローカル起動したい
yarn workspace frontend dev
# フロントエンドのビルド
yarn workspace frontend build
```

# References
https://zenn.dev/remon/scraps/1718dba0d56cca
https://zenn.dev/takeaki_m/articles/aws-sam-issues-and-solutions
