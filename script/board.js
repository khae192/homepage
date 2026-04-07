const $ = (id) => document.getElementById(id);

let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentIndex = null;
let isEditing = false;

const elements = {
  modal: $("modal"),
  viewModal: $("viewModal"),
  title: $("title"),
  content: $("content"),
  boardList: $("boardList"),
  viewTitle: $("viewTitle"),
  viewDate: $("viewDate"),
  viewContent: $("viewContent")
};

const windowEl = document.querySelector(".window");
const minimizeBtn = document.querySelector(".minimize");
const maximizeBtn = document.querySelector(".maximize");
const closeBtn = document.querySelector(".close");
const taskItem = document.querySelector("#task-window");

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function goHome() {
  location.href = "index.html";
}

function openWrite(edit = false) {
  isEditing = edit;
  elements.modal.style.display = "flex";
}

function closeWrite() {
  elements.modal.style.display = "none";
}

function openView() {
  elements.viewModal.style.display = "flex";
}

function closeView() {
  elements.viewModal.style.display = "none";
}

function clearInputs() {
  elements.title.value = "";
  elements.content.value = "";
}

function addPost() {
  const title = elements.title.value.trim();
  const content = elements.content.value;

  if (!title) return;

  if (isEditing && currentIndex !== null) {
    posts[currentIndex].title = title;
    posts[currentIndex].content = content;
  } else {
    posts.unshift({
      title,
      content,
      date: new Date().toISOString().split("T")[0]
    });
  }

  savePosts();
  renderPosts();
  closeWrite();
  clearInputs();
  isEditing = false;
}

function createPostElement(post, index) {
  const div = document.createElement("div");

  div.className = "post";

  div.innerHTML = `
    <span class="file">📄 ${post.title}</span>
    <span class="date">${post.date}</span>
  `;

  div.onclick = () => openPost(index);

  return div;
}

function renderPosts() {
  elements.boardList.innerHTML = "";
  posts.forEach((post, index) => {
    elements.boardList.appendChild(createPostElement(post, index));
  });
}

function openPost(index) {
  const post = posts[index];
  currentIndex = index;

  elements.viewTitle.innerText = post.title;
  elements.viewDate.innerText = post.date;
  elements.viewContent.innerText = post.content;

  openView();
}

function deletePost() {
  if (currentIndex === null) return;

  posts.splice(currentIndex, 1);
  currentIndex = null;

  savePosts();
  closeView();
  renderPosts();
}

function editPost() {
  if (currentIndex === null) return;

  const post = posts[currentIndex];

  elements.title.value = post.title;
  elements.content.value = post.content;

  closeView();
  openWrite(true);
}

renderPosts();

taskItem.classList.add("active");

minimizeBtn.onclick = () => {
  windowEl.classList.add("minimized");
};

maximizeBtn.onclick = () => {
  windowEl.classList.toggle("maximized");
  maximizeBtn.textContent =
    windowEl.classList.contains("maximized") ? "❐" : "▢";
};

closeBtn.onclick = () => {
  windowEl.classList.add("hidden");
  taskItem.classList.remove("active");
};

taskItem.onclick = () => {
  windowEl.classList.remove("minimized");
  windowEl.classList.remove("hidden");
  taskItem.classList.add("active");
};

document.querySelectorAll(".task-item").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".task-item").forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});

const memoFile = document.getElementById("memoFile");
const memoModal = document.getElementById("memoModal");

memoFile.addEventListener("dblclick", () => {
    memoModal.style.display = "flex";
});

function closeMemo() {
    memoModal.style.display = "none";
}