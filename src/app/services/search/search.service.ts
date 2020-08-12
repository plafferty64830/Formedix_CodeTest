import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private _http: HttpClient,
  ) { }
 
  searchUrl = "https://www.flickr.com/services/rest/"

  searchImg(searchStr:string){
    return this._http.get<any>(
      this.searchUrl, { params: { method: "flickr.photos.search",
                                  api_key: "774f6f029894d443515632589c9d2e4f",
                                  text: searchStr.replace(" ","+"),
                                  format: "json",
                                  nojsoncallback: "1" }}
    );
  }

}
