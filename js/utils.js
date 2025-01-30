import elements from "./helpers.js";

// ! Localstorage'a ekleme yapan fonksiyon
const saveToLocalStorage = (cart) => {
  // Dışarıdan verilen elemanı string e çevir ve localstorage'a ekle
  localStorage.setItem("cart", JSON.stringify(cart));
};

//!Locastorage'den eleman cagirma fonksiyonu
const getFromLocalStorage=(cart)=>{
    // cart key'indeki tum elemanlari localstorage'dan al
    const strData = localStorage.getItem("cart");

    // Eğer strData varsa bunu JSON.parse ile dönüştür ve return et eğer yoksa boş bir dizi return et
    return strData ? JSON.parse(strData) : [];
};

// ! Sepet toplamını hesaplayan fonksiyon
const calculateCartTotal = (cart) => {
  // cart'daki ürünlerin miktar ve fiyatını çarparak toplam sonucu elde et
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ! reduce ==> Bir dizi üzerindeki tüm elemanları dönerek bir işleme tabi tutar.Bu metot belirtilen işlevi gerçekleştirdikten sonra geriye toplu bir sonuç döndürür

  // ! Bu metot diziAdı.reduce((1,2)=>{},3) şeklinde kullanılır Buradaki 1.değer toplam sonucun aktarılacağı bir değişkendir 2.değerse currentValue'ya karşılık gelir.Buda her dönülen elemanın değerini alır

  // ! reduce'un 3. parametresi bir başlangıç değeri vardır. Bu değer, reduce'un başladığında dizi elemanları dönmek için ilk değerdir. Bu değer varsayılan olarak 0'dır.
};


const updateCartIcon = (cart) =>{

  // sepetteki toplam urun miktarini hesapla
  let totalQuantity = cart.reduce((sum,item) => 
    {return sum +  item.quantity;

    },0);

    // sepetteki urun miktarini dinamik sekilde render et
    elements.icon.setAttribute("data-quantity",totalQuantity);

    // setAtrtribute(nitelik,ozellik) bir elemana attribute eklemek icin kullanilir
    

};





export {saveToLocalStorage,getFromLocalStorage,calculateCartTotal,updateCartIcon};
