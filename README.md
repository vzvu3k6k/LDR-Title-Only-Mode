Livedoor Readerでタイトルだけ流し読みするためのユーザースクリプト。`t`キーを押すとタイトルとボタン以外を全部隠して、タイトルの文字を小さくする。もう一度押すと戻る。

フィードごとに状態が記録されるので、毎回`t`を押さなくていい。

[install](https://github.com/vzvu3k6k/LDR-Title-Only-Mode/raw/master/ldr-title-only-mode.user.js)

<table>
  <tr>
    <th>Before</th>
    <td>![default image](http://vzvu3k6k.tk/memo/img/ldr-title-only-mode-default.png)</td>
  </tr>
  <tr>
    <th>After</th>
    <td>![demo image](http://vzvu3k6k.tk/memo/img/ldr-title-only-mode-custom.png)</td>
  </tr>
</dl>

  * フィードごとの状態はどこに記録される？
    * `localStorage`の`title_only_subids`に、タイトルだけのモードで表示するフィードが`{"<subscription_id>": true, ...}`という形式で保存されている。
    * 削除したフィードを記録から消す機能はないので、フィードをタイトルだけのモードにしたまま削除するとゴミデータが溜まっていく。
  * 状態を機能する機能はいらない
    * `c`キーの本文非表示モードを上書きするユーザースタイルシート [Livedoor Reader: Title-only compact mode - Themes and Skins for Livedoor - userstyles.org](http://userstyles.org/styles/84533/)を使う。
  * キーの設定を変えたい
    * `const TITLE_ONLY_KEY = "t";`の`"t"`の中身を適当に書き換える。
