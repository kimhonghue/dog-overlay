async function getChatId(){

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${VIDEO_ID}&key=${API_KEY}`
  );

  const data = await res.json();

  console.log("유튜브 영상 응답:", data);

  if(!data.items || data.items.length === 0){
    console.log("❌ 영상을 찾지 못함. VIDEO_ID 확인 필요");
    return null;
  }

  const chatId = data.items[0]
    .liveStreamingDetails
    ?.activeLiveChatId;

  if(!chatId){
    console.log("❌ 라이브 채팅 ID 없음");
    return null;
  }

  return chatId;
}


async function readChat(){

  const chatId = await getChatId();

  if(!chatId) return;


  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${chatId}&part=snippet,authorDetails&key=${API_KEY}`
  );


  const data = await res.json();

  console.log("채팅:", data);


  if(!data.items) return;


  data.items.forEach(msg=>{

    createDog(
      msg.authorDetails.displayName,
      msg.snippet.displayMessage
    );

  });

}


setInterval(readChat,5000);
