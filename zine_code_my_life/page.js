const PAGE_PADDING = 20;

const ANIMATION_COUNT_MAX = 30;

class Page {

    static page_index = 0;

    static nextPage() {
        if (pages.length > this.page_index + 1) this.page_index += 1;
    }

    static prevPage() {
        if (this.page_index > 0) this.page_index -= 1;
    }

    constructor(text, bg_color, font, page_width, page_height, onInputCallback) {
        this.text = text;
        this.bg_color = bg_color;
        this.width = page_width;
        this.height = page_height;
        this.font = font;

        this.animation_count = ANIMATION_COUNT_MAX;     // -100 to 100, 0 -> center
        this.done = false;                              // set to true to disable input callback
        
        this.setTextParam();
    }

    setTextParam() {
        let cur_font_size = 30;
        // console.log(this.font);
        let bounding_box = this.font.textBounds(this.text, 0, 0, cur_font_size);

        while (bounding_box.w < this.width * 5/7 && bounding_box.h < this.height / 4) {
            cur_font_size += 10;
            bounding_box = this.font.textBounds(this.text, 0, 0, cur_font_size);
        }

        this.font_size = cur_font_size - 10;
    }

    draw(index) {
        push();
        translate((windowWidth + 50) * this.animation_count / ANIMATION_COUNT_MAX, 200 * (Math.abs(this.animation_count) / ANIMATION_COUNT_MAX));
        scale(1 - (0.2 * Math.abs(this.animation_count) / ANIMATION_COUNT_MAX));

        textFont(this.font);
        textAlign(LEFT, CENTER);
        textSize(this.font_size); 

        fill(0, 0, 0, 255 * (1 - Math.abs(this.animation_count)/ANIMATION_COUNT_MAX));

        text(this.text, PAGE_PADDING, PAGE_PADDING, this.width-PAGE_PADDING*2, this.height-PAGE_PADDING*2);
        pop();

        let target_animation_count = Math.sign(index - Page.page_index) * ANIMATION_COUNT_MAX;

        let amount = max(1 - Math.pow(1 - Math.abs(this.animation_count-target_animation_count)/ANIMATION_COUNT_MAX/2, 3)*ANIMATION_COUNT_MAX*2, 1);
        if (amount > Math.abs(this.animation_count-target_animation_count)) this.animation_count = target_animation_count;
        else this.animation_count = this.animation_count > target_animation_count ? this.animation_count - amount : this.animation_count + amount;       
    }

    onInputValue(v) {
        if (!this.done && this.onInputCallback != null) this.onInputCallback(v);
    }

}