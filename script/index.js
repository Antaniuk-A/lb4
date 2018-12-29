document.getElementById("actTask1").addEventListener("click", function() {
  document.getElementById("task1").style.display = "flex";
  document.getElementById("task").style.display = "none";
});

document.getElementById("actTask2").addEventListener("click", function() {
  document.getElementById("task").style.display = "flex";
  document.getElementById("task1").style.display = "none";
});

//task1
let count = 0;

function insertNode() {
  let text = document.forms["settings"].elements["text"].value;
  let textColor = document.forms["settings"].elements["textColor"].value;
  let start = document.forms["settings"].elements["positionStart"].checked;

  count++;

  let elem = `<div style="background-color: ${textColor};">${text}</div>`;
  let content = document.createElement("div");
  content.className = "elem";
  content.innerHTML = elem;
  let list = document.getElementById("list");
  if (start) {
    list.insertBefore(content, list.firstChild);
    return;
  }
  list.appendChild(content);
}

document.getElementById("stats").addEventListener("click", () => {
  alert(count);
});

let form = document.getElementById("settings");
form.onsubmit = function() {
  insertNode();
  return false;
};

//task 2 + 3

let addRect = document.getElementById("addRect");

let prevElem;

function drawRect() {
  let color = Math.floor(Math.random() * 1000);
  let width = randomNumber(1, 200);
  let height = width / 2;
  let top = randomNumber(0, 400);
  let left = randomNumber(0, 800);

  let styles = `background-color: #${color}; 
                width: ${width}px;
                height: ${height}px;
                position: absolute;
                top: ${top}px;
                left: ${left}px`;

  let rect = `<div class="draggable" style="${styles}""></div>`;

  let content = document.createElement("div");
  content.innerHTML = rect;
  content.addEventListener("click", highlightElem);
  document.getElementById("draw").appendChild(content);
}

function highlightElem(e) {
  if(prevElem)
    prevElem.className.replace(" highlighted", "");
  let elem = e.target;
  if(elem.className.match(/highlighted/i))
    return;
  elem.className += " highlighted";
  prevElem = elem;
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function moveRect(e) {
  let elem = prevElem;
  if (!elem)
    return
  let left = parseInt(elem.style.left);
  let top = parseInt(elem.style.top);

  switch(e.keyCode) {
    case 37:
      if(left >= 0)
        elem.style.left = `${left - 10}px`;
      break;
    case 38:
      if(top >= 0)
        elem.style.top = `${top - 10}px`;
      break;
    case 39:
      if(left <= 800)
        elem.style.left = `${left + 10}px`;
      break;
    case 40:
      if(top <= 400)
        elem.style.top = `${top + 10}px`;
      break;
  }
}

document.onmousedown = function(e) {
  let parent = document.getElementById("draw");
  let elem = e.target;
  if(!elem.className.match(/draggable/i))
    return;
  elem.ondragstart = function() {
    return false;
  };

  document.onmousemove = function(ev) {
    let coordX = ev.pageX - parent.offsetLeft;
    let coordY = ev.pageY - parent.offsetTop;
    if (coordX <= 0)
      coordX = 0;
    if (coordX >= 700)
      coordX = 700;
    if (coordY <= 0)
      coordY = 0;
    if (coordY >= 400)
      coordY = 400;
    elem.style.left = coordX + 'px';
    elem.style.top = coordY + 'px';
  }
}

document.onmouseup = function() {
  document.onmousemove = function() {
    return false;
  };
}

addEventListener("keydown", moveRect);

addRect.addEventListener("click", drawRect);

