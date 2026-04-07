const $ = (id) => document.getElementById(id);

let studies = JSON.parse(localStorage.getItem("studies")) || [];
let currentIndex = null;
let isEditing = false;

const elements = {
  modal: $("modal"),
  viewModal: $("viewModal"),
  subject: $("subject"),
  content: $("content"),
  studyList: $("studyList"),
  viewSubject: $("viewSubject"),
  viewDate: $("viewDate"),
  viewContent: $("viewContent")
};

function saveStudies() {
  localStorage.setItem("studies", JSON.stringify(studies));
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

function saveStudy() {
  const subject = elements.subject.value.trim();
  const content = elements.content.value;

  if (!subject) return;

  if (isEditing && currentIndex !== null) {
    studies[currentIndex].subject = subject;
    studies[currentIndex].content = content;
  } else {
    studies.unshift({
      subject,
      content,
      date: new Date().toISOString().split("T")[0]
    });
  }

  saveStudies();
  renderStudies();
  closeWrite();
  elements.subject.value = "";
  elements.content.value = "";
  isEditing = false;
}

function createStudyElement(study, index) {
  const div = document.createElement("div");

  div.className = "post";

  div.innerHTML = `
    <span class="file">📄 ${study.subject}</span>
    <span class="date">${study.date}</span>
  `;

  div.onclick = () => openStudy(index);

  return div;
}

function renderStudies() {
  elements.studyList.innerHTML = "";
  studies.forEach((study, index) => {
    elements.studyList.appendChild(createStudyElement(study, index));
  });
}

function openStudy(index) {
  const study = studies[index];
  currentIndex = index;

  elements.viewSubject.innerText = study.subject;
  elements.viewDate.innerText = study.date;
  elements.viewContent.innerText = study.content;

  openView();
}

function deleteStudy() {
  if (currentIndex === null) return;

  if (!confirm("정말 삭제하시겠습니까?")) return;

  studies.splice(currentIndex, 1);
  currentIndex = null;

  saveStudies();
  closeView();
  renderStudies();
}

function editStudy() {
  if (currentIndex === null) return;

  const study = studies[currentIndex];

  elements.subject.value = study.subject;
  elements.content.value = study.content;

  closeView();
  openWrite(true);
}

renderStudies();

const memoFile = document.getElementById("memoFile");
const memoModal = document.getElementById("memoModal");

memoFile.addEventListener("dblclick", () => {
    memoModal.style.display = "flex";
});

function closeMemo() {
    memoModal.style.display = "none";
}