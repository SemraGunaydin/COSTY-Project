import { addToCart, renderCartItems} from "./cart.js";
import { fetchProducts, renderProducts } from "./product.js";
import { getFromLocalStorage, updateCartIcon } from "./utils.js";

const menuIcon = document.querySelector("#menu-icon");
const menu = document.querySelector(".navbar");

// MenuIcon'a tıklanınca menu'ye bir class ekle-çıkar
menuIcon.addEventListener("click", () => {
  menu.classList.toggle("open-menu");
});

document.addEventListener("DOMContentLoaded", async () => {
  // localstoragedan cart verisini al

  let cart = getFromLocalStorage();


  if (window.location.pathname.includes("/cart.html")) {
    // Eger sepet syfasindaysak sepete eklenen urunleri render et
    renderCartItems();
  } else {
    // Eger  anasayfadaysak api' ye istek at ve verileri al
    const products = await fetchProducts();

    // Api'dan gelen verileri ekrana render et
    renderProducts(products, (e) => {
      addToCart(e,products);
    });
  }

  // sepet iconun u guncelle
  updateCartIcon(cart);
});




