(function() {

    // 定数
    var WEB_WORKS_COUNT = 13,
        IMG_WORKS_COUNT = 4;


    // Portfolio - #webworks
    var createWebWorksList = function () {
        
        var ul = document.createElement('ul');

        var range = document.createRange();
        range.selectNodeContents(document.body);

        for (i = 0; i < WEB_WORKS_COUNT; i++) {

            // 消したい作品を応急処置的に消す
            if(i !== 6 && i !== 10) {
                var m = WEB_WORKS_COUNT - i,
                    li = document.createElement('li');
                
                var txt = '<a href="works/works' + [m] + '.html">'
                        + '<img src="img/thumbnail/' +[m]+ '_rollout.jpg" width="138" height="138" />'
                        + '</a>';

                li.appendChild(range.createContextualFragment(txt));
                ul.appendChild(li);
            }
        }

        document.getElementById('webworks').appendChild(ul);
    }

    // Portfolio - #otherWorks
    var createOtherWorksList = function () {
        
        var ul = document.createElement('ul');
        
        var range = document.createRange();
        range.selectNodeContents(document.body);

        // 最初のひとつのみhtmlページへリンク
        var li = document.createElement('li');
        var txt = '<a href="works/others1.html"><img src="img/thumbnail/o1_rollout.jpg" width="138" height="138" /></a>';
        li.appendChild(range.createContextualFragment(txt));
        ul.appendChild(li);

        for (i = 0; i < IMG_WORKS_COUNT; i++) {
            var m = IMG_WORKS_COUNT - i,
                li = document.createElement('li');
            
            var txt = '<a href="img/others/img' + [m] + '.jpg" rel="lightbox">'
                    + '<img src="img/thumbnail/i' +[m]+ '_rollout.jpg" width="138" height="138" />'
                    + '</a>';

            li.appendChild(range.createContextualFragment(txt));
            ul.appendChild(li);
        }

        document.getElementById('otherworks').appendChild(ul);
    }

    //init
    document.addEventListener('DOMContentLoaded', function() {

        createWebWorksList();
        createOtherWorksList();
        
    })

})();

