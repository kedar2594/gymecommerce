import { HomeTwoService } from './../../../Pages/Home/home-two.service';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { MenuItems } from '../../../Core/menu/menu-items/menu-items';

@Component({
  selector: 'embryo-Menu',
  templateUrl: './Menu.component.html',
  styleUrls: ['./Menu.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuComponent implements OnInit {
  menueItems: any;

  expanded: boolean;
  subId: any;

  constructor(public menuItems: MenuItems, public router: Router,
    public translate: TranslateService, private homeService: HomeTwoService) {
    this.getMenueItemList();
  }

  ngOnInit() {
  }

  public onItemSelected(item: any) {
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }


  public redirectTo(subchildState) {
    this.router.navigate([subchildState.state], { queryParams: { category: subchildState.queryState } });
  }

  getMenueItemList() {
    this.homeService.viewTopbarMenues().subscribe((data: any) => {
      if (data.isStatus == true) {

        this.menueItems = data.response;
      }
    })
  }

  navigateToProducts(child) {
    console.log('Menu', child);
    this.subId = child.subCategoryId;
    console.log('checkingForIdinProducts', this.subId);
    this.router.navigate(['/products', { subId: child.subCategoryId, subName: child.name }]);

  }

}
