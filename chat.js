let liveChatId = "";
let lastMessageId = "";
let direction = true;


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
  `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet&key=${API_KEY}`;


  const response = await fetch(url);
  const data = await response.json();


  if(data.items){

    const msg = data.items[data.items.length - 1];


    if(msg.id !== lastMessageId){

      lastMessageId = msg.id;

      createPet(msg.snippet.displayMessage);

    }

  }


  setTimeout(getMessages,3000);

}



function createPet(text){


  const pet = document.createElement("div");
  pet.className = direction ? "pet right" : "pet left";


  const bubble = document.createElement("div");
  bubble.className="bubble";
  bubble.innerText=text;


  const dog=document.createElement("img");
  dog.src="dog1.png";
  dog.className="dog";


  pet.appendChild(bubble);
  pet.appendChild(dog);


  document.body.appendChild(pet);


  direction=!direction;

}



getLiveChatId();


