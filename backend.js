
let dims = 16;

const screen = document.querySelector(".screen");

for (let i = 0; i < dims; i++) {
    let block = document.createElement('div');
    block.style.cssText = 'border: 0;
    screen.appendChild(block);
}