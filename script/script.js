document.querySelectorAll(".folder").forEach(folder => {

    folder.addEventListener("click", () => {
        folder.classList.add("active");
        setTimeout(() => folder.classList.remove("active"), 150);
    });

    folder.addEventListener("dblclick", () => {
        window.location.href = folder.dataset.link;
    });

});