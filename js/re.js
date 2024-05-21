/*слайдер 3д */
let activeIndex = 0
let limit = 0
let disabled = false
let $stage
let $controls
let canvas = false
const SPIN_FORWARD_CLASS = 'js-spin-fwd'
const SPIN_BACKWARD_CLASS = 'js-spin-bwd'
const DISABLE_TRANSITIONS_CLASS = 'js-transitions-disabled'
const SPIN_DUR = 1000
const appendControls = () => {
    $controls = $('.tabs3d-control').children()
    $controls.eq(activeIndex).addClass('active')
}
const setIndexes = () => {
    $('.spinner').children().each((i, el) => {
        if (i == 0) {
            $(el).addClass('js-active');
        }
        $(el).attr('data-index', i)
        $('.tabs3d-control').append('<a style="background-color: ' + $(el).attr('data-bg') + '" href="#tab" data-index="' +i+ '">' + $(el).attr('data-menu') + '</a>');
        limit++
    })
}
const duplicateSpinner = () => {
    const $el = $('.spinner').parent()
    const html = $('.spinner').parent().html()
    $el.append(html)
    $('.spinner').last().addClass('spinner-right')
    $('.spinner-right').removeClass('spinner-left')
}
const paintFaces = () => {
    $('.spinner-face').each((i, el) => {
        $(el).children().css('background', $(el).attr('data-bg'))
    })
}
const prepareDom = () => {
    setIndexes()
    paintFaces()
    duplicateSpinner()
    appendControls()
}
const spin = (inc = 1) => {
    if (disabled) return
    if (!inc) return
    activeIndex += inc
    disabled = true
    if (activeIndex >= limit) {
        activeIndex = 0
    }
    if (activeIndex < 0) {
        activeIndex = (limit - 1)
    }
    const $activeEls = $('.spinner-face.js-active')
    const $nextEls = $('.spinner-face[data-index=' + activeIndex + ']')
    $nextEls.addClass('js-next')
    if (inc > 0) {
        $stage.addClass(SPIN_FORWARD_CLASS)
        } else {
        $stage.addClass(SPIN_BACKWARD_CLASS)
    }
    $controls.removeClass('active')
    $controls.eq(activeIndex).addClass('active')
    setTimeout(() => {
        spinCallback(inc)
    }, SPIN_DUR, inc)
}
const spinCallback = (inc) => {
    $('.js-active').removeClass('js-active')
    $('.js-next').removeClass('js-next').addClass('js-active')
    $stage
    .addClass(DISABLE_TRANSITIONS_CLASS)
    .removeClass(SPIN_FORWARD_CLASS)
    .removeClass(SPIN_BACKWARD_CLASS)
    $('.js-active').each((i, el) => {
        const $el = $(el)
        $el.prependTo($el.parent())
    })
    setTimeout(() => {
        $stage.removeClass(DISABLE_TRANSITIONS_CLASS)
        disabled = false
    }, 100)
}
const attachListeners = () => {
    document.onkeyup = (e) => {
        switch (e.keyCode) {
            case 38:
            spin(-1)
            break
            case 40:
            spin(1)
            break
        }
    }
    $controls.on('click', (e) => {
        e.preventDefault()
        if (disabled) return
        const $el = $(e.target)
        const toIndex = parseInt($el.attr('data-index'), 10)
        spin(toIndex - activeIndex)
    })
}
const assignEls = () => {
    $stage = $('.tabs3d-stage')
}
const init = () => {
    assignEls()
    prepareDom()
    attachListeners()
}
$(() => {
    init();
});   










/*slider*/

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
let mySlider = {
    config : { 
        slider : '.slider-content',
        activeSlide : '.slide.active',
        button: '.next-button',
        transition: 800,
        delay: function() {return this.transition;},
        navigation : '.control-nav'
    },
    init : function(config) {
        this.createNav();
        $(mySlider.config.button).click(function() {
            mySlider.animateSlide($(this));
        });
    },
    getActiveSlide : function() {
        return $(mySlider.config.activeSlide);    
    },
    getNextSlide : function() {
        let nextSlide = mySlider.getActiveSlide().next();
        if ( nextSlide.length === 0 ){
            nextSlide = $(mySlider.config.slider).find('.slide').eq(0);   
        } 
        return nextSlide;
    }, 
    createNav : function() {
        let totalSlides = $(mySlider.config.slider).find('.slide').length;
        let controlNav = $(mySlider.config.navigation).find('ul');
        let nav;                
        for( let i=0; i < totalSlides; i++ ){
            let active = "";
            if(i === 0){
                active = 'active';
            }
            controlNav.append('<li class="slider-nav nav-'+i+' '+active+' ">'+ (i+1) +'</li>')
        }                                       
    },
    animateNav : function() {
        let activeNav  = $('li.active');
        let nextNav = activeNav.next();
        if(nextNav.length === 0){
            nextNav = $('.control-nav li').eq(0);
        }
        activeNav.removeClass('active');
        nextNav.addClass('active');
    },
    animateSlide : function(button) {
        let activeSlide  = mySlider.getActiveSlide();
        let nextSlide = mySlider.getNextSlide();
        let delay = mySlider.config.delay(); 
        let clipPath = $('.clip-svg');
        clipPath.css('transition-duration', mySlider.config.transition+'ms');
        button.css('pointer-events', 'none');
        nextSlide.css('z-index',10);
        nextSlide.addClass('active').css('opacity', 1); 
        setTimeout(function() {
            activeSlide.removeClass('active').css('opacity', 0);
        }, delay);
        setTimeout(function() {
            nextSlide.css('z-index','');
            button.css('pointer-events', 'auto');
        }, delay + 300);
        mySlider.animateNav();
    }
} 
$(document).ready(function() { mySlider.init(); });
