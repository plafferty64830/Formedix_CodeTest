import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RelatedImgService { 

  constructor(
    private _http: HttpClient,
  ) { }
 
  synUrl = ""

  relatedSearch(searchStr:string){
    this.synUrl = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/" + searchStr.replace(" ","-");
    return this._http.get<any>(
      this.synUrl, { params: { key: "612b9f84-c521-4fc9-99fb-3f486ce9b69d"}}
    );
  }

}
