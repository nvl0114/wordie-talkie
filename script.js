/*
    =====================================================
    WORDIE TALKIE — script.js
    (Loader Template & Sidebar)

    File ini WAJIB diletakkan di ROOT (sejajar dengan
    template.html).

    Cara pakai di halaman konten (mis. indonesia/salam.html):
    letakkan di baris PALING BAWAH file, sebelum </body>
    (atau di akhir file kalau file itu cuma fragment):

        <script src="../script.js"></script>

    Kalau halaman konten ada 2 folder di dalam, pakai
    "../../script.js", dst — script ini otomatis
    menghitung lokasi root berdasarkan path itu sendiri.
    =====================================================
*/

(function () {

    "use strict";


    /* ==================================================
       KALAU SIDEBAR SUDAH ADA, JANGAN JALANKAN LAGI
       (mencegah loop kalau script ini ke-run 2x)
       ================================================== */

    if (document.getElementById("sidebar")) {
        return;
    }


    /* ==================================================
       HITUNG LOKASI ROOT
       Berdasarkan atribut src dari <script> ini sendiri.
       ================================================== */

    var thisScript = document.currentScript;

    if (!thisScript) {
        console.error("script.js: tidak bisa menemukan currentScript.");
        return;
    }

    var scriptURL = new URL(thisScript.getAttribute("src"), window.location.href);
    var rootURL = new URL(".", scriptURL);
    var templateURL = new URL("template.html", rootURL).href;


    /* ==================================================
       SIMPAN KONTEN HALAMAN INI (SEBELUM DIGANTI)
       Buang tag <script src="...script.js"> dari salinan
       supaya tidak ikut ke-duplikasi di dalam page-content.
       ================================================== */

    var bodyClone = document.body.cloneNode(true);

    Array.prototype.forEach.call(
        bodyClone.querySelectorAll("script[src]"),
        function (node) {

            var src = node.getAttribute("src") || "";

            if (src.indexOf("script.js") !== -1) {
                node.remove();
            }
        }
    );

    var pageFragmentHTML = bodyClone.innerHTML;
    var customTitle = window.pageTitle || null;


    /* ==================================================
       AMBIL TEMPLATE.HTML
       ================================================== */

    fetch(templateURL)
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Gagal fetch template.html: " + response.status);
            }

            return response.text();
        })
        .then(function (html) {

            var parser = new DOMParser();
            var templateDoc = parser.parseFromString(html, "text/html");

            applyTemplate(templateDoc);
        })
        .catch(function (err) {

            console.error("script.js:", err);
        });


    /* ==================================================
       PASANG TEMPLATE + SUNTIK KONTEN
       ================================================== */

    function applyTemplate(templateDoc) {

        /* ---- Judul halaman ---- */

        document.title = customTitle
            ? customTitle + " · " + templateDoc.title
            : templateDoc.title;


        /* ---- Salin <link>/<style> dari <head> template ---- */

        Array.prototype.forEach.call(
            templateDoc.head.querySelectorAll("link, style, meta[name='viewport']"),
            function (node) {
                document.head.appendChild(node.cloneNode(true));
            }
        );


        /* ---- Siapkan body baru dari template ---- */

        var newBody = templateDoc.body.cloneNode(true);


        /* Buang <script> bawaan template.html di body baru —
           logikanya kita tulis ulang manual di bawah (initTemplateBehavior),
           karena script hasil cloneNode tidak otomatis jalan. */

        Array.prototype.forEach.call(
            newBody.querySelectorAll("script"),
            function (node) {
                node.remove();
            }
        );


        /* ---- Perbaiki path relatif (logo, favicon, nav) ---- */

        fixRelativePaths(newBody);


        /* ---- Suntik konten halaman ke #page-content ---- */

        var pageContentTarget = newBody.querySelector("#page-content");

        if (pageContentTarget) {
            pageContentTarget.innerHTML = pageFragmentHTML;
        } else {
            newBody.appendChild(bodyCloneFallback());
        }


        /* ---- Ganti <body> lama dengan yang baru ---- */

        document.body.replaceWith(newBody);


        /* ---- Nyalakan ulang perilaku sidebar (menu, active nav) ---- */

        initTemplateBehavior();


        /* ---- Jalankan ulang <script> yang ada di dalam konten
                halaman (mis. logika kuis di salam.html) ---- */

        reExecuteScripts(document.getElementById("page-content"));


        function bodyCloneFallback() {

            var wrapper = document.createElement("div");
            wrapper.innerHTML = pageFragmentHTML;
            return wrapper;
        }
    }


    /* ==================================================
       PERBAIKI PATH RELATIF (logo, favicon, link menu)
       supaya selalu relatif terhadap ROOT, bukan
       terhadap folder halaman konten.
       ================================================== */

    function fixRelativePaths(container) {

        var logo = container.querySelector(".sidebar-logo img");

        if (logo) {
            logo.src = new URL(logo.getAttribute("src"), rootURL).href;
        }


        var favicon = document.querySelector("link[rel='icon']");

        if (favicon) {
            favicon.href = new URL(favicon.getAttribute("href"), rootURL).href;
        }


        Array.prototype.forEach.call(
            container.querySelectorAll(".nav-link"),
            function (link) {

                var href = link.getAttribute("href");

                if (href) {
                    link.setAttribute("href", new URL(href, rootURL).href);
                }
            }
        );
    }


    /* ==================================================
       PERILAKU SIDEBAR (menu mobile + highlight nav aktif)
       Ini adalah versi ulang dari <script> bawaan template.html.
       ================================================== */

    function initTemplateBehavior() {

        var menuButton = document.getElementById("menuButton");
        var sidebar = document.getElementById("sidebar");
        var overlay = document.getElementById("overlay");

        if (!menuButton || !sidebar || !overlay) {
            return;
        }


        function openMenu() {

            sidebar.classList.add("open");
            overlay.classList.add("show");

            menuButton.setAttribute("aria-expanded", "true");
            menuButton.innerHTML = "✕";
        }


        function closeMenu() {

            sidebar.classList.remove("open");
            overlay.classList.remove("show");

            menuButton.setAttribute("aria-expanded", "false");
            menuButton.innerHTML = "☰";
        }


        menuButton.addEventListener("click", function () {

            if (sidebar.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });


        overlay.addEventListener("click", closeMenu);


        var navLinks = document.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                if (window.innerWidth <= 800) {
                    closeMenu();
                }
            });
        });


        window.addEventListener("resize", function () {

            if (window.innerWidth > 800) {
                closeMenu();
            }
        });


        /* ---- Highlight menu aktif berdasarkan folder/nama file ---- */

        var pathSegments = window.location.pathname
            .toLowerCase()
            .split("/")
            .filter(Boolean);

        var currentFile = pathSegments[pathSegments.length - 1] || "index.html";

        navLinks.forEach(function (link) {

            var linkFile = link.getAttribute("href")
                .split("/")
                .pop()
                .toLowerCase();

            var linkName = linkFile.replace(".html", "");

            var isActive =
                linkFile === currentFile ||
                pathSegments.indexOf(linkName) !== -1;

            if (isActive) {
                link.classList.add("active");
            }
        });
    }


    /* ==================================================
       JALANKAN ULANG <script> DI DALAM KONTEN
       (innerHTML tidak otomatis mengeksekusi <script>)
       ================================================== */

    function reExecuteScripts(container) {

        if (!container) {
            return;
        }

        var oldScripts = container.querySelectorAll("script");

        oldScripts.forEach(function (oldScript) {

            var newScript = document.createElement("script");

            Array.prototype.forEach.call(
                oldScript.attributes,
                function (attr) {
                    newScript.setAttribute(attr.name, attr.value);
                }
            );

            newScript.textContent = oldScript.textContent;

            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

})();
