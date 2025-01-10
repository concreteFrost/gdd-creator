import EditGddForm from "@components/Forms/GddForm/EditGDDForm";
import OverviewGeneralInfo from "@components/Overview/OverviewGeneralInfo/OverviewGeneralInfo";
import OverviewGameplay from "@components/Overview/OverviewGameplay/OverviewGameplay";
import OverviewLocations from "@components/Overview/OverviewLocations/OverviewLocations";
import OverviewMechanics from "@components/Overview/OverviewMechanics/OverviewMechanics";
import OverviewCharacters from "@components/Overview/OverviewCharacters/OverviewCharacters";
// import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PreviewCharacters from "@components/PDFPreview/PreviewCharacters/PreviewCharacters";
import { useRef, useState } from "react";
import PreviewGeneralInfo from "@components/PDFPreview/PreviewGeneralInfo/PreviewGeneralInfo";
import { Document,Page, StyleSheet,PDFViewer } from "@react-pdf/renderer";
import PreviewGameplay from "@components/PDFPreview/PreviewGameplay/PreviewGameplay";
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';


function GeneralInfo() {

  const pdfRef: any = useRef(null);

  const [doc, setDoc] = useState<jsPDF>(new jsPDF())

  
  return (
    <div>
       {/* <button onClick={()=>generatePDF()}>try</button> */}
      <div id="content">
        <a href="https://concreteage.co.uk">link</a>
      <OverviewGeneralInfo doc={doc}></OverviewGeneralInfo>
      <OverviewGameplay></OverviewGameplay>
      {/* <OverviewMechanics></OverviewMechanics>
      <OverviewLocations></OverviewLocations>
      <OverviewCharacters></OverviewCharacters> */}
      </div>
      
     

    </div>
  );
}

export default GeneralInfo;
