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
       ramSorting(data);
       priceFiltering(data);
       paginationFilter(data)
    }catch(err){
       console.log(err);
    }
};

// --------------------------------------------------------PAGINATION-IN-THE-PAGE---------------------------------------

clearText.addEventListener('click' , handleClick)
 
function handleClick(){
  window.location.reload();
}

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


// ---------------------------------------------------------BRAND-SORTING-SECTION--------------------------------------------------------------

let brandSortedArray = [];

brandList.forEach(item => {
    item.addEventListener('change' , () => {
        const checkbox = item.querySelector('input');
        brandId = checkbox.id;
        brandSortingFilter(brandId);
    });
});

function brandSortingFilter(id){
    if(isramSorting) return;
    // if(isPriceSorting) return;
    const sorted = data.brands.filter(item => item.id === id);
    brandSortedArray.push(...sorted)
    console.log(sorted)
    openSortingPrice(brandSortedArray);
    sortingPrice(brandSortedArray);
    brandRamSort(brandSortedArray);
    brandPriceSorting(brandSortedArray);
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
 const noResult = document.querySelector('.no-result');

 function brandRamList(ram,item){
    brandramSort = []
    const sort = item.filter(item => item.ram === ram);
     
    brandramSort.push(...sort)
    console.log(brandramSort)

    if(brandramSort.length === 0){
      console.log("hello world")
      noResult.classList.add('active')
    };

    openSortingPrice(brandramSort);
    sortingPrice(brandramSort);
    brandRamPriceSorting(brandramSort);
 }
 
//  ----------------------------------------------------BRAND-RAM-PRICE-SORTING-------------------------------------------------------------------

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
// ----------------------------------------------------BRAND-PRICE-RAM-----------------------------------------------------------------------------------

let brandsPriceSort = [];
function brandPriceSorting(data){
    // if(isPriceSorting) return
    console.log(data)
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
    brandsPriceSort.push(...priceRange)
    console.log(brandsPriceSort)
    openSortingPrice(brandsPriceSort);
    sortingPrice(brandsPriceSort);
}

// -------------------------------------------------MAIN-RAM-SORTING-SECTION------------------------------------------------------------------------------

let ramSortedData = [];

function ramSorting(data){
  // if(isPriceSorting) return;
  const ramList = document.querySelectorAll(".ram-list li");
  ramList.forEach(item => {
    item.addEventListener('change' , () => {
      productSection.innerHTML = "";
      const checkbox = item.querySelector("input");
      const ram = Number(checkbox.id);
      if (ram === 8) {
          ramSortList(ram,data);
        } else if(ram === 6){
          ramSortList(6,data);
        } else if(ram === 4){
          ramSortList(4,data);
        } else if(ram === 1){
          ramSortList(1,data);
        }
      });
  });
};

let isramSorting = false;

function ramSortList(ram,item){
    // if(isPriceSorting) return
    isramSorting = true;
    const sort = item.brands.filter(item => item.ram === ram);
    ramSortedData.push(...sort)
    console.log(ramSortedData)
    openSortingPrice(ramSortedData);
    sortingPrice(ramSortedData);
    ramBrand(ramSortedData);
    ramPriceList(ramSortedData)
}

// ------------------------------------------------RAM-BRAND-PRICE-SORTING--------------------------------------------------------------------------------

let rambrandArray = []

function ramBrand(data){
  let brandId = '';
  brandList.forEach(item => {
    item.addEventListener('change' , () => {
        const checkbox = item.querySelector('input');
        brandId = checkbox.id;
        const filteredData = data.filter(item => item.id === brandId);
        rambrandArray.push(...filteredData)
        openSortingPrice(rambrandArray);
        sortingPrice(rambrandArray);
        ramBrandPrice(rambrandArray);
  });
 });
}

function ramBrandPrice(data){
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

let ramBrandPriceArray = []
function sortedBrandPricing(data,minValue,maxValue){
  const priceRange = data.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
  ramBrandPriceArray.push(...priceRange)
  openSortingPrice(ramBrandPriceArray);
  sortingPrice(ramBrandPriceArray);
}

// ---------------------------------------------------------------RAM-PRICE-FILTERING--------------------------------------------------------------

let ramPriceSorted = [];
function ramPriceList(data){
  const minRange = document.querySelector('.min-range');
  const maxRange = document.querySelector('.max-range');

  let minValue;
  let maxValue;

 minRange.addEventListener('change' , () => {
  minValue = minRange.value;
  console.log(minValue)
  sortedBrandPricing(data,minValue,maxValue);
 })

 maxRange.addEventListener('change' , () =>{
  maxValue = maxRange.value;
  console.log(maxValue)
  sortedBrandPricing(data,minValue,maxValue);
 })
};

function sortedBrandPricing(data,minValue,maxValue){
  const priceRange = data.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
  ramPriceSorted.push(...priceRange);
  openSortingPrice(ramPriceSorted);
  sortingPrice(ramPriceSorted);
  ramPriceBrand(ramPriceSorted);
}

let ramPBrandArray = []
function ramPriceBrand(data){
  let brandId = '';
  brandList.forEach(item => {
    item.addEventListener('change' , () => {
        const checkbox = item.querySelector('input');
        brandId = checkbox.id;
        const filteredData = data.filter(item => item.id === brandId);
        console.log(filteredData)
        ramPBrandArray.push(...filteredData)
        openSortingPrice(ramPBrandArray);
        sortingPrice(ramPBrandArray);
        ramBrandPrice(ramPBrandArray)
  });
 });
}

// ------------------------------------------------------PRICE-FILTERING-SECTION---------------------------------------------------------------------

let priceFilteredArray = []

function priceFiltering(data){
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
  isPriceSorting = true
  const priceRange = data.brands.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
  priceFilteredArray.push(...priceRange);
  openSortingPrice(priceFilteredArray);
  sortingPrice(priceFilteredArray);
  priceBrandFilter(priceFilteredArray);
}

let pbArray = [];

function priceBrandFilter(data){
  let brandId = '';
  brandList.forEach(item => {
    item.addEventListener('change' , () => {
        const checkbox = item.querySelector('input');
        brandId = checkbox.id;
        const filteredData = data.filter(item => item.id === brandId);
        console.log(filteredData)
        pbArray.push(...filteredData);
        openSortingPrice(pbArray);
        sortingPrice(pbArray);
        priceBrandRamFilter(pbArray)
  });
 });
};

function priceBrandRamFilter(data){
  const ramList = document.querySelectorAll(".ram-list li");
  ramList.forEach(item => {
    item.addEventListener('change' , () => {
      productSection.innerHTML = "";
      const checkbox = item.querySelector("input");
      const ram = Number(checkbox.id);
      if (ram === 8) {
          priceSortList(ram,data);
        } else if(ram === 6){
          priceSortList(6,data);
        } else if(ram === 4){
          priceSortList(4,data);
        } else if(ram === 1){
          priceSortList(1,data);
        }
      })
  });
}

function priceSortList(ram,item){
  const sort = item.filter(item => item.ram === ram);
    // ramSortedData.push(...sort)
    // console.log(ramSortedData)
    openSortingPrice(sort);
    sortingPrice(sort);
}

// ------------------------------------------------COMMON-FOR-ALL-FILTERING-PROCESS------------------------------------------------------------------------

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

// ---------------------------------------PAGINATION-FOR-THE-CONTENT---------------------------------

let itemsPerPage = 10;
let currentPage = 1;

let arrayData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,86.87,88,89,90,91,92,93,94,95,96,97,98,99,100];
function paginationFilter(data){
  for(let i = 0; i < data.brands.length; i++){
    if(i >= (currentPage - 1) * itemsPerPage && i < currentPage * itemsPerPage){
      const paginated = data.brands[i];
      console.log(paginated);
    };
  };
};




