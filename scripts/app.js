const productData = [
    {
      id: 1,
      name: "Invicta Men's Pro Diver",
      img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
      price: 74,
      cat: "Dress",
    },
    {
      id: 11,
      name: "Invicta Men's Pro Diver 2",
      img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
      price: 74,
      cat: "Dress",
    },
    {
      id: 2,
      name: "Timex Men's Expedition Scout ",
      img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
      price: 40,
      cat: "Sport",
    },
    {
      id: 3,
      name: "Breitling Superocean Heritage",
      img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
      price: 200,
      cat: "Luxury",
    },
    {
      id: 4,
      name: "Casio Classic Resin Strap ",
      img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
      price: 16,
      cat: "Sport",
    },
    {
      id: 5,
      name: "Garmin Venu Smartwatch ",
      img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
      price: 74,
      cat: "Casual",
    },
  ];
  

const $ = document

const productContainer = $.querySelector('.products')
const categorieContainer = $.querySelector('.categorieContainer')
const searchInput = $.querySelector('.search')
const priceRange = $.querySelector('.priceRange')
const priceValue = $.querySelector('.priceValue')

const productItemMaker = (productList) => {
    productContainer.innerHTML = productList.map(product => `
        <div class="product">
            <img src="${product.img}" alt="">
            <span class="productName">${product.name}</span>
            <span class="productPrice">${product.price}</span>
        </div>
        `
    ).join("");
}

productItemMaker(productData)


searchInput.addEventListener('keyup' , e => {
    let searchValue = e.target.value.toLowerCase();

    if(searchValue){
        productItemMaker(productData.filter(item => item.name.toLocaleLowerCase().indexOf(searchValue) !== -1))
    }else{
        productItemMaker(productData)
    }
})


const categoieELemMaker = () => {
    let allUnicCategorie = ['All']
    productData.forEach(itme => {
        allUnicCategorie.includes(itme.cat) ? '' : allUnicCategorie.push(itme.cat)
    })
    
    categorieContainer.innerHTML = allUnicCategorie.map(item => `
        <span class="categorie">${item}</span>
        `).join("")



    categorieContainer.addEventListener('click' , e => {
        let selectedCategorie = e.target.textContent

        selectedCategorie === "All" ? productItemMaker(productData) : 
        productItemMaker(productData.filter(item => item.cat === selectedCategorie))
    })
}


const filterProductwithPrice = () => {
    const priceList = productData.map(item => item.price);
    
    priceRange.min = Math.min(...priceList)
    priceRange.max = Math.max(...priceList)
    priceRange.value = Math.max(...priceList)
    priceValue.textContent = "$" + Math.max(...priceList)

    priceRange.addEventListener('input' , e => {
        priceValue.textContent = "$" + e.target.value
        productItemMaker(productData.filter(item => item.price <= e.target.value))
    })
}

categoieELemMaker()
filterProductwithPrice()