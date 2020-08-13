import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-img-view',
  templateUrl: './img-view.component.html',
  styleUrls: ['./img-view.component.css']
})
export class ImgViewComponent implements OnInit {

  urlParams = new URLSearchParams(window.location.search);
  title:string = '';
  img:string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    /* get parameters passed to component */
    this.title = this.urlParams.get('title');
    this.img = this.urlParams.get('img');
  }

  backToSearch(){
    this.router.navigate(['/search'], { queryParams: { search: this.urlParams.get('search') } });
  }

}
