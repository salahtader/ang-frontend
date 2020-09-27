import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  
  //For logo
  @Input() imgPath:string = "/assets/nav/";
  logo:string = "logo.png";
  constructor() { }

  ngOnInit() {
  }

}
