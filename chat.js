async function getChatId(){

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${VIDEO_ID}&key=${API_KEY}`
  );

  const data = await res.json();

  return data.items[0]
    .liveStreamingDetails
    .activeLiveChatId;
}


async function readChat(){

  const chatId = await getChatId();

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${chatId}&part=snippet,authorDetails&key=${API_KEY}`
  );

  const data = await res.json();

  data.items.forEach(msg=>{

    createDog(
      msg.authorDetails.displayName,
      msg.snippet.displayMessage
    );

  });

}


setInterval(readChat,5000);
