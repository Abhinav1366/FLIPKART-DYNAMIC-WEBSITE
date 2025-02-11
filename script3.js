const brandList = document.querySelectorAll('.brand-list li');
const productSection = document.querySelector('.product-section');
const textArea = document.querySelector(".filter-textarea");
const filterHeading = document.querySelector('.text-content');
const clearText = document.querySelector('.clear-txt');
const checkbox = document.querySelectorAll('.check');

let data;
fetchData()
async function fetchData() {
    try{
       const res = await fetch('data.json');
       data = await res.json()
       openContent(data)
       relevanceSection(data);
      //  ramSorting(data)
    }catch(err){
       console.log(err);
    }
};


// --------------------------------------- WINDOW-OPEN-CONTENT--------------------------------------------------

function openContent(data){
    if(!checkbox.checked){
        const sortList = document.querySelectorAll(".sort-list li");
        sortList.forEach((item,index) => {
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
    }
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

// ---------------------------------------PRICE-SORTING----------------------------

let priceSorting = [];

const minRange = document.querySelector('.min-range');
const maxRange = document.querySelector('.max-range');

let minValue;
let maxValue;

minRange.addEventListener('change' , () => {
    minValue = minRange.value;
    priceSort(data,minValue,maxValue);
})

maxRange.addEventListener('change' , () => {
    maxValue = maxRange.value;
    priceSort(data,minValue,maxValue)
})

let isPriceSorting = false;

function priceSort(data,minValue,maxValue){
   isPriceSorting = true;
   if(brandsorting) return;
   if(isramSorting) return;
   const priceRange = data.brands.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
   console.log(priceRange)
   priceSorting.push(...priceRange);
   console.log(priceSorting)
   openSortingPrice(priceRange);
   sortingPrice(priceRange);
   priceRam(priceSorting);

};


// --------------------------------------------PRICE-BRAND-SORTING-------------------------------------------------

let brandId = '';
let priceBrandSorting = [];

brandList.forEach(item => {
    item.addEventListener('change' , () => {
        const checkbox = item.querySelector('input');
        brandId = checkbox.id;
        brandPriceSorting(brandId);
        priceRamBrandList(brandId);
        brandSortFilter(brandId);
        // ramBrandSoting(brandId);
        ramBranded(brandId);
    });
});

function brandPriceSorting(brandId){
    const brandPrice = priceSorting.filter(item => item.id === brandId);
    priceBrandSorting.push(...brandPrice)
    console.log(priceBrandSorting)
    openSortingPrice(priceBrandSorting);
    sortingPrice(priceBrandSorting);
    priceSortRam(priceBrandSorting);
    
};


function priceSortRam(details){
    const ramList = document.querySelectorAll(".ram-list li");
     ramList.forEach(item => {
       item.addEventListener('change' , () => {
         productSection.innerHTML = "";
         const checkbox = item.querySelector("input");
         const ram = Number(checkbox.id);

         if (ram === 8) {
             ramsList(ram,details);
           } else if (ram === 6) {
             ramsList(6,details);
           } else if (ram === 4) {
             ramsList(4,details);
           } else if (ram === 1) {
             ramsList(1,details);
           }
            
         })
     })
};

 let priceBrandRam = [];

 function ramsList(ram,item){
     const ramSort = item.filter(item => item.ram === ram)
     priceBrandRam.push(...ramSort)
     console.log(priceBrandRam)
     openSortingPrice(priceBrandRam);
     sortingPrice(priceBrandRam)
 };



// ---------------------------------------------------PRICE-RAM-BRAND--------------------------------------
let priceRamSort = [];

function priceRam(details){
    const ramList = document.querySelectorAll(".ram-list li");
    ramList.forEach(item => {
      item.addEventListener('change' , () => {
        productSection.innerHTML = "";
        const checkbox = item.querySelector("input");
        const ram = Number(checkbox.id);
        
        if (ram === 8) {
            priceRamsList(ram,details);
          } else if (ram === 6) {
            priceRamsList(6,details);
          } else if (ram === 4) {
            priceRamsList(4,details);
          } else if (ram === 1) {
            priceRamsList(1,details);
          }
           
        })
    })
}

function priceRamsList(ram , item){
    const sort = item.filter(item => item.ram === ram);
    console.log(sort)
    priceRamSort.push(...sort)
    openSortingPrice(priceRamSort);
    sortingPrice(priceRamSort)
}

let price = []
function priceRamBrandList(id){
    console.log(id)
    productSection.innerHTML = '';
    const brandRamlist = priceRamSort.filter(item => item.id === id);
    price.push(...brandRamlist)
    openSortingPrice(price);
    sortingPrice(price);
}

// ------------------------------------------- BRAND-FILTERING-SECTION-------------------------------------
// --------------------------------------------BRAND-RAM-PRICE----------------------------------

let brandItem = [];
let brandsorting = false;
function  brandSortFilter(brandId){
    if(isPriceSorting) return;
    if(isramSorting) return;
    brandsorting = true;
    const brandFilter = data.brands.filter(item => item.id === brandId);
    console.log(brandFilter);
    brandItem.push(...brandFilter);
    openSortingPrice(brandFilter);
    sortingPrice(brandFilter);
    brandRamSort(brandFilter)
    brandPriceSort(brandFilter)
}


function brandRamSort(details){
   const ramList = document.querySelectorAll(".ram-list li");
    ramList.forEach(item => {
      item.addEventListener('change' , () => {
        productSection.innerHTML = "";
        const checkbox = item.querySelector("input");
        const ram = Number(checkbox.id);
        
        if (ram === 8) {
            brandRamList(ram,details);
          } else if(ram === 6) {
            brandRamList(6,details);
          } else if(ram === 4) {
            brandRamList(4,details);
          } else if(ram === 1) {
            brandRamList(1,details);
          }
           
        })
    })
}


let brandramSort = [];

function brandRamList(ram,item){
    const sort = item.filter(item => item.ram === ram);
    brandramSort.push(...sort)
    openSortingPrice(brandramSort);
    sortingPrice(brandramSort);
    brandRamPriceSorting(brandramSort)

}

let brandRamPriceSort = [];

function brandRamPriceSorting(data){
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');

    let minValue;
    let maxValue;

  minRange.addEventListener('change' , () => {
    minValue = minRange.value;
    console.log(minValue)
    sortedPricing(data,minValue,maxValue);
  })

  maxRange.addEventListener('change' , () => {
    maxValue = maxRange.value;
    console.log(maxValue)
    sortedPricing(data,minValue,maxValue);
  })
}

function sortedPricing(data,minValue,maxValue){
    const priceRange = data.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
    brandRamPriceSort.push(...priceRange)
    openSortingPrice(brandRamPriceSort);
    sortingPrice(brandRamPriceSort);
}

// ----------------------------------------------------BRAND-PRICE-RAM----------------------------------
let BrandPriceSort = []
function brandPriceSort(data){
    const minRange = document.querySelector('.min-range');
    const maxRange = document.querySelector('.max-range');

    let minValue;
    let maxValue;

  minRange.addEventListener('change' , () => {
    minValue = minRange.value;
    console.log(minValue)
    sortedBrandPricing(data,minValue,maxValue);
  })

  maxRange.addEventListener('change' , () => {
    maxValue = maxRange.value;
    console.log(maxValue)
    sortedBrandPricing(data,minValue,maxValue);
  })
}

function sortedBrandPricing(data,minValue,maxValue){
    const priceRange = data.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
    BrandPriceSort.push(...priceRange)
    openSortingPrice(BrandPriceSort);
    sortingPrice(BrandPriceSort);
    sortedArray(BrandPriceSort)
}


let brandPriceRamSort = []

function sortedArray(details){
    const ramList = document.querySelectorAll(".ram-list li");
    ramList.forEach(item => {
      item.addEventListener('change' , () => {
        productSection.innerHTML = "";
        const checkbox = item.querySelector("input");
        const ram = Number(checkbox.id);
        
        if (ram === 8) {
            brandpriceRamList(ram,details);
          } else if(ram === 6) {
            brandpriceRamList(6,details);
          } else if(ram === 4) {
            brandpriceRamList(4,details);
          } else if(ram === 1) {
            brandpriceRamList(1,details);
          }
           
        })
    })
}

function brandpriceRamList(ram,item){
    const sort = item.filter(item => item.ram === ram);
    brandPriceRamSort.push(...sort)
    openSortingPrice(brandPriceRamSort);
    sortingPrice(brandPriceRamSort);
}
// --------------------------------------------RAM-SORTING-SECTION---------------------------------------
// let ramSortedData = []
// function ramSorting(data){
//   const ramList = document.querySelectorAll(".ram-list li");
//   ramList.forEach(item => {
//     item.addEventListener('change' , () => {
//       productSection.innerHTML = "";
//       const checkbox = item.querySelector("input");
//       const ram = Number(checkbox.id);
//       if (ram === 8) {
//           ramSortList(ram,data);
//         } else if(ram === 6) {
//           ramSortList(6,data);
//         } else if(ram === 4) {
//           ramSortList(4,data);
//         } else if(ram === 1) {
//           ramSortList(1,data);
//         }
         
//       })
//   })
// }
// let isramSorting = false
// function ramSortList(ram,item){
//     isramSorting = true;
//     const sort = item.brands.filter(item => item.ram === ram);
//     ramSortedData.push(...sort)
//     console.log(ramSortedData)
//     openSortingPrice(ramSortedData);
//     sortingPrice(ramSortedData);
//     ramPriceBrand(ramSortedData)
// }
// let ramBrandaaray = []
// function ramBrandSoting(brandId){
//   const sortedBrand = ramSortedData.filter(list => list.id === brandId);
//   console.log(sortedBrand)
//   ramBrandaaray.push(...sortedBrand)
//   openSortingPrice(ramBrandaaray);
//   sortingPrice(ramBrandaaray);
//   ramBrandPrice(ramBrandaaray)
// }

// let brandPriceList = [];
// function ramBrandPrice(data){
//    const minRange = document.querySelector('.min-range');
//     const maxRange = document.querySelector('.max-range');

//     let minValue;
//     let maxValue;

//   minRange.addEventListener('change' , () => {
//     minValue = minRange.value;
//     console.log(minValue)
//     sortedBrandPricing(data,minValue,maxValue);
//   })

//   maxRange.addEventListener('change' , () => {
//     maxValue = maxRange.value;
//     console.log(maxValue)
//     sortedBrandPricing(data,minValue,maxValue);
//   })
// }

// function sortedBrandPricing(data,minValue,maxValue){
//   const priceRange = data.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
//   brandPriceList.push(...priceRange)
//   openSortingPrice(brandPriceList);
//   sortingPrice(brandPriceList);
//   sortedArray(brandPriceList);
// }

// // ----------------------------------------------RAM-PRICE-BRAND-----------------------------------------
// let ramPriceList = []
// function ramPriceBrand(data){
//   const minRange = document.querySelector('.min-range');
//   const maxRange = document.querySelector('.max-range');

//   let minValue;
//   let maxValue;

//  minRange.addEventListener('change' , () => {
//   minValue = minRange.value;
//   console.log(minValue)
//   sortedBrandPricing(data,minValue,maxValue);
//  })

//  maxRange.addEventListener('change' , () => {
//   maxValue = maxRange.value;
//   console.log(maxValue)
//   sortedBrandPricing(data,minValue,maxValue);
//  })
// }

// function sortedBrandPricing(data,minValue,maxValue){
//   const priceRange = data.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
//   ramPriceList.push(...priceRange)
//   openSortingPrice(ramPriceList);
//   sortingPrice(ramPriceList);
// }
// let ramBrandedarray = []
// function ramBranded(id){
//    const sortedRamBrand = ramPriceList.filter(item => item.id === id)
//    ramBrandedarray.push
//    console.log(sortedRamBrand)
//    openSortingPrice(ramBrandedarray);
//   sortingPrice(ramBrandaaray);
// }
// ----------------------------------------------COMMON-FOR-PRICE-FILTERING-------------------------------

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



// ------------------------------------COMMON-ALL-PAGE-SORTING-FUNCTION -------------------------------------------

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
