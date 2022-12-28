
const filter1 = "Ñ@#W$9876543210?!abc;:+=-,._          ";
const filter2 = "       .:-i|=+%O#@           ";
const filter3 = '     .:░▒▓█         ';

var density = filter1;

let video;
let asciiDiv;

let blackandwhite = true;
let customColor = false;

let myRGB = [255, 255, 255];

$('#bw-button').click(function () {
    blackandwhite = !blackandwhite;
    customColor = false;
    console.log(blackandwhite);
})

$('input[type=radio][name=filter]').change(function () {
    if (this.value == '1') {
        density = filter1;
    }
    if (this.value == '2') {
        density = filter2;
    }
    if (this.value == '3') {
        density = filter3
    }
})

$('#update-filter').click(function () {
    density = $('#custom-filter').val();
})

$('[name=slider]').change((e) => {
    customColor = true;
    blackandwhite = false;
    myRGB[$(e.target).data('color')] = parseInt(e.target.value);
    console.log(myRGB);
})

function setup() {
    createCanvas(390, 240);
    video = createCapture(VIDEO);
    video.size(80, 48);
    asciiDiv = createDiv();
    asciiDiv.child(video);
    let videoContainer = select('#video-container');
    videoContainer.child(asciiDiv);
}

function draw() {
    video.loadPixels();
    let asciiImage = "";
    for (let j = 0; j < video.height; j++) {
        for (let i = 0; i < video.width; i++) {
            const pixelIndex = (i + j * video.width) * 4;
            const r = video.pixels[pixelIndex + 0];
            const g = video.pixels[pixelIndex + 1];
            const b = video.pixels[pixelIndex + 2];
            const avg = (r + g + b) / 3;
            const len = density.length;
            const charIndex = floor(map(avg, 0, 255, 0, len));
            const c = density.charAt(charIndex);
            if (c == " ") asciiImage += "&nbsp;";
            else {
                if (blackandwhite) {
                    asciiImage += '<span style="color: rgba(255, 255, 255, ' + avg / 255+ ')">' + c + '</span>';
                } else if (customColor) {
                    asciiImage += '<span style="color: rgb(' + r * myRGB[0] / 100 + ', ' + g * myRGB[1] / 100 + ', ' + b * myRGB[2] / 100 + ')">' + c + '</span>';
                } else {
                    asciiImage += '<span style="color: rgb(' + r + ', ' + g + ', ' + b + ')">' + c + '</span>';
                }

            }
        }
        asciiImage += '<br/>';
    }
    asciiDiv.html(asciiImage);
}
