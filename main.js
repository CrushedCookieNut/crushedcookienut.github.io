let position = 0;
const imagesToShow = 3;
const imageWidth = 265;
const totalImages = 11;

function moveRight() {
    if (position > -(imageWidth * (totalImages - imagesToShow))) {
        position -= imageWidth;
        document.querySelector(".carousel-track").style.transform = `translateX(${position}px)`;
    }
}

function moveLeft() {
    if (position < 0) {
        position += imageWidth;
        document.querySelector(".carousel-track").style.transform = `translateX(${position}px)`;
    }
}