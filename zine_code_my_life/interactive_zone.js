// const no_chinese = /^[A-Za-z0-9]*$/

const INPUT_BOX_HEIGHT = 50, CODE_BOUNDRY_HEIGHT = 20, CODE_HISTORY_BADDING = 30, CODE_HISTORY_TEXT_HEIGHT = 45;

class InteractiveZone {

    
    constructor(width, height, font, font_chi) {
        this.width = width;
        this.height = height;
        this.font = font;
        this.font_chi = font_chi;

        this.input_history = [];
    }

    addTextHistory(text) {
        this.input_history.push(text);
        
        let history_box_height = this.height - INPUT_BOX_HEIGHT - CODE_BOUNDRY_HEIGHT * 2 - CODE_BOUNDRY_HEIGHT;
        let max_histry_items = Math.floor(history_box_height/CODE_HISTORY_TEXT_HEIGHT);

        if (this.input_history.length > max_histry_items) console.log(this.input_history.shift());
    }

    draw() {
        

        fill(...COLOR_CODE_BACKGROUND.get());
        rect(0, 0, this.width, this.height);

        fill(...COLOR_CODE_BONDARY.get());
        rect(0, 0, this.width, CODE_BOUNDRY_HEIGHT);
        

        textFont(this.font);
        textSize(40);
        textAlign(LEFT, TOP);
        fill(...COLOR_CODE.get());
        text(">>>", 10, this.height - INPUT_BOX_HEIGHT);
        
        let counter = 0;
        textSize(35);
        textFont(this.font_chi);

        this.input_history.forEach((txt) => {
            text(txt, CODE_HISTORY_BADDING, CODE_HISTORY_BADDING + CODE_BOUNDRY_HEIGHT + counter * CODE_HISTORY_TEXT_HEIGHT);
            counter += 1;
        });
    }

}