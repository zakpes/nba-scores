(function ($) {

    // navbar toggle hamburger menu btn X
    $(".navbar-toggle").mouseenter(function() {
        $(".icon-bar").css("background-color", "#ccc");
    }).mouseleave(function () {
        $(".icon-bar").css("background-color", "#fff");
    });

    // navbar toggle hamburger menu btn X
    $(".navbar-toggle").click(function() {
        $(".bar-top").toggleClass("bar-top-x");
        $(".bar-mid").toggleClass("bar-mid-x");
        $(".bar-bot").toggleClass("bar-bot-x");
    });

})(jQuery);

// const tableToday = document.querySelector("#tableToday");
// const tableYesterday = document.querySelector("#tableYesterday");
// const tdDate = document.querySelector(".date");

// document.addEventListener("DOMContentLoaded", createBtn);

// function createBtn() {

//     console.log("document loaded");

    
//         console.log("div created");

//         let emptyBtn = document.createElement("a");
//         emptyBtn.className = "link-prev";
//         emptyBtn.id = "btnPrev";
//         tdDate.append(emptyBtn);
    
// }

// document.addEventListener("DOMContentLoaded", function () {
//     const btnPrev = document.querySelector("#btnPrev");
//     btnPrev.addEventListener("click", () => {

//         tableToday.classList.add("hide");
//         tableYesterday.classList.remove("hide");
//     });
// });

