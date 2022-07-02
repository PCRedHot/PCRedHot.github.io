function loadInitPages() {
    pages.push(new Page('Hi\n我係Parry', COLOR_WHITE_BACKGROUND, font_text, PAGE_WIDTH, PAGE_HEIGHT));
    pages.push(new Page('多謝你打開呢本書', COLOR_WHITE_BACKGROUND, font_text, PAGE_WIDTH, PAGE_HEIGHT));
    pages.push(new Page('開始之前要比你知道\n你輸入既資料係\n*唔會*被伺服器儲存', COLOR_WHITE_BACKGROUND, font_text, PAGE_WIDTH, PAGE_HEIGHT));
    pages.push(
        new Page('所以可以放心\n明白就係下面輸入\"YES\"', COLOR_WHITE_BACKGROUND, font_text, PAGE_WIDTH, PAGE_HEIGHT)
            .setOnInputCallback((page, v) => {
                if (v == "YES") {
                    page.done = true;
                    loadAskSpotify();
                    Page.nextPage();
                }
            })
    );
}

function loadAskSpotify() {
    pages.push(new Page('NICE\n問多你一個問題', COLOR_WHITE_BACKGROUND, font_text, PAGE_WIDTH, PAGE_HEIGHT));
    pages.push(
        new Page('你呢部手機有冇Spotify App?\n請輸入\"YES\"/\"NO\"', COLOR_WHITE_BACKGROUND, font_text, PAGE_WIDTH, PAGE_HEIGHT)
            .setOnInputCallback((page, v) => {
                switch (v) {
                    case "YES":
                        state['spotify'] = true;
                        break;
                    case "NO":
                        state['spotify'] = false;
                        break;
                    default:
                        return;
                }
                page.done = true;
                loadStartPages();
                Page.nextPage();
            })
    );    
}

function loadStartPages() {

}

