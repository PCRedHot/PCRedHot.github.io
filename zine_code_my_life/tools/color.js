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



COLOR_CODE_BACKGROUND = Color.fromGray(30);
COLOR_CODE = Color.fromGray(204);
COLOR_CODE_BONDARY = Color.fromGray(10);
COLOR_WHITE_BACKGROUND = Color.fromGray(255);
