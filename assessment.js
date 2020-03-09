'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) { // 子どもの要素があるかぎり削除
      element.removeChild(element.firstChild);
    }
  }

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0){// 名前が空の時
        return;
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3')
    header.innerText = 'あなた今日の運勢';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    
    // ツイートエリアの作成
    removeAllChildren(tweetDivided) 

    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('インチキ占い')
        + '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #インチキ占い';
    
    tweetDivided.appendChild(anchor);

    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

    userNameInput.onkeydown = (event) => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
  };

const answers = [
    '{userName}の今日の運勢は激吉です。引くほどの大金が空から降ってきますし、健康になれます。ラッキーアイテムは劇物。',
    '{userName}の今日の運勢は超吉です。食べたかったものをたくさん食べるとよりラッキー。ラッキーアイテムはトリコ２１巻',
    '{userName}の今日の運勢は爆吉です。嫌いな人、いますよね？今日の１９時頃に面白い事が起きますよ。ラッキーアイテムはこより。',
    '{userName}の今日の運勢は超大吉です。意中のあの人と結ばれるかも！可能性は無限大！ラッキーアイテムは婚姻届。',
    '{userName}の今日の運勢は大吉です。煉獄より訪れし、冥府の闘鬼と契約する事で、強大な力を手にする事でしょう。ラッキーアイテムは海苔。',
    '{userName}の今日の運勢はほぼ大吉です。そこそこの見た目の人からそこそこの金額もらえるかも。ラッキーアイテムは紅ショウガ。',
    '{userName}の今日の運勢はマジ吉です。狂ったように踊り、疲れたら死んだように眠る。そんな日があっても良い。ラッキーアイテムは空色の傘。',
    '{userName}の今日の運勢は吉です。隣のトトロに人生を変えるヒントがあるかも。ラッキーアイテムは魔女の宅急便。',
    '{userName}の今日の運勢は中吉。ネズミの名前みたいなチュウ吉のあなたに捧げる歌は甲本ヒロトの天国生まれ。ラッキーアイテムは玉。',
    '{userName}の今日の運勢は小吉。人の名前っぽい。ラッキーアイテムは神心会のデンジャラスライオン、加藤清澄。',
    '{userName}の今日の運勢は末吉。遊戯王カードを拾います。デュエマ派の人は残念。ラッキーアイテムはケチャップ', 
    '{userName}の今日の運勢は凶。今日はなるべく動かない事、変に動くと取返しのつかない事になるかも。ラッキーアイテムは万歩計',
    '{userName}の今日の運勢は大凶。残念でした。あなたはもう・・・。ラッキーアイテムは核シェルター',
    '{userName}の今日の運勢は激凶。ぱねえ。ラッキーアイテムはセーター。',
    '{userName}の今日の運勢は魔凶。己が運命に抗え。自分自身の人生は自ら戦って勝ち取るんだ。ラッキーアイテムは錆びたナイフ',
    '{userName}の今日の運勢は無です。',
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @parm {string} userName ユーザーの名前
 * @return {string} 診断結果
*/
function assessment(userName){
    //今日の日付を取得する
    let today = new Date();
    // 全文字のコード番号を取得したものと、今日の日付を足し合わせる
    let sumOfCharCode = 0
    for (let i =0; i < userName.length; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i) + today.getDate() + today.getMonth() + today.getFullYear();
    }
    // 文字のコード番号の合計を回答の数で割って添え字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index]

    result = result.replace(/\{userName\}/g, userName);
    return result;
}
  console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
  );
