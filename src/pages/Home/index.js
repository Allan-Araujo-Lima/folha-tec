const controls =
    document.querySelectorAll('.control');

let currentItem = 0;

const items =
    document.querySelectorAll('.item');

const maxItems = items.length;

controls.forEach((control) => {
    control.addEventListener("click", () => {
        const isLeft = control.classList.contains("arrow-left");
        console.log("clicked", isLeft);
    });
})


