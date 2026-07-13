const API_KEY = "여기에_유튜브_API_KEY";
const VIDEO_ID = "여기에_라이브_영상_ID";

let nextPageToken = "";

async function getChat() {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${await getChatId()}&part=snippet,authorDetails&key=${API_KEY}`
    );

    const data = await res.json();

    if (data.items) {
      data.items.forEach(msg => {
        showDog();
      });
    }

  } catch (e) {
    console.log(e);
  }

  setTimeout(getChat, 3000);
}


async function getChatId() {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${VIDEO_ID}&key=${API_KEY}`
  );

  const data = await res.json();

  return data.items[0].liveStreamingDetails.activeLiveChatId;
}


function showDog() {

  const dog = document.createElement("img");

  dog.src = "dog1.png";
  dog.className = "dog";

  document.body.appendChild(dog);


  setTimeout(() => {
    dog.remove();
  }, 5000);
}


getChat();
