// Mock data com mais produtos
const products = [
    { id: 1, name: "Vara de Pesca", price: 120.0, image: "https://via.placeholder.com/200" },
    { id: 2, name: "Carretilha", price: 250.0, image: "https://via.placeholder.com/200" },
    { id: 3, name: "Isca Artificial", price: 50.0, image: "https://via.placeholder.com/200" },
    { id: 4, name: "Caixa de Pesca", price: 80.0, image: "https://via.placeholder.com/200" },
    { id: 5, name: "Anzol", price: 20.0, image: "https://via.placeholder.com/200" },
    { id: 6, name: "Linha de Pesca", price: 30.0, image: "https://via.placeholder.com/200" },
    { id: 7, name: "Rede de Pesca", price: 150.0, image: "https://via.placeholder.com/200" },
    { id: 8, name: "Isqueiro", price: 15.0, image: "https://via.placeholder.com/200" },
    { id: 9, name: "Bóia", price: 25.0, image: "https://via.placeholder.com/200" },
    { id: 10, name: "Balde de Pesca", price: 35.0, image: "https://via.placeholder.com/200" }
  ];
  
  // Carrinho
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Atualizar localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  // Função para renderizar produtos
  function renderProducts(products) {
    return products
      .map(
        (product) => `
        <div class="product">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>R$ ${product.price.toFixed(2)}</p>
          <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        </div>
      `
      )
      .join("");
  }
  
  // Adicionar produto ao carrinho
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const itemInCart = cart.find((item) => item.id === productId);
  
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    saveCart();
    alert(`Adicionado: ${product.name}`);
  }
  
  // Mostrar a lista de produtos
  function showDashboard() {
    const content = document.getElementById("content");
    content.innerHTML = `
      <section id="products">
        <h2>Produtos</h2>
        <div id="product-list">${renderProducts(products)}</div>
      </section>
    `;
  }
  
  // Mostrar promoções
  function showPromotions() {
    const promotions = products.filter((_, index) => index % 2 === 0);
    const content = document.getElementById("content");
    content.innerHTML = `
      <section id="promotions">
        <h2>Promoções</h2>
        <div id="product-list">${renderProducts(promotions)}</div>
      </section>
    `;
  }
  
  // Mostrar carrinho
  function showCart() {
    const content = document.getElementById("content");
    if (cart.length === 0) {
      content.innerHTML = "<h2>Carrinho vazio</h2>";
      return;
    }
  
    const cartItems = cart
      .map(
        (item) => `
        <div class="cart-item">
          <h3>${item.name}</h3>
          <p>Preço: R$ ${item.price.toFixed(2)}</p>
          <p>Quantidade: ${item.quantity}</p>
          <p>Total: R$ ${(item.price * item.quantity).toFixed(2)}</p>
          <button onclick="removeFromCart(${item.id})">Remover</button>
        </div>
      `
      )
      .join("");
  
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
    content.innerHTML = `
      <section id="cart">
        <h2>Carrinho</h2>
        ${cartItems}
        <h3>Total Geral: R$ ${totalPrice.toFixed(2)}</h3>
        <button onclick="clearCart()">Limpar Carrinho</button>
      </section>
    `;
  }
  
  // Remover item do carrinho
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    saveCart();
    showCart();
  }
  
  // Limpar carrinho
  function clearCart() {
    cart = [];
    saveCart();
    showCart();
  }
  
  // Mostrar login
  function showLogin() {
    const content = document.getElementById("content");
    content.innerHTML = `
      <section id="login">
        <h2>Login</h2>
        <form id="login-form">
          <label for="username">Usuário:</label>
          <input type="text" id="username" required>
          <label for="password">Senha:</label>
          <input type="password" id="password" required>
          <button type="submit">Entrar</button>
        </form>
      </section>
    `;
  
    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login bem-sucedido!");
    });
  }
  
  // Inicializar com a dashboard
  showDashboard();
  