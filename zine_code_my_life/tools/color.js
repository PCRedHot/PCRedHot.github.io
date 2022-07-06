class Color{

    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    get() {
        return [this.r, this.g, this.b, this.a];
    }

    getHex() {
        return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}`;
    }
}

Color.fromRGB = (r, g, b) => {return new Color(r, g, b, 255);};
Color.fromRGBA = (r, g, b, a) => {return new Color(r, g, b, a);};
Color.fromGray = (gray) => {return new Color(gray, gray, gray, 255);};
Color.fromGrayA = (gray, a) => {return new Color(gray, gray, gray, a);};

Color.fromTransition = (from_color, to_color, max_change) => {
    from_color_list = from_color.get();    
    to_color_list = to_color.get();

    final_color_list = [];
    for (let i = 0; i < 4; i++){
        let diff = to_color_list[i] - from_color_list[i];
        let sign = Math.sign(diff);
        let mag = Math.min(Math.abs(diff), max_change);
        final_color_list[i] = Math.floor(from_color_list[i] + mag*sign);
    }
    return Color.fromRGBA(...final_color_list);
};


COLOR_CODE_BACKGROUND = Color.fromGray(30);
COLOR_CODE = Color.fromGray(204);
COLOR_CODE_BONDARY = Color.fromGray(10);
COLOR_WHITE_BACKGROUND = Color.fromGrayA(255, 200);
