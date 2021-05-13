let c = document.createElement("canvas");
ctx = c.getContext('2d');

frames = 30 //70
pixel_size = 1
let sample_size = pixel_size * frames + 1
let img1 = new Image();

img1.onload = function () {
    pixelator();
    setIntervalX(pixelator, 95, frames-2) //35
};


img1.src = document.getElementById("image1").src;

function pixelator() {
    sample_size -= pixel_size;

    let w = img1.width;
    let h = img1.height;
    c.width = w;
    c.height = h;
    ctx.drawImage(img1, 0, 0);

    var pixelArr = ctx.getImageData(0, 0, w, h).data;

    for (let y = 0; y < h; y += sample_size) {
        for (let x = 0; x < w; x += sample_size) {
            let p = (x + (y * w)) * 4;
            ctx.fillStyle = "rgba(" + pixelArr[p] + "," + pixelArr[p + 1] + "," + pixelArr[p + 2] + "," + pixelArr[p + 3] + ")";
            ctx.fillRect(x, y, sample_size, sample_size);
        }
    }
    console.log(sample_size);

    //return c.toDataURL();
    document.getElementById("image1").remove();
    let img2 = new Image();
    //document.getElementById("image1").remove();
    img2.crossOrigin = "Anonymous";
    img2.setAttribute('crossOrigin', '');
    img2.src = c.toDataURL("image1/jpeg");
    img2.width = 400;
    img2.id = "image1"

    document.querySelector(".city").appendChild(img2);
}

function setIntervalX(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {

        callback();

        if (++x === repetitions) {
            window.clearInterval(intervalID);
        }
    }, delay);
}