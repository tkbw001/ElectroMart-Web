// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // --- Sign Up Form Validation ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log("Signup form submitted");

            let isValid = true;
            const username = document.getElementById('username');
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm-password');
            const usernameError = document.getElementById('username-error');
            const emailError = document.getElementById('email-error');
            const passwordError = document.getElementById('password-error');
            const confirmPasswordError = document.getElementById('confirm-password-error');

            // Reset errors
            usernameError.textContent = '';
            emailError.textContent = '';
            passwordError.textContent = '';
            confirmPasswordError.textContent = '';
            username.style.borderColor = '#ccc';
            email.style.borderColor = '#ccc';
            password.style.borderColor = '#ccc';
            confirmPassword.style.borderColor = '#ccc';

            // Validation
            if (username.value.trim() === '') {
                usernameError.textContent = 'Username is required.';
                username.style.borderColor = 'red';
                isValid = false;
            }

            if (email.value.trim() === '') {
                emailError.textContent = 'Email is required.';
                email.style.borderColor = 'red';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(email.value)) {
                emailError.textContent = 'Please enter a valid email address.';
                email.style.borderColor = 'red';
                isValid = false;
            }

            if (password.value.trim() === '') {
                passwordError.textContent = 'Password is required.';
                password.style.borderColor = 'red';
                isValid = false;
            } else if (password.value.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters long.';
                password.style.borderColor = 'red';
                isValid = false;
            }

            if (confirmPassword.value.trim() === '') {
                confirmPasswordError.textContent = 'Please confirm your password.';
                confirmPassword.style.borderColor = 'red';
                isValid = false;
            } else if (password.value !== confirmPassword.value) {
                confirmPasswordError.textContent = 'Passwords do not match.';
                confirmPassword.style.borderColor = 'red';
                isValid = false;
            }

            if (isValid) {
                alert('Sign up successful! (Simulation)');
                signupForm.reset();
            }
        });
    }

    // --- Log In Form Validation ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            console.log("Login form submitted");

            let isValid = true;
            const loginEmail = document.getElementById('login-email');
            const loginPassword = document.getElementById('login-password');
            const loginEmailError = document.getElementById('login-email-error');
            const loginPasswordError = document.getElementById('login-password-error');

            // Reset errors
            loginEmailError.textContent = '';
            loginPasswordError.textContent = '';
            loginEmail.style.borderColor = '#ccc';
            loginPassword.style.borderColor = '#ccc';

            if (loginEmail.value.trim() === '') {
                loginEmailError.textContent = 'Email or Username is required.';
                loginEmail.style.borderColor = 'red';
                isValid = false;
            }

            if (loginPassword.value.trim() === '') {
                loginPasswordError.textContent = 'Password is required.';
                loginPassword.style.borderColor = 'red';
                isValid = false;
            }

            if (isValid) {
                alert('Log in successful! (Simulation)');
                loginForm.reset();
            }
        });
    }

    // --- Add to Cart Button ---
    const addToCartButton = document.getElementById('add-to-cart-btn');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function () {
            alert('Product added to cart! (Functionality coming soon)');
        });
    }

    // --- jQuery Ready Function for Search ---
    $(document).ready(function () {
        $('#searchForm').on('submit', function (e) {
            e.preventDefault();
            const searchKeyword = $('#searchKeyword').val().trim();
            const searchCategory = $('#searchCategory').val();
            $('#productResults').html('<p>Searching...</p>');

            $.ajax({
                url: 'searchProducts.php',
                type: 'POST',
                data: {
                    searchKeyword: searchKeyword,
                    searchCategory: searchCategory
                },
                dataType: 'json',
                success: function (response) {
                    $('#productResults').html('');
                    if (response && response.length > 0) {
                        $.each(response, function (index, product) {
                            const productHtml = `
                                <article class="product-item">
                                    <img src="${product.ImageURL || 'https://placehold.co/100x100?text=No+Image'}" alt="${product.Name || 'Product Image'}">
                                    <div class="product-item-info">
                                        <h4>${product.Name || 'N/A'}</h4>
                                        ${product.Brand ? '<p><small>Brand: ' + product.Brand + '</small></p>' : ''}
                                        <p class="price">$${parseFloat(product.Price || 0).toFixed(2)}</p>
                                        <a href="product-detail.html?id=${product.ProductID || ''}" class="btn-details">View Details</a>
                                    </div>
                                </article>
                            `;
                            $('#productResults').append(productHtml);
                        });
                    } else {
                        let message = 'No products found matching your search';
                        if (searchKeyword) message += ': "' + searchKeyword + '"';
                        if (searchCategory !== 'all') {
                            const categoryText = $('#searchCategory option:selected').text();
                            message += ' in category "' + categoryText + '"';
                        }
                        $('#productResults').html('<p>' + message + '.</p>');
                    }
                },
                error: function (xhr, status, error) {
                    console.error("AJAX Error:", status, error);
                    console.error("Response Text:", xhr.responseText);
                    $('#productResults').html('<p>Sorry, an error occurred while searching. Please check the console (F12) or try again later.</p>');
                }
            });
        });
    });

});


// نظام سلة التسوق
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}

function addToCart(productId, productName, productPrice, productImage, quantity = 1) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${productName} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

function updateCartItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }
}

function renderCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    if (!cartItemsList) return;
    
    cartItemsList.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="header-item" style="flex:2; text-align:left; display:flex; align-items:center;">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">${item.name}</div>
            </div>
            <div class="header-item cart-item-price">$${item.price.toFixed(2)}</div>
            <div class="header-item cart-item-quantity">
                <input type="number" value="${item.quantity}" min="1" 
                       onchange="updateCartItemQuantity('${item.id}', parseInt(this.value))">
            </div>
            <div class="header-item cart-item-total">$${itemTotal.toFixed(2)}</div>
            <div class="header-item cart-item-action">
                <span class="remove-item" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </span>
            </div>
        `;
        
        cartItemsList.appendChild(itemElement);
    });


    
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    const shipping = subtotal > 100 ? 0 : 10;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `$${(subtotal + shipping).toFixed(2)}`;
    
    // تحديث صفحة الدفع أيضا
    renderCheckoutItems();
}


function renderCheckoutItems() {
    const checkoutItemsList = document.getElementById('checkout-items');
    if (!checkoutItemsList) return;
    
    checkoutItemsList.innerHTML = '';
    
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="checkout-item-img">
            <div class="checkout-item-info">
                <h4>${item.name}</h4>
                <p>Qty: ${item.quantity}</p>
            </div>
            <div class="checkout-item-price">$${itemTotal.toFixed(2)}</div>
        `;
        
        checkoutItemsList.appendChild(itemElement);
    });
    
    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    const shipping = subtotal > 100 ? 0 : 10;
    document.getElementById('checkout-shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${(subtotal + shipping).toFixed(2)}`;
}

// تهيئة صفحة تفاصيل المنتج
function initProductDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
   
    
    const products = {
        '1': {
            name: 'Samsung Galaxy Z Flip3',
            price: 1200,
            image: 'Samsung Galaxy Z Flip3-1.jpg',
            description: 'The Samsung Galaxy Z Flip3 is a foldable smartphone with a compact design that fits in your pocket.',
            specs: ['6.7-inch Foldable Dynamic AMOLED Display', '128GB Storage', '12MP Dual Camera', '3300mAh Battery'],
            available: true
        },
        '2': {
            name: 'Samsung Galaxy S24 Ultra',
            price: 1500,
            image: 'SAMSUNG Galaxy S24 Ultra, AI Android.webp',
            description: 'The latest flagship from Samsung with advanced AI features and powerful performance.',
            specs: ['6.8-inch Dynamic AMOLED Display', '256GB Storage', '200MP Main Camera', '5000mAh Battery'],
            available: true
        },
        '3': {
            name: 'iPhone 16 Pro Max',
            price: 1500,
            image: 'iphone.png',
            description: 'Apple\'s most advanced iPhone with the A18 Bionic chip and improved camera system.',
            specs: ['6.7-inch Super Retina XDR Display', '1TB Storage', 'Triple 48MP Camera System', '4400mAh Battery'],
            available: false
        }
        // يمكن إضافة المزيد من المنتجات هنا
    };
    
    const product = products[productId] || products['1'];
    
    if (product) {
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;
        
        const specsList = document.getElementById('specs-list');
        specsList.innerHTML = '';
        product.specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            specsList.appendChild(li);
        });
        
        const availability = document.getElementById('availability-status');
        if (product.available) {
            availability.textContent = 'Available';
            availability.className = 'available';
        } else {
            availability.textContent = 'Out of Stock';
            availability.className = 'unavailable';
        }
        
        document.getElementById('main-product-image').src = product.image;
        document.querySelectorAll('.thumbnail').forEach((img, index) => {
            img.src = product.image; 
        });
        
        // إضافة حدث النقر على زر "Add to Cart"
        document.getElementById('add-to-cart-btn').addEventListener('click', () => {
            const quantity = parseInt(document.querySelector('.quantity-input').value);
            addToCart(productId, product.name, product.price, product.image, quantity);
        });
    }
}

// تهيئة صفحة الدفع
function initCheckoutPage() {
    document.getElementById('place-order-btn').addEventListener('click', () => {
        const fullName = document.getElementById('full-name').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zipCode = document.getElementById('zip-code').value;
        const phone = document.getElementById('phone').value;
        
        if (!fullName || !address || !city || !zipCode || !phone) {
            alert('Please fill all shipping information fields.');
            return;
        }
        
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // هنا يجب إضافة كود لإرسال بيانات الطلب إلى الخادم
        alert('Order placed successfully! Thank you for your purchase.');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        window.location.href = 'index.html';
    });
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    if (window.location.pathname.includes('product-detail.html')) {
        initProductDetailPage();
    }
    
    if (window.location.pathname.includes('cart.html')) {
        renderCartItems();
    }
    
    if (window.location.pathname.includes('checkout.html')) {
        renderCheckoutItems();
        initCheckoutPage();
    }
    
    // إضافة أحداث النقر على المنتجات في صفحة المنتجات
    document.querySelectorAll('.product-item .btn-details').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('href').split('=')[1];
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
    
    // إضافة أحداث النقر على المنتجات لإضافتها إلى السلة مباشرة
    document.querySelectorAll('.product-item').forEach(item => {
        const addBtn = document.createElement('button');
        addBtn.className = 'btn-add-to-cart';
        addBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
        addBtn.addEventListener('click', function() {
            const productId = item.querySelector('.btn-details').getAttribute('href').split('=')[1];
            const productName = item.querySelector('h3').textContent;
            const productPrice = parseFloat(item.querySelector('.price').textContent.replace('$', ''));
            const productImage = item.querySelector('img').src;
            
            addToCart(productId, productName, productPrice, productImage);
        });
        
        item.appendChild(addBtn);
    });
});






//________________________البحث عن المنتاجات________________________________
document.addEventListener('DOMContentLoaded', function() {
    // تحديث عداد السلة
    updateCartCount();
    
    // تهيئة البحث والتصفية
    initSearchAndFilter();
});


// دالة تصفية المنتجات حسب الفئة
function filterByCategory(category) {
    const products = document.querySelectorAll('.product-item');
    let foundProducts = false;
    
    products.forEach(product => {
        const productCategory = product.getAttribute('category');
        
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
            foundProducts = true;
        } else {
            product.style.display = 'none';
        }
    });
    
    if (!foundProducts && category !== 'all') {
        alert('No products found in this category');
    }
}

// دالة البحث عن المنتجات
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const products = document.querySelectorAll('.product-item');
    let foundAny = false;
    
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        
        if (productName.includes(searchTerm)) {
            product.style.display = 'block';
            foundAny = true;
        } else {
            product.style.display = 'none';
        }
    });
    
    if (!foundAny) {
        alert('No products match your search');
    }
}

// تهيئة أحداث البحث والتصفية
function initSearchAndFilter() {
    // البحث عند الضغط على Enter
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchProducts();
            }
        });
    }
    
    // التصفية حسب الفئة
    const categoryLinks = document.querySelectorAll('.sidebar-categories a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('category');
            
            // إزالة التنشيط من جميع الروابط
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // تنشيط الرابط الحالي
            this.classList.add('active');
            
            // تصفية المنتجات
            filterByCategory(category);
        });
    });
    
    // تنشيط "All" افتراضياً
    const allCategory = document.querySelector('.sidebar-categories a[data-category="all"]');
    if (allCategory) {
        allCategory.classList.add('active');
    }
}

// تحديث عداد السلة
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

