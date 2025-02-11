"use strict";

const brandList = document.querySelectorAll('.brand-list li');
const productSection = document.querySelector('.product-section');
const textArea = document.querySelector(".filter-textarea");
const filterHeading = document.querySelector('.text-content');
const clearText = document.querySelector('.clear-txt');
const checkbox = document.querySelectorAll('.check');


let data;
fetchData();

async function fetchData() {
    try{
       const res = await fetch('data.json');
       data = await res.json()
       openContent(data)
       relevanceSection(data);
       mainRamFilter(data);
       mainBrandFIltering(data);
       mainPriceFiltering(data);
    }catch(err){
       console.log(err);
    } 
}; 

clearText.addEventListener('click' , handleClick);
 
function handleClick(){
    window.location.reload();
};

// ---------------------------------------------------------------WINDOW-OPEN-CONTENT----------------------------------------------------------------------

function openContent(data){
    if(!checkbox.checked){
        const sortList = document.querySelectorAll(".sort-list li");
        sortList.forEach(item => {
            item.addEventListener('click' , () => {
                sortList.forEach(list => list.classList.remove('active'));
                item.classList.add('active');
                const text = item.innerText;
                if(text === "Relevance"){
                    relevanceSection(data)
                }else{
                    if(text === "Price -- Low to High"){
                        const itemSorted = data.brands.sort((a,b) => Number(a.offerPrice) - Number(b.offerPrice))
                        sortedProductList(itemSorted);
                    }else if(text === "Price -- High to low"){
                        const itemSorted = data.brands.sort((a,b) => Number(b.offerPrice) - Number(a.offerPrice))
                        sortedProductList(itemSorted);
                    }else if(text === "Popularity"){
                        const itemSorted = data.brands.sort((a,b) => Number(b.ratings.average) - Number(a.ratings.average))
                        sortedProductList(itemSorted);
                    }
                }
            })
        });
        sortList[0].classList.add('active');
    };
};

function relevanceSection(item){
    item.brands.forEach((sort) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
               <div class="product-img">
                        <img src="${sort.image}" alt="" class="pro-img">
                        <div class="compare-txt">
                            <input type="checkbox" name="" id="">
                            <label for="">Add to Compare</label>
                        </div>
                    </div>
                    <div class="products-details">
                        <span class="phone-name">${sort.title}</span>
                        <span class="rating"><span class="rating-img">
                            <h2>${sort.ratings.average}</h2>
                            <img src="images/rating-star.svg" alt="">
                        </span>${sort.ratings.count} Rating & ${
          sort.ratings.reviewCount
        } Reviews</span>
                        <ul class="details-list">
                            ${sort.details
                              .map((detail) => `<li>${detail}</li>`)
                              .join("")}
                        </ul>
                    </div>
                    <div class="product-price">
                       <h2 class="price"> ₹ ${sort.offerPrice}</h2>
                       <div class="mrp">
                        <span>₹ ${sort.price}</span>
                        <h2>${sort.discount}</h2>
                       </div>
                       <h3 class="delivery-txt">${sort.delivery}</h3>
                    </div>
            `;
        productSection.appendChild(card);
      });
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-BRAND-SORTING-SECTION-!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let brandSortedArray = [];
let filteredResult = []
function mainBrandFIltering(data){
    brandList.forEach(item => {
        item.addEventListener('change' , () => {
            const checkbox = item.querySelector('input');
            let brandId = checkbox.id;
            if(checkbox.checked){
              const contentAdd = data.brands.filter(item => item.id === brandId);
              brandSortedArray.push(...contentAdd);
            }else{
              brandSortedArray = brandSortedArray.filter(item => item.id !== brandId)
            }
            

            openSortingPrice(brandSortedArray);
            sortingPrice(brandSortedArray);
            brandRamSort(brandSortedArray);
           
        });
    });
};


// ----------------------------------------------------------------------BRAND-RAM-SORTING---------------------------------------------------------------

let brandSortedRam = [];

function brandRamSort(details){
    const ramList = document.querySelectorAll(".ram-list li");

    ramList.forEach(item => {

        item.addEventListener('change' , () => {
        productSection.innerHTML = "";
        const checkbox = item.querySelector("input");
        let ram = Number(checkbox.id);

        if(checkbox.checked){
            console.log(ram);
            const sortedBrand = details.filter(item => item.ram === ram);
            brandSortedRam.push(...sortedBrand);
            console.log(brandSortedRam);
        }else{
            brandSortedRam  = brandSortedRam.filter(item => item.ram !== ram);
            console.log(brandSortedRam);
        };

        openSortingPrice(brandSortedRam);
        sortingPrice(brandSortedRam);
        brandRamPrice(brandSortedRam);

        });

    });
};



// ------------------------------------------------------BRAND-RAM-PRICE----------------------------------------------------------------

function brandRamPrice(data){

    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');

    let minValue;
    let maxValue;

    minRange.addEventListener('change' , () => {
    minValue = minRange.value;
    console.log(minValue)
    sortedBrandRamPrice(data,minValue,maxValue);
    });

    maxRange.addEventListener('change' , () => {
    maxValue = maxRange.value;
    console.log(maxValue);
    sortedBrandRamPrice(data,minValue,maxValue);
    });

};

let brandSorted = [];

function sortedBrandRamPrice(data,minValue,maxValue){
   const finalSorted = data.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
   console.log(finalSorted);
   brandSorted.push(...finalSorted)
   openSortingPrice(brandSorted);
   sortingPrice(brandSorted);
};


//  ----------------------------------------------------BRAND-PRICE-FILTERING---------------------------------------------------------------------------

let brandPriceSort = [];

function brandPriceFilter(data){
   const minRange = document.querySelector('.min-range');
   const maxRange = document.querySelector('.max-range');

   let minValue;
   let maxValue;

   minRange.addEventListener('change' , () => {
    minValue = minRange.value;
    console.log(minValue);
    sortedPricing(data,minValue,maxValue);
   });

   maxRange.addEventListener('change' , () => {
    maxValue = maxRange.value;
    console.log(maxValue);
    sortedPricing(data,minValue,maxValue);
   });

};


let newBrandPriceSort = [];

function sortedPricing(data,minValue,maxValue){
    const priceRange = data.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
    newBrandPriceSort.push(...priceRange);
    console.log(newBrandPriceSort);

    brandList.forEach(item => {
        item.addEventListener("change", () => {

            productSection.innerHTML = "";

            const checkbox = item.querySelector('input');
            const checkId = checkbox.id
            console.log(checkId);

            if(checkbox.checked){
                const sorted = brandSortedArray.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
                console.log(sorted)
                newBrandPriceSort.push(...sorted)
            }else{
                newBrandPriceSort = newBrandPriceSort.filter(item => item.id !== checkId)
            }
            openSortingPrice(newBrandPriceSort);
            sortingPrice(newBrandPriceSort);

        });
    });

    openSortingPrice(priceRange);
    sortingPrice(priceRange);
    brandPriceRam(newBrandPriceSort);
};


// -----------------------------------------------------BRAND-PRICE-RAM---------------------------------------

let newbrandsPriceRam = [];

function brandPriceRam(data){
    console.log(data)
    
    const ramLists = document.querySelectorAll('.ram-list li');
    ramLists.forEach(item => {
        item.addEventListener('change' , () => {
            productSection.innerHTML = "";
            const checkbox = item.querySelector('input');
            const ram = Number(checkbox.id);

            if(checkbox.checked){
                const filtredData = data.filter(item => item.ram === ram);
                newbrandsPriceRam.push(...filtredData);
            }else{
                newbrandsPriceRam = newbrandsPriceRam.filter(item => item.ram !== ram)
            }

            console.log(newBrandPriceSort);
            openSortingPrice(newbrandsPriceRam);
            sortingPrice(newbrandsPriceRam);
        });
    });
};


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-MAIN-RAM-FILTERING-SECTION-!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let ramFilteredArray = [];

function mainRamFilter(data){
   const ramList = document.querySelectorAll(".ram-list li");

   ramList.forEach(item => {
    item.addEventListener('change' , () => {
      productSection.innerHTML = "";
      const checkbox = item.querySelector("input");
      const ram = Number(checkbox.id);

        if(checkbox.checked){
            const sort = data.brands.filter(item => item.ram === ram)
            ramFilteredArray.push(...sort)
            console.log(ramFilteredArray)
        }else{
            ramFilteredArray = ramFilteredArray.filter(item => item.ram !== ram)
            console.log(ramFilteredArray);
        }

        openSortingPrice(ramFilteredArray);
        sortingPrice(ramFilteredArray);
        ramBrandSorting(ramFilteredArray);
        ramPriceSorting(ramFilteredArray);

    });

  });

};


// ----------------------------------------------------------------RAM-BRAND-SORTING--------------------------------------------------

let newRamBrands = [];

function ramBrandSorting(data){
    brandList.forEach(item => {
        item.addEventListener('change' , () => {
            const checkbox = item.querySelector('input');
            const id = checkbox.id;

            if(checkbox.checked){
                const newItems = data.filter(item => item.id === id);
                newRamBrands.push(...newItems);
            }else{
                newRamBrands = newRamBrands.filter(item => item.id !== id)
            }
            openSortingPrice(newRamBrands);
            sortingPrice(newRamBrands);
            ramBrandPriceSorting(newRamBrands);
        });
    });
};

// -----------------------------------------------------------RAM-BRAND-PRICE-SORTING-----------------------------------------------------------------------

let ramBrandPrice = [];

function ramBrandPriceSorting(data){
   const minRange = document.querySelector('.min-range');
   const maxRange = document.querySelector('.max-range');

   let minValue;
   let maxValue;

   minRange.addEventListener('change', () => {

    minValue = minRange.value;
    console.log(minValue);
    sortingRamBrandPrice(data,minValue,maxValue);

   });

   maxRange.addEventListener("change", () => {
    maxValue = maxRange.value;
    console.log(maxValue);
    sortingRamBrandPrice(data,minValue,maxValue);
   });

};

function sortingRamBrandPrice(data,minValue,maxValue){
    productSection.innerHTML = "";
    const sortedRam = data.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
    console.log(sortedRam)
    // ramBrandPrice.push(...sortedRam)
    sortedRam.forEach(item => {
        if(!ramBrandPrice.some(list => list.id === item.id)){
           ramBrandPrice.push(...sortedRam)
        }
    })
    openSortingPrice(ramBrandPrice);
    sortingPrice(ramBrandPrice);
};

// ---------------------------------------------------------RAM-PRICE-SORTING---------------------------------------------------------------

function ramPriceSorting(data){
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');

    let minValue;
    let maxValue;

    minRange.addEventListener('change', () => {
        minValue = minRange.value;
        sortingRamPrice(data,minValue,maxValue)
        console.log(minValue);
    })
   
    maxRange.addEventListener("change", () => {
       maxValue = maxRange.value;
       console.log(maxValue)
       sortingRamPrice(data,minValue,maxValue)
    });
}

let ramPrice = [];
function sortingRamPrice(data,minValue,maxValue){
    productSection.innerHTML = '';
    const sortedRam = data.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
    console.log(sortedRam)
    ramPrice.push(...sortedRam);
    openSortingPrice(ramPrice);
    sortingPrice(ramPrice);
    ramPriceBrandSorting(ramPrice)
}

let ramPriceBrand = [];

function ramPriceBrandSorting(data){
    brandList.forEach(item => {
        item.addEventListener('change' , () => {
            productSection.innerHTML = ''
            console.log("hello world")
            const checkbox = item.querySelector('input');
            const id = checkbox.id;

            if(checkbox.checked){
                const sortList = data.filter(item => item.id === id);
                ramPriceBrand.push(...sortList)
                console.log(ramPriceBrand);
            }else{
                ramPriceBrand = ramPriceBrand.filter(item.id !== id);
            };

            openSortingPrice(ramPriceBrand);
            sortingPrice(ramPriceBrand);
        });
    });
};

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-MAIN-PRICE-FILTERING-!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let newPriceArray = [];

function mainPriceFiltering(data){

  const minRange = document.querySelector('.min-range');
  const maxRange = document.querySelector('.max-range');

  let minValue;
  let maxValue;

  minRange.addEventListener('change' , () => {
    minValue = minRange.value;
    console.log(minValue)
    sortedPriceFiltering(data,minValue,maxValue);
  });

  maxRange.addEventListener('change' , () => {
    maxValue = maxRange.value;
    console.log(maxValue)
    sortedPriceFiltering(data,minValue,maxValue);
  });

};

function sortedPriceFiltering(data,minValue,maxValue){
  const priceRange = data.brands.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
  newPriceArray.push(...priceRange)
  openSortingPrice(newPriceArray);
  sortingPrice(newPriceArray);
  priceBrandSort(newPriceArray);
};

// -------------------------------------------------------------PRICE-BRAND-SORTING---------------------------------------------------------

let newPriceBrand = [];

function priceBrandSort(data){
    brandList.forEach(item => {
        item.addEventListener('change' , () => {
            const checkbox = item.querySelector('input');
            const id = checkbox.id;
            if(checkbox.checked){
                const newItems = data.filter(item => item.id === id);
                newPriceBrand.push(...newItems);
            }else{
                newPriceBrand = newPriceBrand.filter(item => item.id !== id)
            }
            openSortingPrice(newPriceBrand);
            sortingPrice(newPriceBrand);
            priceRamBrandSort(newPriceBrand);

        });
    });
};

// --------------------------------------------------------------PRICE-RAM-BRAND-SORTING-----------------------------------------

let priceRamBrand = [];
function priceRamBrandSort(data){
    const ramList = document.querySelectorAll(".ram-list li");
    ramList.forEach(item => {
        item.addEventListener('change' , () => {
            productSection.innerHTML = "";
            const checkbox = item.querySelector("input");
            const ram = Number(checkbox.id);
            if(checkbox.checked){
                const sorted = data.filter(item => item.ram === ram);
                priceRamBrand.push(...sorted);
            }else{
                console.log("hello world")
                priceRamBrand = priceRamBrand.filter(item => item.ram !== ram)
            }
            openSortingPrice(priceRamBrand);
            sortingPrice(priceRamBrand);
        }); 
    });
};


// -----------------------------------------------------COMMON-FOR-ALL-FILTERING-PROCESS------------------------------------------------------------------------

function openSortingPrice(item){
    productSection.innerHTML = '';
    item.forEach((sort) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
               <div class="product-img">
                        <img src="${sort.image}" alt="" class="pro-img">
                        <div class="compare-txt">
                            <input type="checkbox" name="" id="">
                            <label for="">Add to Compare</label>
                        </div>
                    </div>
                    <div class="products-details">
                        <span class="phone-name">${sort.title}</span>
                        <span class="rating"><span class="rating-img">
                            <h2>${sort.ratings.average}</h2>
                            <img src="images/rating-star.svg" alt="">
                        </span>${sort.ratings.count} Rating & ${
          sort.ratings.reviewCount
        } Reviews</span>
                        <ul class="details-list">
                            ${sort.details
                              .map((detail) => `<li>${detail}</li>`)
                              .join("")}
                        </ul>
                    </div>
                    <div class="product-price">
                       <h2 class="price"> ₹ ${sort.offerPrice}</h2>
                       <div class="mrp">
                        <span>₹ ${sort.price}</span>
                        <h2>${sort.discount}</h2>
                       </div>
                       <h3 class="delivery-txt">${sort.delivery}</h3>
                    </div>
            `;
        productSection.appendChild(card);
      });
};

function sortingPrice(details){
    const sortList = document.querySelectorAll(".sort-list li");
    sortList.forEach((item,index) => {
        item.addEventListener('click' , () => {
            sortList.forEach(list => list.classList.remove('active'));
            item.classList.add('active');
            const text = item.innerText;
            if(index === 0){
            }else{
                if(text === "Price -- Low to High"){
                    const itemSorted = details.sort((a,b) => Number(a.offerPrice) - Number(b.offerPrice))
                    sortedProductList(itemSorted);
                }else if(text === "Price -- High to low"){
                    const itemSorted = details.sort((a,b) => Number(b.offerPrice) - Number(a.offerPrice))
                    sortedProductList(itemSorted);
                }else if(text === "Popularity"){
                    const itemSorted = details.sort((a,b) => Number(b.ratings.average) - Number(a.ratings.average))
                    sortedProductList(itemSorted);
                }
            };
        });
    });
};


//-------------------------------------------------COMMON-FOR-ALL-THE-CONTENT-SORTING----------------------------------------------

function sortedProductList(item){
    productSection.innerHTML = "";
    item.forEach((sort) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
           <div class="product-img">
                    <img src="${sort.image}" alt="" class="pro-img">
                    <div class="compare-txt">
                        <input type="checkbox" name="" id="">
                        <label for="">Add to Compare</label>
                    </div>
                </div>
                <div class="products-details">
                    <span class="phone-name">${sort.title}</span>
                    <span class="rating"><span class="rating-img">
                        <h2>${sort.ratings.average}</h2>
                        <img src="images/rating-star.svg" alt="">
                    </span>${sort.ratings.count} Rating & ${
      sort.ratings.reviewCount
    } Reviews</span>
                    <ul class="details-list">
                        ${sort.details
                          .map((detail) => `<li>${detail}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="product-price">
                   <h2 class="price">₹ ${sort.offerPrice}</h2>
                   <div class="mrp">
                    <span>₹ ${sort.price}</span>
                    <h2>${sort.discount}</h2>
                   </div>
                   <h3 class="delivery-txt">${sort.delivery}</h3>
                </div>
        `;
    productSection.appendChild(card);
  });
};

