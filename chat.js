let liveChatId = "";
let lastMessageId = "";

let dogNumber = 1;
let moveRight = true;


async function getLiveChatId() {

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${VIDEO_ID}&key=${API_KEY}`
  );

  const data = await response.json();

  console.log(data);


  if (!data.items || data.items.length === 0) {
    console.log("라이브 정보를 못 가져옴");
    return;
  }


  liveChatId =
  data.items[0].liveStreamingDetails.activeLiveChatId;


  getMessages();

}



async function getMessages() {


  const url =
  `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}&part=snippet&key=${API_KEY}`;


  const response = await fetch(url);

  const data = await response.json();



  if(data.items){


    data.items.forEach(message=>{


      if(message.id !== lastMessageId){


        lastMessageId = message.id;


        createPet(
          message.snippet.displayMessage
        );


      }


    });

  }


  setTimeout(getMessages,3000);

}




function createPet(text){


  const pet = document.createElement("div");


  pet.className =
  moveRight ? "pet move-right" : "pet move-left";



  const bubble = document.createElement("div");

  bubble.className = "bubble";

  bubble.innerText = text;




  const dog = document.createElement("img");

  dog.className = "dog";

  dog.src = `dog${dogNumber}.png`;



  dogNumber++;

  if(dogNumber > 9){

    dogNumber = 1;

  }



  pet.appendChild(bubble);

  pet.appendChild(dog);


  document.body.appendChild(pet);



  moveRight = !moveRight;


  setTimeout(()=>{

    pet.remove();

  },8000);


}




getLiveChatId();
