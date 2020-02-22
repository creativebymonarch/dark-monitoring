/*=====================
*Monarch Monitoring Template*
=======================
Author: Monarch Studio
Author URI: www.monarchstudio.fr
Licence: Do what you want
Version: 1.0.0
==========================*/

$(document).ready(function () {

    //Load Service Worker
    if('serviceWorker' in navigator && PWA) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', function(){
            // Register the service worker here
            navigator.serviceWorker.register(ROOT + '/path_to_sw_file/sw.js');
        });
    }

    //Load Notification
    if(NOTIFICATIONS){
        window.addEventListener('load', function () {
            // Premièrement, vérifions que nous avons la permission de publier des notifications. Si ce n'est pas le cas, demandons la
            if (window.Notification && Notification.permission !== "granted") {
                Notification.requestPermission(function (status) {
                    if (Notification.permission !== status) {
                        Notification.permission = status;
                    }
                });
            }
        });
    }

    //Pull refresh
    if(window.matchMedia("max-width: 840px") && PULL_REFRESH){
        var startY;
        var inbox = document.querySelector('.ges.refresh_active');

        inbox.addEventListener('touchstart', function(e){
            startY = e.touches[0].pageY;
        }, {passive: true});

        inbox.addEventListener('touchmove', function(e){
            var y = e.touches[0].pageY;
            if((y - startY) > 120){
                if (document.scrollingElement.scrollTop <= 0 && y > startY && !document.body.classList.contains('refreshing')) {
                    $("body").addClass('refreshing');
                    $('.mainContainer').addClass('refreshing');
                    return setTimeout(function(){
                        return location.reload(true);
                    }, 1000);
                }
            }
        }, {passive: true});
    }


    //Search trigger
    $('.__m-search-container .__m-search-trigger').on('click', function(e){
        var container = $(this).parent();
        var form = $(container).find('form');
        var input = $(form).find('input[name=q]');

        if($(form).hasClass('open')){
            $(form).removeClass('open').hide();
            $(this).find('i.icons').addClass('ion-ios-search').removeClass('ion-ios-close');
        } else {
            $(form).addClass('open').fadeIn();
            $(this).find('i.icons').addClass('ion-ios-close').removeClass('ion-ios-search');
            $(input).focus();
        }
    });

    //Tabs
    $(".__m-tab-navigation a").on('click', function(e){
        e.preventDefault();
        var target = $(this).attr('data-target');

        $('.__m-tab-container').hide();
        $(target).fadeIn(200);
        $('.__m-tab-navigation a').removeClass('active');
        $(this).addClass('active');
    });

    //Mobile menu
    $('#__m-mobile-menu-trigger').on('click', function(e){
        e.preventDefault();
        var target = $(this).attr("data-target");
        var overlay = $("#__m-mobile-overlay");
        if($(target).hasClass('open')){
            $(target).removeClass('open');
            $(overlay).fadeOut();
        } else {
            $(target).addClass('open');
            $(overlay).fadeIn();
        }
    });
    $("#__m-mobile-overlay").on('click', function(e){
        var target = $(this).attr("data-target");
        var overlay = $(this);
        $(target).removeClass('open');
        $(overlay).fadeOut();
    });

    //Prevent event # on dropdown
    $("body").on('click', '.dropdown-toggle', function(e){
        e.preventDefault();
    });
    //Modal management
    $('.modal-trigger').on('click', function(e){
        e.preventDefault();
        var target = $(this).attr("data-target");
        $(target + ".modal").addClass('active');
    });
    $('[aria-label="Close"]').on('click', function(e){
        e.preventDefault();
        $('.modal').removeClass('active');
    });

});

function createToast(message, toastClass) {

    if(!toastClass) toastClass = "";

    var toastId = getRandomInt();

    $("#__m-toast_container").append('<div id="'+toastId+'" class="toast '+toastClass+'">'+message+'</div>');
    $("#" + toastId).animate({ opacity : 1}, 500);

    setTimeout(function(){
        $("#" + toastId).fadeOut(500, function() { $(this).remove(); });
    }, 4000);

    return true;
}

function getRandomInt(max) {
    if(!max) max = 100;
    return Math.floor(Math.random() * Math.floor(max));
}

function createNotification(text, title, url){

    var icon = DOMAIN + "/assets/splash/launch-512x512.png";

    var options = {
        icon: icon,
        body: text
    };
    if(!title) title = "Nouvelle notification";

    var n = new Notification(title, options);
    n.onshow = function () {
        setTimeout(n.close.bind(n), 6000);
    };
    if(url){
        n.onclick = function(e){
            e.preventDefault();
            return window.location.replace(url);
        };
    }

}