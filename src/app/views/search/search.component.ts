import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { Image } from '../../classes/image/image';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RelatedImgService } from '../../services/relatedImg/related-img.service';
import { Search } from '../../classes/search/search';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  /* array to store the images that come from the flickr api */
  images: Array<Image> = [];
  image:Image;
  imgAvail:string = '';

  /* array to stroe the related searches from the dictionary api */
  searches: Array<Search> = [];
  search:Search;
  searchAvail:string = '';

  searchForm: FormGroup;

  urlParams = new URLSearchParams(window.location.search);

  constructor(private searchServ: SearchService,
              private relatedImg: RelatedImgService,
              private fb: FormBuilder,
              private router: Router) {
              
    this.searchForm = this.fb.group({
      searchStr: ['', Validators.required]
    })
  }

  /* ngOnInit runs when the component loads */
  ngOnInit(): void {
    /* if there is no 'search' query parameter search for for 'formedix' so there are some images displayed on load */
    if(this.urlParams.get('search') === ""){
      this.searchImg('formedix');
    }else{
      this.searchImg(this.urlParams.get('search'));
    }
    
  }

  /* get images from the flickr api using the searchService */
  searchImg(searched:string){
    this.searchAvail = '';
    this.imgAvail = '';
    this.images = [];
    if(searched === ""){
      searched = this.searchForm.value.searchStr;
    }

    this.searchForm.patchValue({searchStr: searched});

    return this.searchServ.searchImg(searched)
      .subscribe((data:any) => {
        data.photos.photo.forEach((photo:any) => {
          /* links are broken where the farm is 0 so skip */ 
          if(photo.farm === '0'){return;}
          let image = new Image(photo.farm,
                                photo.server,
                                photo.id,
                                photo.secret,
                                photo.title,
                                "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
          this.images.push(image);
        });
        /* set the imgAvail variable so the ngIf will allow the images to be displayed on the web front end */
        this.imgAvail = "imgAvailable";
        
        /* get the related searches */
        this.getRelated(searched);
      });

      
    
  }

  /* use dictionaryApi to get similar words to the current search */
  getRelated(search:string){
    this.searches = [];
    let count:number = 0;
    return this.relatedImg.relatedSearch(search)
      .subscribe((data:any) => {
        /* if no data returned in the meta array leave - means no similar searches */
        if(data[0].meta === null || data[0].meta === "" || data[0].meta === undefined){
          return;
        }
        
        /* get the length of the related items array */
        let len = data[0].meta.syns[0].length;
        /* if greater than 12 set to 12 */
        if(len > 12){len = 12}
        
        for(let i = 0; i < len; i++){
          let search = new Search(data[0].meta.syns[0][i]);
          this.searches.push(search);
          count = count + 1;
        }
        this.searchAvail = "searchAvailable";
      });
  }

  showImgView(link:string, title:string){
    this.router.navigate(['/imgView'], { queryParams: { img: link, 
                                                        title: title,
                                                        search: this.searchForm.value.searchStr } });
  }

}
