try
{
  const requestOptions = { method: "GET", redirect: "follow", };
  const loadVideo = (iframe) =>
  {
    const channelId = iframe.getAttribute("cid");
    const channelURL = encodeURIComponent(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
    const requestURL = `https://api.rss2json.com/v1/api.json?rss_url=${channelURL}`;
    fetch(requestURL, requestOptions)
      .then((response) => response.json())
      .then((result) =>
      {
        const videoNumber = iframe.getAttribute("vnum") ? Number(iframe.getAttribute("vnum")) : 0;
        const { link, title, pubDate } = result.items[videoNumber];
        const id = link.substr(link.indexOf("=") + 1);
        iframe.setAttribute( "src", `https://youtube.com/embed/${id}?controls=0&autoplay=1` );
      })
      .catch((error) => console.log("error", error));
  };
  let iframes = document.getElementsByClassName("latestVideoEmbed");
  for (let i = 0; i < iframes.length; i++) { loadVideo(iframes[i]); }
}
catch(err) { document.getElementsByClassName('latestVideoEmbed').innerHTML = err.message; }
