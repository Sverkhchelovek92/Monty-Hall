const doorBlock = document.querySelector(".doors-block");
const stateDisplay = document.querySelector(".state-display");
const btnBlock = document.querySelector(".btn-block");

const carIcon = `<img src="car.svg" width="55">`;
const milkIcon = `<img src="milk.svg" width="55">`;

// Создаем двери

for (let i = 0; i < 3; i++) {
  const door = document.createElement("div");
  door.classList.add("door");
  door.classList.add("unchosen");
  door.setAttribute("id", i);
  doorBlock.appendChild(door);
}

// Помещаем за одну из дверей приз (автомобиль)

function prizeRandomize() {
  const randomId = Math.floor(Math.random() * 3);
  const randomDoor = document.getElementById(randomId);
  randomDoor.classList.add("prize-door");
}

prizeRandomize();

// Массив для дверей без приза

const emptyDoors = [];

// Коллекция дверей

const doorsNode = document.querySelectorAll(".door");

// Выбираем дверь в первый раз

function chooseFirst(event) {
  if (event.target.classList.contains("unchosen")) {
    gameState = "First Choice";
    stateDisplay.textContent = "Do you want to choose other Door?";
    for (let i = 0; i < doorsNode.length; i++) {
      doorsNode[i].classList.remove("unchosen");
    }

    const chosenDoor = event.target.closest(".door");
    chosenDoor.classList.add("chosen-one");

    for (let i = 0; i < doorsNode.length; i++) {
      if (
        !doorsNode[i].classList.contains("chosen-one") &&
        !doorsNode[i].classList.contains("prize-door")
      ) {
        emptyDoors.push(i);
      }
    }

    const randomEmptyDoorIndex = Math.floor(Math.random() * emptyDoors.length);
    const randomEmptyDoor = emptyDoors[randomEmptyDoorIndex];

    doorsNode[randomEmptyDoor].innerHTML = milkIcon;
    doorsNode[randomEmptyDoor].classList.add("revealed-door");

    const againBtn = document.createElement("button");
    const noBtn = document.createElement("button");

    againBtn.textContent = "Choose Other Door";
    noBtn.textContent = "No";

    againBtn.dataset.action = "change";
    noBtn.dataset.action = "same";

    btnBlock.appendChild(againBtn);
    btnBlock.appendChild(noBtn);
  }
}

doorBlock.addEventListener("click", chooseFirst);

// Решаем не менять выбранную дверь

function notChoose(event) {
  if (event.target.dataset.action === "same") {
    const yourChoice = document.querySelector(".chosen-one");
    if (yourChoice.classList.contains("prize-door")) {
      stateDisplay.textContent = "You Won!";
      yourChoice.classList.add("win-door");
      yourChoice.innerHTML = carIcon;
      for (let i = 0; i < doorsNode.length; i++) {
        if (!doorsNode[i].classList.contains("win-door")) {
          doorsNode[i].classList.add("revealed-door");
          doorsNode[i].innerHTML = milkIcon;
        }
      }
      changeBtns();
    } else {
      stateDisplay.textContent = "You Lose!";
      for (let i = 0; i < doorsNode.length; i++) {
        if (doorsNode[i].classList.contains("prize-door")) {
          doorsNode[i].classList.add("revealed-door");
          doorsNode[i].innerHTML = carIcon;
        }
        if (doorsNode[i].classList.contains("chosen-one")) {
          doorsNode[i].classList.add("revealed-door");
          doorsNode[i].innerHTML = milkIcon;
        }
      }
      changeBtns();
    }
  }
}

// Решаем поменять выбранную дверь

function chooseToChange(event) {
  if (event.target.dataset.action === "change") {
    for (let i = 0; i < doorsNode.length; i++) {
      if (doorsNode[i].classList.contains("chosen-one")) {
        doorsNode[i].classList.remove("chosen-one");
        doorsNode[i].classList.add("changed-door");
      }
    }

    for (let i = 0; i < doorsNode.length; i++) {
      if (
        !doorsNode[i].classList.contains("changed-door") &&
        !doorsNode[i].classList.contains("revealed-door")
      ) {
        doorsNode[i].classList.add("chosen-one");
      }
    }

    const yourChoice = document.querySelector(".chosen-one");
    if (yourChoice.classList.contains("prize-door")) {
      stateDisplay.textContent = "You Won!";
      yourChoice.classList.add("win-door");
      yourChoice.innerHTML = carIcon;
      for (let i = 0; i < doorsNode.length; i++) {
        if (!doorsNode[i].classList.contains("win-door")) {
          doorsNode[i].classList.add("revealed-door");
          doorsNode[i].innerHTML = milkIcon;
        }
      }
      changeBtns();
    } else {
      stateDisplay.textContent = "You Lose!";
      for (let i = 0; i < doorsNode.length; i++) {
        if (doorsNode[i].classList.contains("prize-door")) {
          doorsNode[i].classList.add("revealed-door");
          doorsNode[i].innerHTML = carIcon;
        }
        if (doorsNode[i].classList.contains("chosen-one")) {
          doorsNode[i].classList.add("revealed-door");
          doorsNode[i].innerHTML = milkIcon;
        }
      }
      changeBtns();
    }
  }
}

btnBlock.addEventListener("click", notChoose);
btnBlock.addEventListener("click", chooseToChange);

// Удаляем кнопки, добавляем кнопку

function changeBtns() {
  btnBlock.innerHTML = "";
  const playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Play Again";
  playAgainBtn.dataset.action = "again";
  btnBlock.appendChild(playAgainBtn);
}

function playAgain(event) {
  if (event.target.dataset.action === "again") {
    location.reload();
  }
}

btnBlock.addEventListener("click", playAgain);
