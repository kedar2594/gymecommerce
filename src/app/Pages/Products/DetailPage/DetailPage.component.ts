import { HomeTwoService } from 'src/app/Pages/Home/home-two.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EmbryoService } from '../../../Services/Embryo.service';

@Component({
  selector: 'app-DetailPage',
  templateUrl: './DetailPage.component.html',
  styleUrls: ['./DetailPage.component.scss']
})
export class DetailPageComponent implements OnInit {

  id: any;
  type: any;
  apiResponse: any;
  singleProductData: any;
  productsList: any;
  products: any = {
    "men": [
      {
        "id": 1,
        "type": "men",
        "image": "assets/images/men/3-item-a.jpg",
        "name": "STAYFIT- Home Gym 1200",
        "brand": "Liod Marcos",
        "discount_price": 13.30,
        "price": 39990,
        "rating": 4,
        "availablity": true,
        "product_code": "#EM1201",
        "tags": ["Jean ", "Men ", "Outwear"],
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Slim Fit", "Stretchable", "Free Shipping and delivery in 4 Days"],
        "image_gallery": [
          "assets/images/men/3-item-a.jpg",
          "assets/images/men/3-item-b.jpg",
          "assets/images/men/3-item-c.jpg",
          "assets/images/men/3-item-d.jpg",
          "assets/images/men/3-item-e.jpg"
        ],
        "category": "Jeans",
        "category_type": "clothing",
        "color": "Blue",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 2,
        "type": "men",
        "brand": "Bull Riders",
        "image": "assets/images/men/2-item-a.jpg",
        "name": "PROFORM Neoprene Dumbells",
        "discount_price": 67.00,
        "price": 290,
        "rating": 5,
        "availablity": true,
        "product_code": "#EM1202",
        "tags": ["Winter ", "Men ", "Jacket"],
        "description": "Sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae! Lorem ipsum dolor",
        "features": ["Loose Fit", "Pure Leather", "Free Shipping and delivery in 2 Days"],
        "image_gallery": [
          "assets/images/men/2-item-a.jpg",
          "assets/images/men/2-item-b.jpg",
          "assets/images/men/2-item-c.jpg",
          "assets/images/men/2-item-d.jpg",
          "assets/images/men/2-item-e.jpg"
        ],
        "category": "Jackets",
        "category_type": "clothing",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 3,
        "type": "men",
        "brand": "Jeno Karla",
        "image": "assets/images/men/1-item-a.jpg",
        "name": "STAYFIT- RECUMBENT BIKE DR17A",
        "discount_price": 36.00,
        "price": 29990,
        "rating": 4,
        "availablity": true,
        "product_code": "#EM1203",
        "tags": ["Men ", "Pullover", "Denim"],
        "description": "Suspendisse porttitor ornare ligula. Nam massa erat, fermentum dolor quis, maximus ultrices diam. Aenean pellentesque auctor elementum. Nunc vitae tortor iaculis, mollis odio at, lacinia sapien. Mauris et leo sem. Curabitur sit amet enim nisi. Nunc placerat commodo sem, sed maximus purus",
        "features": ["Slim Fit", "Denim Made", "Free Shipping in some areas and delivery in 4 Days"],
        "image_gallery": [
          "assets/images/men/1-item-a.jpg",
          "assets/images/men/1-item-b.jpg",
          "assets/images/men/1-item-c.jpg",
          "assets/images/men/1-item-d.jpg",
          "assets/images/men/1-item-e.jpg"
        ],
        "category": "Shirt",
        "category_type": "clothing",
        "color": "Blue",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 4,
        "type": "men",
        "brand": "The Capressi",
        "image": "assets/images/men/4-item-a.jpg",
        "name": "STAYFIT- Motorised Treadmill i2.5",
        "discount_price": 32.00,
        "price": 48990,
        "rating": 5,
        "availablity": true,
        "product_code": "#EM1204",
        "tags": ["Blue", "Men", "Jean"],
        "description": "Dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Slim Fit", "Relaxed", "Free Shipping and delivery in 1 Days"],
        "image_gallery": [
          "assets/images/men/4-item-a.jpg",
          "assets/images/men/4-item-b.jpg",
          "assets/images/men/4-item-c.jpg",
          "assets/images/men/4-item-d.jpg",
          "assets/images/men/4-item-e.jpg"
        ],
        "category": "Jeans",
        "category_type": "clothing",
        "color": "Blue",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 5,
        "type": "men",
        "brand": "JK CK",
        "image": "assets/images/men/5-item-a.jpg",
        "name": "STAYFIT  Yoga Mat Mix Color 5 mm",
        "discount_price": 17.00,
        "price": 1200,
        "rating": 5,
        "availablity": true,
        "product_code": "#EM1205",
        "tags": ["Black ", "Men ", "Summer"],
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Slim Fit", "Pure Cotton", "Free Shipping and delivery in 4 Days"],
        "image_gallery": [
          "assets/images/men/5-item-a.jpg",
          "assets/images/men/5-item-b.jpg",
          "assets/images/men/5-item-c.jpg",
          "assets/images/men/5-item-d.jpg",
          "assets/images/men/5-item-e.jpg"
        ],
        "category": "T-Shirt",
        "category_type": "clothing",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 6,
        "type": "men",
        "brand": "Nike",
        "image": "assets/images/men/cat-shoes.jpg",
        "name": "STAYFIT-  Cross Trainer EB01A",
        "discount_price": 55.00,
        "price": 15990,
        "rating": 5,
        "availablity": true,
        "product_code": "#4330899",
        "tags": ["Black ", "White"],
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Leather", "Wipe with a clean, dry cloth to remove dust"],
        "image_gallery": [
          "assets/images/men/cat-shoes.jpg"
        ],
        "category": "Shoes",
        "category_type": "shoes",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": true
      }
    ],
    "women": [
      {
        "id": 7,
        "type": "women",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/pulldown.jpg",
        "name": "SF-008 Lat Pulldown",
        "discount_price": 75.00,
        "price": 10000,
        "rating": 5,
        "availablity": true,
        "product_code": "#EM1205",
        "tags": ["Red ", "Women ", "Outwear"],
        "description": "Amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Regular Fit ", "Pure Cotton ", "Delivery in 3 Days"],
        "image_gallery": [
          "assets/images/women/6-item-a.jpg",
          "assets/images/women/6-item-b.jpg",
          "assets/images/women/6-item-c.jpg",
          "assets/images/women/6-item-d.jpg",
          "assets/images/women/6-item-e.jpg"
        ],
        "category": "Dresses",
        "category_type": "clothing",
        "color": "Red",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 8,
        "type": "women",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/twister.jpg",
        "name": "STAYFIT Twister With Stand",
        "discount_price": 45.00,
        "price": 19990,
        "rating": 4,
        "availablity": true,
        "product_code": "#EM1206",
        "tags": ["Blue ", "Outwear ", "Denim"],
        "description": "Dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Loose Fit", "Pure Denim", "Free Shipping and delivery in 2 Days"],
        "image_gallery": [
          "assets/images/women/7-item-a.jpg",
          "assets/images/women/7-item-b.jpg",
          "assets/images/women/7-item-c.jpg",
          "assets/images/women/7-item-d.jpg",
          "assets/images/women/7-item-e.jpg"
        ],
        "category": "Shirt",
        "category_type": "clothing",
        "color": "Blue",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 9,
        "type": "women",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/Verticle Raise with Bench.png",
        "name": "Black Dress",
        "discount_price": 12.00,
        "price": 15.75,
        "rating": 5,
        "availablity": true,
        "product_code": "#EM1207",
        "tags": ["Red ", "Women ", "Outwear"],
        "description": "Consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Slim Fit", "Pure Cotton", "Free Shipping and delivery in 4 Days"],
        "image_gallery": [
          "assets/images/women/8-item-a.jpg",
          "assets/images/women/8-item-b.jpg",
          "assets/images/women/8-item-c.jpg",
          "assets/images/women/8-item-d.jpg",
          "assets/images/women/8-item-e.jpg"
        ],
        "category": "Dresses",
        "category_type": "clothing",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 10,
        "type": "women",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/Ankle-wrap-weights.jpg",
        "name": "STAYFIT Ankle Wrap Weights",
        "discount_price": 15.00,
        "price": 1200,
        "rating": 5,
        "availablity": true,
        "product_code": "#EM1208",
        "tags": ["White ", "Graphic ", "Women"],
        "description": "Sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Slim Fit ", "100% Cotton ", "Free Shipping and delivery in 4 Days"],
        "image_gallery": [
          "assets/images/women/9-item-b.jpg",
          "assets/images/women/9-item-c.jpg",
          "assets/images/women/9-item-d.jpg",
          "assets/images/women/9-item-e.jpg"
        ],
        "category": "T-Shirt",
        "category_type": "clothing",
        "color": "White",
        "quantity": 1,
        "status": 0,
        "popular": false
      }
    ],
    "gadgets": [
      {
        "id": 11,
        "type": "gadgets",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/Leg Massager.jpg",
        "name": "STAYFIT LEG MASSAGES",
        "discount_price": 90.00,
        "price": 21000,
        "rating": 5,
        "availablity": true,
        "product_code": "#EM1209",
        "tags": ["Headphone", "Gadgets", "Electronic"],
        "description": "Ipsum dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Bass Boosted ", "Start/Pause Button ", "Skype/Video Call Compatible"],
        "image_gallery": [
          "assets/images/gadgets/g-1-a.jpg",
          "assets/images/gadgets/g-1-b.jpg",
          "assets/images/gadgets/g-1-c.jpg",
          "assets/images/gadgets/g-1-d.jpg"
        ],
        "category": "Headphone",
        "category_type": "gadgets",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 12,
        "type": "gadgets",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/Gymball.jpg",
        "name": "STAYFIT Gymball 75cms",
        "discount_price": 655.00,
        "price": 1500,
        "rating": 4,
        "availablity": true,
        "product_code": "#EM1210",
        "tags": ["Phone ", "Smartphone ", "New"],
        "description": "Dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Full Screen Touch", "6GB Ram and 128 Gb Memory", "Wireless Headphone"],
        "image_gallery": [
          "assets/images/gadgets/g-2-a.jpg",
          "assets/images/gadgets/g-2-b.jpg",
          "assets/images/gadgets/g-2-c.jpg",
          "assets/images/gadgets/g-2-d.jpg"
        ],
        "category": "Smartphone",
        "category_type": "gadgets",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 13,
        "type": "gadgets",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/Skipping-Rope.jpg",
        "name": "STAYFIT Skipping Rope",
        "discount_price": 225.56,
        "price": 250,
        "rating": 4,
        "availablity": true,
        "product_code": "#EM12012",
        "tags": ["Analog/Digital ", "Men/Women ", "Black"],
        "description": "Dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Soft Leather", "Chargable", "Delivery in 4 Days"],
        "image_gallery": [
          "assets/images/gadgets/g-3-a.jpg",
          "assets/images/gadgets/g-3-b.jpg",
          "assets/images/gadgets/g-3-c.jpg",
          "assets/images/gadgets/g-3-d.jpg"
        ],
        "category": "Watch",
        "category_type": "gadgets",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": true
      },
      {
        "id": 14,
        "type": "gadgets",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/steel-rod.jpg",
        "name": "STAYFIT Steel Rod",
        "discount_price": 458.00,
        "price": 990,
        "rating": 5,
        "availablity": true,
        "product_code": "#EM1213",
        "tags": ["Analog/Digital ", "Men/Women ", "Black"],
        "description": "Opsum dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Touch Screen", "Bluetooth", "Free Shipping and delivery in 4 Days"],
        "image_gallery": [
          "assets/images/gadgets/g-4-a.jpg",
          "assets/images/gadgets/g-4-b.jpg",
          "assets/images/gadgets/g-4-c.jpg",
          "assets/images/gadgets/g-4-d.jpg",
          "assets/images/gadgets/g-4-e.jpg"
        ],
        "category": "Watch",
        "category_type": "gadgets",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 15,
        "type": "gadgets",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/Tramploine.jpg",
        "name": "STAYFIT-Trampoline TP55",
        "discount_price": 698.45,
        "price": 9999,
        "rating": 5,
        "availablity": true,
        "product_code": "#EM1214",
        "tags": ["Speaker", "Smart", "Circular"],
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Woofer", "Wireless", "Free Shipping and delivery in 4 Days"],
        "image_gallery": [
          "assets/images/gadgets/g-5-a.jpg",
          "assets/images/gadgets/g-5-b.jpg",
          "assets/images/gadgets/g-5-c.jpg",
          "assets/images/gadgets/g-5-d.jpg"
        ],
        "category": "Speaker",
        "category_type": "gadgets",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": false
      }
    ],
    "accessories": [
      {
        "id": 16,
        "type": "accessories",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/Vibrofit.jpg",
        "name": "STAYFIT-VIBROFIT",
        "discount_price": 88.00,
        "price": 24990,
        "rating": 4,
        "availablity": true,
        "product_code": "#EM1215",
        "tags": ["Black", "Laptop", "Bags"],
        "description": "Adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae! Lorem ipsum dolor sit amet consectetur",
        "features": ["Dell/Mac/Acer Laptop Bag", "Pure Leather", "20 Kg Capacity"],
        "image_gallery": [
          "assets/images/accessroies/a-1-a.jpg",
          "assets/images/accessroies/a-1-b.jpg",
          "assets/images/accessroies/a-1-c.jpg",
          "assets/images/accessroies/a-1-d.jpg"
        ],
        "category": "Laptap",
        "category_type": "accessories",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": true
      },
      {
        "id": 17,
        "type": "accessories",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/Neoprene-Gloves.jpg",
        "name": "PROFORM Neoprene Gloves",
        "discount_price": 44.00,
        "price": 1000,
        "rating": 4,
        "availablity": true,
        "product_code": "#EM1216",
        "tags": ["Tan", "Belts", "Leather"],
        "description": "Uorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Pure Leather", "Water Proof", "Steel Buckle"],
        "image_gallery": [
          "assets/images/accessroies/a-2-a.jpg",
          "assets/images/accessroies/a-2-b.jpg",
          "assets/images/accessroies/a-2-c.jpg",
          "assets/images/accessroies/a-2-d.jpg"
        ],
        "category": "Belts",
        "category_type": "accessories",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 18,
        "type": "accessories",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/Dip-Stand.jpg",
        "name": "STAYFIT Dip Stand",
        "discount_price": 78.00,
        "price": 750,
        "rating": 5,
        "availablity": true,
        "product_code": "#EM1217",
        "tags": ["Chain", "Long Chain", "Accessories"],
        "description": "Ipsum dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Slim Fit", "Pure Steel", "Free Shipping and delivery in 7 Days"],
        "image_gallery": [
          "assets/images/accessroies/a-3-a.jpg",
          "assets/images/accessroies/a-3-b.jpg",
          "assets/images/accessroies/a-3-c.jpg",
          "assets/images/accessroies/a-3-d.jpg"
        ],
        "category": "Jewellery",
        "category_type": "accessories",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 19,
        "type": "accessories",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/figure-trimmer.jpg",
        "name": "STAYFIT Twister/Figure Trimmer",
        "discount_price": 14.00,
        "price": 15990,
        "rating": 5,
        "availablity": true,
        "product_code": "#EM1218",
        "tags": ["Tan", "Men", "Money"],
        "description": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Slim Designed", "Pure Leather", "Credit/Debit Cards Pockets"],
        "image_gallery": [
          "assets/images/accessroies/a-4-a.jpg",
          "assets/images/accessroies/a-4-b.jpg",
          "assets/images/accessroies/a-4-c.jpg",
          "assets/images/accessroies/a-4-d.jpg"
        ],
        "category": "Purse",
        "category_type": "accessories",
        "color": "Brown",
        "quantity": 1,
        "status": 0,
        "popular": false
      },
      {
        "id": 20,
        "type": "accessories",
        "brand": "Liod Marcos",
        "image": "assets/images/gym/Weighing.jpg",
        "name": "STAYFIT-WEIGHING SCALE M02",
        "discount_price": 14.00,
        "price": 3800,
        "rating": 5,
        "availablity": true,
        "product_code": "#EM1219",
        "tags": ["Black", "Men", "Shape"],
        "description": "Iit amet consectetur, adipisicing elit. Distinctio aperiam debitis ipsa veniam eos quas excepturi quae? Recusandae distinctio nihil quia quis, eaque aspernatur perferendis repudiandae adipisci labore, impedit beatae!",
        "features": ["Smooth Finishing", "Soft", "Free Shipping and delivery in 4 Days"],
        "image_gallery": [
          "assets/images/accessroies/a-5-a.jpg",
          "assets/images/accessroies/a-5-b.jpg",
          "assets/images/accessroies/a-5-c.jpg",
          "assets/images/accessroies/a-5-d.jpg"
        ],
        "category": "Goggles",
        "category_type": "Accessories",
        "color": "Black",
        "quantity": 1,
        "status": 0,
        "popular": true
      }
    ]
  }

  constructor(private route: ActivatedRoute,
    private router: Router,
    public embryoService: EmbryoService, private homeService: HomeTwoService) {

  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.id = res.id;
      console.log(this.id);
      this.type = res.type;
      this.getFeaturedProducts(this.id);
    })
  }
  getFeaturedProducts(productid) {
    this.homeService.viewProdSpecification(productid).subscribe((data: any) => {
      if (data.isStatus == true) {
        console.log(data.response);
        this.singleProductData = data.response;

      }
    })
  }


  // public getData() {
  //    this.embryoService.getProducts().valueChanges().subscribe(res => this.checkResponse(res));
  // }

  // public checkResponse(response) {
  //    this.productsList = null;
  //    this.productsList = this.products.men;
  //    for(let data of this.productsList)
  //    {
  //       if(data.id == this.id) {
  //          this.singleProductData = data;
  //          break;
  //       }
  //    }
  // }

  public addToCart(value) {
    this.embryoService.addToCart(value);
  }

  public addToWishList(value) {
    this.embryoService.addToWishlist(value);
  }

}
