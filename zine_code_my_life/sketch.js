// import {Color, COLOR_CODE_BACKGRUND} from "./tools/color.js";

// window.open('tel://+85200000000');
// try{
//     window.open('spotify:track:0dbKKEitEKGPpgY7qOFwpe');
// }catch (e){
//     console.log(e);
// }

// spotify public API key BQC1g1TjIG9Xtjwk226YpgpCUZLv87iIBVI68tWmT5fRkZlgUVLLIQrVMKodLumzp77gCxkHR4S-2Gskeo8H9NDxOpwfMSSIZoNJe7HIMbUlUMoPGI100kRaGMuC7FvgaDNlw9q17_Hix97OjAWSkhdzInCc5ytmRIFt_B_myhkd-AHTEHjNKlHSRewti8J2r40
// document.addEventListener('DOMContentLoaded', function () {

// });


// console.log(document.body.style.padding);
// document.body.style.margin = "0px";


let font_text = null,
    font_code = null,
    font_code_history = null;

let PAGE_WIDTH, PAGE_HEIGHT, INTERACT_ZONE_WIDTH, INTERACT_ZONE_HEIGHT;



let pages = [];
let interact_zone = null;

let input_box = null;


function preload() {
    font_text = loadFont('./fonts/NotoSansHK-Medium.otf');
    font_code = loadFont('./fonts/Consolas.ttf');
    font_code_history = loadFont('./fonts/NotoSansHK-Regular.otf');
}

function setup(){
    // Remove margin to canvas
    document.body.style.margin = '0px';
    
    // zone dimensions
    PAGE_WIDTH = windowWidth, PAGE_HEIGHT = windowHeight * 2 / 3;
    INTERACT_ZONE_WIDTH = windowWidth, INTERACT_ZONE_HEIGHT = windowHeight - PAGE_HEIGHT;

    pages.push(new Page('Hi', COLOR_WHITE_BACKGROUND, font_text, PAGE_WIDTH, PAGE_HEIGHT));
    pages.push(new Page('我係Parry', COLOR_WHITE_BACKGROUND, font_text, PAGE_WIDTH, PAGE_HEIGHT));
    pages.push(new Page('多謝你打開呢本書', COLOR_WHITE_BACKGROUND, font_text, PAGE_WIDTH, PAGE_HEIGHT));
    pages.push(new Page(`${windowWidth}, ${windowHeight}`, COLOR_WHITE_BACKGROUND, font_text, PAGE_WIDTH, PAGE_HEIGHT));
    pages.push(new Page(`${windowWidth}, ${windowHeight}`, COLOR_WHITE_BACKGROUND, font_text, PAGE_WIDTH, PAGE_HEIGHT));

    interact_zone = new InteractiveZone(INTERACT_ZONE_WIDTH, INTERACT_ZONE_HEIGHT, font_code, font_code_history);

    input_box = createInput("");
    input_box.position(100, windowHeight - 57);
    input_box.size(windowWidth - 100, 50);
    input_box.style('font-size', '40px');
    input_box.style('background-color', COLOR_CODE_BACKGROUND.getHex());
    input_box.style('color', COLOR_CODE.getHex());
    input_box.style('border', '0');
    input_box.style('font-family', 'Consolas');

    // Around (980, 1700) 
    createCanvas(windowWidth, windowHeight);
    background(...COLOR_WHITE_BACKGROUND.get());
}



function draw(){
    // background(...COLOR_WHITE_BACKGROUND.get());
    background(255, 255, 255, 200);

    push();
    pages.forEach((page, index) => page.draw(index));
    pop();

    push();
    translate(0, PAGE_HEIGHT);
    interact_zone.draw();
    pop();

}


function mousePressed() {
    // PREV / NEXT PAGE
    if (mouseY < PAGE_HEIGHT) {   
        if (mouseX < windowWidth/2) Page.prevPage();
        else Page.nextPage();
    }
    
}

function keyPressed() {
    if (keyCode === RETURN) {
        interact_zone.addTextHistory(input_box.value());
        input_box.value('');
    }
  }

function inputValue() {}