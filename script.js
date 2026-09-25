/* =========================================================
   WORDIE TALKIE
   Universal Template Loader (a.html lowercase)
   ========================================================= */

/* =========================================================
   SETTINGS
   ========================================================= */

const TEMPLATE_FILE = "a.html";


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
    const pathname = window.location.pathname.replace(/\/+$/, "");
    const parts = pathname.split("/");

    const file = parts[parts.length - 1];

    /*
     * Hanya load file .html
     */
    if (!file.endsWith(".html")) {
        return null;
    }

    /*
     * Jangan load a.html atau index.html sebagai konten lesson
     */
    if (file.toLowerCase() === "a.html" || file.toLowerCase() === "index.html") {
        return null;
    }

    /*
     * Cek apakah file berada di dalam subfolder
     */
    if (parts.length >= 3) {
        const folder = parts[parts.length - 2];
        
        if (folder && folder !== "") {
            return `${folder}/${file}`;
        }
    }

    return null;
}


/* =========================================================
   LOAD TEMPLATE
   ========================================================= */

async function loadTemplate() {
    try {
        // Hitung jalur relatif berdasarkan kedalaman folder (mendukung subfolder / GitHub Pages)
        const depth = window.location.pathname.replace(/\/+$/, "").split("/").length - 2;
        let pathToA = TEMPLATE_FILE;
        
        if (depth > 0) {
            pathToA = "../".repeat(depth) + TEMPLATE_FILE;
        }

        const response = await fetch(pathToA);

        if (!response.ok) {
            throw new Error("Could not load a.html");
        }

        const templateHTML = await response.text();

        document.open();
        document.write(templateHTML);
        document.close();

        await waitForPage();
        await loadContent();

    } catch (error) {
        console.error("Wordie Talkie Template Error:", error);
        document.body.innerHTML = `
            <div style="max-width:700px;margin:80px auto;padding:30px;font-family:sans-serif;text-align:center;">
                <h2>🌱 Wordie Talkie</h2>
                <p>Sorry, this page could not be loaded.</p>
                <p style="font-size:13px;color:#888;">${error.message}</p>
            </div>
        `;
    }
}


/* =========================================================
   LOAD CONTENT
   ========================================================= */

async function loadContent() {
    const contentFile = getContentFile();

    if (!contentFile) {
        return;
    }

    try {
        const response = await fetch(contentFile);

        if (!response.ok) {
            throw new Error(`Could not load ${contentFile}`);
        }

        const contentHTML = await response.text();

        const container = document.getElementById("page-content");

        if (!container) {
            throw new Error("a.html is missing #page-content");
        }

        container.innerHTML = contentHTML;

        setActiveNavigation();
        executeLoadedScripts();

    } catch (error) {
        console.error("Wordie Talkie Content Error:", error);
        const container = document.getElementById("page-content");

        if (container) {
            container.innerHTML = `
                <div style="text-align:center;padding:40px 20px;">
                    <h2>🌱 Oops!</h2>
                    <p>This lesson could not be loaded.</p>
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
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", resolve, { once: true });
        } else {
            resolve();
        }
    });
}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function setActiveNavigation() {
    const currentPath = window.location.pathname.toLowerCase();

    document.querySelectorAll(".nav-link").forEach(function (link) {
        link.classList.remove("active");

        const href = link.getAttribute("href");
        if (!href) return;

        const linkURL = new URL(href, window.location.origin);
        const linkPath = linkURL.pathname.toLowerCase();

        if (currentPath === linkPath || currentPath.endsWith(linkPath)) {
            link.classList.add("active");
            return;
        }

        if (currentPath.includes("/english/") && linkPath.includes("english")) {
            link.classList.add("active");
            return;
        }

        if (currentPath.includes("/indonesia/") && linkPath.includes("indonesia")) {
            link.classList.add("active");
        }
    });
}


/* =========================================================
   EXECUTE SCRIPTS FROM LOADED CONTENT
   ========================================================= */

function executeLoadedScripts() {
    const container = document.getElementById("page-content");
    if (!container) return;

    const scripts = container.querySelectorAll("script");

    scripts.forEach(function (oldScript) {
        const newScript = document.createElement("script");

        Array.from(oldScript.attributes).forEach(function (attribute) {
            newScript.setAttribute(attribute.name, attribute.value);
        });

        newScript.textContent = oldScript.textContent;
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
}


/* =========================================================
   START
   ========================================================= */

(async function () {
    const currentPage = getCurrentPage();

    if (currentPage && currentPage.toLowerCase() === "a.html") {
        return;
    }

    await loadTemplate();
})();
