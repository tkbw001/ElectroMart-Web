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
    const productId = urlParams.get('id'); // احصل على المعرف من الرابط

    console.log("Attempting to load product with ID:", productId); // سجل المعرف للتحقق

    // بيانات المنتجات الأولى (معرفات رقمية)
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
            available: false // Example: Out of stock
        },
        '4': {
            name: 'Samsung a55',
            price: 1500,
            image: 'eg-galaxy-a55-5g-sm-a556-sm-a556elvwmea-thumb-541836667.avif',
            description: 'The new Samsung a55 offers great value and performance for mid-range users.',
            specs: ['6.6-inch Super AMOLED Display', '128GB Storage', '64MP Triple Camera', '5000mAh Battery'],
            available: true
        },
        '5': {
            name: 'iPhone 14',
            price: 500,
            image: 'Apple-iPhone-14.jpg',
            description: 'iPhone 14 with great performance and camera in a familiar form factor.',
            specs: ['6.1-inch Super Retina XDR', '128GB Storage', '12MP Dual Camera', '3279mAh Battery'],
            available: true
        },
        '6': {
            name: 'iPhone 16 Plus',
            price: 900,
            image: 'iphone 16 plus.jpeg',
            description: 'The larger version of iPhone 16 with extended battery life.',
            specs: ['6.8-inch Retina Display', '256GB Storage', '48MP Camera', '5000mAh Battery'],
            available: false // Example: Out of stock
        }
    };

    // بيانات المنتجات الأخرى (معرفات تبدأ بـ 'p')
    const productDetails = {
        "p1": {
            name: "iPhone 15 Pro Max",
            description: "The iPhone 15 Pro Max features a stunning 6.7-inch Super Retina XDR display, A16 Bionic chip, and an advanced triple-camera system.",
            price: 1100,
            image: "iphone 15 pro max.jpg",
            specs: ["6.7-inch Super Retina XDR", "A16 Bionic Chip", "Triple-camera system"],
            available: true
        },
        "p2": {
            name: "LG TV",
            description: "Experience true-to-life colors with the LG 55-inch OLED TV. Features 4K resolution, Dolby Vision, and smart capabilities.",
            price: 2000,
            image: "lg-tv.avif",
            specs: ["55-inch OLED Display", "4K Resolution", "Dolby Vision", "Smart TV"],
            available: true
        },
        "p3": {
            name: "Samsung TV", // Note: This matches one of the Samsung TVs in products.html
            description: "The Samsung 55-inch 4K Crystal UHD TV offers vibrant colors and clarity for an immersive viewing experience.",
            price: 1300,
            image: "Samsaoung-tv.avif", 
            specs: ["55-inch 4K Crystal UHD", "Vibrant Colors"],
            available: true
        },
        "p4": {
            name: "Arktek NVIDIA GeForce GTX 750 TI",
            description: "A high-performance graphics card perfect for gaming and media production, featuring 4GB of GDDR5 memory.",
            price: 300,
            image: "Arktek-NVIDIA-GeForce-GTX-750-TI-4GB.jpg", 
            specs: ["4GB GDDR5", "128-Bit Interface"],
            available: true
        },
        "p5": {
            name: "MSI Gaming GeForce RTX 4060",
            description: "An advanced graphics card with real-time ray tracing and AI-enhanced graphics, perfect for gaming at 4K resolution.",
            price: 500,
            image: "4060.jpg", 
            specs: ["8GB GDDR6", "128-Bit Interface", "Real-time Ray Tracing"],
            available: true
        },
        "p6": {
            name: "ZOTAC GAMING GeForce RTX 4080 Super",
            description: "A top-tier GPU for gamers and professionals, offering exceptional performance with 16GB of GDDR6X memory.",
            price: 1300,
            image: "ZOTAC-GAMING-GeForce-RTX-4080-Super-Trinity-White-OC-16GB.jpg", 
            specs: ["16GB GDDR6X"],
            available: false
        },
         "p7": {
            name: "HP Victus Gaming Laptop",
            description: "The HP Victus Gaming Laptop is powered by an Intel i7 processor, 16GB RAM, and a 512GB SSD for an unbeatable gaming experience.",
            price: 1300,
            image: "Laptop1.jpg", 
            specs: ["Intel i7 Processor", "16GB RAM", "512GB SSD"],
            available: true
        },
        "p8": {
            name: "ASUS TUF Gaming A15 FA506NFR",
            description: "This gaming laptop features an AMD Ryzen 7, 16GB RAM, and NVIDIA GeForce RTX 3060 for smooth gameplay at 1080p.",
            price: 1000,
            image: "Latop2.jpg", 
            specs: ["AMD Ryzen 7", "16GB RAM", "NVIDIA GeForce RTX 3060"],
            available: true
        },
        "p9": {
            name: "Lenovo IdeaCentre Gaming5 14IOB6",
            description: "A powerful gaming desktop featuring AMD Ryzen 7, 32GB RAM, and a 1TB SSD for lightning-fast performance.",
            price: 1400, 
            image: "pc.jpg", 
            specs: ["AMD Ryzen 7", "32GB RAM", "1TB SSD"],
            available: true
        }
    };

    

    // ابحث عن المنتج بالمعرف المستلم (سواء كان رقم أو يبدأ بـ 'p')
    const product = products[productId] || productDetails[productId];

    console.log("Found product:", product); // سجل المنتج الذي تم العثور عليه (أو undefined)


    if (product) {
        // تأكد أن قيمة السعر هي رقم قبل استخدام toFixed
        const price = typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price;
        if (isNaN(price)) {
             console.error("Invalid price found for product", product);
             document.getElementById('product-price').textContent = 'N/A';
        } else {
            document.getElementById('product-price').textContent = `$${price.toFixed(2)}`;
        }

        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-description').textContent = product.description;

        const specsList = document.getElementById('specs-list');
        specsList.innerHTML = ''; // امسح المواصفات القديمة إذا وجدت

        // تأكد أن specs موجودة وأنها مصفوفة
        if (product.specs && Array.isArray(product.specs)) {
             product.specs.forEach(spec => {
                const li = document.createElement('li');
                li.textContent = spec;
                specsList.appendChild(li);
            });
        } else {
            // أضف رسالة إذا لم تتوفر المواصفات
            const li = document.createElement('li');
            li.textContent = 'No specifications available.';
            specsList.appendChild(li);
        }

        const availability = document.getElementById('availability-status');
        // تأكد أن available موجودة وقيمة منطقية (boolean)
        if (typeof product.available === 'boolean' && product.available) {
            availability.textContent = 'Available';
            availability.className = 'available'; // لتطبيق الستايل الأخضر
            document.getElementById('add-to-cart-btn').disabled = false; // تمكين زر الإضافة
        } else {
            availability.textContent = 'Out of Stock';
            availability.className = 'unavailable'; // لتطبيق الستايل الأحمر أو أي ستايل آخر
            document.getElementById('add-to-cart-btn').disabled = true; // تعطيل زر الإضافة
        }

        // تأكد من مسار الصورة صحيح قبل تعيينه
        const mainImageElement = document.getElementById('main-product-image');
         if (mainImageElement) {
            mainImageElement.src = product.image;
            mainImageElement.alt = product.name; // تحسين قابلية الوصول
         }

        // تحديث الصور المصغرة (thumbnails) - تستخدم نفس الصورة الرئيسية حالياً
        document.querySelectorAll('.thumbnail').forEach((img, index) => {
             img.src = product.image; // حالياً، استخدم نفس الصورة الرئيسية
             img.alt = `${product.name} thumbnail ${index + 1}`; // تحسين قابلية الوصول
        });


         // مسح السعر الأصلي والخصم إذا كانت البيانات غير متوفرة
        const originalPriceElement = document.querySelector('.original-price');
        const discountElement = document.querySelector('.discount');

        if (originalPriceElement) {
            originalPriceElement.textContent = '';
        }
        if (discountElement) {
            discountElement.textContent = '';
        }


    } else {
        // إذا لم يتم العثور على المنتج
        document.getElementById('product-title').textContent = 'Product Not Found';
        document.getElementById('product-price').textContent = '';
        document.getElementById('product-description').textContent = 'The requested product could not be found.';
        document.getElementById('specs-list').innerHTML = ''; // مسح قائمة المواصفات
        document.getElementById('availability-status').textContent = 'Unknown Status'; // حالة افتراضية
        document.getElementById('availability-status').className = ''; // إزالة أي كلاسات ستايل
        document.getElementById('main-product-image').src = ''; // مسح الصورة
        document.querySelectorAll('.thumbnail').forEach(img => img.src = ''); // مسح الصور المصغرة
        document.getElementById('add-to-cart-btn').disabled = true; // تعطيل زر الإضافة
         console.error("Product with ID " + productId + " not found."); // رسالة خطأ في الكونسول
    }

const oldCartSection = document.querySelector('.add-to-cart');
if (oldCartSection) {
    oldCartSection.remove();
}

// ثانياً: إنشاء الواجهة الجديدة
const addToCartContainer = document.createElement('div');
addToCartContainer.className = 'add-to-cart d-flex align-items-center gap-2 mt-3';

// عنصر تحديد الكمية
const quantitySelector = document.createElement('div');
quantitySelector.className = 'quantity-selector d-flex align-items-center border rounded overflow-hidden';

// زر -
const minusBtn = document.createElement('button');
minusBtn.className = 'quantity-btn btn btn-light';
minusBtn.textContent = '-';

// مدخل الرقم
const quantityInput = document.createElement('input');
quantityInput.type = 'number';
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.className = 'quantity-input form-control text-center';
quantityInput.style.width = '60px';

// زر +
const plusBtn = document.createElement('button');
plusBtn.className = 'quantity-btn btn btn-light';
plusBtn.textContent = '+';

quantitySelector.appendChild(minusBtn);
quantitySelector.appendChild(quantityInput);
quantitySelector.appendChild(plusBtn);

// زر الإضافة للسلة
const addBtn = document.createElement('button');
addBtn.id = 'add-to-cart-btn';
addBtn.className = 'btn btn-danger d-flex align-items-center';
addBtn.innerHTML = '<i class="fas fa-cart-plus me-2"></i> Add to Cart';
addBtn.dataset.productId = productId;

// إدخال العناصر معًا
addToCartContainer.appendChild(quantitySelector);
addToCartContainer.appendChild(addBtn);

// إضافة العنصر للقسم المناسب
document.querySelector('.product-info').appendChild(addToCartContainer);

// الأحداث
plusBtn.addEventListener('click', () => {
    quantityInput.value = parseInt(quantityInput.value) + 1;
});

minusBtn.addEventListener('click', () => {
    if (parseInt(quantityInput.value) > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
});

addBtn.addEventListener('click', function (event) {
    event.preventDefault();

    const quantity = parseInt(quantityInput.value);
    const productName = document.getElementById('product-title').textContent;
    const productPriceText = document.getElementById('product-price').textContent;
    const productPrice = parseFloat(productPriceText.replace('$', ''));
    const productImage = document.getElementById('main-product-image').src;

    if (isNaN(productPrice)) {
        alert("The price is not valid for this product.");
        return;
    }

    addToCart(productId, productName, productPrice, productImage, quantity);
    console.log(`Product added: ${productName} (${quantity})`);
});


}

// تأكد من استدعاء هذه الدالة عند تحميل محتوى الصفحة
document.addEventListener('DOMContentLoaded', initProductDetailPage);

// ... بقية كود java.js (مثل دالة searchProducts والدوال المتعلقة بها) ...


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
document.addEventListener('DOMContentLoaded', function() { // هنا تم إضافة القوس '{'
    updateCartCount(); 
}); 
    
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
    document.addEventListener('DOMContentLoaded', function() {
        // ... (الدوال والمتغيرات الأخرى الخاصة بـ java.js مثل تعريف products و productDetails ودالة addToCart) ...
    
        // إضافة أحداث النقر على المنتجات لإضافتها إلى السلة مباشرة
        document.querySelectorAll('.product-item').forEach(item => {
            // تحقق مما إذا كان زر "Add to Cart" موجوداً بالفعل لهذا المنتج
            if (item.querySelector('.btn-add-to-cart')) {
                //console.log('Add to cart button already exists for this item.'); // يمكن إلغاء التعليق للتصحيح
                return; // تخطي هذا العنصر إذا كان الزر موجوداً بالفعل
            }
    
            // محاولة استخراج بيانات المنتج من العناصر الموجودة
            const detailLink = item.querySelector('.btn-details');
            const nameElement = item.querySelector('h3');
            const priceElement = item.querySelector('.price');
            const imgElement = item.querySelector('img');
    
            // تحقق من وجود العناصر الأساسية
            if (!detailLink || !nameElement || !priceElement || !imgElement) {
                console.warn('Skipping product item due to missing elements:', item);
                return; // تخطي هذا العنصر إذا لم تتوفر البيانات الأساسية
            }
    
            // استخراج productId بشكل أكثر أماناً من رابط التفاصيل
            let productId = null;
            const href = detailLink.getAttribute('href');
            if (href) {
                const url = new URL(href, window.location.origin); // إنشاء كائن URL للتحليل بسهولة
                productId = url.searchParams.get('id'); // استخراج قيمة المعامل 'id'
            }
    
            if (!productId) {
                console.warn('Skipping product item due to missing product ID in href:', href, item);
                return; // تخطي هذا العنصر إذا لم يتم العثور على المعرف
            }
    
            const productName = nameElement.textContent.trim(); // استخدم trim لإزالة المسافات البيضاء
            const productPriceText = priceElement.textContent.replace(/[^\d.-]/g, ''); // إزالة كل شيء ما عدا الأرقام، النقطة، والشرطة (للسالب إذا وجد)
            const productPrice = parseFloat(productPriceText); // تحويل النص النظيف إلى رقم عشري
    
            // تحقق مما إذا كان السعر صالحاً
            if (isNaN(productPrice)) {
                 console.warn('Skipping product item due to invalid price:', priceElement.textContent, item);
                 return; // تخطي هذا العنصر إذا كان السعر غير صالح
            }
    
            const productImage = imgElement.src; // مسار الصورة
    
            // إنشاء زر "Add to Cart"
            const addBtn = document.createElement('button');
            addBtn.className = 'btn-add-to-cart';
            // استخدم Font Awesome icon وكتابة Add to Cart
            addBtn.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
    
    
            // إضافة مستمع الحدث لزر النقر
            addBtn.addEventListener('click', function(event) {
                event.preventDefault(); // منع السلوك الافتراضي للزر إذا كان داخل فورم مثلاً (غالباً ليس هنا لكن ممارسة جيدة)
                // عند النقر، استدعاء دالة addToCart مع البيانات المستخرجة
                // افترض أن دالة addToCart(id, name, price, image) معرفة في مكان آخر
                addToCart(productId, productName, productPrice, productImage);
                console.log(`Product added to cart: ID=${productId}, Name=${productName}`); // رسالة للتصحيح
                // يمكنك إضافة رسالة تأكيد للمستخدم هنا (مثال: alert أو رسالة مؤقتة على الشاشة)
            });
    
            // إضافة الزر إلى عنصر المنتج
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

