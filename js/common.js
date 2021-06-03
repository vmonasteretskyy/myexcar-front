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

    // вирубаєм всі інпути якщо вибрали "всі бренди"
    $('.allcheck').change(function () {
        if ($(this).is(':checked')) {
            $(this).parents('.leftcatfilter-block').find('.selectimitation__checkrow input').not($(this)).prop('checked', false);
        }
    });
    // якщо вибитраєм модель то "всі бренди" вирубаємо
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



});