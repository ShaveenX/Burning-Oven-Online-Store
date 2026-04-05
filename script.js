
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Outfit', 'sans-serif'],
                    },
                    colors: {
                        fire: {
                            50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
                            400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
                            800: '#9a3412', 900: '#7c2d12', 950: '#431407',
                        }
                    }
                }
            }
        }
    
        
        // Data
        const PRODUCTS = [
            { id: "1", name: "Inferno X-1 Gaming Laptop", category: "Laptops", price: 2499, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000&auto=format&fit=crop", description: "The ultimate portable powerhouse. Featuring the latest RTX 5090 and i9 processor.", specs: { CPU: "i9-14900HX", GPU: "RTX 5090", RAM: "64GB" }, isNew: true },
            { id: "2", name: "Blaze Desktop Pro", category: "PC", price: 3899, image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=1000&auto=format&fit=crop", description: "A liquid-cooled masterpiece with custom fire-themed loops.", specs: { CPU: "Ryzen 9 7950X3D", GPU: "RTX 4090", Cooling: "Liquid" }, onSale: true },
            { id: "3", name: "Magma Mechanical Keyboard", category: "Accessories", price: 189, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000&auto=format&fit=crop", description: "Hot-swappable switches and per-key RGB that mimics a burning ember.", specs: { Switches: "Linear Red", Layout: "75%", Battery: "4000mAh" } },
            { id: "4", name: "Cinder Ultra-Wide Monitor", category: "Monitors", price: 1299, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop", description: "Immersive visuals with 1000 nits of brightness.", specs: { Panel: "QD-OLED", Res: "5120x1440", Refresh: "240Hz" }, isNew: true },
            { id: "5", name: "Scorch Wireless Mouse", category: "Accessories", price: 129, image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop", description: "Lightweight, fast, and precise with 30K DPI sensor.", specs: { Sensor: "30K DPI", Weight: "49g", Battery: "90h" } },
            { id: "6", name: "Ember Studio Headphones", category: "Accessories", price: 299, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop", description: "High-fidelity audio with spatial sound tracking.", specs: { Drivers: "50mm", Frequency: "10Hz-40kHz", Mic: "Detachable" } }
        ];

        let currentSlide = 0;
        let activeCategory = 'All';
        let cart = [];

        // Initialize
        window.onload = () => {
            lucide.createIcons();
            renderProducts();
            renderFeatured();
            setInterval(nextSlide, 6000);
            
            // Load cart from localStorage if exists
            const savedCart = localStorage.getItem('burning_oven_cart');
            if(savedCart) {
                cart = JSON.parse(savedCart);
                updateCartUI();
            }
        };

        // Navigation
        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
            document.getElementById('page-' + pageId).classList.remove('hidden');
            document.getElementById('page-' + pageId).classList.add('fade-in');
            
            // Update nav links
            document.querySelectorAll('.nav-link').forEach(l => l.classList.replace('text-fire-500', 'text-zinc-400'));
            const activeLink = Array.from(document.querySelectorAll('.nav-link')).find(l => l.textContent.toLowerCase().includes(pageId) || (pageId === 'products' && l.textContent === 'The Armory'));
            if(activeLink) activeLink.classList.replace('text-zinc-400', 'text-fire-500');
            
            window.scrollTo(0, 0);
        }

        // Slider
          function nextSlide() {
              const slides = document.querySelectorAll('.hero-slide');

            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;

            slides[currentSlide].classList.add('active');
            slides[currentSlide].classList.add('fade-in');
        }
        function prevSlide() {
            const slides = document.querySelectorAll('.hero-slide');
            if(!slides.length) return;
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        // Product Rendering
        function renderProducts(filter = '') {
            const grid = document.getElementById('product-grid');
            const filtered = PRODUCTS.filter(p => 
                (activeCategory === 'All' || p.category === activeCategory) &&
                (p.name.toLowerCase().includes(filter.toLowerCase()))
            );

            grid.innerHTML = filtered.map(p => createProductCard(p)).join('');
            lucide.createIcons();
        }

        function renderFeatured() {
            const grid = document.getElementById('featured-grid');
            if(!grid) return;
            const featured = PRODUCTS.slice(0, 6);
            grid.innerHTML = featured.map(p => createProductCard(p)).join('');
            lucide.createIcons();
        }

        function createProductCard(p) {
            return `
                <div class="glass-card rounded-2xl overflow-hidden group cursor-pointer fire-glow-hover transition-all duration-300">
                    <div class="relative h-64 overflow-hidden" onclick="showDetail('${p.id}')">
                        <img src="${p.image}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer">
                        <div class="absolute top-4 left-4 flex flex-col gap-2">
                            ${p.isNew ? '<span class="px-3 py-1 bg-fire-600 text-white text-[10px] font-bold rounded-full uppercase">New</span>' : ''}
                            ${p.onSale ? '<span class="px-3 py-1 bg-yellow-500 text-black text-[10px] font-bold rounded-full uppercase">Sale</span>' : ''}
                        </div>
                    </div>
                    <div class="p-6">
                        <div onclick="showDetail('${p.id}')">
                            <span class="text-xs font-bold text-fire-500 uppercase tracking-widest">${p.category}</span>
                            <h3 class="text-xl font-display font-bold mb-2 group-hover:text-fire-400 transition-colors">${p.name}</h3>
                            <p class="text-zinc-400 text-sm line-clamp-2 mb-4">${p.description}</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-2xl font-bold text-white">$${p.price.toLocaleString()}</span>
                            <button onclick="addToCart('${p.id}')" class="p-3 bg-fire-600 hover:bg-fire-700 text-white rounded-xl transition-all fire-glow">
                                <i data-lucide="shopping-cart" class="w-5 h-5"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        function handleSearch() {
            const query = document.getElementById('product-search').value;
            renderProducts(query);
        }

        function filterByCategory(cat) {
            activeCategory = cat;
            showPage('products');
            
            // Update tabs UI
            document.querySelectorAll('.cat-tab').forEach(tab => {
                if(tab.textContent.includes(cat) || (cat === 'All' && tab.textContent === 'All Gear')) {
                    tab.classList.add('bg-fire-600', 'text-white', 'fire-glow');
                    tab.classList.remove('bg-zinc-900', 'text-zinc-400');
                } else {
                    tab.classList.remove('bg-fire-600', 'text-white', 'fire-glow');
                    tab.classList.add('bg-zinc-900', 'text-zinc-400');
                }
            });
            
            renderProducts();
        }

        function showDetail(id) {
            const p = PRODUCTS.find(prod => prod.id === id);
            const content = document.getElementById('product-detail-content');
            
            content.innerHTML = `
                <button onclick="showPage('products')" class="flex items-center gap-2 text-zinc-400 hover:text-fire-500 mb-8 transition-colors">← Back to Store</button>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div class="aspect-square rounded-3xl overflow-hidden glass-card p-2">
                        <img src="${p.image}" class="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer">
                    </div>
                    <div>
                        <span class="px-3 py-1 bg-fire-600/20 text-fire-500 text-xs font-bold rounded-full uppercase mb-4 inline-block">${p.category}</span>
                        <h1 class="text-5xl font-display font-extrabold mb-4">${p.name}</h1>
                        <p class="text-3xl font-bold text-white mb-6">$${p.price.toLocaleString()}</p>
                        <p class="text-zinc-400 text-lg mb-8 leading-relaxed">${p.description}</p>
                        
                        <div class="glass-card rounded-2xl p-6 mb-8">
                            <h3 class="font-bold mb-4 flex items-center gap-2"><i data-lucide="flame" class="w-4 h-4 text-fire-500"></i> Technical Specs</h3>
                            <div class="grid grid-cols-2 gap-4">
                                ${Object.entries(p.specs).map(([k, v]) => `<div><div class="text-xs text-zinc-500 uppercase font-bold">${k}</div><div class="text-zinc-200">${v}</div></div>`).join('')}
                            </div>
                        </div>

                        <div class="flex flex-col sm:flex-row gap-4">
                            <button onclick="addToCart('${p.id}')" class="flex-1 py-4 bg-fire-600 hover:bg-fire-700 text-white font-bold rounded-xl fire-glow transition-all flex items-center justify-center gap-2">
                                <i data-lucide="shopping-cart" class="w-5 h-5"></i> ADD TO CART
                            </button>
                            <button class="flex-1 py-4 bg-white text-black hover:bg-zinc-200 font-bold rounded-xl transition-all">BUY NOW</button>
                        </div>
                    </div>
                </div>
            `;
            
            showPage('detail');
            lucide.createIcons();
        }

        // Cart Logic
        function toggleCart() {
            const sidebar = document.getElementById('cart-sidebar');
            const overlay = document.getElementById('cart-overlay');
            sidebar.classList.toggle('open');
            overlay.classList.toggle('hidden');
        }

        function addToCart(id) {
            const product = PRODUCTS.find(p => p.id === id);
            const existing = cart.find(item => item.id === id);
            
            if(existing) {
                existing.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            
            updateCartUI();
            
            // Show cart sidebar when adding
            const sidebar = document.getElementById('cart-sidebar');
            if(!sidebar.classList.contains('open')) toggleCart();
            
            // Save to localStorage
            localStorage.setItem('burning_oven_cart', JSON.stringify(cart));
        }

        function removeFromCart(id) {
            cart = cart.filter(item => item.id !== id);
            updateCartUI();
            localStorage.setItem('burning_oven_cart', JSON.stringify(cart));
        }

        function updateQuantity(id, delta) {
            const item = cart.find(i => i.id === id);
            if(item) {
                item.quantity += delta;
                if(item.quantity <= 0) {
                    removeFromCart(id);
                } else {
                    updateCartUI();
                    localStorage.setItem('burning_oven_cart', JSON.stringify(cart));
                }
            }
        }

        function updateCartUI() {
            const cartItems = document.getElementById('cart-items');
            const cartCount = document.getElementById('cart-count');
            const cartTotal = document.getElementById('cart-total');
            
            const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            cartCount.textContent = totalCount;
            cartTotal.textContent = '$' + totalPrice.toLocaleString();
            
            if(cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="h-full flex flex-col items-center justify-center text-zinc-600 gap-4">
                        <i data-lucide="shopping-bag" class="w-12 h-12 opacity-20"></i>
                        <p>Your cart is empty</p>
                        <button onclick="toggleCart(); showPage('products')" class="text-fire-500 font-bold">Start Shopping</button>
                    </div>
                `;
            } else {
                cartItems.innerHTML = cart.map(item => `
                    <div class="flex gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
                        <img src="${item.image}" class="w-20 h-20 object-cover rounded-lg" referrerPolicy="no-referrer">
                        <div class="flex-1">
                            <h4 class="font-bold text-sm mb-1">${item.name}</h4>
                            <p class="text-fire-500 font-bold mb-2">$${item.price.toLocaleString()}</p>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3 bg-zinc-950 px-2 py-1 rounded-lg border border-zinc-800">
                                    <button onclick="updateQuantity('${item.id}', -1)" class="text-zinc-500 hover:text-white"><i data-lucide="minus" class="w-3 h-3"></i></button>
                                    <span class="text-xs font-bold w-4 text-center">${item.quantity}</span>
                                    <button onclick="updateQuantity('${item.id}', 1)" class="text-zinc-500 hover:text-white"><i data-lucide="plus" class="w-3 h-3"></i></button>
                                </div>
                                <button onclick="removeFromCart('${item.id}')" class="text-zinc-600 hover:text-red-500 transition-colors">
                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
            lucide.createIcons();
        }
