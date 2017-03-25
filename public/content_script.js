chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  // $('[name="' + msg.name + '"]').eq(0).val(msg.value);

  if (msg[0].name && msg[0].value) {
      document.forms[0][msg[0].name].value = msg[0].value;
    sendResponse('Change color to ' + msg.color);
  } else {
    sendResponse('Color message is none.');
  }
  return true;
});

// window.addEventListener('load', function() {
//     // テキストボックス
//     document.forms[0].text_sample.value = 'test';
//     // テキストエリア
//     document.forms[0].textarea_sample.value = 'testarea';
//     // セレクトボックス
//     document.forms[0].select_sample.value = 'val_1';
//     // チェックボックス
//     document.forms[0].ch_sample01.checked = true;
//     // ラジオボタン
//     document.forms[0].radio_sample.value = 'radio_3';
// });