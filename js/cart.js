import elements from "./helpers.js";
import {calculateCartTotal, getFromLocalStorage, saveToLocalStorage,updateCartIcon, } from "./utils.js";

// localstorage'dan cart verisini al
let cart =getFromLocalStorage();

// ! Sepete ekleme yapan fonksiyonu
const addToCart =(e,products)=>{
 // Tıklanılan elemanın id'sine eriş
    const productId=parseInt(e.target.dataset.id);


 // Product içerisinden id'si bilinen elemana eriş
    const product =products.find((product)=> product.id===productId);

 
    if (product) {
        // Eğer ürün varsa cart dizisini kontrol
        // Ürün sepette varmı bunu kontrol et ve varsa bunu exitingItem a aktar
        const exitingItem = cart.find((item) => item.id === productId);
        

        if (exitingItem) {
            exitingItem.quantity++;

        }else {
               
 // Erişilen elemanın verileriyle bir cart elemanı objesi oluştur
 const cartItem = {
  id: product.id,
  title: product.title,
  price: product.price,
  image: product.image, // Correctly uses `image`
  quantity: 1,
};


    // Cart dizisine cartItem objesini ekle
    cart.push(cartItem); 

  }
  // cart dizisini localstorage ekle
    saveToLocalStorage(cart);

    //Sepete ekle butonunun icerigini guncelle
    e.target.textContent ="Added";


    // Added yaptiktan sonra buton  tekrar add to cart donsun

    setTimeout(()=>{
      e.target.textContent="Add to cart";
    },2000);

    // sepetteki iconu guncelle
    updateCartIcon(cart);
 }
};

// !Sepetten urun kaldiracak fonksiyon
const removeFromCart =(e) => {
    //Tiklanilan elemanin id'sine eris
    const productId =parseInt(e.target.dataset.id);

    // id si bilinen elemani sepetten kaldir
    cart = cart.filter((item) =>item.id !=productId);

    // localstorage'i guncelle
    saveToLocalStorage(cart);

    //Arayuzu tekrardan render et
    renderCartItems();

    // Sepet toplamini render et 
    displayCartTotal();

    // Sepetteki iconu guncelle 
    updateCartIcon(cart);
};
// sepetteki urun miktarini guncelleyen fonksiyon
const onQuantityChange = (e) =>  {
  const productId =+ e.target.dataset.id;
  const newQuantity =+e.target.value;

 // Spetteki elemanin degeri 0 dan buyukse
 if (newQuantity > 0) {
  // sepet icerisinde miktar degisen elemani bulma
  const cartItem = cart.find((item) => item.id === productId);

 // Bulunan elemanin miktarini guncelleme
 cartItem.quantity = newQuantity;
// loclstorage i guncelle

saveToLocalStorage(cart);

// toplam fiyat guncelleme
displayCartTotal();

// sepetteki iconu guncelle
updateCartIcon(cart);
 }
};

// ! Sepetteki urunleri render edecek fonksiyon

const renderCartItems = () => {
  elements.cartItemsList.innerHTML = cart
    .map(
      (item) => `  <div class="cart-item">
              <img
                src="${item.image}"
                alt=""
              />

              <div class="cart-item-info">
                <h2 class="cart-item-title">${item.title}</h2>
                <input type="number" min="1" class='cart-item-quantity' data-id='${item.id}'  value="${item.quantity}" />
              </div>

              <h2 class="cart-item-price">$ ${item.price}</h2>

              <button class="remove-from-cart" data-id='${item.id}'>Remove</button>
            </div>`
    )
    .join("");
      // remove-from-cart classina sahip butonlara eris
      const removeButtons =document.querySelectorAll(".remove-from-cart");
      
      // removeButton icerisindeki herbir elemana ayri ayri eris
      for (let i=0; i<removeButtons.length; i++){
        const removeButton =removeButtons[i];

        // Bu butonlara bir tiklama gerceklestirildiginde bir fonksiyon tetikle.
        removeButton.addEventListener("click",removeFromCart);
      }

      // cart-item-quantity classına sahip tüm elemanlara eriş
      const quantityInputs = document.querySelectorAll(".cart-item-quantity");
     
      // Sepetteki toplam urun miktarini render eden fonksiyon
      for (let i = 0; i < quantityInputs.length; i++) {
        const quantityInput = quantityInputs[i];


      // quantityinput'lara birer olay izleticisi ekle
      quantityInput.addEventListener("change", onQuantityChange);
}

    };
    // Sepetteki toplam urun miktarini render eden fonksiyon
  const displayCartTotal =() =>{

    // calculatecarttotal ile sepetteki toplam fiyyati hesapla
     const total = calculateCartTotal(cart);

     // Toplam degeri ekranda render et 
     elements.cartTotal.textContent = `Total: $${total.toFixed(2)}`;
};

export { addToCart, renderCartItems, displayCartTotal };