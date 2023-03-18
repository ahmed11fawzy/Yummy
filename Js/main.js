

$('.menuBtn').click(function(e){
   e.preventDefault();
   if($('.menulist').width()<100){
      $(".menulist").css({"width":"80%","padding-left":"20px"})
      $('.menuBtn i').removeClass('fa-bars')
      $('.menuBtn i').addClass('fa-xmark')
      new WOW().init();

   }
   

   else{
      $(".menulist").css({"width":"0%","padding-left":"0px"})
      $('.menuBtn i').addClass('fa-bars')
      $('.menuBtn i').removeClass('fa-xmark')
   }
})

/* ================home page ============================ */

let mealCards=$('#Container .col .card');

let container=$('#Container')
async function getAllMeal(){
   const result=await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
   const allMeal=await result.json();
   let arrOfMeals=await allMeal.meals;
   console.log(arrOfMeals)
   
   arrOfMeals.forEach(element => {
      /* console.log(element); */
       
      $('#Container').append(`
      <div class="col">
            <div class="card h-100">
               <img src="${element.strMealThumb}" class="card-img-top" alt="...">
               <div class="card-body">
                  <h5 class="card-title">${element.strMeal}</h5>
                  
               </div>
               
            </div>
            </div>
      `)
      

      
     
      
   })
   
   let box=$('#Container .card');
   for (let i= 0; i < box.length; i++) {
      box[i].addEventListener('click',function(e){
         console.log(e)
           console.log(e.target.innerText)
           showMealDetails(e.target.innerText)
        
      });
     
  }



   /* $("#Container").click(function(e){
      console.log(e)
      if(e.target.innerText!=''){
         console.log(e.target.innerText)
         showMealDetails(e.target.innerText)
      }
      
   }) */
  
   /* for (let i = 0; i < arrOfMeals.length; i++) {
   arrOfMeals[i].addEventListener('click',function(){
      console.log('hi')
   })
   
} */

}
getAllMeal();
/* =========================showing meal Details =============================== */




async function showMealDetails(M){
   
   let responseData=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${M}`);
   let responseObj=await responseData.json();
   let targetMeal= await responseObj.meals;
   console.log(targetMeal[0].strMeal)
   $('#searchFelids').remove()
   $("#Container").empty()
   $('#Container').after(`
   <div id="mealDetails" class="container mt-5">
      <div class=" row g-4">
         <div class="col-md-4 pe-3 ">
            <div>
               <img src=${targetMeal[0].strMealThumb} alt="" class="w-100 rounded-2" srcset="">
               <h2 class=" text-light" >${targetMeal[0].strMeal}</h2>
            </div>               
         </div>
         <div class="col-md-8 ps-4 ">
            <div>
               <h3 class=" text-light" >Structure</h3>
               <p class=" text-light">${targetMeal[0].strInstructions}</p>
               <h4 class=" text-light">Area: <span>${targetMeal[0].strArea}</span></h4>
               <h4 class=" text-light"> Recipes: </h4>
               <div>
                  <button href="" class="btn  bg-info-subtle text-success-emphasis">${targetMeal[0].strMeasure1}</button>
                  <button href="" class="btn  bg-info-subtle text-success-emphasis">${targetMeal[0].strMeasure2}</button>
                  <button href="" class="btn  bg-info-subtle text-success-emphasis">${targetMeal[0].strMeasure3}</button>
                  <button href="" class="btn  bg-info-subtle text-success-emphasis">${targetMeal[0].strMeasure4}</button>
                  <button href="" class="btn  bg-info-subtle text-success-emphasis">${targetMeal[0].strMeasure5}</button>
                  <button href="" class="btn  bg-info-subtle text-success-emphasis">${targetMeal[0].strMeasure6}</button>
                  
               </div>
                  
               
               <h4 class=" text-light">Tags:</h4>
               <div class="my-3">
                  <button class="btn bg-danger-subtle text-danger-emphasis ">${targetMeal[0].strTags}</button>
               </div>
               <div>
                  <a href="${targetMeal[0].strSource}" class="btn btn-success  ">source</a>
                  <a href="${targetMeal[0].strYoutube}" class="btn btn-danger" >youtube</a>
               </div>
            </div>
         </div>
      </div>

   </div>
   `)
}


/* =====================Search page ======================= */


let searchInpByName,searchInpByLetter;

$('.searchLink').click((e)=>{
   e.preventDefault();
   formContact.empty()
   $('#mealDetails').remove();
   $('#searchFelids').remove();
   $('#Container').before(
      `<div id='searchFelids' class=" container mx-auto row row-cols-md-2 g-4 px-5 mb-5">
         <div class="col">
            <input class=" w-100   "  placeholder="Search by name" type="search" name="" id="searchByName">
         </div>
         <div class="col">
            <input class=" w-100   " placeholder="Search by first Letter" type="search" name="" id="searchByLetter">
         </div>
      </div>
      
`)
   container.empty();
   searchInpByName=$('#searchByName');
   searchInpByLetter=$('#searchByLetter');
   searchInpByName.keyup(async function(){
      let nameInpValue =searchInpByName.val();
      searchByName(nameInpValue.charAt(0).toUpperCase()+nameInpValue.slice(1))
   })
   searchInpByLetter.keyup(async function(){
      let letterInpValue=searchInpByLetter.val();
      searchByLetterFun(letterInpValue);
   })
   $("#Container").click(function(e){
      console.log(e)
      if(e.target.innerText!=''){
         console.log(e.target.innerText)
         showMealDetails(e.target.innerText)
      }
      
   })
})
 /* console.log(searchInpByName); */

async function searchByName(x){
   console.log(x)
   let searchResult=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`)
   let mealObj=await searchResult.json();
   let meal= await mealObj.meals;
   console.log(meal)
   container.empty();
   formContact.empty();
   meal.forEach(m=>{$('#Container').append(`
      <div class="col">
            <div class="card h-100">
               <img src="${m.strMealThumb}" class="card-img-top" alt="...">
               <div class="card-body">
                  <h5 class="card-title">${m.strMeal}</h5>                 
               </div>
               
               </div>
      </div>
   `)})
   
}

async function searchByLetterFun(y){
   console.log(y);
   let searchLetterResult=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${y}`);
   let  allMeal=await searchLetterResult.json();
   let meal=allMeal.meals;
   console.log(allMeal);
   container.empty();
   formContact.empty();
   meal.forEach(m=>{$('#Container').append(`
      <div class="col">
            <div class="card h-100">
               <img src="${m.strMealThumb}" class="card-img-top" alt="...">
               <div class="card-body">
                  <h5 class="card-title">${m.strMeal}</h5>                 
               </div>
               
               </div>
      </div>
   `)})
}

/* ===============================Get list of all Categories================================ */

$('.categoriesLink').click(async function(e){
   e.preventDefault();
   let getCategories=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
   let categoriesData=await getCategories.json();
   let categories=categoriesData.categories;
   console.log(categories)
   $('#mealDetails').remove();
   $('#searchFelids').remove()
   container.empty();
   formContact.empty();
   categories.forEach(c=>{
      $('#Container').append(`
      <div class="col">
      <div class="card h-100">
         <img src="${c.strCategoryThumb}" class="card-img-top" alt="...">
         <div class="card-body">
            <h5 class="card-title">${c.strCategory}</h5>                 
         </div>
         
         </div>
      </div>
      `)
   })
   let box=$('#Container .card');
   for (let i= 0; i < box.length; i++) {
      box[i].addEventListener('click',function(e){
         console.log(e)
           console.log(e.target.innerText)
           showCategoriesDetails(e.target.innerText)
        
      });
     
  }
})
/* ==================================show categorieslist========================================= */
   async function showCategoriesDetails(C){
      let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${C}`);
      let categoriesArr=await response.json();
      let allCategory=await categoriesArr.meals;
      console.log(allCategory)
      container.empty();
      allCategory.forEach(element => {          
         $('#Container').append(`
         <div class="col">
               <div class="card h-100">
                  <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                  <div class="card-body">
                     <h5 class="card-title">${element.strMeal}</h5>
                     
                  </div>
                  
               </div>
               </div>
         `)
      })
      let box=$('#Container .card');
   for (let i= 0; i < box.length; i++) {
      box[i].addEventListener('click',function(e){
         console.log(e)
           console.log(e.target.innerText)
           showMealDetails(e.target.innerText)
        
      });
     
  }
   }
/* ========================= get list of Area ================================== */
$('.areaLink').click(async function(e){
   e.preventDefault();
   let getListOfArea=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
   let dataOfArea=await getListOfArea.json();
   let listOfArea=await dataOfArea.meals;
   console.log(listOfArea)
   $('#mealDetails').remove();
   container.empty();
   formContact.empty();
   listOfArea.forEach(a=>{
      $('#Container').append(`
      <div class="col">
      <div class="card h-100 text-center text-light bg-transparent">
         <i class="fa-solid fa-house-laptop fa-4x"></i>
         <h5 class="card-title">${a.strArea}</h5>                 
         </div>
      </div>
      `)
   })
   let box=$('#Container .card');
   console.log(box)
   for (let i= 0; i < box.length; i++) {
      box[i].addEventListener('click',function(e){
         console.log(e)
           console.log(e.target.nextElementSibling.innerText)
           showAreaDetails(e.target.nextElementSibling.innerText)
        
      });
     
  }
})
/* ========================================================= */
async function showAreaDetails(A){
   let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${A}`);
   let areaData=await response.json();
   let areaMealsArr=await areaData.meals;
   console.log(areaData)
   container.empty();
   areaMealsArr.forEach(element => {

      $('#Container').append(`
      <div class="col">
            <div class="card h-100">
               <img src="${element.strMealThumb}" class="card-img-top" alt="...">
               <div class="card-body">
                  <h5 class="card-title">${element.strMeal}</h5>
                  
               </div>
               
            </div>
            </div>
      `)
   })
   let box=$('#Container .card');
   for (let i= 0; i < box.length; i++) {
      box[i].addEventListener('click',function(e){
         console.log(e)
           console.log(e.target.innerText)
           showMealDetails(e.target.innerText)
        
      });
     
  }
}
/* ========================= get list of Ingredients ================================== */

$('.ingredientLink').click(async function(e){
   e.preventDefault();
   let getAllIngredients=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
      ,dataOfIngredients=await getAllIngredients.json()
      ,listOfIngredients=dataOfIngredients.meals;
   console.log(listOfIngredients);
   $('#mealDetails').remove();   
   container.empty();
   formContact.empty();
   for (let i = 0; i < 20; i++) {
      $('#Container').append(`
      <div class="col">
      <div class="card h-100 text-center text-light bg-transparent">
         <i class="fa-solid fa-drumstick-bite fa-4x"></i>
         <h5 class="card-title">${listOfIngredients[i].strIngredient}</h5>
         <p>${listOfIngredients[i].strDescription.split(".", 1)}</p>                 
         </div>
      </div>
      
      `);
      
   }
   let box=$('#Container .card');
   console.log(box)
   for (let i= 0; i < box.length; i++) {
      box[i].addEventListener('click',function(e){
         console.log(e)
           console.log(e.target.nextElementSibling.innerText)
           showIngredientDetails(e.target.nextElementSibling.innerText)
        
      });
     
  }
})
/* =====================show ingredient=================================== */
async function showIngredientDetails(I){
   let response=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${I}`)
   let ingredientData=await response.json();
   let ingredientMealsArr=await ingredientData.meals;
   console.log(ingredientMealsArr)
   container.empty();

    ingredientMealsArr.forEach(element => {

      $('#Container').append(`
      <div class="col">
            <div class="card h-100">
               <img src="${element.strMealThumb}" class="card-img-top" alt="...">
               <div class="card-body">
                  <h5 class="card-title">${element.strMeal}</h5>
                  
               </div>
               
            </div>
            </div>
      `)
   })
   let box=$('#Container .card');
   for (let i= 0; i < box.length; i++) {
      box[i].addEventListener('click',function(e){
         console.log(e)
           console.log(e.target.innerText)
           showMealDetails(e.target.innerText)
        
      });
     
  }
}
/* ======================================================== */

let nameInp,emailInp,phoneInp,ageInp,passwordInp,repassInp;

let formContact=$('#formContact');
$('.contactLink').click(function(e){
   e.preventDefault();
   $('#mealDetails').remove();
   $('#Container').empty()
   formContact.append(`<div class="col">
   <input class="w-75 ms-auto d-block  form-control" placeholder="Enter Your Name" type="text" name="" id="userName">
</div>
<div class="col">
   <input class="w-75 d-block form-control"    placeholder="Enter Your Email" type="email" name="" id="userEmail">
</div>
<div class="col">
   <input class="w-75 ms-auto d-block form-control"   placeholder="Enter Your Phone" type="text" name="" id="phoneNum">
</div>
<div class="col">
   <input class="w-75 d-block form-control"   placeholder="Enter Your Age" type="number" name="" id="age">
</div>
<div class="col">
   <input class="w-75 ms-auto d-block form-control"  placeholder="Enter Your Password" type="password" name="" id="password">
</div>
<div class="col">
   <input class="w-75  d-block form-control" placeholder="Enter Your rePassword" type="password" name="" id="rePassword">
</div>
<div class=" w-100">
   <button id="submitBtn" class=" mx-auto d-block btn btn-outline-danger disabled ">submit</button>
</div>`)

   nameInp=$('#userName')
   ,emailInp=$('#userEmail')
   ,phoneInp=$('#phoneNum')
   ,ageInp=$('#age')
   ,passwordInp=$('#password')
   ,repassInp=$('#rePassword');

   $('#userName').on("input", function(){
      console.log(nameInp.val())
      nameCheck(nameInp.val());
   })
   $('#userEmail').on('input',function(){
      console.log(emailInp.val())
      userEmailValidation(emailInp.val());
   })
   $('#phoneNum').on('input',function(){
      checkPhone(phoneInp.val());
   })
   $('#password').on('input',function(){
      /* console.log(passwordInp.val()) */
      checkPassword(passwordInp.val())
   })
   $('#age').blur(function(){
      if(ageInp.val()>0 && ageInp.val()<100){
         $('#age').addClass('is-valid')
         $('#age').removeClass('is-invalid')
         return true;
      }
      else{
         $('#age').addClass('is-invalid')
         $('#age').removeClass('is-valid')
         return false;
      }
   })
   $('#rePassword').on('blur',function(){
      console.log(passwordInp.val())
      if(passwordInp.val()==repassInp.val()){
         $('#rePassword').addClass('is-valid')
         $('#rePassword').removeClass('is-invalid')
         $('#submitBtn').removeClass('disabled');
         
      }
      else{
         $('#rePassword').addClass('is-invalid')
         $('#rePassword').removeClass('is-valid')
         
      }
   })
   

   
})

/* ========================= Validation =============================== */

const nameRgx=new RegExp(/^[A-Z][a-zA-Z]+$/ )
     ,regEmailPattern=new RegExp(/^[A-Za-z]{2,25}[0-9]{2,9}(@gmail.com)$/)
     ,regPhonePattern=new RegExp(/^[0-9\-\+]{9,15}$/)
     ,regPasswordPattern=new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)

function nameCheck(n){
      console.log(n);
      if(nameRgx.test(n)){
        $('#userName').addClass('is-valid')
        $('#userName').removeClass('is-invalid')
         return true;
      }
      else{
        $('#userName').addClass('is-invalid')
        $('#userName').removeClass('is-valid')
         return false;
      }
   }

function userEmailValidation(e){
   if(regEmailPattern.test(e)){
      $('#userEmail').addClass('is-valid')
      $('#userEmail').removeClass('is-invalid')
      return true;
   }
   else{
      $('#userEmail').addClass('is-invalid')
      $('#userEmail').removeClass('is-valid')
      return true;
   }
}

function checkPhone(number){

   if(regPhonePattern.test(number)){
      $('#phoneNum').addClass('is-valid')
      $('#phoneNum').removeClass('is-invalid')
      return true;
   }
   else{
      $('#phoneNum').addClass('is-invalid')
      $('#phoneNum').removeClass('is-valid')
      return false;
   }
}

function checkPassword(pass){
   if(regPasswordPattern.test(pass)){
      $('#password').addClass('is-valid')
      $('#password').removeClass('is-invalid')
      return true;
   }
   else{
      $('#password').addClass('is-invalid')
      $('#password').removeClass('is-valid')
      return false;
   }
}


(function(){
   if($(document,window).ready()){
      $('.sk-circle').css({
         "display":"none",
      })
   }else{
      $('.sk-circle').css({
         "display":"block",
      })
   }
})()

