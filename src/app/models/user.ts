export class User { 
    id ?: number | string
  email : string
  password :string

   constructor(email,password) {
     this.email=email
     this.password=password
     
   }
 }    