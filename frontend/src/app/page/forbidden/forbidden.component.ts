import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  constructor() {
    let key = document.querySelector<HTMLElement>(".key")! || Number;
    let keyhole = document.querySelector<HTMLElement>(".keyhole");
    let ghost = document.querySelector<HTMLElement>(".ghost");

    let heading = document.querySelector<HTMLElement>("h1");
    let paragraph = document.querySelector<HTMLElement>("p");
    let root = document.querySelector<HTMLElement>(":root")!;
    let rootStyles = getComputedStyle(root);

    let animationDuration = parseInt(rootStyles.getPropertyValue("--animation-duration")) * 1000;
    let keyTimer = animationDuration * 9 / 8;
    // define the function which updates the position of the absolute-positioned key according to the mouse coordinates (and the keys own dimensions)
    let updateKeyPosition = (e: { clientX: any; clientY: any; }) => {
      let x = e.clientX;
      let y = e.clientY;
      // parseFloat(key.style.left) = (x - keyBox!.width / 1.5);
      // key.style.top = y - keyBox!.height / 2;
    };

    // define the function which notifies the user of the grant access
    let grantAccess = () => {
      // restore the cursor
      key!.parentElement!.parentElement!.style.cursor = "default";

      // change the text of the heading and paragraph elements
      heading!.textContent = '🎉 yay 🎉';
      paragraph!.textContent = 'access granted';

      // remove the svg elements for the key and keywhole from the flow of the document
      keyhole!.style.display = "none";
      key!.style.display = "none";

      // remove the event listeners, most notably the one on the window
      window.removeEventListener("mousemove", updateKeyPosition);
      keyhole!.removeEventListener("mouseover", grantAccess);
    };


    // retrieve the dimensions of the key (to have the key exactly where the cursor would lie)
    const keyBox = key?.getBoundingClientRect();
    const timeoutID = setTimeout(() => {
      // after the specified time, change the cursor as to seemingly grab the key
      key!.parentElement!.parentElement!.style.cursor = "grab";

      // introduce the key and keyhole svg elements by triggering the paused-by-default animation
      key!.style.animationPlayState = "running";
      keyhole!.style.animationPlayState = "running";

      // ! pointer-events set to none on the key to allow for a mouseover event on the keyhole
      // the key is indeed used in stead of the normal cursor and would overlap on top of everything
      key!.style.pointerEvents = "none";

      // when the cursor hovers anywhere in the window, call a function to update the position of the key and have it match the cursor
      window.addEventListener("mousemove", updateKeyPosition);

      // when the cursor hovers on the keyhole, call a function to grant access and remove present listeners
      keyhole!.addEventListener("mouseover", grantAccess);

      clearTimeout(timeoutID);
    }, keyTimer);

  }

  ngOnInit(): void {
  }

}

