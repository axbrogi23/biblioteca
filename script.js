// script.js

// 1. Muevo navigateTo al ámbito global y me aseguro de que sea la ÚNICA definición.
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const HISTORY_STORAGE_KEY = 'reservedBooksHistory';
    const FOLLOWED_BOOKS_KEY = 'followedBooksLibrary'; // Nueva clave para libros seguidos

    // Funciones para manejar el historial en localStorage
    function getReservationHistory() {
        return JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY)) || [];
    }

    function saveReservationHistory(history) {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    }

    function addBookToHistory(bookDetails) {
        const history = getReservationHistory();
        history.unshift(bookDetails); 
        saveReservationHistory(history);
    }

    // --- Funciones para manejar libros seguidos en localStorage ---
    function getFollowedBooks() {
        return JSON.parse(localStorage.getItem(FOLLOWED_BOOKS_KEY)) || [];
    }

    function saveFollowedBooks(followedBooks) {
        localStorage.setItem(FOLLOWED_BOOKS_KEY, JSON.stringify(followedBooks));
    }

    function isBookFollowed(bookId) {
        const followedBooks = getFollowedBooks();
        return followedBooks.some(book => book.id === bookId);
    }

    function toggleFollowBook(bookDetails) {
        let followedBooks = getFollowedBooks();
        const bookIndex = followedBooks.findIndex(book => book.id === bookDetails.id);

        if (bookIndex > -1) { // Si ya está seguido, dejar de seguir
            followedBooks.splice(bookIndex, 1);
        } else { // Si no está seguido, seguir
            followedBooks.unshift(bookDetails); // Añadir al principio
        }
        saveFollowedBooks(followedBooks);
        return !(bookIndex > -1); // Retorna true si ahora está seguido, false si se dejó de seguir
    }


    // Funciones para mostrar contenido de las pestañas
    function displayFavoritosContent() {
        const tabContentArea = document.querySelector('#pantalla-menu #tab-content-area');
        if (!tabContentArea) {
            console.error("displayFavoritosContent: #tab-content-area no encontrada.");
            return;
        }
        console.log("Ejecutando displayFavoritosContent..."); 

        const librosFavoritos = [
            { 
                id: 'quijote', 
                title: "Don Quijote de la mancha", 
                imgSrc: "imagenes_mockups/donquijote.avif", 
                description: "Una obra maestra de la literatura española.", 
                price: "12.50", 
                genre: "Novela Clásica", 
                author: "Miguel de Cervantes", 
                type: "Narrativa" 
            },
            { 
                id: 'narnia', 
                title: "Las Crónicas de Narnia", 
                imgSrc: "imagenes_mockups/estuche-narnia.jpg", 
                description: "Cuatro hermanos descubren Narnia, un mundo mágico...", 
                price: "10.00", 
                genre: "Fantasía Juvenil", 
                author: "C.S. Lewis", 
                type: "Fantasía" 
            },
            { 
                id: 'shakespeare', 
                title: "Romeo y Julieta", 
                imgSrc: "imagenes_mockups/william_shakespeare.webp",
                description: "La trágica historia de dos jóvenes amantes.", 
                price: "15.75", 
                genre: "Tragedia", 
                author: "William Shakespeare", 
                type: "Dramática" 
            },
            { // Nuevo libro añadido
                id: 'sherlock_manga', 
                title: "Manga de Sherlock", 
                imgSrc: "imagenes_mockups/manga_sherlock.webp", // Necesitarás una imagen para esto
                description: "Las aventuras del famoso detective en formato manga.", 
                price: "9.99", 
                genre: "Misterio", 
                author: "Arthur Conan Doyle (Adaptación)", 
                type: "Manga" 
            },
            {
                id: 'Padre_Rico',
                title: "Padre Rico, Padre Pobre",
                imgSrc: "imagenes_mockups/padre_rico_padre_pobre.webp",
                description: "Un libro que desafía las creencias tradicionales sobre el dinero.",
                price: "14.99",
                author: "Robert T. Kiyosaki",
                genre: "Finanzas Personales",
                type: "No Ficción",
            },
            {
                id: 'Principito',
                title: "El Principito",
                imgSrc: "imagenes_mockups/principito.jpg",
                description: "Un cuento poético sobre la soledad, la amistad y el amor.",
                price: "8.99",
                genre: "Fantasía",
                author: "Antoine de Saint-Exupéry",
                type: "Narrativa",
            },
            {
                id: 'Cien_Años_de_Soledad',
                title: "Cien Años de Soledad",
                imgSrc: "imagenes_mockups/cien_años_de_soledad.webp",
                description: "La historia de la familia Buendía en el pueblo de Macondo.",
                price: "13.99",
                genre: "Realismo Mágico",
                author: "Gabriel García Márquez",
                type: "Narrativa",
            },
            {
                id: 'Estoicismo',
                title: "Estoicismo",
                imgSrc: "imagenes_mockups/estoico.webp",
                description: "Descubre la filosofía de los antiguos estoicos para aumentar la resistencia y desarrollar la sabiduría.",
                price: "10.87",
                genre: "Filosofía",
                author: "Leon Simonds",
                type: "No Ficción",
            },
            {
                id: 'Dragon_Ball',
                title: "Dragon Ball",
                imgSrc: "imagenes_mockups/portada_dragon_ball.webp",
                description: "Las aventuras de Goku y sus amigos en la búsqueda de las esferas del dragón.",
                price: "12.99",
                genre: "Shonen",
                author: "Akira Toriyama",
                type: "Manga",
            },
            {
                id:'fantasmas',
                title: "El Fantasma de Canterville",
                imgSrc:"imagenes_mockups/El_fantasma_de_Canterville-Wilde_Oscar-lg.png",
                description: "Una comedia sobre un fantasma que aterroriza a una familia estadounidense en Inglaterra.",
                price: "7.50",
                genre: "Comedia",
                author: "Oscar Wilde",
                type: "Narrativa",
            },
            {
                id:'Literary',
                title: "Ensayos literarios",
                imgSrc:"imagenes_mockups/Ensayos_Literarios-Robert_Louis_Stevenson-md.jpeg",
                description: "Una colección de ensayos sobre literatura y crítica literaria.",
                price: "9.99",
                genre: "Ensayo",
                author: "Robert Louis Stevenson",
                type: "No Ficción",
            },
        ];

        let bookListHTML = '<div class="book-list">';
        librosFavoritos.forEach(book => {
            const isFollowed = isBookFollowed(book.id);
            bookListHTML += `
                <div class="book-item" 
                    data-id="${book.id}"
                    data-title="${book.title}" 
                    data-img-src="${book.imgSrc}" 
                    data-description="${book.description}" 
                    data-price="${book.price}" 
                    data-genre="${book.genre}" 
                    data-author="${book.author}" 
                    data-type="${book.type}">
                    <img src="${book.imgSrc}" alt="${book.title}">
                    <p>${book.type.toUpperCase()}</p>
                    <span>${book.title}</span>
                    <button class="btn-facturar-libro">Facturar este libro</button>
                    <button class="btn-toggle-follow" data-book-id="${book.id}">
                        ${isFollowed ? 'Dejar de Seguir' : 'Seguir'}
                    </button>
                </div>
            `;
        });
        bookListHTML += '</div>';

        tabContentArea.innerHTML = `<h3>Tipos de libro ></h3>${bookListHTML}`;

        // Event listeners para botones "Facturar este libro"
        document.querySelectorAll('#pantalla-menu .btn-facturar-libro').forEach(button => {
            button.addEventListener('click', (event) => {
                const bookItem = event.target.closest('.book-item');
                const bookData = { // Recolectar todos los datos del libro
                    id: bookItem.dataset.id,
                    title: bookItem.dataset.title,
                    imgSrc: bookItem.dataset.imgSrc,
                    description: bookItem.dataset.description,
                    price: bookItem.dataset.price,
                    genre: bookItem.dataset.genre,
                    author: bookItem.dataset.author,
                    type: bookItem.dataset.type,
                };
                populateFacturacionScreen(bookData);
                navigateTo('pantalla-facturacion');
            });
        });

        // Event listeners para botones "Seguir/Dejar de Seguir"
        document.querySelectorAll('#pantalla-menu .btn-toggle-follow').forEach(button => {
            button.addEventListener('click', (event) => {
                const bookItemElement = event.target.closest('.book-item');
                const bookDetails = { // Recolectar todos los datos del libro para guardarlo si se sigue
                    id: bookItemElement.dataset.id,
                    title: bookItemElement.dataset.title,
                    imgSrc: bookItemElement.dataset.imgSrc,
                    description: bookItemElement.dataset.description,
                    price: bookItemElement.dataset.price,
                    genre: bookItemElement.dataset.genre,
                    author: bookItemElement.dataset.author,
                    type: bookItemElement.dataset.type,
                };
                
                const nowFollowing = toggleFollowBook(bookDetails);
                event.target.textContent = nowFollowing ? 'Dejar de Seguir' : 'Seguir';
                
                // Opcional: Si la pestaña "Seguidos" está activa, recargarla
                const activeTab = document.querySelector('#pantalla-menu .tab-button.active');
                if (activeTab && activeTab.textContent.trim() === 'Seguidos') {
                    displaySeguidosContent();
                }
            });
        });
    }

    function displayHistorialContent() {
        const tabContentArea = document.querySelector('#pantalla-menu #tab-content-area');
        if (!tabContentArea) return;

        tabContentArea.innerHTML = ''; 

        const historyTitle = document.createElement('h3');
        historyTitle.textContent = 'Historial de Reservas';
        tabContentArea.appendChild(historyTitle);

        const historyListContainer = document.createElement('div');
        historyListContainer.className = 'book-list history-list'; 

        const reservedBooks = getReservationHistory();

        if (reservedBooks.length === 0) {
            const noHistoryMessage = document.createElement('p');
            noHistoryMessage.textContent = 'No hay libros en tu historial de reservas.';
            historyListContainer.appendChild(noHistoryMessage);
        } else {
            reservedBooks.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.className = 'book-item';

                const img = document.createElement('img');
                img.src = book.imgSrc || 'imagenes_mockups/default_book.png'; 
                img.alt = book.title;

                const title = document.createElement('p');
                title.textContent = (book.title || 'Libro Reservado').toUpperCase();
                
                const description = document.createElement('span');
                description.textContent = book.description || `Reservado el ${new Date(book.reservedDate || Date.now()).toLocaleDateString()}`;


                bookItem.appendChild(img);
                bookItem.appendChild(title);
                bookItem.appendChild(description);
                historyListContainer.appendChild(bookItem);
            });

            // Botón para limpiar el historial
            const clearHistoryButton = document.createElement('button');
            clearHistoryButton.textContent = 'Limpiar Historial';
            clearHistoryButton.className = 'btn-secondary btn-clear-history'; // Clase para estilos
            clearHistoryButton.style.marginTop = '20px'; // Un poco de espacio
            clearHistoryButton.addEventListener('click', () => {
                if (confirm('¿Estás seguro de que quieres borrar todo el historial? Esta acción no se puede deshacer.')) {
                    localStorage.removeItem(HISTORY_STORAGE_KEY); // Borra el historial de localStorage
                    displayHistorialContent(); // Vuelve a renderizar la pestaña de historial (ahora vacía)
                }
            });
            tabContentArea.appendChild(clearHistoryButton); // Añadir el botón después de la lista
        }
        tabContentArea.appendChild(historyListContainer); // Añadir el contenedor de la lista (incluso si está vacío)
    }

    function displaySeguidosContent() {
        const tabContentArea = document.querySelector('#pantalla-menu #tab-content-area');
        if (!tabContentArea) return;

        tabContentArea.innerHTML = ''; // Limpiar contenido anterior

        const followedTitle = document.createElement('h3');
        followedTitle.textContent = 'Libros Seguidos';
        tabContentArea.appendChild(followedTitle);

        const followedListContainer = document.createElement('div');
        followedListContainer.className = 'book-list followed-list'; // Clase específica

        const followedBooks = getFollowedBooks();

        if (followedBooks.length === 0) {
            const noFollowedMessage = document.createElement('p');
            noFollowedMessage.textContent = 'No estás siguiendo ningún libro todavía.';
            followedListContainer.appendChild(noFollowedMessage);
        } else {
            followedBooks.forEach(book => {
                const bookItem = document.createElement('div');
                bookItem.className = 'book-item'; // Reutilizar estilos
                // Guardar todos los datos necesarios para facturar o dejar de seguir desde aquí
                Object.keys(book).forEach(key => {
                    bookItem.dataset[key] = book[key];
                });

                const img = document.createElement('img');
                img.src = book.imgSrc || 'imagenes_mockups/default_book.png';
                img.alt = book.title;

                const type = document.createElement('p');
                type.textContent = (book.type || 'Libro').toUpperCase();
                
                const title = document.createElement('span');
                title.textContent = book.title || 'Libro Seguido';

                const btnFacturar = document.createElement('button');
                btnFacturar.className = 'btn-facturar-libro';
                btnFacturar.textContent = 'Facturar este libro';
                btnFacturar.addEventListener('click', () => {
                    populateFacturacionScreen(book); // book ya tiene todos los datos
                    navigateTo('pantalla-facturacion');
                });

                const btnToggleFollow = document.createElement('button');
                btnToggleFollow.className = 'btn-toggle-follow';
                btnToggleFollow.textContent = 'Dejar de Seguir'; // En esta lista, siempre será "Dejar de Seguir"
                btnToggleFollow.dataset.bookId = book.id;
                btnToggleFollow.addEventListener('click', (event) => {
                    toggleFollowBook(book); // book ya tiene todos los datos
                    displaySeguidosContent(); // Recargar la lista de seguidos
                    // Opcional: actualizar el botón en la pestaña Favoritos si está visible
                    const favTabButton = document.querySelector(`.book-item[data-id="${book.id}"] .btn-toggle-follow`);
                    if (favTabButton) {
                        favTabButton.textContent = 'Seguir';
                    }
                });

                bookItem.appendChild(img);
                bookItem.appendChild(type);
                bookItem.appendChild(title);
                bookItem.appendChild(btnFacturar);
                bookItem.appendChild(btnToggleFollow);
                followedListContainer.appendChild(bookItem);
            });
        }
        tabContentArea.appendChild(followedListContainer);
    }
    
    // Nueva función para poblar la pantalla de facturación con datos del libro
    function populateFacturacionScreen(bookData) {
        const pantallaFacturacion = document.getElementById('pantalla-facturacion');
        if (!pantallaFacturacion || !bookData) {
            console.error("No se pudo encontrar la pantalla de facturación o no hay datos del libro.");
            return;
        }
    
        // Actualizar detalles del libro en la sección factura-detalle
        const detalleItems = pantallaFacturacion.querySelectorAll('.factura-detalle .detalle-item');
        if (detalleItems.length >= 4) {
            detalleItems[0].querySelector('span:nth-child(2)').textContent = `${bookData.type.toUpperCase()} >`;
            detalleItems[1].querySelector('span:nth-child(2)').textContent = `${bookData.genre.toUpperCase()} >`;
            detalleItems[2].querySelector('span:nth-child(2)').textContent = `${bookData.author.toUpperCase()} >`;
            // El nombre del estudiante puede seguir siendo estático o actualizarse si tienes esa info
            // detalleItems[3].querySelector('span:nth-child(2)').textContent = `AXEL >`; 
        }
    
        // Actualizar item en la factura (sección items-factura)
        const itemElement = pantallaFacturacion.querySelector('.items-factura .item');
        if (itemElement) {
            itemElement.querySelector('img').src = bookData.imgSrc;
            itemElement.querySelector('img').alt = bookData.title;
            itemElement.querySelector('div p').textContent = `"${bookData.title.toUpperCase()}"`;
            itemElement.querySelector('div span').textContent = bookData.description;
            itemElement.querySelector('p:last-child').textContent = `$${parseFloat(bookData.price).toFixed(2)}`;
        }
    
        // Actualizar totales
        const price = parseFloat(bookData.price);
        const totalesItems = pantallaFacturacion.querySelectorAll('.totales .total-item');
        if (totalesItems.length >= 3) { // Subtotal, Envío, Multa, Total
            totalesItems[0].querySelector('span:nth-child(2)').textContent = `$${price.toFixed(2)}`;
            // Envío y Multa pueden ser dinámicos o fijos. Aquí se asume que el total es el precio del libro.
            // totalesItems[1].querySelector('span:nth-child(2)').textContent = `Free`; // O calcular envío
            // totalesItems[2].querySelector('span:nth-child(2)').textContent = `$0.00`; // O calcular multa
            pantallaFacturacion.querySelector('.totales .grand-total span:nth-child(2)').textContent = `$${price.toFixed(2)}`;
        }
    }

    // --- Lógica para la pantalla de Perfil y Editar Perfil ---
    const USER_PROFILE_KEY = 'userProfileBiblioteca';

    function getUserProfile() {
        return JSON.parse(localStorage.getItem(USER_PROFILE_KEY)) || {
            nombre: "Usuario", // Nombre por defecto
            email: "usuario@example.com", // Email por defecto
            foto: "imagenes_mockups/profile_imagen.png" // Foto por defecto
        };
    }

    function saveUserProfile(profileData) {
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profileData));
    }

    function displayProfileData() {
        const profile = getUserProfile();
        const profileScreen = document.getElementById('pantalla-perfil');
        if (profileScreen) {
            profileScreen.querySelector('.profile-picture').src = profile.foto;
            profileScreen.querySelector('.profile-info h3').textContent = profile.nombre;
            profileScreen.querySelector('.profile-info p').textContent = profile.email;
        }
    }

    function populateEditProfileForm() {
        const profile = getUserProfile();
        const editForm = document.getElementById('form-editar-perfil');
        if (editForm) {
            editForm.querySelector('#edit-nombre').value = profile.nombre;
            editForm.querySelector('#edit-email').value = profile.email;
            editForm.querySelector('#edit-foto').value = profile.foto;
            editForm.querySelector('#edit-password').value = ''; // Limpiar campo de contraseña
        }
    }
    
    // Listener para el botón "Editar Perfil" en la pantalla de perfil
    const btnEditarPerfil = document.querySelector('#pantalla-perfil .btn-secondary'); // Asumiendo que es el primer btn-secondary
    if (btnEditarPerfil && btnEditarPerfil.textContent.includes("Editar Perfil")) {
        btnEditarPerfil.addEventListener('click', () => {
            populateEditProfileForm(); // Cargar datos actuales en el formulario
            navigateTo('pantalla-editar-perfil');
        });
    }

    // Listener para el formulario de "Editar Perfil"
    const formEditarPerfil = document.getElementById('form-editar-perfil');
    if (formEditarPerfil) {
        formEditarPerfil.addEventListener('submit', (event) => {
            event.preventDefault(); // Evitar el envío tradicional del formulario
            
            const nombre = document.getElementById('edit-nombre').value.trim();
            const email = document.getElementById('edit-email').value.trim();
            const foto = document.getElementById('edit-foto').value.trim();
            // const nuevaPassword = document.getElementById('edit-password').value; // Manejar contraseña si es necesario

            if (!nombre || !email) {
                alert("El nombre y el email son obligatorios.");
                return;
            }

            const updatedProfile = {
                nombre: nombre,
                email: email,
                foto: foto || "imagenes_mockups/default_profile.png" // Foto por defecto si está vacía
            };

            saveUserProfile(updatedProfile);
            displayProfileData(); // Actualizar la vista de la pantalla de perfil
            alert("Perfil actualizado con éxito.");
            navigateTo('pantalla-perfil');
        });
    }
    
    // --- Event Listeners y Navegación ---

    // Función para manejar clics en la barra de navegación inferior
    function handleBottomNavClick(targetId) {
        // Quitar 'active' de todos los botones de todas las bottom-nav
        document.querySelectorAll('.bottom-nav button').forEach(btn => btn.classList.remove('active'));

        if (targetId === 'btn-home' || targetId === 'btn-home-perfil') {
            navigateTo('pantalla-menu');
            const favTab = Array.from(document.querySelectorAll('#pantalla-menu .tab-button'))
                                .find(btn => btn.textContent.trim() === 'Favoritos');
            if (favTab) favTab.click(); // Simula clic para activar y cargar contenido
            // Marcar como activo el botón home correspondiente
            document.querySelectorAll('#btn-home, #btn-home-perfil').forEach(btn => btn.classList.add('active'));
        } else if (targetId === 'btn-search' || targetId === 'btn-search-perfil') {
            navigateTo('pantalla-menu');
            const searchInput = document.querySelector('#pantalla-menu input[type="search"]');
            if (searchInput) searchInput.focus();
            // Marcar como activo el botón search correspondiente
            document.querySelectorAll('#btn-search, #btn-search-perfil').forEach(btn => btn.classList.add('active'));
        } else if (targetId === 'btn-cart' || targetId === 'btn-cart-perfil') {
            navigateTo('pantalla-menu');
            const historyTab = Array.from(document.querySelectorAll('#pantalla-menu .tab-button'))
                                 .find(btn => btn.textContent.trim() === 'Historial');
            if (historyTab) historyTab.click();
            // Marcar como activo el botón cart correspondiente
            document.querySelectorAll('#btn-cart, #btn-cart-perfil').forEach(btn => btn.classList.add('active'));
        } else if (targetId === 'btn-profile' || targetId === 'btn-profile-perfil') {
            displayProfileData(); // Cargar datos del perfil al ir a la pantalla de perfil
            navigateTo('pantalla-perfil');
            // Marcar como activo el botón profile correspondiente
            document.querySelectorAll('#btn-profile, #btn-profile-perfil').forEach(btn => btn.classList.add('active'));
        }
    }

    // Añadir event listeners a todos los botones de las barras de navegación inferiores
    document.querySelectorAll('.bottom-nav button').forEach(button => {
        button.addEventListener('click', (event) => {
            handleBottomNavClick(event.currentTarget.id);
        });
    });

    // Se mueve la llamada inicial aquí para asegurar que la pantalla de registro se muestre primero.
    navigateTo('pantalla-registrarse'); 

    const tabButtons = document.querySelectorAll('#pantalla-menu .tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const tabName = button.textContent.trim();
            if (tabName === 'Favoritos') {
                displayFavoritosContent();
            } else if (tabName === 'Historial') {
                displayHistorialContent();
            } else if (tabName === 'Seguidos') {
                displaySeguidosContent();
            }
        });
    });

    // Cargar contenido de la pestaña activa por defecto (Favoritos)
    const initialActiveTab = document.querySelector('#pantalla-menu .tab-button.active');
    if (initialActiveTab) { // Asegurarse que el botón exista
        const initialTabName = initialActiveTab.textContent.trim();
        if (initialTabName === 'Favoritos') {
            displayFavoritosContent();
        } else if (initialTabName === 'Historial') {
            displayHistorialContent();
        } else if (initialTabName === 'Seguidos') {
            displaySeguidosContent();
        }
    }


    const registerButton = document.querySelector('#pantalla-registrarse .btn-primary');
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            const email = document.querySelector('#pantalla-registrarse input[type="email"]').value;
            if (email) {
                // alert(`Registrando con email: ${email}`); // Opcional
                navigateTo('pantalla-menu');
                // Asegurarse que el contenido de la pestaña por defecto se muestre
                const activeMenuTab = document.querySelector('#pantalla-menu .tab-button.active');
                if (activeMenuTab) {
                    activeMenuTab.click(); // Simula click para cargar contenido
                }
            } else {
                alert('Por favor, ingrese un email.');
            }
        });
    }
    
    const orderButton = document.querySelector('#pantalla-facturacion .btn-ordenar');
    if (orderButton) {
        orderButton.addEventListener('click', () => {
            const itemElement = document.querySelector('#pantalla-facturacion .item');
            let bookDetails = {
                id: `hist-${new Date().getTime()}`, // Asegurar un ID único para el historial
                title: 'Libro Desconocido',
                description: 'Detalles no disponibles',
                imgSrc: 'imagenes_mockups/default_book.png',
                reservedDate: new Date().toISOString()
            };

            if (itemElement) {
                const imgSrc = itemElement.querySelector('img')?.src;
                const titleText = itemElement.querySelector('div p')?.textContent;
                const descriptionText = itemElement.querySelector('div span')?.textContent;
                
                bookDetails.imgSrc = imgSrc || bookDetails.imgSrc;
                bookDetails.title = titleText ? titleText.replace(/"/g, '').trim() : bookDetails.title;
                bookDetails.description = descriptionText || bookDetails.description;
            }
            
            addBookToHistory(bookDetails);
            alert('Libro añadido al historial. Procesando orden...');
            navigateTo('pantalla-menu');
            
            const historialTabButton = Array.from(tabButtons).find(btn => btn.textContent.trim() === 'Historial');
            if (historialTabButton) {
                historialTabButton.click(); 
            }
        });
    }

    // Cargar datos del perfil al inicio por si acaso
    displayProfileData(); 

    // Se elimina el código redundante que estaba aquí, ya que handleBottomNavClick ya gestiona la navegación.
});

// Eliminar la función global, ya que ahora está dentro del listener
// function navigateTo(screenId) {
//     document.querySelectorAll('.screen').forEach(screen => {
//         screen.classList.remove('active');
//     });
//     const targetScreen = document.getElementById(screenId);
//     if (targetScreen) {
//         targetScreen.classList.add('active');
//     }
// }