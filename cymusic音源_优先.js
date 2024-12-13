const API_URL = "https://api.lolimi.cn/API/qqdg";

//getMusicUrl 函数用于获取音乐 URL。必须接受以下四个参数：songname: 歌曲名称，artist: 艺术家名称，songid: 企鹅平台的歌曲songmid，quality: 音质 '128k'|'320k'|'flac'。
async function getMusicUrl(songname, artist, songmid, quality) {
  if (quality === "flac") {
    quality = 10;
  } else {
    quality = 7;
  }
  const targetUrl = `${API_URL}/?mid=${songmid}&q=${quality}`;
  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "cymusic-request",
        "X-Request-Key": "share-v2",
      },
    });
    const responseJson = await response.json();
    if (responseJson.code == "200") {
      //直接返回歌曲url。请勿返回其他信息
      return responseJson.data.url;
    } else {
      console.error("Error:", responseJson.msg || "Unknown error");
      return null;
    }
  } catch (e) {
    console.error(e);
    // 如果获取失败，返回null
    return null;
  }
}

module.exports = {
  // 音源唯一编号
  id: "sangbo_music",
  // 作者
  author: "sangbo",
  // 音源显示的名称
  name: "sangbo音乐音源",
  //版本
  version: "1.0.0",
  //更新地址
  srcUrl: "https://api.lolimi.cn/",
  //getMusicUrl方法必须导出
  getMusicUrl,
};
