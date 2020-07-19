szMsg =
  "msg:" +
  iMsg +
  ",error:" +
  iError +
  ",detail:" +
  szDetail +
  "，IndexCode：" +
  szIndexCode;
// document.frmApp.Result.value = szMsg;

console.log(szMsg);
//return;
//alert(szMsg);
//0x02000007事件，控件加载完成时抛出的消息，此时平台根据需要调用以下接口对控件进行初始化
//（控件内部默认也对应设置了固定参数，但生产现场要使用上次用户设置保存的参数，需要平台把上一次保存的数据设置进去）
if (iMsg == 0x02000007) {
  var _right =
    "10034,10033,10032,10020,10027,10014,10001,10028,10002,10015,10005,10010,10024,10006,10011,10003,10021,10012,10022,10004,10013,10009,10029";
  preview.SetRightCode(_right);
  var _toolbar =
    '<?xml version="1.0" encoding="utf-8"?>' +
    '<ToolBar><Item type="0" /><Item type="24" /><Item type="5" />' +
    '<Item type="6" /><Item type="7" /><Item type="8" />' +
    '<Item type="9" /><Item type="10" /><Item type="12" />' +
    '<Item type="17" /><Item type="20" /><Item type="21" />' +
    '<Item type="22" /><Item type="53" /><Item type="54" /></ToolBar>';
  preview.SetToolBar(_toolbar); //工具栏按钮
  preview.SetToolBarAlwaysShow(0);
  preview.SetInstPlayCfg(30); //即使回放播放时间
  var _snap =
    '<?xml version="1.0" encoding="utf-8"?>' +
    "<SnapShot><PicType>jpeg</PicType><Quality>80</Quality><SnapMulti>1</SnapMulti>" +
    "<SnapTimes>3</SnapTimes><TimeSpan>1</TimeSpan><SaveFolder>C:\\Users\\lichanghua\\Documents\\CSC\\capture\\</SaveFolder><KeyWords></KeyWords></SnapShot>";
  preview.SetSnapParam(_snap); //抓图参数设置
  var _record =
    '<?xml version="1.0" encoding="utf-8"?>' +
    "<VideoRecord><PackType>0</PackType><MaxRecTime>0</MaxRecTime>" +
    "<PackTime>100</PackTime><PackSize>100</PackSize><SaveFolder>C:\\Users\\lichanghua\\Documents\\CSC\\record\\</SaveFolder><KeyWords></KeyWords></VideoRecord>";
  preview.SetRecordParam(_record); //录像参数设置
}
