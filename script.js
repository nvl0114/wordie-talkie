document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // CHECK CURRENT FOLDER
    // ==========================================

    const path = window.location.pathname;

    const isEnglish =
        path.includes("/english/");

    const isIndonesia =
        path.includes("/indonesia/");

    const isSubfolder =
        isEnglish || isIndonesia;


    // ==========================================
    // FIX IMAGE PATH
    // ==========================================

    if (isSubfolder) {

        const logo =
            document.querySelector(".sidebar-logo img");

        if (logo) {
            logo.src = "../logo.png";
        }


        const favicon =
            document.querySelector(
                'link[rel="icon"]'
            );

        if (favicon) {
            favicon.href = "../favicon.png";
        }

    }


    // ==========================================
    // FIX NAVIGATION LINKS
    // ==========================================

    if (isSubfolder) {

        document
            .querySelectorAll(".nav-link")
            .forEach(link => {

                const href =
                    link.getAttribute("href");

                if (
                    href &&
                    !href.startsWith("http") &&
                    !href.startsWith("#") &&
                    !href.startsWith("../")
                ) {

                    link.setAttribute(
                        "href",
                        "../" + href
                    );

                }

            });

    }


    // ==========================================
    // MOBILE MENU
    // ==========================================

    const menuButton =
        document.getElementById("menuButton");

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("overlay");


    if (
        menuButton &&
        sidebar &&
        overlay
    ) {

        function openMenu() {

            sidebar.classList.add("open");

            overlay.classList.add("show");

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );

            menuButton.innerHTML = "✕";
        }


        function closeMenu() {

            sidebar.classList.remove("open");

            overlay.classList.remove("show");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.innerHTML = "☰";
        }


        menuButton.addEventListener(
            "click",
            () => {

                if (
                    sidebar.classList.contains("open")
                ) {

                    closeMenu();

                } else {

                    openMenu();

                }

            }
        );


        overlay.addEventListener(
            "click",
            closeMenu
        );


        document
            .querySelectorAll(".nav-link")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        if (
                            window.innerWidth <= 800
                        ) {
                            closeMenu();
                        }

                    }
                );

            });


        window.addEventListener(
            "resize",
            () => {

                if (
                    window.innerWidth > 800
                ) {
                    closeMenu();
                }

            }
        );

    }


    // ==========================================
    // ACTIVE NAVIGATION
    // ==========================================

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    document
        .querySelectorAll(".nav-link")
        .forEach(link => {

            const href =
                link.getAttribute("href");

            if (!href) return;


            const linkPage =
                href
                    .split("/")
                    .pop()
                    .toLowerCase();


            if (
                linkPage === currentPage
            ) {

                link.classList.add("active");

            }

        });

});