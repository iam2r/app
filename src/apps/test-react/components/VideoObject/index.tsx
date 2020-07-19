const html = {
  __html: ` <div id="ocxContainer" style="width:100%;height:70%">
    <object classid="clsid:BE020CC9-521F-4641-85E1-3B631B7ADDD9" id="preview" width="800" height="500"
      name="preview">
      <param name="Ip" value="10.33.27.144" />
      <param name="UserName " value="admin" />
      <param name="PrivilegeCode" value="0401,0402," />
    </object>
  </div>
  
  <script language="javascript" for="preview" event="MsgNotify(iMsg,iError,szDetail,lWnd,szIndexCode)" src="./msgNotify.js"> </script>
  
  
  <script src="./xxxx.js"> </script>
  
  
  `,
};

const VideoObject = () => <div dangerouslySetInnerHTML={html}></div>;

export default VideoObject;
