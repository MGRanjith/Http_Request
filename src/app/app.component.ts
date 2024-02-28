import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from './model/products';
import { map } from 'rxjs/operators';
import { HttpserviceService } from './httpservice.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularHttpRequest';

  allproducts:Product[]=[]
  @ViewChild('productForm')form:NgForm;
  editmode:boolean=false
  currentproductid:string;
  constructor(private http:HttpClient, private producthttp:HttpserviceService){}

   ngOnInit(): void {
     this.fecthproduct()
   }
   onproductfecth(){
    this.fecthproduct()
   }
  
  productcreated(products:{pname:string,desc:string,price:string}){
    // console.log(products)
    // this.http.post<{name:string}>('https:httprequest-b3a89-default-rtdb.europe-west1.firebasedatabase.app/product.json',products)
    // .subscribe((res)=>{
    //   console.log(res)
      
    // })
     if(!this.editmode)
      this.producthttp.createproduct(products)
      else
      this.producthttp.Updateproduct(this.currentproductid,products)
     
   
  }
  
  private fecthproduct(){
    // this.http.get<{[key:string]:Product}>('https:httprequest-b3a89-default-rtdb.europe-west1.firebasedatabase.app/product.json')
    //  .pipe(map((res)=>{
    //   const products=[]
    //   for(const key in res){
    //         if(res.hasOwnProperty(key))
    //         products.push({...res[key],id:key})
    //       }
    //       return products;
    //  }))
    // .subscribe((res)=>{
    //   console.log(res)
    //   this.allproducts=res
    // })

    this.producthttp.fecthproduct().subscribe((products)=>{
      this.allproducts=products
      //this.isFecthing=false
   })
  }
  ondeleteproduct(id:string){
    // this.http.delete('https:httprequest-b3a89-default-rtdb.europe-west1.firebasedatabase.app/product/'+id+'.json')
    // .subscribe(()=>{
    //   alert("Are delate this person")
    // })
    this.producthttp.deleteproduct(id)
  }

  ondeleteallproduct(){
  //    this.http.delete('https:httprequest-b3a89-default-rtdb.europe-west1.firebasedatabase.app/product.json')
  //   .subscribe()
  // }
  this.producthttp.deleteallproduct()
}

onEditClicked(id:string){
    this.currentproductid=id
  let currentproduct=this.allproducts.find((p)=>{ return p.id ===id})
  console.log(currentproduct)
   console.log(this.form)
  this.form.setValue({
   pname:currentproduct.pname,
   desc:currentproduct.desc,
   price:currentproduct.price
   
  })
 this.editmode=true
 }
}



 