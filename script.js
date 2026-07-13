const stage = document.getElementById("stage");

function addDog(name) {
  const dog = document.createElement("div");
  dog.className = "dog";

  dog.innerHTML = `
    <div class="name">${name}</div>
    <img src="https://placehold.co/80x50/png?text=%F0%9F%90%B6">
  `;

  dog.style.position = "absolute";
  dog.style.left = "-100px";
  dog.style.bottom = Math.random() * 40 + "px";

  stage.appendChild(dog);

  let x = -100;

  const move = setInterval(() => {
    x += 3;
    dog.style.left = x + "px";

    if (x > window.innerWidth + 100) {
      clearInterval(move);
      dog.remove();
    }
  }, 16);
}

addDog("홍준");
