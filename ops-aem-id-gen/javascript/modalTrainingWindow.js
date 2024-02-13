// code for dialog training
const aemButton = document.querySelector(".aem-button");
const dialog = document.querySelector("dialog");

aemButton.addEventListener("click", () => {
    dialog.classList.add("open");
    dialog.showModal();
});

dialog.addEventListener("click", (event) => {
    if (event.target === dialog || event.target.id === "close-button") {
        dialog.close();
    }
});

const moreInfoButton = dialog.querySelector("#more-info-button");
moreInfoButton.addEventListener("click", () => {
    window.location.href = "https://confluence.devops.lloydsbanking.com/display/OCE/AEM+-+Content+ID+path"; // confluence training page
});