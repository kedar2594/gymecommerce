import { Component, OnInit } from '@angular/core';
import { EmbryoService } from '../../../Services/Embryo.service';

@Component({
  selector: 'embryo-FixedHeader',
  templateUrl: './FixedHeader.component.html',
  styleUrls: ['./FixedHeader.component.scss']
})
export class FixedHeaderComponent implements OnInit {
  mobWidth: any;
  mobScreenSize: number = 767;
  constructor(private embryoService: EmbryoService) {
    this.mobWidth = window.screen.width;
    console.log(this.mobWidth);
  }

  ngOnInit() {
  }

  public toggleSidebar() {
    this.embryoService.sidenavOpen = !this.embryoService.sidenavOpen;
  }

}
