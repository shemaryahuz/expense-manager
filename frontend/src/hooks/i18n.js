import { useSelector } from "react-redux";

import { selectLanguage } from "../features/settings/settingsSlice";

import { LANGUAGES } from "../constants/features/settingsConstants";
import { translations } from "../constants/i18n/translations";

const { ENGLISH } = LANGUAGES;

export const useTranslation = () => {
    const language = useSelector(selectLanguage);

    const translate = (key) => {
        return language === ENGLISH ? key : translations[key] || key;
    };

    return { translate, language };
};