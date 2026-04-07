const windowEl = document.querySelector(".window");
const titleBar = document.querySelector(".title-bar");

const memoWindow = document.querySelector(".memo-window");
const memoTitleBar = document.querySelector(".memo-title-bar");

const minimizeBtn = document.querySelector(".minimize");
const maximizeBtn = document.querySelector(".maximize");
const closeBtn = document.querySelector(".close");

const taskItems = document.querySelectorAll(".task-item");
const explorerTask = document.querySelector("#task-window");
const memoTask = document.querySelectorAll(".task-item")[3];

const memoFile = document.getElementById("memoFile");
const memoModal = document.getElementById("memoModal");

let isDragging = false;
let currentWindow = null;
let offsetX = 0;
let offsetY = 0;

function setActiveTask(target) {
    taskItems.forEach(item => item.classList.remove("active"));
    target.classList.add("active");
}

explorerTask.classList.add("active");

document.querySelectorAll(".folder").forEach(folder => {
    folder.addEventListener("dblclick", () => {
        window.location.href = folder.dataset.link;
    });
});

minimizeBtn.onclick = () => {
    windowEl.classList.add("minimized");
};

maximizeBtn.onclick = () => {
    windowEl.classList.toggle("maximized");
};

closeBtn.onclick = () => {
    windowEl.style.display = "none";
};

explorerTask.onclick = () => {
    windowEl.style.display = "block";
    setActiveTask(explorerTask);
};

memoFile.addEventListener("dblclick", () => {
    memoModal.style.display = "block";

    memoWindow.style.position = "absolute";
    memoWindow.style.transform = "none";

    const rect = memoWindow.getBoundingClientRect();

    memoWindow.style.left = (window.innerWidth - rect.width) / 2 + "px";
    memoWindow.style.top = (window.innerHeight - rect.height) / 2 + "px";

    setActiveTask(memoTask);
});

function closeMemo() {
    memoModal.style.display = "none";
    setActiveTask(explorerTask);
}

function startDrag(e, target) {
    isDragging = true;
    currentWindow = target;

    const rect = target.getBoundingClientRect();

    target.style.left = rect.left + "px";
    target.style.top = rect.top + "px";
    target.style.transform = "none";

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.body.style.userSelect = "none";
}

titleBar.addEventListener("mousedown", (e) => {
    if (windowEl.classList.contains("maximized")) return;
    startDrag(e, windowEl);
});

memoTitleBar.addEventListener("mousedown", (e) => {
    startDrag(e, memoWindow);
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging || !currentWindow) return;

    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    const maxX = window.innerWidth - currentWindow.offsetWidth;
    const maxY = window.innerHeight - currentWindow.offsetHeight;

    if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > maxX) newX = maxX;
    if (newY > maxY) newY = maxY;

    currentWindow.style.left = newX + "px";
    currentWindow.style.top = newY + "px";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    currentWindow = null;
    document.body.style.userSelect = "auto";
});