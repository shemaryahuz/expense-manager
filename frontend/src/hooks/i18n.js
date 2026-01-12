import { useSelector } from "react-redux";
import { selectLanguage, selectTranslations } from "../features/settings/settingsSlice";

export const useTranslation = () => {
    const language = useSelector(selectLanguage);
    const translations = useSelector(selectTranslations);

    const translate = (key, ...args) => {
        const translation = translations[language]?.[key];
        if (typeof translation === "function") {
            return translation(...args);
        }
        return translation ?? key;
    };

    return { translate, language };
};