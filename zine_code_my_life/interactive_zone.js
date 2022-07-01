// const no_chinese = /^[A-Za-z0-9]*$/

class InteractiveZone {

    
    constructor(width, height, font, font_chi) {
        this.width = width;
        this.height = height;
        this.font = font;
        this.font_chi = font_chi;

        this.input_history = [
            "TEST",
            "中艾",
            "中Eng"
        ];
    }

    addTextHistory(text) {
        this.input_history.push(text);
    }

    draw() {
        fill(...COLOR_CODE_BACKGROUND.get());
        rect(0, 0, this.width, this.height);
        
        textFont(this.font);
        textSize(40);
        textAlign(LEFT, TOP);
        fill(...COLOR_CODE.get());
        text(">>>", 10, this.height - 50);
        
        let counter = 0;
        textSize(35);
        textFont(this.font_chi);

        this.input_history.forEach((txt) => {
            text(txt, 30, 10 + counter * 45);
            counter += 1;
        });
    }

}