// ==UserScript==
// @name        LDR Title Only Mode
// @description Livedoor reader: press "t" to hide everything but titles
// @version     1.0
// @namespace   http://www.vzvu3k6k.tk/
// @homepage    https://github.com/vzvu3k6k/LDR-Title-Only-Mode
// @match       http://reader.livedoor.com/reader/*
// @license     public domain
// ==/UserScript==

GM_addStyle(".title_only .item .item_info," +
            ".title_only .item .item_body," +
            ".title_only .item .item_footer {" +
            "    display: none;" +
            "}" +

            ".title_only .item .item_title {" +
            "    font-size: 100% !important;" +
            "    font-weight: normal;" +
            "    padding: 5px !important;" +
            "}" +

            ".title_only .item {" +
            "    border-bottom: none !important;" +
            "}" +

            ".title_only .padding {" +
            "    border: none !important;" +
            "}");

var main = function(){
    /* ショートカットキーの設定 */
    const TITLE_ONLY_KEY = "t";
    
    register_hook("AFTER_INIT", function(){

        /* if(mode === undefined) -> toggle
           if(mode == true)       -> title_only_mode on
           if(mode == false)      -> title_only_mode off
           if(quiet == true)      -> doesn't show a message */
        Control.title_only = function(mode, quiet){
            var subids = JSON.parse(localStorage.getItem("title_only_subids")) || {};
            var item = get_active_item();
            var feed = get_active_feed();

            if(mode !== undefined){
                (mode ? addClass : removeClass)("right_body", "title_only");
            }else{
                toggleClass("right_body", "title_only");
            }

            if(contain($("right_body").className, "title_only")){
                if(!quiet)
                    message("タイトル以外を非表示にしました。" + TITLE_ONLY_KEY + "で元に戻ります");
                subids[feed.subscribe_id] = 1;
            }else{
                if(!quiet)
                    message("タイトル以外の非表示を解除しました。" + TITLE_ONLY_KEY + "で非表示に戻ります");
                delete subids[feed.subscribe_id];
            }

            Control.scroll_to_offset(item);
            localStorage.setItem("title_only_subids", Object.toJSON(subids));
        };

        Keybind.add(TITLE_ONLY_KEY, function(){
            Control.title_only();
        });
    });

    register_hook("AFTER_PRINTFEED", function(){
        var subids = JSON.parse(localStorage.getItem("title_only_subids")) || {};
        Control.title_only(!!subids[get_active_feed().subscribe_id], true);
    });
};

location.href = "javascript:void (" + main + ")()";