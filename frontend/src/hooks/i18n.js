import { useSelector } from "react-redux";
import { selectLanguage, selectTranslations } from "../features/settings/settingsSlice";

export const useTranslation = () => {
    const language = useSelector(selectLanguage);
    const translations = useSelector(selectTranslations);

    const translate = (key) => {
        const langMap = translations[language] || {};
        return langMap[key] || key;
    };

    return { translate, language };
};