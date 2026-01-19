import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

export const createRtlCache = () =>
    createCache({
        key: "mui-rtl",
        stylisPlugins: [rtlPlugin],
    });

export const createLtrCache = () =>
    createCache({
        key: "mui",
    });