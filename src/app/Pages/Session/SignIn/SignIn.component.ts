import { SessionService } from './../session.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'signIn',
  templateUrl: './SignIn.component.html',
  styleUrls: ['./SignIn.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(public sessionService: SessionService) { }

  ngOnInit() {
    // let win = (window as any);
    // var urlParams = [];
    // window.location.search.replace("?", "").split("&").forEach(function (e, i) {
    //   var p = e.split("=");
    //   urlParams[p[0]] = p[1];
    // });

    // // We have all the params now -> you can access it by name
    // console.log(urlParams["loaded"]);

    // if (urlParams["loaded"]) { } else {

    //   let win = (window as any);
    //   win.location.search = '?loaded=1';
    //   //win.location.reload('?loaded=1');
    // }
  }

  register() {

  }

}
