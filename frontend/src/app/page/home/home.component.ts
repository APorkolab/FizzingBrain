
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //   // Init the image gallery
    //   var gallery = $(".tm-gallery").isotope({
    //     itemSelector: ".tm-gallery-item",
    //     layoutMode: "fitRows"
    //   });

    //   // Layout Isotope after each image loads
    //   gallery.imagesLoaded().progress(function () {
    //     gallery.isotope("layout");
    //   });

    //   $(".filters-button-group").on("click", "a", function (e) {
    //     e.preventDefault();
    //     var filterValue = $(this).attr("data-filter");
    //     gallery.isotope({ filter: filterValue });
    //     $('.filters-button-group a').removeClass('active');
    //     $(this).addClass('active');
    //   });

    //   // Magnific Pop up
    //   $('.tm-gallery').magnificPopup({
    //     delegate: 'a',
    //     type: 'image',
    //     gallery: { enabled: true }
    //   });
    // });
  }
}



