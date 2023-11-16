/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function ($) {

    // Add posibility to scroll to selected option
    // usefull for select for example
    $.fn.scrollTo = function (elem) {
        $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
        return this;
    };

    $.fn.dropdownBrainy = function (options) {
        var defaults = {
            inDuration: 300,
            outDuration: 225,
            constrainWidth: true, // Constrains width of dropdown to the activator
            hover: false,
            gutter: 0, // Spacing from edge
            gutterTop: 0, // Spacing from edge
            belowOrigin: false,
            alignment: 'left',
            stopPropagation: false,
            moveToLeft: 0,
            moveToRight: 0,
            select: false,
            appendTo: 'body'
        };

        // Open dropdown.
        if (options === "open") {
            this.each(function () {
                $(this).trigger('open');
            });
            return false;
        }

        // Close dropdown.
        if (options === "close") {
            this.each(function () {
                $(this).trigger('close');
            });
            return false;
        }

        this.each(function () {
            var origin = $(this);
            var curr_options = $.extend({}, defaults, options);
            var isFocused = false;

            // Dropdown menu
            var activates = $("#" + origin.attr('data-activates'));

            function updateOptions() {
                if (origin.data('induration') !== undefined)
                    curr_options.inDuration = origin.data('induration');
                if (origin.data('outduration') !== undefined)
                    curr_options.outDuration = origin.data('outduration');
                if (origin.data('constrainWidth') !== undefined)
                    curr_options.constrainWidth = origin.data('constrainWidth');
                if (origin.data('hover') !== undefined)
                    curr_options.hover = origin.data('hover');
                if (origin.data('gutter') !== undefined)
                    curr_options.gutter = origin.data('gutter');
                if (origin.data('gutterTop') !== undefined)
                    curr_options.gutterTop = origin.data('gutterTop');
                if (origin.data('beloworigin') !== undefined)
                    curr_options.belowOrigin = origin.data('beloworigin');
                if (origin.data('alignment') !== undefined)
                    curr_options.alignment = origin.data('alignment');
                if (origin.data('stoppropagation') !== undefined)
                    curr_options.stopPropagation = origin.data('stoppropagation');
                if (origin.data('moveToLeft') !== undefined)
                    curr_options.moveToLeft = origin.data('moveToLeft');
                if (origin.data('moveToRight') !== undefined)
                    curr_options.moveToRight = origin.data('moveToRight');
                if (origin.data('select') !== undefined)
                    curr_options.select = origin.data('select');
            }

            updateOptions();

            // Attach dropdown to select dom
            $(curr_options.appendTo).append(activates);

            /*
             Helper function to position and resize dropdown.
             Used in hover and click handler.
             */
            function placeDropdown(eventType) {
                // Check for simultaneous focus and click events.
                if (eventType === 'focus') {
                    isFocused = true;
                }

                // Check html data attributes
                updateOptions();

                // Set Dropdown state
                activates.addClass('active');
                origin.addClass('active');

                // Constrain width

                if (curr_options.select) {
                    var cloneDropdwon = activates.clone().css('white-space', 'nowrap')
                    $('body').append(cloneDropdwon);
                    if (origin.outerWidth() > cloneDropdwon.width())
                    {
                        activates.css('width', origin.outerWidth());
                    } else {
                        activates.css('white-space', 'nowrap');
                    }
                    cloneDropdwon.remove();
                } else
                {
                    console.log('no select', activates);

                    if (curr_options.constrainWidth === true) {
                        activates.css('width', origin.outerWidth());

                    } else {
                        activates.css('white-space', 'nowrap');
                    }

                }

                // Offscreen detection
                var windowHeight = window.innerHeight;
                var originHeight = origin.innerHeight();
                var offsetLeft = origin.offset().left;
                var offsetTop = origin.offset().top - $(window).scrollTop();
                var currAlignment = curr_options.alignment;
                var gutterSpacing = 0;
                var gutterTop = parseInt(curr_options.gutterTop);
                var leftPosition = 0;

                // Below Origin
                var verticalOffset = 0;
                if (curr_options.belowOrigin === true) {
                    verticalOffset = originHeight;
                }

                // Check for scrolling positioned container.
                var scrollYOffset = 0;
                var scrollXOffset = 0;
                var wrapper = origin.parent();
                if (!wrapper.is('body')) {
                    if (wrapper[0].scrollHeight > wrapper[0].clientHeight) {
                        scrollYOffset = wrapper[0].scrollTop;
                    }
                    if (wrapper[0].scrollWidth > wrapper[0].clientWidth) {
                        scrollXOffset = wrapper[0].scrollLeft;
                    }
                }


                if (offsetLeft + activates.innerWidth() > $(window).width()) {
                    // Dropdown goes past screen on right, force right alignment
                    currAlignment = 'right';

                } else if (offsetLeft - activates.innerWidth() + origin.innerWidth() < 0) {
                    // Dropdown goes past screen on left, force left alignment
                    currAlignment = 'left';
                }

                // Vertical bottom offscreen detection
                
                var originHeightAux = 0;
                if(curr_options.belowOrigin)
                {
                    originHeightAux = origin.height();
                }
                if (offsetTop + activates.innerHeight() + originHeightAux > windowHeight) {
                    // If going upwards still goes offscreen, just crop height of dropdown.
                    if (offsetTop + originHeight - activates.innerHeight() < 0) {
                        var adjustedHeight = windowHeight - offsetTop - verticalOffset - gutterTop;
                        
                        activates.css('max-height', adjustedHeight);
                    } else {
                        // Flow upwards.
                        if (!verticalOffset) {
                            verticalOffset += originHeight;
                        }
                        verticalOffset -= activates.innerHeight();
                    }
                }
                //Get the location
                var rectObject = origin[0].getBoundingClientRect();
                // Handle edge alignment
                if (currAlignment === 'left') {
                    //gutterSpacing = curr_options.gutter;
                    leftPosition = rectObject.left - curr_options.moveToLeft;
                } else if (currAlignment === 'right') {
                    //var offsetRight = origin.position().left + origin.outerWidth() - activates.outerWidth();
                    //gutterSpacing = -curr_options.gutter;
                    leftPosition = rectObject.right + curr_options.moveToRight;
                }

                var topPosition = rectObject.top + gutterTop + verticalOffset;

                // Position dropdown
                activates.css({
                    position: 'absolute',
                    top: topPosition,
                    left: leftPosition
                });


                // Show dropdown
                activates.stop(true, true).css('opacity', 0)
                        .slideDown({
                            queue: false,
                            duration: curr_options.inDuration,
                            easing: 'easeOutCubic',
                            complete: function () {
                                $(this).css('height', '');
                            }
                        })
                        .animate({opacity: 1}, {queue: false, duration: curr_options.inDuration, easing: 'easeOutSine'});
            }

            function hideDropdown() {
                // Check for simultaneous focus and click events.
                isFocused = false;
                activates.fadeOut(curr_options.outDuration);
                activates.removeClass('active');
                origin.removeClass('active');
                setTimeout(function () {
                    activates.css('max-height', '');
                }, curr_options.outDuration);
            }

            // Hover
            if (curr_options.hover) {
                var open = false;
                origin.unbind('click.' + origin.attr('id'));
                // Hover handler to show dropdown
                origin.on('mouseenter', function (e) { // Mouse over
                    if (open === false) {
                        placeDropdown();
                        open = true;
                    }
                });
                origin.on('mouseleave', function (e) {
                    // If hover on origin then to something other than dropdown content, then close
                    var toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
                    if (!$(toEl).closest('.dropdown-content').is(activates)) {
                        activates.stop(true, true);
                        hideDropdown();
                        open = false;
                    }
                });

                activates.on('mouseleave', function (e) { // Mouse out
                    var toEl = e.toElement || e.relatedTarget;
                    if (!$(toEl).closest('.dropdown-button').is(origin)) {
                        activates.stop(true, true);
                        hideDropdown();
                        open = false;
                    }
                });

                // Click
            } else {
                // Click handler to show dropdown
                origin.unbind('click.' + origin.attr('id'));
                origin.bind('click.' + origin.attr('id'), function (e) {
                    if (!isFocused) {
                        if (origin[0] == e.currentTarget &&
                                !origin.hasClass('active') &&
                                ($(e.target).closest('.dropdown-content').length === 0)) {
                            e.preventDefault(); // Prevents button click from moving window
                            if (curr_options.stopPropagation) {
                                e.stopPropagation();
                            }
                            placeDropdown('click');
                        }
                        // If origin is clicked and menu is open, close menu
                        else if (origin.hasClass('active')) {
                            hideDropdown();
                            $(document).unbind('click.' + activates.attr('id') + ' touchstart.' + activates.attr('id'));
                        }
                        // If menu open, add click close handler to document
                        if (activates.hasClass('active')) {
                            $(document).bind('click.' + activates.attr('id') + ' touchstart.' + activates.attr('id'), function (e) {
                                if (!activates.is(e.target) && !origin.is(e.target) && (!origin.find(e.target).length)) {
                                    hideDropdown();
                                    $(document).unbind('click.' + activates.attr('id') + ' touchstart.' + activates.attr('id'));
                                }
                            });
                        }
                    }
                });

            } // End else

            // Listen to open and close event - useful for select component
            origin.on('open', function (e, eventType) {
                placeDropdown(eventType);
            });
            
            origin.on('close', hideDropdown);


            $('*').on('scroll', function (event) {
                
                if (activates.hasClass('active') && event.currentTarget !== activates[0])
                {
                     hideDropdown();
                }
            });

            $(window).on('resize', function (event) {
                hideDropdown();
            });

        });
    }; // End dropdown plugin

    $(document).ready(function () {
        $('.dropdown-button-brainy').dropdownBrainy();
    });
}(jQuery));
