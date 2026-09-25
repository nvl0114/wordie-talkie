/* ==================================================
   WORDIE TALKIE - Master script.js
   ================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================================================
       1. MOBILE MENU & OVERLAY INTERACTION
       ================================================ */
    const menuButton = document.getElementById("menuButton");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    function openMenu() {
        if (sidebar) sidebar.classList.add("open");
        if (overlay) overlay.classList.add("show");
        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "true");
            menuButton.innerHTML = "✕";
        }
    }

    function closeMenu() {
        if (sidebar) sidebar.classList.remove("open");
        if (overlay) overlay.classList.remove("show");
        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.innerHTML = "☰";
        }
    }

    if (menuButton) {
        menuButton.addEventListener("click", function () {
            if (sidebar && sidebar.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener("click", closeMenu);
    }

    // Tutup menu saat link diklik di layar kecil
    document.querySelectorAll(".nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 800) {
                closeMenu();
            }
        });
    });

    // Reset menu saat ukuran layar diperbesar
    window.addEventListener("resize", function () {
        if (window.innerWidth > 800) {
            closeMenu();
        }
    });


    /* ================================================
       2. ACTIVE NAVIGATION HIGHLIGHT
       ================================================ */
    const currentPath = window.location.pathname.toLowerCase();
    
    document.querySelectorAll(".nav-link").forEach(function (link) {
        const linkHref = link.getAttribute("href").toLowerCase();
        if (currentPath.includes(linkHref) && linkHref !== "index.html") {
            link.classList.add("active");
        } else if (currentPath.endsWith("/") || currentPath.endsWith("index.html")) {
            if (linkHref === "index.html") {
                link.classList.add("active");
            }
        }
    });


    /* ================================================
       3. AUTOMATIC CONTENT LOADER (UNTUK MATERI BARU)
       ================================================ */
    const pageContent = document.getElementById("page-content");

    if (pageContent) {
        const pathArray = window.location.pathname.split("/");
        let filename = pathArray.pop().toLowerCase();

        // Jika halaman diakses langsung dari root tapi file materinya ada di dalam folder
        if (filename && filename !== "index.html" && filename !== "" && filename !== "a.html") {
            let targetFolder = "";

            // Deteksi otomatis apakah halaman ini masuk kategori indonesia atau english
            // (Atau Anda bisa sesuaikan dengan struktur URL Anda)
            if (window.location.pathname.includes("indonesia") || document.title.toLowerCase().includes("indonesia")) {
                targetFolder = "indonesia/";
            } else if (window.location.pathname.includes("english") || document.title.toLowerCase().includes("english")) {
                targetFolder = "english/";
            }

            const fileToFetch = targetFolder + filename;

            fetch(fileToFetch)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("File materi tidak ditemukan.");
                    }
                    return response.text();
                })
                .then(html => {
                    pageContent.innerHTML = html;
                })
                .catch(error => {
                    console.error(error);
                    pageContent.innerHTML = `
                        <div style="text-align: center; padding: 40px; color: var(--brown-light);">
                            <h3>Materi Belum Tersedia 📚</h3>
                            <p>File konten untuk halaman ini belum dibuat di dalam folder.</p>
                        </div>
                    `;
                });
        }
    }

});
