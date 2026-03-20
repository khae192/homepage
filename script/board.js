const $ = (id) => document.getElementById(id);

let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentIndex = null;

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

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function goHome() {
  location.href = "index.html";
}

function openWrite() {
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

  if (!title) {
    alert("파일 이름을 입력하세요!");
    return;
  }

  posts.unshift({
    title,
    content,
    date: new Date().toISOString().split("T")[0]
  });

  savePosts();
  renderPosts();
  closeWrite();
  clearInputs();
}

function createPostElement(post, index) {
  const div = document.createElement("div");
  div.className = "post" + (index === currentIndex ? " active" : "");

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
  if (!confirm("이 파일을 삭제하시겠습니까?")) return;

  posts.splice(currentIndex, 1);
  currentIndex = null;

  savePosts();
  closeView();
  renderPosts();
}

renderPosts();