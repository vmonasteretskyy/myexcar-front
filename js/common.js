$(document).ready(function () {
    // parallax
    if ($('body *').is('#scene')) {
        var scene = document.getElementById('scene');
        var parallaxInstance = new Parallax(scene);
    }

    // accordeon plus minus

    $('.accordeon-title').click(function () {
        $('.accordeon-title').not($(this)).removeClass('minus');
        $(this).toggleClass('minus');
    });

    // to top
    $('.totop, .foottotop').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });

    // tablet slider index page
    if ($('body *').is('.servicesdark__slider')) {
        function mobileOnlySlider() {
            $('.servicesdark__slider').slick({
                infinite: true,
                speed: 700,
                slidesToShow: 1,
                variableWidth: true,
                dots: false,
                nextArrow: '<button type="button" class="slick-next"></button>',
                prevArrow: '<button type="button" class="slick-prev"></button>',
                responsive: [{
                    breakpoint: 1024,
                    settings: {},
                    breakpoint: 576,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 1,
                    }
                }]
            });
        }

        if (window.innerWidth > 1200) {
            mobileOnlySlider();
        }

        if (window.innerWidth < 1200) {
            if (!$('.servicesdark__slider').hasClass('slick-initialized')) {
                mobileOnlySlider();
            }

        } else {
            if ($('.servicesdark__slider').hasClass('slick-initialized')) {
                $('.servicesdark__slider').slick('unslick');
            }
        }

        $(window).resize(function (e) {
            if (window.innerWidth < 1200) {
                if (!$('.servicesdark__slider').hasClass('slick-initialized')) {
                    mobileOnlySlider();
                }

            } else {
                if ($('.servicesdark__slider').hasClass('slick-initialized')) {
                    $('.servicesdark__slider').slick('unslick');
                }
            }
        });
    }


    // mob menu

    $('.burgericon').click(function () {
        $('.mobile-menu').addClass('show');
    });
    $('.closemenu').click(function () {
        $('.mobile-menu').removeClass('show');
    });

    // custom selects

    if ($('body *').is('select')) {
        $(function () {
            $('select').styler();
        });
    }

    // RANGE SLIDER
    if ($('body *').is('#slider-range')) {
        $('.noUi-handle').on('click', function () {
            $(this).width(50);
        });
        var rangeSlider = document.getElementById('slider-range');
        var moneyFormat = wNumb({
            decimals: 0,
            thousand: ',',
            prefix: '$ '
        });
        noUiSlider.create(rangeSlider, {
            start: [5000, 200000],
            step: 1,
            range: {
                'min': [5000],
                'max': [200000]
            },
            format: moneyFormat,
            connect: true
        });




        // Set visual min and max values and also update value hidden form inputs
        rangeSlider.noUiSlider.on('update', function (values, handle) {
            document.getElementById('slider-range-value1').innerHTML = values[0];
            document.getElementById('slider-range-value2').innerHTML = values[1];
            document.getElementsByName('min-value').value = moneyFormat.from(
                values[0]);
            document.getElementsByName('max-value').value = moneyFormat.from(
                values[1]);
        });
    }

    // catalog selects
    $('.selectimitation__selitem').click(function () {
        $('.selectimitation__sellist').not($(this).next('.selectimitation__sellist')).hide();
        $('.selectimitation__selitem').not($(this)).removeClass('open');
        $(this).toggleClass('open');
        $(this).next('.selectimitation__sellist').toggle();
    });

    $(document).click(function (event) {
        let $target = $(event.target);
        if (!$target.closest('.selectimitation').length) {
            $('.selectimitation__sellist').hide();
            $('.selectimitation__selitem').removeClass('open');
        }
    });

    // ???????????????? ?????? ???????????? ???????? ?????????????? "?????? ????????????"
    $('.allcheck').change(function () {
        if ($(this).is(':checked')) {
            $(this).parents('.leftcatfilter-block').find('.selectimitation__checkrow input').not($(this)).prop('checked', false);
        }
    });
    // ???????? ?????????????????? ???????????? ???? "?????? ????????????" ??????????????????
    $('.selectimitation__checkrow input:not(.allcheck)').change(function () {
        if ($(this).is(':checked')) {
            $(this).parents('.leftcatfilter-block').find('.selectimitation__checkrow input.allcheck').not($(this)).prop('checked', false);
        }
    });



    // catalog labels remove
    $('.choseditem:not(.clearall) span').click(function () {
        $(this).parent().remove();
    });
    $('.choseditem.clearall span').click(function () {
        $(this).parents('.choseditems').remove();
    });

    // catalog filter hide\show

    $('.filterbtn').click(function () {
        $('.filterside').addClass('show');
    });

    $('.closefilter').click(function () {
        $('.filterside').removeClass('show');
    });

    $(document).click(function (e) {
        let $target = $(e.target);
        if (!$target.closest('.leftcatfilter').length && !$target.closest('.filterbtn').length) {
            $('.filterside').removeClass('show');
        }
    });

    // catalog - row - col
    $('.torow').click(function () {
        $(this).addClass('active');
        $('.tocol').removeClass('active');
        $('.catproductssect').removeClass('colstructure');

    });

    $('.tocol').click(function () {
        $(this).addClass('active');
        $('.torow').removeClass('active');
        $('.catproductssect').addClass('colstructure');
    });

    // PRODUCT slider

    var $status = $('.procard__mainsliderwrapp .pagingInfo');
    var $slickElement = $('.procard__mainsliderwrapp .procard__mainslider');

    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        if (slick.slideCount < 10) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.text('0' + i + ' | 0' + slick.slideCount);
        } else {
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.text(i + ' | ' + slick.slideCount);
        }

    });

    $slickElement.slick({
        dots: false,
        infinite: false,
        speed: 2500,
        prevArrow: '<button type="button" class="slick-prev"></button>',
        nextArrow: '<button type="button" class="slick-next"></button>',
        // autoplay: true,
        autoplaySpeed: 4000,
        pauseOnFocus: false,
        pauseOnHover: false,
        speed: 1200,
        arrows: true,
        asNavFor: '.procard__littslider'
    });

    $('.procard__littslider').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        asNavFor: '.procard__mainsliderwrapp .procard__mainslider',
        dots: false,
        centerMode: false,
        focusOnSelect: true,
        arrows: false,
        infinite: false,
        variableWidth: true
    });

    $('.procard__showphotos').click(function () {
        $(this).toggleClass('openslides');
        $('.overflowhiddsect').toggleClass('h-auto');
    });

    // main page - header scroll links

    // header__mainpage

    $(".header__mainpage").on("click", ".scrollpage a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 1000);
    });

    $(".mobmenulist").on("click", ".scrollpage a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 1000);
    });

    $('.mobmenulist li.scrollpage').click(function () {
        $('.mobile-menu').removeClass('show');
    });

    // Timer
    if ($('body *').is('#clockdiv')) {
        function getTimeRemaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor((t / (1000 * 60 * 60 * 24)) % 7);
            var weeks = Math.floor(t / (1000 * 60 * 60 * 24 * 7));
            return {
                'total': t,
                'weeks': weeks,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        function initializeClock(id, endtime) {
            var clock = document.getElementById(id);
            var weeksSpan = clock.querySelector('.weeks');
            var daysSpan = clock.querySelector('.days');
            var hoursSpan = clock.querySelector('.hours');
            var minutesSpan = clock.querySelector('.minutes');
            var secondsSpan = clock.querySelector('.seconds');

            function updateClock() {
                var t = getTimeRemaining(endtime);
                weeksSpan.innerHTML = t.weeks;
                daysSpan.innerHTML = t.days;
                hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
                minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
                secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

                if (t.total <= 0) {
                    clearInterval(timeinterval);
                }
            }

            updateClock();
            var timeinterval = setInterval(updateClock, 1000);
        }

        var deadline = new Date(Date.parse(new Date()) + 8 * 24 * 60 * 60 * 1000);
        initializeClock('clockdiv', deadline);
    }

    // input mask

    if ($('body *').is('.numinp')) {
        // $('.numinp').inputmask("999999999");

        $('.numinp').inputmask({
            mask: '999999999999',
            placeholder: ' ',
            showMaskOnHover: false,
            showMaskOnFocus: false,
        });
    }



});