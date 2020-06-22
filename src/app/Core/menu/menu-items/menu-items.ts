import { Injectable } from '@angular/core';

/*
 * Menu interface
 */
export interface Menu {
  state: string;
  name?: string;
  type?: string;
  icon?: string;
  children?: Menu[];
}

const HeaderOneItems = [
  {
    state: "home-two",
    name: "HOME",
    type: "link",
    icon: "home",
    children: [
      // {
      //   state: 'home',
      //   name: 'HOME ONE',
      //   type: 'link',
      //   icon: 'home'
      // },
      // {
      //   state: 'home-two',
      //   name: 'HOME TWO',
      //   type: 'link',
      //   icon: 'home'
      // },
      // {
      //   state:'home-three',
      //   name: 'HOME THREE',
      //   type: 'link',
      //   icon: 'home'
      // }
    ]
  },
  {
    state: "",
    name: "HOME EQUIPMENT",
    type: "sub",
    icon: "pages",
    children: [
      {
        state: 'products',
        name: 'TreadMill',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Cross Trainers',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Recumbent Bikes',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Upright Bikes',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Ab Equipment',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Gyms',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Massagers',
        type: 'link',
        icon: 'arrow_right_alt'
      }
    ]
  },


  {
    state: "",
    name: "COMMERCIAL EQUIPMENT",
    type: "sub",
    icon: 'party_mode',
    children: [
      {
        state: 'products',
        name: 'TreadMill',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Cross Trainers',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Recumbent Bikes',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Upright Bikes',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Spin Bikes',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Single Stations',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Benches',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Multi-Gyms',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Racks',
        type: 'link',
        icon: 'arrow_right_alt'
      },
      {
        state: 'products',
        name: 'Flooring',
        type: 'link',
        icon: 'arrow_right_alt'
      }
    ]
  },
  // {
  //   state:'products',
  //   name:"CATEGORIES",
  //   type:"sub",
  //   mega:true,
  //   icon: 'party_mode',
  //   children: [
  //     {
  //       state: 'men',
  //       name: 'MEN',
  //       type: 'sub',
  //       icon: 'arrow_right_alt',
  //       children:[
  //         {
  //           state: 'products/men',
  //           queryState:'Jeans',
  //           name: 'JEAN',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         },
  //         {
  //           state: 'products/men',
  //           queryState:'Jackets',
  //           name: 'JACKETS',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         },
  //         {
  //           state: 'products/men',
  //           queryState:'Shirt',
  //           name: 'SHIRT',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         },
  //         {
  //           state: 'products/men',
  //           queryState:'T-Shirt',
  //           name: 'T-SHIRT',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         }
  //       ]
  //     },
  //     {
  //       state: 'woman',
  //       name: 'WOMEN',
  //       type: 'sub',
  //       icon: 'arrow_right_alt',
  //       children:[
  //         {
  //           state: 'products/woman',
  //           queryState:'Dresses',
  //           name: 'DRESS',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         },
  //         {
  //           state: 'products/woman',
  //           queryState:'Shirt',
  //           name: 'SHIRT',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         },
  //         {
  //           state: 'products/woman',
  //           queryState:'T-Shirt',
  //           name: 'T-SHIRT',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         }
  //       ]
  //     },
  //     {
  //       state: 'gadgets',
  //       name: 'GADGETS',
  //       type: 'sub',
  //       icon: 'arrow_right_alt',
  //       children:[
  //         {
  //           state: 'products/gadgets',
  //           queryState:'Headphone',
  //           name: 'HEADPHONE',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         },
  //         {
  //           state: 'products/gadgets',
  //           queryState:'Smartphone',
  //           name: 'SMARTPHONE',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         },
  //         {
  //           state: 'products/gadgets',
  //           queryState:'Watch',
  //           name: 'WATCH',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         },
  //         {
  //           state: 'products/gadgets',
  //           queryState:'Speaker',
  //           name: 'SPEAKER',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         }
  //       ]
  //     },
  //     {
  //       state: 'accessories',
  //       name: 'ACCESSORIES',
  //       type: 'sub',
  //       icon: 'arrow_right_alt',
  //       children:[
  //         {
  //           state: 'products/accessories',
  //           queryState:'Laptap',
  //           name: 'LAPTOP ACCESSORIES',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         },
  //         {
  //           state: 'products/accessories',
  //           queryState:'Belts',
  //           name: 'BELTS',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         },
  //         {
  //           state: 'products/accessories',
  //           queryState:'Jewellery',
  //           name: 'JEWELLERY',
  //           type: 'queryParams',
  //           icon: 'arrow_right_alt',
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    state: "",
    name: "ACCESSORIES",
    type: "sub",
    icon: "pages",
    children: [
      {
        state: 'products',
        name: 'Balls',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'products',
        name: 'Dumbbells',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'products',
        name: 'General',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'products',
        name: 'Mats',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'products',
        name: 'Plates',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'products',
        name: 'Rods',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'products',
        name: 'Weighing Scale',
        type: 'link',
        icon: 'arrow_right_alt',
      }
    ]
  },
  {
    state: 'products',
    name: "OUTDOOR GYM",
    type: "link",
    icon: 'supervised_user_circle',
    // children: [
    //     {
    //     state: 'session/signin',
    //     name: 'SIGN IN',
    //     type: 'link',
    //     icon: 'arrow_right_alt',
    //     },
    //     {
    //         state: 'session/signup',
    //         name: 'REGISTER',
    //         type: 'link',
    //         icon: 'arrow_right_alt',
    //     },
    //     {
    //         state: 'session/forgot-password',
    //         name: 'FORGET PASSWORD',
    //         type: 'link',
    //         icon: 'arrow_right_alt',
    //     },
    //     {
    //         state: 'session/thank-you',
    //         name: 'THANK YOU',
    //         type: 'link',
    //         icon: 'arrow_right_alt',
    //     }
    // ]
  },
  // {
  //   state:'contact',
  //   name:"CONTACT US",
  //   type:"link",
  //   icon: 'perm_contact_calendar'
  // }
];

const FooterOneItems = [
  {
    state: '',
    name: "ABOUT",
    type: "sub",
    icon: '',
    children: [
      {
        state: 'about',
        name: 'ABOUT',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'term-condition',
        name: 'TERM AND CONDITION',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'return-policy',
        name: 'Return Policy',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'faq',
        name: 'FAQ',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'contact',
        name: "CONTACT US",
        type: "link",
        icon: 'perm_contact_calendar',
      },
      {
        state: 'delivery',
        name: "Delivery",
        type: "link",
        icon: 'perm_contact_calendar',
      },
      {
        state: 'customer-care',
        name: "Customer-care",
        type: "link",
        icon: 'perm_contact_calendar',
      },
    ]
  },
  {
    state: '',
    name: "SESSION",
    type: "sub",
    icon: '',
    children: [
      {
        state: 'session/signin',
        name: 'SIGN IN',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'session/signup',
        name: 'REGISTER',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'session/forgot-password',
        name: 'FORGET PASSWORD',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      // {
      //   state: 'session/thank-you',
      //   name: 'THANK YOU',
      //   type: 'link',
      //   icon: 'arrow_right_alt',
      // }
    ]
  },
  {
    state: '',
    name: "CATEGORIES",
    type: "sub",
    icon: '',
    children: [
      {
        state: 'products',
        name: 'Home Equipment',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'products',
        name: 'Commercial Equipment',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'products',
        name: 'Accessories',
        type: 'link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'products',
        name: 'Outdoor Gym',
        type: 'link',
        icon: 'arrow_right_alt',
      }
    ]
  },
  {
    state: '',
    name: "SOCIAL",
    type: "sub",
    icon: '',
    children: [
      {
        state: 'https://www.facebook.com/stayfitindia',
        name: 'Facebook',
        type: 'social_link',
        icon: 'arrow_right_alt',
      },
      {
        state: 'https://twitter.com/stayfit_india',
        name: 'Twitter',
        type: 'social_link',
        icon: 'arrow_right_alt',
      },
      // .
    ]
  }

]

@Injectable()
export class MenuItems {

  /*
   * Get all header menu
   */
  getMainMenu(): Menu[] {
    return HeaderOneItems;
  }

  /*
   * Get all footer menu
   */
  getFooterOneMenu(): Menu[] {
    return FooterOneItems;
  }
}
