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
