let liveChatId = "";
let lastMessageId = "";


async function getLiveChatId() {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${VIDEO_ID}&key=${API_KEY}`
  );

  const data = await response.json();

  liveChatId = data.items[0].liveStreamingDetails.activeLiveChatId;

  getMessages();
}


async function getMessages() {

  const url =
    `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails&key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();


  if (data.items && data.items.length > 0) {

    const newest = data.items[data.items.length - 1];

    if (newest.id !== lastMessageId) {

      lastMessageId = newest.id;

      showDog(newest.snippet.displayMessage);
    }
  }


  setTimeout(getMessages, 3000);
}


function showDog(message){

  const box = document.createElement("div");
  box.className = "chatBox";
  box.innerText = message;


  const dog = document.createElement("img");
  dog.src = "dog1.png";
  dog.className = "dog";


  document.body.appendChild(box);
  document.body.appendChild(dog);


  setTimeout(()=>{
    box.remove();
    dog.remove();
  },5000);

}


getLiveChatId();
