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

const TEMPLATE_FILE = "/A.html";


/* =========================================================
   GET CURRENT PAGE
   ========================================================= */

function getCurrentPage() {

    let path = window.location.pathname;

    /*
     * Remove trailing slash
     */
    path = path.replace(/\/+$/, "");


    /*
     * Get filename
     *
     * Example:
     *
     * /english/1.html
     *          ↓
     *        1.html
     */

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


    /*
     * Example:
     *
     * /english/1.html
     *
     * parts:
     * ["", "english", "1.html"]
     */


    if (parts.length < 3) {

        return null;

    }


    const folder =
        parts[parts.length - 2];


    const file =
        parts[parts.length - 1];


    /*
     * Only load HTML content pages.
     */

    if (
        !file.endsWith(".html")
    ) {

        return null;

    }


    /*
     * Don't try to load A.html itself.
     */

    if (
        file.toLowerCase() === "a.html"
    ) {

        return null;

    }


    /*
     * Don't treat index.html as a lesson.
     */

    if (
        file.toLowerCase() === "index.html"
    ) {

        return null;

    }


    /*
     * Return the path of the content.
     */

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


        /*
         * Replace the current document
         * with the template.
         */

        document.open();

        document.write(templateHTML);

        document.close();


        /*
         * Wait until the new document
         * has finished loading.
         */

        await waitForPage();


        /*
         * Load the actual page content.
         */

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


    /*
     * No content file means
     * this is probably the home page.
     */

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


        /*
         * Find the content container
         * inside A.html.
         */

        const container =
            document.getElementById(
                "page-content"
            );


        if (!container) {

            throw new Error(
                "A.html is missing #page-content"
            );

        }


        /*
         * Insert the lesson content.
         */

        container.innerHTML =
            contentHTML;


        /*
         * Update active navigation.
         */

        setActiveNavigation();


        /*
         * Run scripts that exist inside
         * the loaded content if necessary.
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


            /*
             * Convert relative URL
             * into absolute URL.
             */

            const linkURL =
                new URL(
                    href,
                    window.location.origin
                );


            const linkPath =
                linkURL.pathname
                    .replace(/\/+$/, "")
                    .toLowerCase();


            /*
             * Home
             */

            if (
                currentPath === linkPath
            ) {

                link.classList.add(
                    "active"
                );

                return;

            }


            /*
             * English section
             */

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


            /*
             * Indonesia section
             */

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

        const newScript =
            document.createElement(
                "script"
            );


        /*
         * Copy attributes.
         */

        Array
            .from(oldScript.attributes)
            .forEach(function (attribute) {

                newScript.setAttribute(
                    attribute.name,
                    attribute.value
                );

            });


        /*
         * Copy inline JavaScript.
         */

        newScript.textContent =
            oldScript.textContent;


        /*
         * Replace old script.
         */

        oldScript.parentNode.replaceChild(
            newScript,
            oldScript
        );

    });

}


/* =========================================================
   START
   ========================================================= */

(async function () {

    /*
     * If the current page is already A.html,
     * don't load the template again.
     */

    const currentPage =
        getCurrentPage();


    if (
        currentPage &&
        currentPage.toLowerCase() === "a.html"
    ) {

        return;

    }


    /*
     * Load A.html first.
     */

    await loadTemplate();

})();