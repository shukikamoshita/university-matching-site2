document.getElementById('registrationForm').addEventListener('submit', function(e) {
  e.preventDefault(); // まずフォーム送信をキャンセル

  // 入力値の取得
  const name = document.getElementById('name').value;
  const skill = document.getElementById('skill').value;
  const goal = document.getElementById('goal').value;
  const sns = document.getElementById('sns').value;
  const photo = document.getElementById('photo').files[0];

  if (!photo) {
    alert("写真ファイルを選択してください。");
    return;
  }

  // Cloudinaryへ画像アップロード
  const formData = new FormData();
  formData.append('file', photo);
  formData.append('upload_preset', 'MUSASHINOMATTI'); // Unsignedアップロードプリセット

  // Cloudinaryアップロードエンドポイント（Cloud Name: dd0qmtexw）
  fetch('https://api.cloudinary.com/v1_1/dd0qmtexw/image/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (!data.secure_url) {
      throw new Error("画像のアップロードに失敗しました。");
    }
    const photoUrl = data.secure_url;
    // 取得した画像URLを隠しフィールドにセット
    document.getElementById('photoUrl').value = photoUrl;

    // Google Apps ScriptのWebアプリへデータ送信
    // ※FetchのContent-Typeはプリフライト回避のためにapplication/x-www-form-urlencodedに設定
    return fetch('https://script.google.com/macros/s/AKfycbwEF6xCX2ON73zh9BgEnW9ExFgkHN1fpZgODrUmOGmDO7fXxoog9iNDzhDOAGGpw4DALw/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        name: name,
        skill: skill,
        goal: goal,
        sns: sns,
        photoUrl: photoUrl
      })
    });
  })
  .then(response => response.text())
  .then(result => {
    console.log('登録成功:', result);
    alert('登録が完了しました。');
    // 必要に応じて画面遷移を行う
  })
  .catch(error => {
    console.error('登録失敗:', error);
    alert('登録中にエラーが発生しました。');
  });
});
