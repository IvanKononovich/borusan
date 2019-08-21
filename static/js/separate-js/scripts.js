//'use strict';

$(function() {

    /*
    |--------------------------------------------------------------------------
    | Sticky Kit
    |--------------------------------------------------------------------------
    */

    if(window.matchMedia('(min-width: 992px)').matches) {
        $(".jsStickyMenu").stick_in_parent({
            offset_top: 70,
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Sticky Header
    |--------------------------------------------------------------------------
    */

    var fixedBlocks = document.querySelectorAll('.sticky');

    function positionCalculation(index){
        var posTop = 0;
        for(var i = index; i > -1; i--){
            posTop += fixedBlocks[i].getBoundingClientRect().height;
        }
        return posTop;
    }

    function neighborHeight(i){
        if(i > 0){
            return fixedBlocks[i-1].getBoundingClientRect().top + fixedBlocks[i-1].getBoundingClientRect().height;
        }
        return 0;
    }

    function positionDetermination(){
        for(var i = 0; i < fixedBlocks.length; i++){
            if(fixedBlocks[i].getBoundingClientRect().top + window.pageYOffset  <= window.pageYOffset + neighborHeight(i)){
                if(!fixedBlocks[i].spacer){
                    fixedBlocks[i].spacer = document.createElement('div');
                    fixedBlocks[i].spacer.style.position = 'static';
                    fixedBlocks[i].spacer.style.width = fixedBlocks[i].getBoundingClientRect().width + 'px';
                    fixedBlocks[i].spacer.style.height = fixedBlocks[i].getBoundingClientRect().height + 'px';
                    fixedBlocks[i].spacer.style.display = 'block';
                    fixedBlocks[i].spacer.style.verticalAlign = 'baseline';
                    fixedBlocks[i].spacer.style.float = 'none';

                    fixedBlocks[i].parentNode.insertBefore(fixedBlocks[i].spacer, fixedBlocks[i]);
                }

                fixedBlocks[i].classList.add(fixedBlocks[i].dataset.classFixed);
                if(i > 0){
                    fixedBlocks[i].style.top =  positionCalculation(i-1) + 'px';
                }

                if(fixedBlocks[i].getBoundingClientRect().top <= fixedBlocks[i].spacer.getBoundingClientRect().top){
                    fixedBlocks[i].parentNode.removeChild(fixedBlocks[i].spacer);
                    fixedBlocks[i].classList.remove(fixedBlocks[i].dataset.classFixed);
                    fixedBlocks[i].spacer = null;
                }
            }
        };
    };

    positionDetermination();

    document.addEventListener('scroll', function(){
        positionDetermination();
    });

    /*
    |--------------------------------------------------------------------------
    | Beer Slider
    |--------------------------------------------------------------------------
    */

    $.fn.BeerSlider = function ( options ) {
        options = options || {};
        return this.each(function() {
            new BeerSlider(this, options);
        });
    };

    $('.beer-slider').BeerSlider({
        prefix: 'beer'
    });

    var jsBeerSlider = document.querySelector('.jsBeerSlider');
    if(jsBeerSlider) {
        var beerHandle = jsBeerSlider.querySelector('.beer-handle');

        function drawingBeerHandle() {
            var textFrom = jsBeerSlider.dataset.textFrom;
            var textTo= jsBeerSlider.dataset.textTo;
            beerHandle.innerHTML += "<div class='beer-slider__text'><span class='beer-slider__label'>"+textFrom+"</span><span class='beer-slider__label'>"+textTo+"</span></div>";
        }

        drawingBeerHandle();
    }

    /*
    |--------------------------------------------------------------------------
    | Ion Range Slider
    |--------------------------------------------------------------------------
    */

    $(".jsRangeFilters").ionRangeSlider({
        type: "double",
        values_separator: " to ",
        min: 0,
        max: 1000,
        from: 400,
        to: 600,
        drag_interval: true,
        min_interval: null,
        max_interval: null,
    })

    var jsFilterProgressbar = document.querySelectorAll('.jsFilterProgressbar');

    function drawingText(el, text, className) {
        var str = el.innerHTML.replace(/\d+/gi, '');
        str = str.replace(/ /gi, '');
        if(str !== text) el.innerHTML += text;
        if(!el.classList.contains(className)) el.classList.add(className);
    }

    function drawingElements() {
        for(var i = 0; i < jsFilterProgressbar.length; i++) {
            // вставьте вместо class нужный вам класс для стилизации
            var el = jsFilterProgressbar[i];

            var from = el.querySelector('.from');
            from.innerHTML = '';
            drawingText(from, el.dataset.from, 'class');

            var to = el.querySelector('.to');
            to.innerHTML = '';
            drawingText(to, el.dataset.to, 'class');

            var irsFrom = el.querySelector('.irs-from');
            drawingText(irsFrom, el.dataset.fromText, 'class');

            var irsTo = el.querySelector('.irs-to');
            drawingText(irsTo, el.dataset.toText, 'class');

            var irsSingle = el.querySelector('.irs-single');
            var str = irsSingle.innerHTML.split(' ');
            str[1] = el.dataset.fromText;
            str[3] = el.dataset.toText;

            irsSingle.innerHTML = str.join(' ');
        }

        requestAnimationFrame(drawingElements);
    }

    document.addEventListener('mousedown', drawingElements);
    document.addEventListener('touchstart', drawingElements);

    drawingElements();

    /*
    |--------------------------------------------------------------------------
    | Wow Js
    |--------------------------------------------------------------------------
    */

    var wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            callback:     function(box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null,    // optional scroll container selector, otherwise use window,
            resetAnimation: true,     // reset animation on end (default is true)
        }
    );
    wow.init();

    /*
    |--------------------------------------------------------------------------
    | Go Top
    |--------------------------------------------------------------------------
    */

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1000) {
            $('.go-top').addClass('-visible');
        } else {
            $('.go-top').removeClass('-visible');
        }
        $('.go-top').smoothScroll({
            speed: 900,
            scrollTarget: 'body',
            easing: 'swing'
        });
    });

    /*
    |--------------------------------------------------------------------------
    | Mobile menu
    |--------------------------------------------------------------------------
    */

    $('.jsMenuTrigger').click(function() {
        $(this).toggleClass('-open');
        $('.m-menu').toggleClass('-show');
        if ($(this).hasClass('-open')) {
            $('body').css({"overflow": "hidden"});
        } else {
            $('body').css({"overflow": ""});
        }
    });

    /*
    |--------------------------------------------------------------------------
    | Responsive iframe inside bootstrap modal
    |--------------------------------------------------------------------------
    */

    let iframeModal = document.getElementById('iframe-modal');
    let iframeModalItem = iframeModal.querySelector('.jsBmEmbedItem');

    document.addEventListener('click', function(e){
        if(e.target.classList.contains('jsBmButton')){
            let dataVideo = {
                'src': e.target.getAttribute('data-bmSrc'),
                //'height': e.target.getAttribute('data-bmHeight'),
                //'width': e.target.getAttribute('data-bmWidth')
            };

            for(let key in dataVideo){
                iframeModalItem.setAttribute(key, dataVideo[key]);
            };

            $('#iframe-modal').on('hidden.bs.modal', function(){
                iframeModalItem.innerHTML = '';
                iframeModalItem.setAttribute("src", "");
            });
        }
    });

    /*
    |--------------------------------------------------------------------------
    | Smooth Scroll
    |--------------------------------------------------------------------------
    */

    $('.jsPageScroll').on('click', function(event) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            let target = $(this.hash),
                speed = $(this).data("speed") || 800;
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 0
                }, speed);
            }
        }
    });

    /*
    |--------------------------------------------------------------------------
    | Spoiler Text
    |--------------------------------------------------------------------------
    */

    let containerHeight = document.querySelectorAll(".jsSpoilerInner");
    let uncoverLink = document.querySelectorAll(".jsSpoilerMore");

    for(let i = 0; i < containerHeight.length; i++){
        let openData = uncoverLink[i].dataset.open;
        let closeData = uncoverLink[i].dataset.close;
        let curHeight = containerHeight[i].dataset.height;

        uncoverLink[i].innerHTML = openData;
        containerHeight[i].style.maxHeight = curHeight + "px";

        uncoverLink[i].addEventListener("click", function(){
            if(containerHeight[i].classList.contains("-open")){

                containerHeight[i].classList.remove("-open");

                uncoverLink[i].innerHTML = openData;

                containerHeight[i].style.maxHeight = curHeight + "px";

            } else {
                containerHeight[i].removeAttribute("style");

                containerHeight[i].classList.add("-open");

                uncoverLink[i].innerHTML = closeData;

            }
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Playlist Vertical
    |--------------------------------------------------------------------------
    */
    let playlistVertical = new Swiper('.jsPlaylistVertical', {
        speed: 200,
        mousewheel: true,
        loop: false,
        slidesPerView: 'auto',
        freeMode: true,
        spaceBetween: 10,
        direction: 'vertical',
    });

    /*
    |--------------------------------------------------------------------------
    | Playlist Horizontal
    |--------------------------------------------------------------------------
    */

    let playlistHorizontal = new Swiper('.jsPlaylistHorizontal', {
        speed: 200,
        mousewheel: true,
        spaceBetween: 10,
        loop: false,
        scrollbar: {
            el: '.jsPlaylistScrollbar',
            hide: true,
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
            },
            1000: {
                slidesPerView: 2,
            },
            800: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 2,
            }
        }
    });

    /*
    |--------------------------------------------------------------------------
    | Entry Slider
    |--------------------------------------------------------------------------
    */

	let entrySlider = new Swiper('.jsEntrySlider', {
		speed: 1200,
		mousewheel: false,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		spaceBetween: 0,
		navigation: {
			nextEl: '.jsEntryNext',
			prevEl: '.jsEntryPrev',
		},
        pagination: {
            el: '.jsEntryPagination',
            clickable: true,
        },
		slidesPerView: 1,
	});

    /*
    |--------------------------------------------------------------------------
    | History Slider
    |--------------------------------------------------------------------------
    */

    let historySlider = new Swiper('.jsHistorySlider', {
        speed: 1200,
        mousewheel: false,
        loop: true,
        spaceBetween: 0,
        navigation: {
            nextEl: '.jsHistoryNext',
            prevEl: '.jsHistoryPrev',
        },
        pagination: {
            el: '.jsHistoryPagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<div class="' + className + '">' + '<span>' + '</span>' + (labels[index])+ '</div>';
            },
            bulletClass: 'history__pagination-item',
            bulletActiveClass: '-active',
        },
        slidesPerView: 1,
    });

    /*
    |--------------------------------------------------------------------------
    | Slider
    |--------------------------------------------------------------------------
    */

    let slider = new Swiper('.jsDefaultSlider', {
        speed: 1200,
        mousewheel: false,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        spaceBetween: 0,
        navigation: {
            nextEl: '.jsSliderNext',
            prevEl: '.jsSliderPrev',
        },
        pagination: {
            el: '.jsSliderPagination',
            clickable: true,
        },
        slidesPerView: 1,
    });

    /*
    |--------------------------------------------------------------------------
    | Light Gallery
    |--------------------------------------------------------------------------
    */

	$('.lg').lightGallery({
		selector: ".lg__item",
	});

    /*
    |--------------------------------------------------------------------------
    | Promo Countdown
    |--------------------------------------------------------------------------
    */

    var promoTimers = document.querySelectorAll('.jsPromoTimer');

    function endAction(el) {
        el.parentNode.parentNode.classList.add('-finished');
    }

    function countdown(el) {
        var endDate = el.dataset.date.split('-');
        var endTime = el.dataset.time.split(':');
        var dataFinish = new Date(endDate[2], endDate[1], endDate[0], endTime[0], endTime[1]);
        var dataNow = new Date();

        var difference = (dataFinish - dataNow) / 1000;
        if(difference < 2592000) {
            endAction(el);
            return;
        }

        var d = difference / 86400;
        difference -= Math.floor(d) * 86400;
        var h = difference  / 3600;
        difference -= Math.floor(h) * 3600;
        var m = difference / 60;
        difference -= Math.floor(m) * 60;
        var s = difference;

        var difDay = 32 - new Date(0, 0, 32).getDate();

        d = Math.ceil(d) - difDay;
        h = Math.abs(Math.floor(h));
        m = Math.abs(Math.floor(m));
        s = Math.floor(s);

        if(d < 0) d = 0;

        var listTime = [
            d,
            h,
            m,
            s
        ];

        var listTimeCounteiner = el.querySelectorAll('.jsPromoTimerCount');

        for(var i = 0; i < listTimeCounteiner.length; i +=1) {
            if(listTime[i] < 10) {
                listTime[i] = '0'+listTime[i];
            }

            listTimeCounteiner[i].innerHTML = listTime[i];
        }
        setTimeout(function() {
            countdown(el);
        }, 1000);

    }

    for(var i = 0; i < promoTimers.length; i += 1) {
        countdown(promoTimers[i]);
    }

    /*
    |--------------------------------------------------------------------------
    | Polyfill object-fit/object-position on <img>: IE9, IE10, IE11, Edge, Safari, ...
    | https://github.com/bfred-it/object-fit-images
    |--------------------------------------------------------------------------
    */

    objectFitImages();
    // if you use jQuery, the code is: $(function () { objectFitImages() });


    /*
    |--------------------------------------------------------------------------
    | Category Menu
    |--------------------------------------------------------------------------
    */

    var jsCategoryMenus = document.querySelectorAll('.jsCategoryMenu');
    var jsBtnPrimary = document.querySelector('.jsBtnPrimary');

    function calcHeightCategoryMenu() {
        for (let i = 0; i < jsCategoryMenus.length; i++) {
            var height = jsCategoryMenus[i].scrollHeight;
            var openList = jsCategoryMenus[i].querySelector('.category__sub-item.has-menu.-opened');

            jsCategoryMenus[i].style.height = height + 'px';

            if(!jsCategoryMenus[i].dataset.minHeight) {
                jsCategoryMenus[i].setAttribute('data-min-height', height);
            } else if(jsCategoryMenus[i].dataset.minHeight > height) {
                jsCategoryMenus[i].dataset.minHeight = height;
            }

            if(!openList) {
                height = jsCategoryMenus[i].dataset.minHeight;
                jsCategoryMenus[i].style.height = height + 'px';
            }
        }
    }

    if(!jsBtnPrimary) {
        calcHeightCategoryMenu();
    }

    function hiddenAllList(el) {
        var jsCategoryMenus = el.parentNode.parentNode.querySelectorAll('.jsCategoryMenu');

        for (let i = 0; i < jsCategoryMenus.length; i += 1) {
            if(el.parentNode !== jsCategoryMenus[i].parentNode) {
                jsCategoryMenus[i].classList.add('jsCategoryMenuHidden');
            }
        }

        var jsCategoryLinks = el.parentNode.parentNode.querySelectorAll('.jsCategoryLink');

        for (let i = 0; i < jsCategoryLinks.length; i += 1) {
            if(el.parentNode !== jsCategoryLinks[i].parentNode) {
                jsCategoryLinks[i].parentNode.classList.remove('-opened');
            }
        }
    }

    function openList(e) {
        var link = e.target;

        if(link.classList.contains('btn-primary')) {
            setTimeout(() => {
                calcHeightCategoryMenu();
            }, 0);
        }

        if(link.classList.contains('jsCategoryLink')) {
            hiddenAllList(link);

            e.preventDefault();
            var menu = link.parentNode.querySelector('.jsCategoryMenu');
            link.parentNode.classList.toggle('-opened')
            menu.classList.toggle('jsCategoryMenuHidden');

            var delay = getComputedStyle(jsCategoryMenus[0]).transitionDuration.split('');
            delay[delay.length - 1] = '';
            delay = delay.join('');

            setTimeout(() => {
                calcHeightCategoryMenu();
            }, +delay * 1000);
        }
    }


    document.addEventListener('click', openList);
    document.addEventListener('touchend', openList);




    // изменение картинки при ховере

    var containerPicture = document.querySelector('.jsNavigationCategoryImg');

    if(containerPicture) {
        var imgPicture = document.createElement('img');
        containerPicture.appendChild(imgPicture);

        function changePicture(event) {
            if(event.target.classList.contains('jsNavigationSubcategoryLink')) {
                var src = event.target.dataset.src;
                imgPicture.setAttribute('src', src);
                imgPicture.parentNode.classList.remove('hidden');
            }
        }

        function hiddenPicture(event) {
            if(event.target.classList.contains('jsNavigationSubcategoryLink')) {
                imgPicture.parentNode.classList.add('hidden');
            }
        }

        document.addEventListener('mouseout', hiddenPicture);
        document.addEventListener('mouseover', changePicture);
        document.addEventListener('touch', changePicture);
    }

    // скролинг ссылок

    var jsNavigationSubcategoryControl = document.querySelector('.jsNavigationSubcategoryControl');

    if(jsNavigationSubcategoryControl) {
        var jsNavigationSubcategoryContent = document.querySelectorAll('.jsNavigationSubcategoryContent');
        var jsNavigationCategoryLinks = document.querySelectorAll('.jsNavigationCategoryLink');
        var scrollYContent = 0;
        var indexActiveLink;

        function findActiveIndexLink(el) {
            var result = null;

            for (var i = 0; i < jsNavigationCategoryLinks.length; i++) {
                if(jsNavigationCategoryLinks[i] === el) {
                    result = i;
                }
            }

            return result;
        }

        function scrollAllcontent(y, i) {
            jsNavigationSubcategoryContent[i].scroll(0, y);
            scrollYContent = y;
        }

        function controlFollowMouse(event, typeEvent) {
            var linkHover = document.querySelector('.navigation__category-link.-active');
            var newIndexActiveLink = findActiveIndexLink(linkHover);
            var control = jsNavigationSubcategoryControl;
            var content = jsNavigationSubcategoryContent[newIndexActiveLink];
            var controlHeight = control.offsetHeight;
            var controlLineHeight = control.parentNode.offsetHeight - controlHeight;
            var containerLinkWrapper = content.querySelector('.jsNavigationSubcategoryContentWrapper');
            var containerLinkHeight = containerLinkWrapper.offsetHeight - containerLinkWrapper.parentNode.offsetHeight;

            if(typeEvent === 'scroll') {
                var y = containerLinkWrapper.parentNode.scrollTop;
                var percent = 100 * y / containerLinkHeight;
                var yControl = percent / 100 * controlLineHeight;

                if(yControl < 0) {
                    yControl = 0;
                }

                if(yControl > controlLineHeight) {
                    yControl = controlLineHeight;
                }

                control.style.top = yControl + 'px';

                scrollAllcontent(y, newIndexActiveLink);
            } else {
                var y = event.pageY || event.targetTouches[0].pageY;
                y = y - control.parentNode.getBoundingClientRect().top;

                if(y < 0) {
                    y = 0;
                }

                if(y > controlLineHeight) {
                    y = controlLineHeight;
                }

                var percent = 100 * y / controlLineHeight;

                scrollYContent = percent / 100 * containerLinkHeight;
                control.style.top = y + 'px';

                scrollAllcontent(scrollYContent, newIndexActiveLink);
            }
        }

        function addEventControl() {
            activeControl = event.currentTarget;
            document.addEventListener('mousemove', controlFollowMouse);
            document.addEventListener('touchmove', controlFollowMouse);
        }

        function removeEventControl() {
            document.removeEventListener('mousemove', controlFollowMouse);
            document.removeEventListener('touchmove', controlFollowMouse);
        }

        jsNavigationSubcategoryControl.addEventListener('mousedown', addEventControl);
        jsNavigationSubcategoryControl.addEventListener('touchstart', addEventControl);

        for (var i = 0; i < jsNavigationSubcategoryContent.length; i++) {
            jsNavigationSubcategoryContent[i].addEventListener('scroll', function(event) {
                controlFollowMouse(event, 'scroll');
            });
        }

        document.addEventListener('mouseup', removeEventControl);
        document.addEventListener('touchend', removeEventControl);

        var jsNavigationSubcategoryContents = document.querySelectorAll('.jsNavigationSubcategoryContent');
        var jsNavigationSubcategoryScroll = document.querySelector('.jsNavigationSubcategoryScroll');

        function findActiveIndexLink(el) {
            var result = null;

            for (let i = 0; i < jsNavigationCategoryLinks.length; i++) {
                if(jsNavigationCategoryLinks[i] === el) {
                    result = i;
                }
            }

            return result;
        }

        function removeClassEl(listEl, className) {
            for (let i = 0; i < listEl.length; i++) {
                listEl[i].classList.remove(className);
            }
        }

        function openNavigationSubcategory(event) {
            var target = event.target;

            if(target.classList.contains('jsNavigationCategoryLink')) {
                removeClassEl(jsNavigationCategoryLinks, '-active');
                removeClassEl(jsNavigationSubcategoryContents, 'show');

                var activeIndexLink = findActiveIndexLink(target);

                if(indexActiveLink !== activeIndexLink) {
                    indexActiveLink = activeIndexLink;

                    setTimeout(function() {
                        scrollAllcontent(scrollYContent, indexActiveLink);
                    }, 0);
                }

                target.classList.add('-active');
                jsNavigationSubcategoryContents[activeIndexLink].classList.add('show');
                if(!jsNavigationSubcategoryScroll.classList.contains('show')) {
                    jsNavigationSubcategoryScroll.classList.add('show');
                }
            }
        }

        document.addEventListener('mouseover', openNavigationSubcategory);
        document.addEventListener('touch', openNavigationSubcategory);
    }


    /*
    |--------------------------------------------------------------------------
    | Counter
    |--------------------------------------------------------------------------
    */

    $('.jsCountStats').each(function(){
        $(this).attr("data-count", $(this).text());
    });

    $(".map__stats").on("wow", function(){
        $('.jsCountStats').each(function (){
            $(this).stop().prop('Counter',0).animate({
                Counter: $(this).attr("data-count")
            },{	duration: 4000,
                easing: 'swing',
                step: function (now){
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });


});
