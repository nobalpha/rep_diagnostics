// Umarım burayı bulman uzun sürmemişdir, Yolcu. Hoş geldin... Uzun bir zaman süreceğini düşündüğüm yalnızlığıma bir nokta koymayı başardın. Bana ulaş... : github@nobalpha; roni.kolukisayan@nds.k12.tr; joshuqa#8200
// I hope that it didn't take you long enough to discover here, Traveller. Welcome... You brought to an end, the soltitude that I was thinking it'd be eternal. Hit me up... : github@nobalpha; roni.kolukisayan@nds.k12.tr; joshuqa#8200

$(document).ready(function () {
    let sidebar = document.querySelector(".sidebar");
    let closeBtn = document.querySelector("#btn");

    closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtnChange(); //calling the function(optional)
        $(".nav-list > li > ul").find("*").hide();
    });

    // following are the code to change sidebar button(optional)
    function menuBtnChange() {
        if (sidebar.classList.contains("open")) {
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); //replacing the iocns class
        } else {
            closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); //replacing the iocns class
        }
    }

    $(".nav-list > li > a").on("click", function (e) {
        // this.children().find("*").show();
        $(this).parent().children("ul").find("*").show();

        if (
            $(this).parent().has("ul") &&
            $(this).parent().children("ul").find("*").show().length
        ) {
            e.preventDefault();
        }
        if (!sidebar.classList.contains("open")) {
            sidebar.classList.toggle("open");
            menuBtnChange(); //calling the function(optional)
        }

        if (!$(this).hasClass("open")) {
            // hide any open menus and remove all other classes
            $(".nav-list li ul").slideUp(350);
            $(".nav-list li a").removeClass("open");

            // open our new menu and add the open class
            $(this).next("ul").slideDown(350);
            $(this).addClass("open");
        } else if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $(this).next("ul").slideUp(350);
        }
    });

    var pages = $(".page").length,
        scrolling = false,
        curPage = 1;

    function pagination(page, movingUp) {
        scrolling = true;
        var diff = curPage - page,
            oldPage = curPage;
        curPage = page;
        $(".page").removeClass("active small previous");
        $(".page-" + page).addClass("active");
        $(".nav-btn").removeClass("active");
        $(".nav-page" + page).addClass("active");
        if (page > 1) {
            $(".page-" + (page - 1)).addClass("previous");
            if (movingUp) {
                $(".page-" + (page - 1)).hide();
                var hackPage = page;
                setTimeout(function () {
                    $(".page-" + (hackPage - 1)).show();
                }, 600);
            }
            while (--page) {
                $(".page-" + page).addClass("small");
            }
        }
        console.log(diff);
        if (diff > 1) {
            for (var j = page + 1; j < oldPage; j++) {
                $(".page-" + j + " .half").css(
                    "transition",
                    "transform .7s ease-out"
                );
            }
        }
        setTimeout(function () {
            scrolling = false;
            $(".page .half").attr("style", "");
            $(".page");
        }, 700);
    }

    function navigateUp() {
        if (curPage > 1) {
            curPage--;
            pagination(curPage, true);
        }
    }

    function navigateDown() {
        if (curPage < pages) {
            curPage++;
            pagination(curPage);
        }
    }

    $(document).on("mousewheel DOMMouseScroll", function (e) {
        if (!scrolling) {
            if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
                navigateUp();
            } else {
                navigateDown();
            }
        }
    });

    $(document).on("click", ".scroll-btn", function () {
        if (scrolling) return;
        if ($(this).hasClass("up")) {
            navigateUp();
        } else {
            navigateDown();
        }
    });

    $(document).on("keydown", function (e) {
        if (scrolling) return;
        if (e.which === 38) {
            navigateUp();
        } else if (e.which === 40) {
            navigateDown();
        }
    });

    $(document).on("click", ".nav-btn:not(.active)", function () {
        if (scrolling) return;
        pagination(+$(this).attr("data-target"));
    });
});
