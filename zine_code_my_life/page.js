const PAGE_PADDING = 20;

const ANIMATION_COUNT_MAX = 30;

class Page {

    static page_index = 0;
    static font = null;
    static width = 0;
    static height = 0;

    static nextPage() {
        if (pages.length > this.page_index + 1) this.page_index += 1;
    }

    static prevPage() {
        if (this.page_index > 0) this.page_index -= 1;
    }

    constructor(text) {
        this.text = text;
        if (text == null) this.text = " ";
        this.bg_color = COLOR_WHITE_BACKGROUND;

        this.animation_count = ANIMATION_COUNT_MAX;     // -100 to 100, 0 -> center
        this.done = false;                              // set to true to disable input callback
        this.onInputCallback = null;
        
        let cur_font_size = 30;
        let bounding_box = Page.font.textBounds(this.text, 0, 0, cur_font_size);

        while (bounding_box.w < Page.width * 6/7 && bounding_box.h < Page.height / 3) {
            cur_font_size += 5;
            bounding_box = Page.font.textBounds(this.text, 0, 0, cur_font_size);
        }

        this.font_size = cur_font_size - 5;
    }

    setOnInputCallback(callback) {
        this.onInputCallback = callback;
        return this;
    }

    setBackgroundColor(color) {
        this.bg_color = color;
        return this;
    }


    draw(index) {
        
        push();
        translate((windowWidth + 50) * this.animation_count / ANIMATION_COUNT_MAX, 200 * (Math.abs(this.animation_count) / ANIMATION_COUNT_MAX));
        scale(1 - (0.2 * Math.abs(this.animation_count) / ANIMATION_COUNT_MAX));

        textFont(Page.font);
        textAlign(LEFT, CENTER);
        textSize(this.font_size); 

        fill(0, 0, 0, 255 * (1 - Math.abs(this.animation_count)/ANIMATION_COUNT_MAX));

        text(this.text, PAGE_PADDING, PAGE_PADDING, Page.width-PAGE_PADDING*2, Page.height-PAGE_PADDING*2);
        pop();

        let target_animation_count = Math.sign(index - Page.page_index) * ANIMATION_COUNT_MAX;

        let amount = max(1 - Math.pow(1 - Math.abs(this.animation_count-target_animation_count)/ANIMATION_COUNT_MAX/2, 3)*ANIMATION_COUNT_MAX*2, 1);
        if (amount > Math.abs(this.animation_count-target_animation_count)) this.animation_count = target_animation_count;
        else this.animation_count = this.animation_count > target_animation_count ? this.animation_count - amount : this.animation_count + amount;       
    }

    onInputValue(v) {
        if (!this.done && this.onInputCallback != null) this.onInputCallback(this, v);
    }

}