"use strict";

// WAIPOINTS NAV SCROLL

function wayPointsNavScroll() {
    var scrollTop = $(document).scrollTop(),
        headerH = $('header').innerHeight();

    $('.main-nav a').each(function () {
        var hash = $(this).attr('href'),
            target = $(hash);

        if (target.position().top <= scrollTop + headerH) {
            $('.main-nav a.main-nav--active').removeClass('main-nav--active');
            $(this).addClass('main-nav--active');
        } else {
            $(this).not(':first-child').removeClass('main-nav--active');
        }
    });
}

// WAYPOINTS NAV CLICK
function wayPointsNavClick() {
    var headerH = $('header').innerHeight();

    $('a[href^="#"]').click(function (e) {
        e.preventDefault();
        $(document).off('scroll');

        $('.main-nav a.active').removeClass('main-nav--active');
        $(this).addClass('main-nav--active');

        var hash = $(this).attr('href'),
            target = $(hash);

        $('html, body').animate({
            scrollTop: target.offset().top - headerH
        }, 500, function () {
            $(document).on('scroll', wayPointsNavScroll);
        });
    });
}

// STYLE SELECT 
function styleSelect() {
    if ($('.select-style').length) {
        $('.select-style select').selectric({
            maxHeight: 245,
            responsive: true,
            disableOnMobile: false,

            onOpen: function onOpen() {
                $('.selectric-scroll').slimScroll({
                    height: 'auto',
                    alwaysVisible: true,
                    color: '#D9D9D9',
                    railVisible: false,
                    distance: '6px',
                    size: '4px'
                });

                $('.slimScrollBar').css({
                    'opacity': 1,
                    'border-radius': '3px'
                });
            },

            onInit: function onInit() {
                $('.select-style').css('opacity', 1);

                if ($('.selectric-items li[data-index=0]').hasClass('selected')) {
                    $('.selectric').addClass('selectric-style');
                } else {
                    $('.selectric').removeClass('selectric-style');
                }
            },

            onChange: function onChange() {
                if ($('.selectric-items li[data-index=0]').hasClass('selected')) {
                    $('.selectric').addClass('selectric-style');
                } else {
                    $('.selectric').removeClass('selectric-style');
                }
            }
        });
    }
}

// RANGE SLIDER
function rangeSlider() {
    $('#rangeslider').ionRangeSlider({
        grid: true,
        values: ['Не владею', 'Использую готовые решения', 'Использую готовые решения и умею и переделывать', 'Пишу сложный JS с нуля'],
        min: 0,
        max: 3,
        from: 2,
        hide_min_max: true,
        hide_from_to: true
    });
}

// BLOCKS POSITION
function blocksPos() {
    if (window.innerWidth > 767) {
        $('.header__add').before($('.main-nav'));
    }

    if (window.innerWidth <= 767) {
        $('.header__add').prepend($('.main-nav'));
    }
}

// TOGGLE CONTENT
function toggleContent() {
    document.onclick = function (e) {
        var target = e.target,
            toggleBtn = document.querySelector('.toggle-main-nav'),
            toggleBtnEl = document.querySelectorAll('.toggle-main-nav i'),
            nav = document.querySelector('.main-nav');

        for (var i = 0; i < toggleBtnEl.length; i++) {
            if (target == toggleBtnEl[i]) {
                toggleBtn.classList.toggle('toggle-main-nav--close');
                nav.classList.toggle('main-nav--show');
            }
        }

        if (target == toggleBtn) {
            toggleBtn.classList.toggle('toggle-main-nav--close');
            nav.classList.toggle('main-nav--show');
        }

        if (!target.closest('.header__add')) {
            toggleBtn.classList.remove('toggle-main-nav--close');
            nav.classList.remove('main-nav--show');
        }
    };
}

// FORM STYLES
function formStyles() {
    $('.questionnaire-form__float-label textarea').focus(function () {
        $(this).addClass('style-3');
    }).blur(function () {
        if ($(this).val() == '') $(this).removeClass('style-3');
    });
}

// BUTTON BACK TO TOP
function backToTop() {
    if ($('.back-top').length) {
        $('.back-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 700);
            return false;
        });
    }
}

// DETECT SAFARI BROWSER
(function () {
    var isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);

    if (isSafari) {
        document.querySelector('html').classList.add('safari-styles');
    }
})();

///////////////////////////////////////////

$(function () {
    wayPointsNavClick();
    styleSelect();
    rangeSlider();
    blocksPos();
    formStyles();
    toggleContent();
    backToTop();
}); /* End ready */

$(window).resize(function () {
    blocksPos();
    backToTop();
});

$(window).load(function () {});

$(window).scroll(function () {
    wayPointsNavScroll();

    if ($(this).scrollTop() > 100) {
        $('.back-top').fadeIn(250);
    } else {
        $('.back-top').fadeOut(250);
    }
});

window.addEventListener('orientationchange', function () {
    location.reload();
});