import React from 'react';
import * as hintStyle from "./Hint.module.scss"
import { useCurrentLanguage } from '@hooks/useCurrentLanguage';

const translation = {
    en:{
        hint:"press Enter to Add"
    },
    ru:{
        hint:"нажмите Enter, чтобы добавить"
    }
}

function PressKeyHint() {

    const currentLang = useCurrentLanguage();
    const hint =translation[currentLang].hint
    return (
        <span className={hintStyle.hint}>{hint}</span>
    );
}

export default PressKeyHint;