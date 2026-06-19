// ===== PRODUCTS.JS — Filtrare și sortare produse =====

(function initProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // --- Filtrare categorie ---
  document.querySelectorAll('.filter-btn[data-category]').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn[data-category]').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const cat = this.dataset.category;
      document.querySelectorAll('.product-item').forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // --- Sortare ---
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      const items = Array.from(document.querySelectorAll('.product-item'));
      const parent = document.getElementById('productsGrid');

      items.sort((a, b) => {
        const priceA = parseFloat(a.dataset.price);
        const priceB = parseFloat(b.dataset.price);
        if (this.value === 'asc')  return priceA - priceB;
        if (this.value === 'desc') return priceB - priceA;
        return 0;
      });

      items.forEach(item => parent.appendChild(item));
    });
  }
})();
