(function ($) {

    // Add posibility to scroll to selected option
    // usefull for select for example
    $.fn.scrollTo = function (elem) {
        $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
        return this;
    };

    $.fn.dropdown = function (options) {
        var defaults = {
            inDuration: 300,
            outDuration: 225,
            constrainWidth: true, // Constrains width of dropdown to the activator
            hover: false,
            gutter: 0, // Spacing from edge
            belowOrigin: false,
            alignment: 'left',
            stopPropagation: false,
            container: undefined,
            fixScroll: false
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
                if (origin.data('constrainwidth') !== undefined)
                    curr_options.constrainWidth = origin.data('constrainwidth');
                if (origin.data('hover') !== undefined)
                    curr_options.hover = origin.data('hover');
                if (origin.data('gutter') !== undefined)
                    curr_options.gutter = origin.data('gutter');
                if (origin.data('beloworigin') !== undefined)
                    curr_options.belowOrigin = origin.data('beloworigin');
                if (origin.data('alignment') !== undefined)
                    curr_options.alignment = origin.data('alignment');
                if (origin.data('stoppropagation') !== undefined)
                    curr_options.stopPropagation = origin.data('stoppropagation');
                if (origin.data('fixScroll') !== undefined)
                    curr_options.fixScroll = origin.data('fixScroll');
            }

            updateOptions();
            
            // Attach dropdown to its activator
            //origin.after(activates);
            if (!curr_options.container) {
                
                origin.after(activates);
            } else {
                
                $(curr_options.container).append(activates);
            }

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
                console.log('fixScroll',curr_options.fixScroll);
                // Set Dropdown state
                activates.addClass('active');
                origin.addClass('active');
                var originWidth = origin[0].getBoundingClientRect().width;
                //For select element
                origin.closest('.select-wrapper').addClass('active');
                // Constrain width
                if (curr_options.constrainWidth === true) {
                    activates.css('width', origin.outerWidth());

                } else {
                    activates.css('white-space', 'nowrap');
                }
                
                // Offscreen detection
                var windowHeight = window.innerHeight;
                var originHeight = origin.innerHeight();
                var offsetLeft = origin.offset().left;
                var offsetTop = origin.offset().top - $(window).scrollTop();
                var currAlignment = curr_options.alignment;
                var gutterSpacing = 0;
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
                if (offsetTop + activates.innerHeight() > windowHeight) {
                    // If going upwards still goes offscreen, just crop height of dropdown.
                    if (offsetTop + originHeight - activates.innerHeight() < 0) {
                        var adjustedHeight = windowHeight - offsetTop - verticalOffset;
                        activates.css('max-height', adjustedHeight);
                    } else {
                        // Flow upwards.
                        if (!verticalOffset) {
                            verticalOffset += originHeight;
                        }
                        verticalOffset -= activates.innerHeight();
                    }
                }

                // Handle edge alignment
                //Get the location
                var rectObject = origin[0].getBoundingClientRect();
                if (currAlignment === 'left') {
                    gutterSpacing = curr_options.gutter;
                    if (curr_options.container) {
                        leftPosition = rectObject.left + gutterSpacing - $(curr_options.container).offset().left;
                    } else {
                        leftPosition = origin.position().left + gutterSpacing;
                    }
                } else if (currAlignment === 'right') {
                    var offsetRight = rectObject.left + origin.outerWidth() - activates.outerWidth();
                    gutterSpacing = -curr_options.gutter;
                    if (curr_options.container) {
                        leftPosition = offsetRight + gutterSpacing - $(curr_options.container).offset().left;
                    } else {

                        // Material icons fix
                        activates
                            .stop(true, true)
                            .css({
                                opacity: 0,
                                left: 0
                            })

                        var offsetRight = origin.position().left + originWidth - activates.width();
                        leftPosition = offsetRight + gutterSpacing;
                    }
                }   

                //Top
                var topPosition = origin.position().top;
                if(curr_options.container){
                    topPosition = rectObject.top  - $(curr_options.container).offset().top;
                    if(curr_options.fixScroll){
                        const scrollParent = $(curr_options.container).get(0);
                        if (document.body === scrollParent) {
                            scrollTop = $(window).scrollTop();
                         } else {
                            scrollTop = scrollParent.scrollTop;
                         }
                        topPosition = topPosition + scrollTop;   
                    }
                }

                // Position dropdown
                activates.css({
                    position: 'absolute',
                    top: topPosition + verticalOffset + scrollYOffset,
                    left: leftPosition + scrollXOffset
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
                    .animate({ opacity: 1 }, { queue: false, duration: curr_options.inDuration, easing: 'easeOutSine' });

                // Add click close handler to document
                setTimeout(function () {
                    $(document).bind('click.' + activates.attr('id'), function (e) {
                        var target = $(e.target);
                        if (!(target.hasClass('dropdown-prevent-close')) && target.closest('.dropdown-prevent-close').length === 0) {
                            hideDropdown();
                            $(document).unbind('click.' + activates.attr('id'));
                        }


                    });
                }, 0);
            }

            function hideDropdown() {
                // Check for simultaneous focus and click events.
                isFocused = false;
                activates.fadeOut(curr_options.outDuration);
                activates.removeClass('active');
                origin.removeClass('active');
                //For select element
                origin.closest('.select-wrapper').removeClass('active');

                $(document).unbind('click.' + activates.attr('id'));
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
                            $(document).unbind('click.' + activates.attr('id'));
                        }
                    }
                });

            } // End else

            // Listen to open and close event - useful for select component
            origin.on('open', function (e, eventType) {
                placeDropdown(eventType);
            });
            origin.on('close', hideDropdown);


        });
    }; // End dropdown plugin

    $(document).ready(function () {
        $('.dropdown-button').dropdown();
    });
}(jQuery));

