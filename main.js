const productForm = document.getElementById('productForm');
const productTableBody = document.getElementById('productTableBody');

let products = [];

// Utility function to render the products
function renderProducts() {
  productTableBody.innerHTML = '';
  products.forEach((product, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.description}</td>
      <td>${product.price.toFixed(2)}</td>
      <td>${product.category}</td>
      <td class="actions">
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    productTableBody.appendChild(row);
  });
}

// Handle form submission
productForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const category = document.getElementById('category').value;

  // Validation
  if (!name || !description || isNaN(price) || !category) {
    Swal.fire('Validation Error', 'All fields are required and must be valid.', 'error');
    return;
  }

  products.push({ name, description, price, category });
  renderProducts();
  productForm.reset();
  Swal.fire('Success', 'Product added successfully!', 'success');
});

// Edit product
window.editProduct = (index) => {
  const product = products[index];

  Swal.fire({
    title: 'Edit Product',
    html: `
      <input type="text" id="swalName" class="swal2-input" value="${product.name}" placeholder="Product Name">
      <textarea id="swalDescription" class="swal2-textarea" placeholder="Product Description">${product.description}</textarea>
      <input type="number" id="swalPrice" class="swal2-input" value="${product.price}" placeholder="Price" min="0" step="0.01">
      <select id="swalCategory" class="swal2-select">
        <option value="Electronics" ${product.category === 'Electronics' ? 'selected' : ''}>Electronics</option>
        <option value="Clothing" ${product.category === 'Clothing' ? 'selected' : ''}>Clothing</option>
        <option value="Home" ${product.category === 'Home' ? 'selected' : ''}>Home</option>
      </select>
    `,
    focusConfirm: false,
    preConfirm: () => {
      const name = document.getElementById('swalName').value.trim();
      const description = document.getElementById('swalDescription').value.trim();
      const price = parseFloat(document.getElementById('swalPrice').value);
      const category = document.getElementById('swalCategory').value;

      if (!name || !description || isNaN(price) || !category) {
        Swal.showValidationMessage('All fields are required and must be valid.');
        return false;
      }

      return { name, description, price, category };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      products[index] = result.value;
      renderProducts();
      Swal.fire('Updated!', 'Product updated successfully.', 'success');
    }
  });
};

// Delete product
window.deleteProduct = (index) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      products.splice(index, 1);
      renderProducts();
      Swal.fire('Deleted!', 'Product has been deleted.', 'success');
    }
  });
};
