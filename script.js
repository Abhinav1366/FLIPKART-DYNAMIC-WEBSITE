const brandList = document.querySelectorAll(".brand-list li");
const productSection = document.querySelector(".product-section");
const textArea = document.querySelector(".filter-textarea");
const filterHeading = document.querySelector(".text-content");
const clearText = document.querySelector(".clear-txt");


clearText.addEventListener("click", () => {
  filterHeading.innerText = "";
  ratingSortPhones();
});

brandList.forEach((item) => {
  item.addEventListener("change", () => {
    productSection.innerHTML = "";
    const checkbox = item.querySelector("input");
    if (!checkbox.checked) return;
    const phone = checkbox.id;
    const text = item.querySelector("label");
    const newTextArea = document.createElement("span");
    newTextArea.classList.add("filter-textarea");
    newTextArea.innerText = text.innerText;
    filterHeading.appendChild(newTextArea);
    const textitems = document.querySelectorAll(".filter-textarea");
    productSection.innerHTML = "";
    textitems.forEach((text) => {
      text.addEventListener("click", () => {
        text.classList.add("active");

        if (checkbox.checked) {
          checkbox.checked = false;
          productSection.innerHTML = "";
        }
      });
    });
    phoneDetails(phone);
  });
});

async function phoneDetails(item) {
  const res = await fetch("data.json");
  const data = await res.json();
  const details = data.brands.filter((brand) => brand.id === item);
  console.log(details);
  productView(details);
  brandSort(details);
}

function productView(item) {
  item.map((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
           <div class="product-img">
                    <img src="${product.image}" alt="" class="pro-img">
                    <div class="compare-txt">
                        <input type="checkbox" name="" id="">
                        <label for="">Add to Compare</label>
                    </div>
                </div>
                <div class="products-details">
                    <span class="phone-name">${product.title}</span>
                    <span class="rating"><span class="rating-img">
                        <h2>${product.ratings.average}</h2>
                        <img src="images/rating-star.svg" alt="">
                    </span>${product.ratings.count} Rating & ${
      product.ratings.reviewCount
    } Reviews</span>
                    <ul class="details-list">
                        ${product.details
                          .map((detail) => `<li>${detail}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="product-price">
                   <h2 class="price">${product.offerPrice}</h2>
                   <div class="mrp">
                    <span>${product.price}</span>
                    <h2>${product.discount}</h2>
                   </div>
                   <h3 class="delivery-txt">${product.delivery}</h3>
                </div>
        `;
    productSection.appendChild(card);
  });
}

// --------------------------------------RATING-SECTION------------------------------------

const ratingList = document.querySelectorAll(".rating-list li");

ratingList.forEach((item) => {
  item.addEventListener("change", () => {
    const checkbox = item.querySelector("input");
    if (!checkbox.checked) return;
    const rating = Number(checkbox.id);
    const text = item.querySelector("label");
    const newTextArea = document.createElement("span");
    newTextArea.classList.add("filter-textarea");
    newTextArea.innerText = text.innerText;
    filterHeading.appendChild(newTextArea);

    const textitems = document.querySelectorAll(".filter-textarea");
    textitems.forEach((text) => {
      text.addEventListener("click", () => {
        text.classList.add("active");
        if (checkbox.checked) {
          checkbox.checked = false;
        }
      });
    });

    productSection.innerHTML = "";
    if (rating === 4) {
      ratinglists(4);
    } else if (rating === 3) {
      ratinglists(4);
    }
  });
});

async function ratinglists(minrating) {
  const res = await fetch("data.json");
  const data = await res.json();
  const brandFilter = data.brands.filter(
    (item) => item.ratings.average >= minrating
  );
  productSection.innerHTML = "";
  ratingsort(brandFilter)
  ratingabovefour(brandFilter);
}

function ratingabovefour(item) {
  item.map((phones) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
           <div class="product-img">
                    <img src="${phones.image}" alt="" class="pro-img">
                    <div class="compare-txt">
                        <input type="checkbox" name="" id="">
                        <label for="">Add to Compare</label>
                    </div>
                </div>
                <div class="products-details">
                    <span class="phone-name">${phones.title}</span>
                    <span class="rating"><span class="rating-img">
                        <h2>${phones.ratings.average}</h2>
                        <img src="images/rating-star.svg" alt="">
                    </span>${phones.ratings.count} Rating & ${
      phones.ratings.reviewCount
    } Reviews</span>
                    <ul class="details-list">
                        ${phones.details
                          .map((detail) => `<li>${detail}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="product-price">
                   <h2 class="price">${phones.offerPrice}</h2>
                   <div class="mrp">
                    <span>${phones.price}</span>
                    <h2>${phones.discount}</h2>
                   </div>
                   <h3 class="delivery-txt">${phones.delivery}</h3>
                </div>
        `;
    productSection.appendChild(card);
  });
}

// -----------------------------------RAM-SECTION-----------------------------------

const ramList = document.querySelectorAll(".ram-list li");

ramList.forEach((item) => {
  item.addEventListener("change", () => {
    const checkbox = item.querySelector("input");
    if (!checkbox.checked) return;
    const ram = Number(checkbox.id);
    const text = item.querySelector("label");
    const newTextArea = document.createElement("span");
    newTextArea.classList.add("filter-textarea");
    newTextArea.innerText = text.innerText;
    filterHeading.appendChild(newTextArea);
    if (ram === 8) {
      ramsList(ram);
    } else if (ram === 6) {
      ramsList(6);
    } else if (ram === 4) {
      ramsList(4);
    } else if (ram === 1) {
      ramsList(1);
    }
  });
});

async function ramsList(rams) {
  const res = await fetch("data.json");
  const data = await res.json();
  const ramItem = data.brands.filter((item) => item.ram === rams);
  productSection.innerHTML = "";
  ramSort(ramItem)
  phonesRam(ramItem);
}

function phonesRam(item) {
  item.map((list) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
           <div class="product-img">
                    <img src="${list.image}" alt="" class="pro-img">
                    <div class="compare-txt">
                        <input type="checkbox" name="" id="">
                        <label for="">Add to Compare</label>
                    </div>
                </div>
                <div class="products-details">
                    <span class="phone-name">${list.title}</span>
                    <span class="rating"><span class="rating-img">
                        <h2>${list.ratings.average}</h2>
                        <img src="images/rating-star.svg" alt="">
                    </span>${list.ratings.count} Rating & ${
      list.ratings.reviewCount
    } Reviews</span>
                    <ul class="details-list">
                        ${list.details
                          .map((detail) => `<li>${detail}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="product-price">
                   <h2 class="price">${list.offerPrice}</h2>
                   <div class="mrp">
                    <span>${list.price}</span>
                    <h2>${list.discount}</h2>
                   </div>
                   <h3 class="delivery-txt">${list.delivery}</h3>
                </div>
        `;
    productSection.appendChild(card);
  });
}

// --------------------------SORT-SECTION-----------------------------------------

// function realoaded(){

//    const sortList = document.querySelectorAll('.sort-list li');

//     sortList.forEach((list,index) => {
//         list.addEventListener('click',() => {
//             sortList.forEach(item => item.classList.remove("active"))
//             list.classList.add("active")
//             const text = list.innerText;
//             if(index === 0){
//                 ratingSortPhones()
//                 list.classList.add("active")
//             }else{
//                 if(text === "Price -- Low to High"){
//                     lowsortPhones()
//                 }else if(text === "Price -- High to low"){
//                     highsortPhones()
//                 }else if(text === "Popularity"){
//                     ratingSortPhones()
//                 }
//                 else{
//                     console.log("Error");
//                 }
//             };
//         });

//         sortList[0].classList.add("active");
//         ratingSortPhones();
//     });

// async function lowsortPhones() {
//     const res = await fetch("data.json");
//     const data = await res.json();
//     const sortedPrice = [...data.brands].sort((a,b) => (a.offerPrice) - (b.offerPrice));
//     productSection.innerHTML = '';
//     sortItemList(sortedPrice);
// };

// async function highsortPhones() {
//     const res = await fetch("data.json");
//     const data = await res.json();
//     const sortedPrice = [...data.brands].sort((a,b) => (b.offerPrice) - (a.offerPrice));
//     productSection.innerHTML = '';
//     sortItemList(sortedPrice);
// };

// async function ratingSortPhones() {
//     const res = await fetch("data.json");
//     const data = await res.json();
//     const sortedPrice = [...data.brands].sort((a,b) => (b.ratings.average) - (a.ratings.average));
//     productSection.innerHTML = "";
//     sortItemList(sortedPrice);
// };

// function sortItemList(item){
//     productSection.innerHTML = "";
//     item.map(list => {
//         const card = document.createElement("div");
//         card.classList.add('product-card');
//         card.innerHTML = `
//            <div class="product-img">
//                     <img src="${list.image}" alt="" class="pro-img">
//                     <div class="compare-txt">
//                         <input type="checkbox" name="" id="">
//                         <label for="">Add to Compare</label>
//                     </div>
//                 </div>
//                 <div class="products-details">
//                     <span class="phone-name">${list.title}</span>
//                     <span class="rating"><span class="rating-img">
//                         <h2>${list.ratings.average}</h2>
//                         <img src="images/rating-star.svg" alt="">
//                     </span>${list.ratings.count} Rating & ${list.ratings.reviewCount} Reviews</span>
//                     <ul class="details-list">
//                         ${list.details.map(detail => `<li>${detail}</li>`).join('')}
//                     </ul>
//                 </div>
//                 <div class="product-price">
//                    <h2 class="price">${list.offerPrice}</h2>
//                    <div class="mrp">
//                     <span>${list.price}</span>
//                     <h2>${list.discount}</h2>
//                    </div>
//                    <h3 class="delivery-txt">${list.delivery}</h3>
//                 </div>
//         `;
//         productSection.appendChild(card);
//     });
// };

// }

// ------------------------------------------MIN-MAX-SECTION--------------------------------

const minRange = document.querySelectorAll(".min-range");
const maxRange = document.querySelectorAll(".max-range");

let minValue = "";
let maxValue = "";

minRange.forEach((item) => {
  item.addEventListener("change", () => {
    minValue = item.value;
    valuesBetween(minValue, maxValue);
  });
});

maxRange.forEach((item) => {
  item.addEventListener("change", () => {
    maxValue = item.value;
    valuesBetween(minValue, maxValue);
  });
});

async function valuesBetween(minValue, maxValue) {
  const res = await fetch("data.json");
  const data = await res.json();
  const priceBetween = data.brands.filter(
    (item) => item.offerPrice >= minValue && item.offerPrice <= maxValue
  );
  productSection.innerHTML = ``;
  console.log(priceBetween);
  productDisplay(priceBetween);
}

function productDisplay(product) {
  product.map((list) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
           <div class="product-img">
                    <img src="${list.image}" alt="" class="pro-img">
                    <div class="compare-txt">
                        <input type="checkbox" name="" id="">
                        <label for="">Add to Compare</label>
                    </div>
                </div>
                <div class="products-details">
                    <span class="phone-name">${list.title}</span>
                    <span class="rating"><span class="rating-img">
                        <h2>${list.ratings.average}</h2>
                        <img src="images/rating-star.svg" alt="">
                    </span>${list.ratings.count} Rating & ${
      list.ratings.reviewCount
    } Reviews</span>
                    <ul class="details-list">
                        ${list.details
                          .map((detail) => `<li>${detail}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="product-price">
                   <h2 class="price">${list.offerPrice}</h2>
                   <div class="mrp">
                    <span>${list.price}</span>
                    <h2>${list.discount}</h2>
                   </div>
                   <h3 class="delivery-txt">${list.delivery}</h3>
                </div>
        `;
    productSection.appendChild(card);
  });
}

// --------------------------------------------------BRAND-SORTING---------------------------

function brandSort(details) {
  const sortList = document.querySelectorAll(".sort-list li");
  const productSection = document.querySelector(".product-section");

  if(!productSection){
    console.log("product section is not found in the DOM");
  }

  sortList.forEach((item,index) => {
    item.addEventListener("click", () => {
      sortList.forEach((list) => list.classList.remove("active"));
      item.classList.add("active");
      const text = item.innerText;
        if(index === 0){
          productView(details)
        }else{
          if (text === "Price -- Low to High") {
            const itemSorted = details.sort(
              (a, b) => Number(a.offerPrice) - Number(b.offerPrice)
            );
            console.log(itemSorted);
            sortedProductList(itemSorted);
          }else if (text === "Price -- High to low") {
            const itemSorted = details.sort(
              (a, b) => Number(b.offerPrice) - Number(a.offerPrice)
            );
            sortedProductList(itemSorted);
          }else if (text === "Popularity") {
            const itemSorted = [...details].sort(
              (a, b) => b.ratings.average - a.ratings.average
            );
            sortedProductList(itemSorted);
          }
        }
    });

    sortList[0].classList.add('active')
  });
}

function sortedProductList(item) {
  productSection.innerHTML = "";
  item.forEach((sort) => {
    console.log(sort);
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
                   <h2 class="price">${sort.offerPrice}</h2>
                   <div class="mrp">
                    <span>${sort.price}</span>
                    <h2>${sort.discount}</h2>
                   </div>
                   <h3 class="delivery-txt">${sort.delivery}</h3>
                </div>
        `;

    console.log(card);
    productSection.appendChild(card);
  });
}


// --------------------------------------------- RATING-SORTING------------------

function ratingsort(filter){
  const sortList = document.querySelectorAll(".sort-list li");
  const productSection = document.querySelector(".product-section");

  if(!productSection){
    console.log("product section is not found in the DOM");
  }

  sortList.forEach((item,index) => {
    item.addEventListener("click", () => {
      sortList.forEach((list) => list.classList.remove("active"));
      item.classList.add("active");
      const text = item.innerText;
        if(index === 0){
          productView(details)
        }else{
          if (text === "Price -- Low to High") {
            const itemSorted = filter.sort(
              (a, b) => Number(a.offerPrice) - Number(b.offerPrice)
            );
            console.log(itemSorted);
            sortedProductList(itemSorted);
          }else if (text === "Price -- High to low") {
            const itemSorted = filter.sort(
              (a, b) => Number(b.offerPrice) - Number(a.offerPrice)
            );
            sortedProductList(itemSorted);
          }else if (text === "Popularity") {
            const itemSorted = [...filter].sort(
              (a, b) => b.ratings.average - a.ratings.average
            );
            sortedProductList(itemSorted);
          }
        }
    });

    sortList[0].classList.add('active')
  });
}

// ----------------------------- RAM-SORTING------------------------------

function ramSort(filter){
  const sortList = document.querySelectorAll(".sort-list li");
  const productSection = document.querySelector(".product-section");

  if(!productSection){
    console.log("product section is not found in the DOM");
  }

  sortList.forEach((item,index) => {
    item.addEventListener("click", () => {
      sortList.forEach((list) => list.classList.remove("active"));
      item.classList.add("active");
      const text = item.innerText;
        if(index === 0){
          productView(details)
        }else{
          if (text === "Price -- Low to High") {
            const itemSorted = filter.sort(
              (a, b) => Number(a.offerPrice) - Number(b.offerPrice)
            );
            console.log(itemSorted);
            sortedProductList(itemSorted);
          }else if (text === "Price -- High to low") {
            const itemSorted = filter.sort(
              (a, b) => Number(b.offerPrice) - Number(a.offerPrice)
            );
            sortedProductList(itemSorted);
          }else if (text === "Popularity") {
            const itemSorted = [...filter].sort(
              (a, b) => b.ratings.average - a.ratings.average
            );
            sortedProductList(itemSorted);
          }
        }
    });

    sortList[0].classList.add('active')
  });
}