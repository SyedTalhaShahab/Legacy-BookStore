fetch('books.txt')
    .then(response => response.text())
    .then(data => {
        const books = data.trim().split('\n\n').map(block => {
            const lines = block.split('\n');
            const book = {};
            lines.forEach(line => {
                const [key, value] = line.split(': ');
                if (key && value) {
                    book[key.toLowerCase()] = value;
                }
            });
            return book;
        });

        const container = document.getElementById('book-list');
        const sortSelect = document.getElementById('sort-options'); // Dropdown for sorting

        // Function to clean price (remove any non-numeric characters)
        function parsePrice(price) {
            return parseFloat(price.replace(/[^\d.-]/g, '')) || 0; // Extract only numbers and dots
        }

        // Sort books function
        function sortBooks(criteria) {
            switch (criteria) {
                case 'alpha-asc':
                    return books.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
                case 'alpha-desc':
                    return books.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
                case 'price-high-low':
                    return books.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
                case 'price-low-high':
                    return books.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
                default:
                    return books;
            }
        }

        // Event listener for sorting
        sortSelect.addEventListener('change', (e) => {
            const sortedBooks = sortBooks(e.target.value);
            renderBooks(sortedBooks);
        });

        // Function to render books
        function renderBooks(books) {
            container.innerHTML = ''; // Clear existing books
            books.forEach(book => {
                const section = document.createElement('div');
                section.className = 'section';
                section.style.cursor = 'pointer';

                const title = document.createElement('div');
                title.className = 'title';
                title.textContent = book.title || 'Unknown Title';

                const price = document.createElement('div');
                price.className = 'price';
                const formattedPrice = (book.price || 'Unknown Price').replace('£', '$');
                price.textContent = formattedPrice;

                const stock = document.createElement('div');
                stock.className = 'stock';
                stock.textContent = book.stock || 'Unknown Stock';

                section.addEventListener('click', () => {
                    window.location.href = 'https://books.toscrape.com/catalogue/category/books/mystery_3/';
                });

                section.appendChild(title);
                section.appendChild(price);
                section.appendChild(stock);

                container.appendChild(section);
            });
        }

        // Initial render
        renderBooks(books);
    })
    .catch(error => console.error('Error loading books:', error));
