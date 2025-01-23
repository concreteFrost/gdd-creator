import { StyleSheet } from "@react-pdf/renderer";


export const container: any = {
  display: "flex",
  flexDirection: "column",
  fontFamily: "Roboto",
  marginBottom: 40,
}

export const subSectionContainer:any={
   display:"flex",
   flexDirection:"column",
   paddingLeft:20,
   paddingRight:20,
}

export const boldText: any = {
  fontWeight: "bold"
}

export const longText: any = {
  fontSize: "0.8rem",
  whiteSpace: "pre-wrap",
  textAlign: "justify",
  lineHeight: "1.6", /* Увеличивает межстрочное расстояние */
  color: "#444", /* Нейтральный цвет текста */
}

export const sectionHeaderTitle: any = {
  color: "#333",
  lineHeight: 1.6,
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  borderBottom: "2px solid #d4d4d4",
  borderTop: "2px solid #d4d4d4",
  backgroundColor: "#eae9f4",
  paddingBottom: 5,
  marginBottom: 50,
}

export const subHeader: any = {
  textAlign: "center",
  marginBottom: 20,
  fontSize: "1.2rem",
}

export const generalInfoStyle = StyleSheet.create({
  container: container,
  gameTitle: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    fontSize: 40,
    marginBottom: 40
  },
  gameInfoContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  infoTitle: boldText

})