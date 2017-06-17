// inspired by https://teamtreehouse.com/community/interactive-navigation-bar with many modifications
// NOTE: indentation is off for this due to the creator of the original source not indenting properly

(function($) 
{
    // create dropdown menu
    $.fn.menumaker = function(options)
    {
        var cssmenu = $(this), settings = $.extend(
        {
            title: "Menu",
            format: "dropdown",
            sticky: false
        }, options);
    
        // return a new menu when this function is called
        return this.each(function() 
        {
            cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
      
            // create a click listener to toggle menu open/close
            $(this).find("#menu-button").on('click', function() 
            {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open'))
                { 
                    mainmenu.hide().removeClass('open');
                } 
                else
                {
                    mainmenu.show().addClass('open');
                    if (settings.format === "dropdown")
                    {
                        mainmenu.find('ul').show();
                    }
                }
            });
      
            // if window width > 1175px show search and social media buttons
            resizeFix = function() 
            {
                if ($( window ).width() > 1175) 
                {
                    cssmenu.find('ul').show();
                    $("a.buy-btn.pull-right").show();
                    $("img.menu-pic").show();
                    $("form.pull-right").show();
                }
        
                // if window width <= 1175px hide search and social media buttons
                if ($(window).width() <= 1175)
                {
                    cssmenu.find('ul').hide().removeClass('open');
                    cssmenu.find('#menu-button').removeClass('menu-opened');
                    $("a.buy-btn.pull-right").hide();
                    $("img.menu-pic").hide();
                    $("form.pull-right").hide();
                }
            };
      
            // call this show/hide of buttons every time window width is adjusted
            resizeFix();
            return $(window).on('resize', resizeFix);
        });
    };
})(jQuery);

(function($) 
{
    $(document).ready(function() 
    {
        // create a new menu
        $("#cssmenu").menumaker( 
        {
            title: "Menu",
            format: "multitoggle"
        });
    
        // add the white menu line as HTML
        $("#cssmenu").prepend("<div id='menu-line'></div>");

        // create all the variables needed
        var foundActive = false, activeElement, hoverElement, linePosition = 0, menuLine = $("#cssmenu #menu-line"), lineWidth, defaultPosition, defaultWidth;
  
        // check all the navigation buttons to check if any active
        $("#cssmenu > ul > li").each(function()
        {
            if ($(this).hasClass('active'))
            {
                activeElement = $(this);
                foundActive = true;
                $("#cssmenu").css("border-top", "none")
            }
        });
  
        // make the first navigation element "active" if none are
        if (foundActive === false)
        {
            activeElement = $("#cssmenu > ul > li").first();
        }
  
        // set the menu line's width and position equal to active element's width and position
        defaultWidth = lineWidth = activeElement.width();
        defaultPosition = linePosition = activeElement.position().left + 50;
        menuLine.css("width", lineWidth);
        menuLine.css("left", linePosition);
  
        // if user hovers over new navigation button
        $("#cssmenu > ul > li").mouseover(function() 
        {
            // indicate that the user is hovering
            $('#cssmenu').addClass('hoverActive');
    
            // if menu is opened make the white menu line hover over the element the user hovers over
            if (!$("#menu-button").hasClass("menu-opened"))
            {
                hoverElement = $(this);
                lineWidth = hoverElement.width();
                linePosition = hoverElement.position().left + 50;
                menuLine.css("width", lineWidth);
                menuLine.css("left", linePosition);
            }
        }).mouseleave(function() 
        {
            // when the user moves mouse off hover element, remove white menu line
            $('#cssmenu').removeClass('hoverActive');
            if (!$("#menu-button").hasClass("menu-opened"))
            {
                hoverElement = activeElement;
                lineWidth = hoverElement.width();
                linePosition = hoverElement.position().left + 50;
                menuLine.css("width", lineWidth);
                menuLine.css("left", linePosition); 
            }
        });
  
        // check for any changed hover events and adjust white menu line every half-second
        // this is needed if the user changes pages without moving the mouse
        setInterval(function() 
        {
            if (!activeElement.hasClass('active'))
            {
                menuLine.css("display", "none");
                $("#cssmenu").css("border-top", "5px #a10000 solid")
            }
            if (!($('#cssmenu').hasClass('hoverActive')))
            {
                if (!$("#menu-button").hasClass("menu-opened"))
                {
                    hoverElement = activeElement;
                    lineWidth = hoverElement.width();
                    linePosition = hoverElement.position().left + 50;
                    menuLine.css("width", lineWidth);
                    menuLine.css("left", linePosition); 
                }
            }
        }, 500);
  
        // if a new navigation button is clicked, change active element
        $("#cssmenu li").on("click", function() 
        {
            $("#cssmenu").find("li").each(function() 
            {
                $(this).removeClass("active");
            })
            $(this).addClass("active");
            activeElement = $(this);
    
            // toggle open/close of dropdown menu if the user clicks on open button
            if ($("#cssmenu").find("#menu-button").hasClass("menu-opened"))
            {
                $("#menu-button").toggleClass('menu-opened');
                var mainmenu = $("#menu-button").next('ul');
                if (mainmenu.hasClass('open'))
                { 
                    mainmenu.hide().removeClass('open');
                }
                else
                {
                    mainmenu.show().addClass('open');
                    if (settings.format === "dropdown")
                    {
                        mainmenu.find('ul').show();
                    }
                }
            }
        });
  
        // create method to update position of white menu line
        resizeFix = function() 
        {
            if ($( window ).width() > 800)
            {
                $("#cssmenu > ul > li").each(function()        
                {
                    if ($(this).hasClass('active'))
                    {
                        activeElement = $(this);
                    }
                });
                lineWidth = activeElement.width();
                linePosition = activeElement.position().left;
                menuLine.css("width", lineWidth);
                menuLine.css("left", linePosition);
            }
        };
  
        // update position of white menu line each time the user resizes the window
        return $(window).on('resize', resizeFix);
    });
})(jQuery);