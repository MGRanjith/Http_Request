import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './model/products';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http:HttpClient){

  }

  createproduct(products:{pname:string,desc:string,price:string}){
    console.log(products)
    this.http.post<{name:string}>('https:httprequest-b3a89-default-rtdb.europe-west1.firebasedatabase.app/product.json',products)
  
    .subscribe((res)=>{
      console.log(res)
    })
  }

  fecthproduct(){
     return this.http.get<{[key:string]:Product}>('https:httprequest-b3a89-default-rtdb.europe-west1.firebasedatabase.app/product.json')
    .pipe(map((res)=>{
      const products=[]
      for(const key in res){
        if(res.hasOwnProperty(key))
        products.push({...res[key],id:key})
      }
      return products
    }))
  }
  deleteproduct(id:string){
    this.http.delete('https:httprequest-b3a89-default-rtdb.europe-west1.firebasedatabase.app/product/'+id+'.json')
    .subscribe(()=>{
      alert("Are delate this person")
    })
  }


  deleteallproduct(){
    this.http.delete('https:httprequest-b3a89-default-rtdb.europe-west1.firebasedatabase.app/product.json')
    .subscribe()
  }
  Updateproduct(id:string,value:Product){
    this.http.put('https:httprequest-b3a89-default-rtdb.europe-west1.firebasedatabase.app/product/'+id+'.json',value)
    .subscribe()
  }
}
