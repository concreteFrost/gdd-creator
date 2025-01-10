import { RootState } from "@store/store";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import * as overviewStyles from "./OverviewGeneralInfo.module.scss";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { gddFormTranslator } from "@components/Forms/GddForm/localisation/gddFormTranslator";
import jsPDF from "jspdf"

interface props{
  doc: jsPDF
}

export default function OverviewGeneralInfo({doc} : props) {
  const { title, genre, platform ,view} = useSelector(
    (state: RootState) => state.gddSlice.gdd
  );
  const currentLanguage = useCurrentLanguage();

  const contentRef = useRef(null);

  const generate = () =>{
    if(contentRef.current){
      doc.setFont("Roboto");
      doc.html(contentRef.current, {
        callback: function (doc) {
          doc.save("document.pdf");
        },
        x: 10,
        y: 10,
        width: 180,
        windowWidth: 800,
      });
    }
  }
  return (
    <div className={overviewStyles.overview_container} ref={contentRef}>
      <button onClick={generate}>x</button>
      <h1 className={overviewStyles.overview_header}>{title}</h1>
      <section
        className={overviewStyles.game_info}
      >
        <div>
          <strong>{gddFormTranslator[currentLanguage].genre}: </strong> { genre}
        </div>
        <div>
          <strong>{gddFormTranslator[currentLanguage].platform}: </strong>
          {platform}
        </div>
        <div>
          <strong>{gddFormTranslator[currentLanguage].view}: </strong>
          {view}
        </div>
      </section>
    </div>
  );
}
