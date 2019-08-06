import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openMenu = () => {
    if(document.getElementById('mobile_nav').style.opacity = "0"){
      document.getElementById('mobile_nav').style.opacity = "1";
      document.getElementById('mobile_nav').style.zIndex = "99";
    } else {
      document.getElementById('mobile_nav').style.opacity = "0";
      document.getElementById('mobile_nav').style.zIndex = "-1";
    }
    
  }

  closeMenu = () => {
    document.getElementById('mobile_nav').style.opacity = "0";
    document.getElementById('mobile_nav').style.zIndex = "-1";
  }
}
