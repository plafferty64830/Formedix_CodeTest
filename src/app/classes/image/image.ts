export class Image {
  farm_id: string;
  server_id: string;
  id:string;
  secret:string;
  img_title:string;
  img_url:string;

  constructor(farm:string, serv:string, id:string, secret:string, title:string, url:string){
    this.farm_id = farm;
    this.server_id = serv;
    this.id = id;
    this.secret = secret;
    this.img_title = title;
    this.img_url = url;
  }
}
