import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section-ii',
  templateUrl: './section-ii.component.html',
  styleUrls: ['./section-ii.component.css']
})
export class SectionIiComponent implements OnInit {
  @Input() imgPath:string = "/assets/section2/banner.png";
  constructor() { }

  ngOnInit() {
  }

}
