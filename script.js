/* =========================================================
   WORDIE TALKIE
   Universal Template Loader
   =========================================================

   Structure:

   /
   ├── A.html
   ├── script.js
   ├── index.html
   ├── logo.png
   ├── favicon.png
   │
   ├── english/
   │   ├── 1.html
   │   ├── 2.html
   │   └── ...
   │
   └── indonesia/
       ├── 1.html
       ├── 2.html
       └── ...

   ========================================================= */


/* =========================================================
   SETTINGS
   ========================================================= */

const TEMPLATE_FILE = "/a.html";


/* =========================================================
   GET CURRENT PAGE
   ========================================================= */

function getCurrentPage() {

    let path = window.location.pathname;

    path = path.replace(/\/+$/, "");

    const parts = path.split("/");

    return parts[parts.length - 1];

}


/* =========================================================
   GET CONTENT FILE
   ========================================================= */

function getContentFile() {

    const path =
        window.location.pathname
            .replace(/\/+$/, "");


    const parts = path.split("/");


    if (parts.length < 3) {

        return null;

    }


    const folder =
        parts[parts.length - 2];


    const file =
        parts[parts.length - 1];


    if (
        !file.endsWith(".html")
    ) {

        return null;

    }


    if (
        file.toLowerCase() === "a.html"
    ) {

        return null;

    }


    if (
        file.toLowerCase() === "index.html"
    ) {

        return null;

    }


    return `/${folder}/${file}`;

}


/* =========================================================
   LOAD TEMPLATE
   ========================================================= */

async function loadTemplate() {

    try {

        const response =
            await fetch(TEMPLATE_FILE);


        if (!response.ok) {

            throw new Error(
                "Could not load A.html"
            );

        }


        const templateHTML =
            await response.text();


        document.open();

        document.write(templateHTML);

        document.close();


        await waitForPage();


        await loadContent();

    }

    catch (error) {

        console.error(
            "Wordie Talkie Template Error:",
            error
        );


        document.body.innerHTML = `
            <div style="
                max-width:700px;
                margin:80px auto;
                padding:30px;
                font-family:sans-serif;
                text-align:center;
            ">

                <h2>
                    🌱 Wordie Talkie
                </h2>

                <p>
                    Sorry, this page could not be loaded.
                </p>

                <p style="font-size:13px;color:#888;">
                    ${error.message}
                </p>

            </div>
        `;

    }

}


/* =========================================================
   LOAD CONTENT
   ========================================================= */

async function loadContent() {

    const contentFile =
        getContentFile();


    if (!contentFile) {

        return;

    }


    try {

        const response =
            await fetch(contentFile);


        if (!response.ok) {

            throw new Error(
                `Could not load ${contentFile}`
            );

        }


        const contentHTML =
            await response.text();


        const container =
            document.getElementById(
                "page-content"
            );


        if (!container) {

            throw new Error(
                "A.html is missing #page-content"
            );

        }


        container.innerHTML =
            contentHTML;


        setActiveNavigation();


        /*
         * Jalankan ulang <script> yang ada di dalam
         * konten yang baru saja di-load — KECUALI
         * <script src="../script.js"> milik loader ini
         * sendiri. Kalau tag itu ikut dijalankan ulang,
         * loader ini akan memuat template lagi dari awal
         * berulang-ulang (loop), yang bikin quiz macet
         * di tengah jalan.
         */

        executeLoadedScripts();

    }

    catch (error) {

        console.error(
            "Wordie Talkie Content Error:",
            error
        );


        const container =
            document.getElementById(
                "page-content"
            );


        if (container) {

            container.innerHTML = `

                <div style="
                    text-align:center;
                    padding:40px 20px;
                ">

                    <h2>
                        🌱 Oops!
                    </h2>

                    <p>
                        This lesson could not be loaded.
                    </p>

                </div>

            `;

        }

    }

}


/* =========================================================
   WAIT FOR DOCUMENT
   ========================================================= */

function waitForPage() {

    return new Promise(function (resolve) {

        if (
            document.readyState === "loading"
        ) {

            document.addEventListener(
                "DOMContentLoaded",
                resolve,
                { once: true }
            );

        } else {

            resolve();

        }

    });

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function setActiveNavigation() {

    const currentPath =
        window.location.pathname
            .replace(/\/+$/, "")
            .toLowerCase();


    document
        .querySelectorAll(".nav-link")
        .forEach(function (link) {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute("href");


            if (!href) return;


            const linkURL =
                new URL(
                    href,
                    window.location.origin
                );


            const linkPath =
                linkURL.pathname
                    .replace(/\/+$/, "")
                    .toLowerCase();


            if (
                currentPath === linkPath
            ) {

                link.classList.add(
                    "active"
                );

                return;

            }


            if (
                currentPath.startsWith(
                    "/english/"
                ) &&
                linkPath.includes(
                    "/english"
                )
            ) {

                link.classList.add(
                    "active"
                );

                return;

            }


            if (
                currentPath.startsWith(
                    "/indonesia/"
                ) &&
                linkPath.includes(
                    "/indonesia"
                )
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

}


/* =========================================================
   EXECUTE SCRIPTS FROM LOADED CONTENT
   =========================================================

   Skip any <script src="...script.js"> tag found inside the
   loaded content — that tag's only job is to trigger this
   loader when the page is opened directly by the browser.
   Re-running it here (after the content is already injected)
   would call loadTemplate() again and again, wiping out the
   quiz state every time — which is why "next question" used
   to get stuck.
   ========================================================= */

function executeLoadedScripts() {

    const container =
        document.getElementById(
            "page-content"
        );


    if (!container) return;


    const scripts =
        container.querySelectorAll(
            "script"
        );


    scripts.forEach(function (oldScript) {

        const src =
            oldScript.getAttribute("src");

        if (
            src &&
            src.toLowerCase().indexOf("script.js") !== -1
        ) {

            oldScript.remove();

            return;

        }


        const newScript =
            document.createElement(
                "script"
            );


        Array
            .from(oldScript.attributes)
            .forEach(function (attribute) {

                newScript.setAttribute(
                    attribute.name,
                    attribute.value
                );

            });


        newScript.textContent =
            oldScript.textContent;


        oldScript.parentNode.replaceChild(
            newScript,
            oldScript
        );

    });

}


/* =========================================================
   START
   =========================================================

   window.__wordieTemplateLoaded is a one-time guard.
   It lives on `window`, which survives document.open()/
   write()/close() (the DOM is replaced but the JS global
   object is not) — so even if something inside the loaded
   content re-triggers this script, it will see the flag
   already set and simply do nothing instead of loading the
   template a second time.
   ========================================================= */

(async function () {

    if (window.__wordieTemplateLoaded) {

        return;

    }

    window.__wordieTemplateLoaded = true;


    const currentPage =
        getCurrentPage();


    if (
        currentPage &&
        currentPage.toLowerCase() === "a.html"
    ) {

        return;

    }


    await loadTemplate();

})();
