const PAGES_KEY = "vpn-pages";
const CURRENT_PAGE_ID = "vpn-cpi";

import { createDefaultPage, debounce } from "./util";
const api = {
    loadPages: () => {
        const pageIds = JSON.parse(localStorage.getItem(PAGES_KEY)) || [];
        let currentPageId = localStorage.getItem(CURRENT_PAGE_ID) || 0;
        let currentPage = null;
        const pages = [];
        if(pageIds.length > 0) {
            pageIds.forEach((id) => {
                const page = JSON.parse(localStorage.getItem(id));
                pages.push(page)
                if(id === currentPageId) {
                    currentPage = page;
                }
            });
        }
        else {
            const pg = createDefaultPage();
            const newPid = pg.pid;
            pageIds.push(newPid);
            localStorage.setItem(PAGES_KEY, JSON.stringify(pageIds));
            localStorage.setItem(CURRENT_PAGE_ID, newPid);
            localStorage.setItem(newPid, JSON.stringify(pg));
            pages.push(pg);
            currentPage = pg;
        }
        return { pages, currentPage };
    },
    createNewPage: () => {
        const pageIds = JSON.parse(localStorage.getItem(PAGES_KEY)) || [];
        const page = createDefaultPage();
        const newPid = page.pid;
        pageIds.push(newPid);
        localStorage.setItem(PAGES_KEY, JSON.stringify(pageIds));
        localStorage.setItem(CURRENT_PAGE_ID, newPid);
        localStorage.setItem(newPid, JSON.stringify(page));
        return page;
    },
    setCurrentPageId: (pageId) => {
        localStorage.setItem(CURRENT_PAGE_ID, pageId);
    },
    setPage: (page) => {
        localStorage.setItem(page.pid, JSON.stringify(page));
    },
    saveFonts: (fonts) => {
        localStorage.setItem("gfonts", JSON.stringify(fonts));
    },
    getFonts: () => {
        const localFonts = localStorage.getItem("gfonts");
        return localFonts != null ? JSON.parse(localFonts) : ["Aladin", "Kumar One Outline", "Fredericka the Great", "Indie Flower", "Pacifico", "Courier Prime", "Poppins", "Kaushan Script"];
    },
    savePage: debounce((page) => {
        api.setPage(page);
    }, 3000)

}
export default  api;