
let liveChatId = "";
let nextPageToken = "";


async function getLiveChatId() {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${VIDEO_ID}&key=${API_KEY}`
  );

  const data = await response.json();

  liveChatId =
    data.items[0].liveStreamingDetails.activeLiveChatId;

  getMessages();
}


async function getMessages() {

  const url =
    `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet,authorDetails&key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();


  data.items.forEach(message => {
    showDog();
  });


  setTimeout(getMessages, 3000);
}


function showDog(){

  const dog = document.createElement("img");

  dog.src = "dog1.png";
  dog.className = "dog";

  document.body.appendChild(dog);


  setTimeout(()=>{
    dog.remove();
  },5000);

}


getLiveChatId();
