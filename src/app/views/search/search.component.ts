import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search/search.service';
import { Image } from '../../classes/image/image';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RelatedImgService } from '../../services/relatedImg/related-img.service';
import { Search } from '../../classes/search/search';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  images: Array<Image> = [];
  image:Image;

  searches: Array<Search> = [];
  search:Search;
  searchAvail:string = '';

  searchForm: FormGroup;

  constructor(private searchServ: SearchService,
              private relatedImg: RelatedImgService,
              private fb: FormBuilder) {
              
    this.searchForm = this.fb.group({
      searchStr: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }

  searchImg(searched:string){
    this.searchAvail = '';
    this.images = [];
    if(searched === ""){
      searched = this.searchForm.value.searchStr;
    }

    this.searchForm.patchValue({searchStr: searched});

    return this.searchServ.searchImg(searched)
      .subscribe((data:any) => {
        data.photos.photo.forEach((photo:any) => {
          let image = new Image(photo.farm,
                                photo.server,
                                photo.id,
                                photo.secret,
                                photo.title,
                                "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg");
          this.images.push(image);
        });
        this.getRelated(searched);
      });

      
    
  }

  getRelated(search:string){
    this.searches = [];
    let count:number = 0;
    return this.relatedImg.relatedSearch(search)
      .subscribe((data:any) => {
        if(data[0].meta === null || data[0].meta === "" || data[0].meta === undefined){
          return;
        }
        data[0].meta.syns[0].forEach((item:any) => {
          let search = new Search(item);
          this.searches.push(search);
          count = count + 1;
          if(count === 12){
            this.searchAvail = "searchAvailable";
            return;
          }
        });
        this.searchAvail = "searchAvailable";
        console.log(this.searches);
      });
  }

}
