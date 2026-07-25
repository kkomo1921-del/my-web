// A-Frame専用のカスタムコンポーネントを定義
AFRAME.registerComponent('xyz-loader', {
  init: function () {
    // このコンポーネントが設定された要素（a-scene）自身を取得
    const sceneEl = this.el;

    // 同一フォルダ内にある data.txt を読み込む
    fetch('f1_data.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error('data.txt の読み込みに失敗しました。');
        }
        return response.text();
      })
      .then(tsvText => {
        // 改行ごとにデータを1行ずつ分割
        const rows = tsvText.trim().split('\n');

        rows.forEach((row) => {
          if (!row.trim()) return; // 空白行はスキップ

          // タブ（\t）で列を分割
          const cols = row.split('\t'); 
          if (cols.length < 3) return; // X,Y,Zが揃っていない行はスキップ

          // 列の値を数値化
          const x = parseFloat(cols[0]);
          const y = parseFloat(cols[1]);
          const z = parseFloat(cols[2]);

          // すべてが正しい数値の場合のみ a-box を作成
          if (!isNaN(x) && !isNaN(y) && !isNaN(z)) {
            // A-Frameの要素を生成
            const box = document.createElement('a-box');
            
            // 属性を設定
            box.setAttribute('position', {x: x/4, y: y/4, z: z/4});
            box.setAttribute('color', '#FF5722'); // オレンジ色
            box.setAttribute('width', '0.25');
            box.setAttribute('height', '0.25');
            box.setAttribute('depth', '0.25');

            // シーンに直接追加することで即時レンダリングさせる
            sceneEl.appendChild(box);
          }
        });
      })
      .catch(error => {
        console.error('エラーが発生しました:', error);
      });
  }
});
