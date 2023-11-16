import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appAnchorScroll]'
})
export class AnchorScrollDirective implements AfterViewInit,OnDestroy{
  $containerWatch;
  $element;
  @Input() containerWatch;
  
  constructor(private elementRef: ElementRef) {}
  onScroll(event) {
    var scrollPos = this.$containerWatch.scrollTop();
    this.$element.find('a').each((index,el) => {
      
      var currLink = $(el);
      
      var refElement = this.$containerWatch.find(currLink.attr("href"));
      if (refElement.length > 0) {
        var scrollTop = this.$containerWatch.scrollTop() - this.$containerWatch.offset().top + refElement.offset().top;
        if (scrollTop <= scrollPos) {
          this.$element.find('a').removeClass("active");
          currLink.addClass("active");
          refElement.addClass('active');
        } else {
          currLink.removeClass("active");
          refElement.removeClass('active');
        }
      }
    }
    )
  }

  initAnchorScroll() {
    this.$element = $(this.elementRef.nativeElement);
    this.$containerWatch = $(this.containerWatch);
    
    if (this.$containerWatch.length > 0) {
      this.$containerWatch.on("scroll", (e)=>{
        this.onScroll(e);
      })
      this.onClickAnchor();
    }
  }

  onClickAnchor() {
    this.$element.on('click', 'a[href^="#"]', (e) => {
      
      e.preventDefault();
      this.$containerWatch.off("scroll");

      this.$element.find('a').each((index,el) => {
        var refLink = $(el);
        refLink.removeClass('active');
        var refElement = this.$containerWatch.find(refLink.attr("href"));
        refElement.removeClass('active');
      })
      var currLink = $(e.currentTarget);
      console.log(currLink);
      currLink.addClass('active');

      let target = currLink.attr('href');
        console.log(target);
      let $target = this.$containerWatch.find(target);
      $target.addClass('active');
      //console.log($target,$target.position(),$target.offset(),containerWatch.scrollTop());
      let scrollTop = this.$containerWatch.scrollTop() - this.$containerWatch.offset().top + $target.offset().top;
      this.$containerWatch.animate({
        'scrollTop': scrollTop
      }, 500, 'swing', ()=> {
        //window.location.hash = target;
        this.$containerWatch.on("scroll", (e)=>{
          this.onScroll(e);
        });
      });

      return false;
    })
  }

  ngAfterViewInit() {
    
      this.initAnchorScroll();
    
  }

  ngOnDestroy() {
    if (this.$containerWatch.length > 0) {
      this.$containerWatch.off("scroll");
      this.$element.on('click', 'a[href^="#"]', () => { })
    }
  }

}
