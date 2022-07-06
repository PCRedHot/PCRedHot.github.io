function loadInitPages() {
    pages.push(new Page('Hi', font_text, PAGE_WIDTH, PAGE_HEIGHT));
    pages.push(new Page('開始之前要比你知道\n你輸入既資料係\n*唔會*被伺服器儲存', font_text, PAGE_WIDTH, PAGE_HEIGHT));
    pages.push(
        new Page('所以可以放心\n明白就係下面輸入\"yes\"', font_text, PAGE_WIDTH, PAGE_HEIGHT)
            .setOnInputCallback((page, v) => {
                if (v.toLowerCase() == "yes") {
                    page.done = true;
                    loadAskName();
                    Page.nextPage();
                }
            })
    );
}


bg_color1 = Color.fromRGBA(30, 215, 96, 200);

function loadAskName(){
    pages.push(new Page('歡迎你使用Zinder\n全港唯一\n同呢本小誌個作者\n做朋友既交友小誌', font_text, PAGE_WIDTH, PAGE_HEIGHT))
    pages.push(new Page('我係Parry\n你叫咩名呀?', font_text, PAGE_WIDTH, PAGE_HEIGHT)
        .setOnInputCallback((page, v) => {
            state['name'] = v;
            page.done = true;
            pages.push(new Page(`Nice to meet you, ${state['name']}`, font_text, PAGE_WIDTH, PAGE_HEIGHT).setBackgroundColor(bg_color1));
            pages.push(new Page('問多你一個問題', font_text, PAGE_WIDTH, PAGE_HEIGHT).setBackgroundColor(bg_color1));
            loadAskSpotify();
            Page.nextPage();
        })
        .setBackgroundColor(bg_color1)
    );
}

function loadAskSpotify() {
    
    pages.push(
        new Page('你呢部手機有冇Spotify App?\n請輸入\"yes\"/\"no\"', font_text, PAGE_WIDTH, PAGE_HEIGHT)
            .setBackgroundColor(bg_color1)
            .setOnInputCallback((page, v) => {
                switch (v.toLowerCase()) {
                    case "yes":
                        state['spotify'] = true;
                        break;
                    case "no":
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
    window.open('spotify:track:0dbKKEitEKGPpgY7qOFwpe');
    setTimeout()
}

