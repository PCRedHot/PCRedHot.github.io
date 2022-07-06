// import {Color, COLOR_CODE_BACKGRUND} from "./tools/color.js";

// window.open('tel://+85200000000');
// try{
//     window.open('spotify:track:0dbKKEitEKGPpgY7qOFwpe');
// }catch (e){
//     console.log(e);
// }

// document.addEventListener('DOMContentLoaded', function () {

// });


// console.log(document.body.style.padding);
// document.body.style.margin = "0px";


let font_text = null,
    font_code = null,
    font_code_history = null;

let PAGE_WIDTH, PAGE_HEIGHT, INTERACT_ZONE_WIDTH, INTERACT_ZONE_HEIGHT;


let state = {}

let pages = [];
let interact_zone = null;

let input_box = null;
let curr_bg_color = COLOR_WHITE_BACKGROUND;

function preload() {
    font_text = loadFont('./fonts/NotoSansHK-Medium.otf');
    font_code = loadFont('./fonts/Consolas.ttf');
    font_code_history = loadFont('./fonts/NotoSansHK-Regular.otf');
}

function setup(){
    // Remove margin to canvas
    document.body.style.margin = '0px';

    pixelDensity(1);
    
    // zone dimensions
    PAGE_WIDTH = windowWidth, PAGE_HEIGHT = windowHeight * 5 / 7;
    INTERACT_ZONE_WIDTH = windowWidth, INTERACT_ZONE_HEIGHT = windowHeight - PAGE_HEIGHT;

    Page.font = font_text;
    Page.width = PAGE_WIDTH;
    Page.height = PAGE_HEIGHT;

    loadInitPages();
    interact_zone = new InteractiveZone(INTERACT_ZONE_WIDTH, INTERACT_ZONE_HEIGHT, font_code, font_code_history);
    setupInputBox();


    // Around (980, 1700) 
    createCanvas(windowWidth, windowHeight);
    background(...curr_bg_color.get());

}


function setupInputBox() {
    input_box = createInput("");
    input_box.position(100, windowHeight - 57);
    input_box.size(windowWidth - 120, INPUT_BOX_HEIGHT);
    input_box.style('font-size', '40px');
    input_box.style('background-color', COLOR_CODE_BACKGROUND.getHex());
    input_box.style('color', COLOR_CODE.getHex());
    input_box.style('border', '0');
    input_box.style('font-family', 'Consolas');
    input_box.style('type', 'text');

}




function draw(){
    // background(...COLOR_WHITE_BACKGROUND.get());
    // background(255, 255, 255, 180);
    target_bg_color = pages[Page.page_index].bg_color;
    curr_bg_color = Color.fromTransition(curr_bg_color, target_bg_color, 10);

    
    background(...curr_bg_color.get());

    push();
    pages.forEach((page, index) => page.draw(index));
    pop();

    push();
    translate(0, PAGE_HEIGHT);
    interact_zone.draw();
    pop();

}


function touchEnded() {
    // PREV / NEXT PAGE
    if (mouseY < PAGE_HEIGHT) {   
        if (mouseX < windowWidth/2) Page.prevPage();
        else Page.nextPage();
    }

    // interact_zone.addTextHistory("Click");
    return false;
}

function keyPressed() {
    if (keyCode === RETURN) {
        let v = input_box.value().trim();
        if (v.length > 0) {
            interact_zone.addTextHistory(v);
            inputValue(v);
        }
        input_box.value('');
    }
    input_box.attribute('disabled', '');
    input_box.removeAttribute('disabled');
  }

function inputValue(v) {
    pages[Page.page_index].onInputValue(v);
}