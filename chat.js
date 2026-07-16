const API = API_KEY;
const VIDEO = VIDEO_ID;

const wrap = document.getElementById("overlay") || document.body;

let liveChatId = "";
let pageToken = "";
let dogIndex = 1;

const seen = new Set();
const dogs = [];

const W = () => innerWidth;
const H = () => innerHeight;
const GROUND = () => H() - 120;


async function init() {

  const v = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=${VIDEO}&key=${API}`
  ).then(r => r.json());


  console.log("VIDEO DATA:", v);


  liveChatId =
    v.items?.[0]?.liveStreamingDetails?.activeLiveChatId;


  if (!liveChatId) {
    console.log("LiveChat 없음");
    return;
  }


  console.log("LiveChat 연결됨:", liveChatId);


  poll();

  setInterval(moveDogs, 30);

}



async function poll() {

  if (!liveChatId) return;


  const url =
    `https://www.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${liveChatId}` +
    `&part=snippet,authorDetails&maxResults=200&pageToken=${pageToken}&key=${API}`;


  try {

    const d = await fetch(url).then(r => r.json());


    console.log("CHAT DATA:", d);
    console.log("CHAT ITEMS:", d.items);


    pageToken = d.nextPageToken || pageToken;


    (d.items || []).forEach(m => {


      if (seen.has(m.id)) return;

      seen.add(m.id);


      createDog(
        m.snippet.displayMessage,
        m.authorDetails?.displayName || "시청자"
      );


    });


    setTimeout(
      poll,
      d.pollingIntervalMillis || 3000
    );


  } catch(e) {

    console.log("CHAT ERROR:", e);

    setTimeout(poll,5000);

  }

}



function freeX() {


  for(let i=0;i<80;i++){

    let x = Math.random() * (W()-90);


    if(
      dogs.every(d=>Math.abs(d.x-x)>80)
    ){

      return x;

    }

  }


  return Math.random()*(W()-90);

}



function createDog(msg,user){


  const dog=document.createElement("img");


  dog.src=`dog${dogIndex}.png`;

  dog.style.position="fixed";
  dog.style.width="80px";
  dog.style.pointerEvents="none";
  dog.style.zIndex=10;


  dogIndex++;

  if(dogIndex>9)
    dogIndex=1;



  const bubble=document.createElement("div");


  bubble.innerText=`${user}\n${msg}`;

  bubble.style.position="fixed";
  bubble.style.background="#fff";
  bubble.style.border="2px solid #000";
  bubble.style.borderRadius="12px";
  bubble.style.padding="6px 10px";
  bubble.style.font="14px sans-serif";
  bubble.style.whiteSpace="pre-wrap";
  bubble.style.maxWidth="260px";
  bubble.style.pointerEvents="none";
  bubble.style.zIndex=20;



  wrap.appendChild(dog);
  wrap.appendChild(bubble);



  const obj={

    el:dog,
    bubble:bubble,

    x:freeX(),
    y:GROUND(),

    dir:Math.random()<0.5?-1:1,

    speed:0.6+Math.random()*1.2

  };


  dogs.push(obj);



  setTimeout(()=>{

    if(bubble.isConnected)
      bubble.remove();

  },5000);


}




function moveDogs(){


  const ground=GROUND();



  dogs.forEach(d=>{


    d.x += d.speed*d.dir;



    if(d.x<0){

      d.x=0;
      d.dir=1;

    }


    if(d.x>W()-80){

      d.x=W()-80;
      d.dir=-1;

    }



    d.y=ground;



    d.el.style.left=d.x+"px";

    d.el.style.top=d.y+"px";

    d.el.style.transform =
      d.dir>0
      ?"scaleX(1)"
      :"scaleX(-1)";



    if(d.bubble.isConnected){

      d.bubble.style.left=(d.x-30)+"px";

      d.bubble.style.top=(d.y-70)+"px";

    }


  });


}



init();
