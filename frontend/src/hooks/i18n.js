import { useSelector } from "react-redux";
import { selectTranslations, selectLanguage } from "../features/settings/settingsSlice";

export const useTranslation = () => {
    const translations = useSelector(selectTranslations);
    const language = useSelector(selectLanguage);

    const translate = (key) => {
        return language === "en" ? key : translations[key] || key;
    };

    return { translate, language };
};