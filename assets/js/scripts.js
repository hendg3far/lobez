$(document).ready(function () {

    // Swiper Instance: .swiper--1
    document.querySelectorAll('.swiper--1').forEach(swiperEl => {
        const parent = swiperEl.closest('.swiper-container-wrapper');
        const nextBtn = parent.querySelector('.swiper-button-next');
        const prevBtn = parent.querySelector('.swiper-button-prev');

        new Swiper(swiperEl, {
            slidesPerView: 1,
            navigation: { nextEl: nextBtn, prevEl: prevBtn },
        });
    });

    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    });
    var swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        navigation: false,
        thumbs: {
            swiper: swiper,
        },
    });

    const upButton = document.querySelector(".swiper-button-up");
    const downButton = document.querySelector(".swiper-button-down");

    function updateNavButtons(swiper) {
        // swiper = thumbsSwiper here
        if (swiper.isBeginning) {
            upButton.style.display = "none";
        } else {
            upButton.style.display = "flex";
        }

        if (swiper.isEnd) {
            downButton.style.display = "none";
        } else {
            downButton.style.display = "flex";
        }
    }

    const thumbsSwiper = new Swiper(".thumbs-swiper", {
        direction: 'vertical',
        spaceBetween: 10,
        slidesPerView: 6,
        freeMode: true,
        watchSlidesProgress: true,
        on: {
            init: (swiper) => updateNavButtons(swiper),
            slideChange: (swiper) => updateNavButtons(swiper),
            reachBeginning: (swiper) => updateNavButtons(swiper),
            reachEnd: (swiper) => updateNavButtons(swiper),
            fromEdge: (swiper) => updateNavButtons(swiper),
        }
    });

    const mainSwiper = new Swiper(".main-swiper", {
        effect: "fade",
        fadeEffect: { crossFade: true },
        thumbs: {
            swiper: thumbsSwiper,
        },
        on: {
            slideChange: function () {
                // Pause all videos
                const videos = document.querySelectorAll(".main-swiper video");
                videos.forEach(video => {
                    video.pause();
                    video.currentTime = 0;  // reset to start if you want
                });

                // Play the video in the active slide
                const activeSlide = this.slides[this.activeIndex];
                const activeVideo = activeSlide.querySelector("video");
                if (activeVideo) {
                    activeVideo.play();
                }
            }
        }
    });


    // Button controls
    upButton.addEventListener("click", () => thumbsSwiper.slidePrev());
    downButton.addEventListener("click", () => thumbsSwiper.slideNext());


    $(".btn-main").on("mouseenter", function (e) {
        const x = e.pageX - $(this).offset().left;
        const y = e.pageY - $(this).offset().top;
        $(this).find(".tp-btn-circle-dot").css({ top: y, left: x });
    });

    $(".btn-main").on("mouseout", function (e) {
        const x = e.pageX - $(this).offset().left;
        const y = e.pageY - $(this).offset().top;
        $(this).find(".circle-dot").css({ top: y, left: x });
    });

    var masonryGrids = document.querySelectorAll('.masonry');
    masonryGrids.forEach(function (masonryGrid) {
        imagesLoaded(masonryGrid, function () {
            new Masonry(masonryGrid, {
                itemSelector: '.masonry-item',
                percentPosition: true,
            });
        });
    });

    var minVal = 1,
        maxVal = 20;
    $(".increaseQty").on('click', function () {
        var $parentElm = $(this).parents(".qtySelector");
        $(this).addClass("clicked");
        setTimeout(function () {
            $(".clicked").removeClass("clicked");
        }, 100);
        var value = $parentElm.find(".qtyValue").val();
        if (value < maxVal) {
            value++;
        }
        $parentElm.find(".qtyValue").val(value);
    });
    // Decrease product quantity on cart page
    $(".decreaseQty").on('click', function () {
        var $parentElm = $(this).parents(".qtySelector");
        $(this).addClass("clicked");
        setTimeout(function () {
            $(".clicked").removeClass("clicked");
        }, 100);
        var value = $parentElm.find(".qtyValue").val();
        if (value > 1) {
            value--;
        }
        $parentElm.find(".qtyValue").val(value);
    });


})

document.addEventListener("DOMContentLoaded", function () {
    const cod = document.getElementById("cashOnDelivery");
    const payment = document.getElementById("payment");
    if (cod && payment) {
        cod.addEventListener("click", () => payment.classList.remove("show"));
    }

    // Toggle visibility by checkboxes
    document.querySelectorAll(".toggle-control").forEach(input => {
        input.addEventListener("change", function () {
            const targetSelector = this.dataset.toggleTarget;
            if (targetSelector) {
                document.querySelectorAll(targetSelector).forEach(target => {
                    target.style.display = this.checked && this.id.includes("Yes") ? "block" : "none";
                });
            }
        });

        if (input.checked) input.dispatchEvent(new Event("change"));
    });

})