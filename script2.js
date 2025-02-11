const brandList = document.querySelectorAll('.brand-list li');
const productSection = document.querySelector('.product-section');
const textArea = document.querySelector(".filter-textarea");
const filterHeading = document.querySelector('.text-content');
const clearText = document.querySelector('.clear-txt');
const checkbox = document.querySelectorAll('.check');

let itemPerPage = 12;
let currentPage = 1;

let data;
let slectedRamFilter = []
fetchData();

async function fetchData() {
    try{
       const res = await fetch('data.json');
       data = await res.json()
       brandData();
       openContent(data);
       relevanceSection(data);
       ramSection(data);
    }catch (error){
       console.log(error);
    }
};

clearText.addEventListener("click" , () =>{
    checkbox.forEach(box => {
        if(box.checked){
            box.checked = false;
        }
    })
    productSection.innerHTML = "";
    relevanceSection(data)
    openContent(data)
});

// -------------------------------------PAGINATION---------------------------------
// ---------------------------------WINDOW-OPENING-CONTENT--------------------------

function openContent(content){
    if(!checkbox.checked){
        const sortList = document.querySelectorAll(".sort-list li")
        sortList.forEach((item,index) => {
            item.addEventListener('click' , () => {
                sortList.forEach(list => list.classList.remove('active'));
                item.classList.add('active');
                const text = item.innerText;
                if(index === 0){
                    relevanceSection(content)
                }else{
                    if(text === "Price -- Low to High"){
                        const itemSorted = content.brands.sort((a,b) => Number(a.offerPrice) - Number(b.offerPrice))
                        sortedProductList(itemSorted);
                    }else if(text === "Price -- High to low"){
                        const itemSorted = content.brands.sort((a,b) => Number(b.offerPrice) - Number(a.offerPrice))
                        sortedProductList(itemSorted);
                    }else if(text === "Popularity"){
                        const itemSorted = content.brands.sort((a,b) => Number(b.ratings.average) - Number(a.ratings.average))
                        sortedProductList(itemSorted);
                    }
                }
            })
        })

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

// ------------------------------------------------BRAND-SECTION--------------------

function brandData(){
    brandList.forEach(item => {
        item.addEventListener('change' , () => {
            productSection.innerHTML = "";
            const checkbox = item.querySelector('input')
            if(!checkbox.checked) return
            const phoneId = checkbox.id
            phoneData(phoneId)
        });
    });
};

let contentCard = []

function phoneData(item){
    const phoneDetails = data.brands.filter(brand => brand.id === item);
    contentCard.push(...phoneDetails)
    sortItems(contentCard);
    sortRam(contentCard);
    sortRatings(contentCard);
    openingDetails(contentCard);
};

// ------------------------------SORTING-RATING-----------------------------

function sortRatings(details){
    const ratingList = document.querySelectorAll(".rating-list li");
    
    ratingList.forEach(rating => {
        rating.addEventListener('click' , () => {
            const checkbox = rating.querySelector("input");
            const ratingId = Number(checkbox.id)
            if(ratingId >= 4){
                ratingItemList(4,details)
            }else if(ratingId >=3){
                ratingItemList(3,details)
            }
        })
    })
}

function ratingItemList(list,item){
    const ratingSort = item.filter(r => r.ratings.average >= list)
    slectedRamFilter.push(...ratingSort)
    sortItems(slectedRamFilter)
}



function sortItems(details){
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
            }
        })
    })
};

function sortedProductList(item) {
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

// --------------------------------------------RAM-SORTING----------------------------------

function sortRam(details){
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

function ramsList(ram,item){
    const ramSort = item.filter(item => item.ram === ram)
    slectedRamFilter.push(...ramSort);
    sortItems(slectedRamFilter);
    openingRam(slectedRamFilter);
};

let productsCard;

function openingDetails(item){
    item.forEach((sort) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        productsCard = document.querySelectorAll(".product-card");
        
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

function openingRam(item){
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



const pageBtn = document.querySelectorAll('.page-no li');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

pageBtn.forEach((btn,index) => {
    btn.addEventListener('click',() =>{
        pageBtn.forEach(item => item.classList.remove('active'))
        btn.classList.add('active');
        console.log(index)
        if(index > 0){
           prevBtn.classList.add('active')
        }else if(index === 0){
            prevBtn.classList.remove('active')
        }else if(index >= pageBtn.length - 1 ){
            nextBtn.classList,add('active')
        }else{
            nextBtn.classList.remove('active')
        }
    });
});


nextBtn.addEventListener('click' , () => {
    console.log("next Content")
})


// --------------------------------------MIN AND MAX SECTION ------------------------------------
const minRange = document.querySelector('.min-range');
const maxRange = document.querySelector('.max-range');

let minValue;
let maxValue;

minRange.addEventListener("change" , () => {
    minValue = minRange.value
    console.log(minValue)
    minMax(data,minValue,maxValue)
})

maxRange.addEventListener("change" , () => {
    maxValue = maxRange.value
    console.log(maxValue)
    minMax(data,minValue,maxValue)
})

function minMax(data,minValue,maxValue){
    const priceRange = data.brands.filter(item => item.offerPrice >= minValue && item.offerPrice <= maxValue);
    // sortedProductList(priceRange)
    productSection.innerHTML = "";
    sortPriceRange(priceRange)
    sortItems(priceRange)
}

function sortPriceRange(priceRange){
    console.log(priceRange)
    priceRange.forEach((sort) => {
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
}



// -------------------------------------------------RAM-SECTION--------------------------------

const ramList = document.querySelectorAll(".ram-list li")

ramList.forEach(ram => {
    ram.addEventListener("change" , () => {
        productSection.innerHTML = "";
        if(checkbox.checked){
            checkbox.checked = false
        }
        ramSection(data,ram);
    })
})


function ramSection(data,ram){
    const checkbox = ram.querySelector("input")
    let ramtext =checkbox.id;
    let ramData;
    if(ramtext === "8"){
        ramData = data.brands.filter(item => item.ram >= 8)
    }else if(ramtext === "A"){
        ramData = data.brands.filter(item => item.ram === "A")
    }else if(ramtext === "6"){
        ramData = data.brands.filter(item => item.ram === 6)
    }else if(ramtext === "4"){
        ramData = data.brands.filter(item => item.ram === 4)
    }else{
        ramData = data.brands.filter(item => item.ram >= 1)
        
    }

    sortRamData(ramData)
    sortItems(ramData)
}

function sortRamData(ramData){
    productSection.innerHTML = "";
    ramData.forEach((sort) => {
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
}


