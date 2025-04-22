let users = [];
let currentIndex = 0;

// GAS の GET エンドポイントから登録情報を取得
fetch('https://script.google.com/macros/s/AKfycbwh4nuCij2qHyHWDLOIOqH4UsEr-3Kd5jKhow73hiED8DeP_qz4_d8HSrb2XvQRqcfYwQ/exec')
  .then(response => response.json())
  .then(data => {
    users = data;
    displayUser(currentIndex);
  })
  .catch(error => {
    console.error('データ取得エラー:', error);
  });

// 指定したインデックスのユーザーデータを表示する関数
function displayUser(index) {
  const container = document.getElementById('cardContainer');
  if (index >= users.length) {
    container.innerHTML = '<p>登録された全ユーザーを表示しました。</p>';
    return;
  }
  const user = users[index];
  container.innerHTML = `
    <div class="card">
      <!-- 画像をクリックすると、登録時に入力されたSNSのURLに飛ぶ -->
      <a href="${user.sns}" target="_blank">
        <img src="${user.photoUrl}" alt="${user.name}">
      </a>
      <h2>${user.name}</h2>
      <p><strong>スキル:</strong> ${user.skill}</p>
      <p><strong>目標:</strong> ${user.goal}</p>
      <p><strong>SNS:</strong> <a href="${user.sns}" target="_blank">${user.sns}</a></p>
    </div>
  `;
}

// 「次へ」ボタンのクリックで次のユーザー情報を表示
function nextCard() {
  currentIndex++;
  displayUser(currentIndex);
}