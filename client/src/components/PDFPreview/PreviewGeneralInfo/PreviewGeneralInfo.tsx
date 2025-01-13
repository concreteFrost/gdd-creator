import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { gddFormTranslator } from "@components/Forms/GddForm/localisation/gddFormTranslator";
import { View, Text } from "@react-pdf/renderer";
import { generalInfoStyle as style } from "../styles/PDFStyle";

interface Props {
  currentLanguage: "en" | "ru";
  gdd: any;
}

export default function PreviewGeneralInfo({ currentLanguage, gdd }: Props) {
  return (
    <View style={style.container}>
      <View style={style.gameTitle}>
        <Text>{gdd.title}</Text>
      </View>
      <View style={style.gameInfoContainer}>
        <View>
          <Text style={style.infoTitle}>
            {gddFormTranslator[currentLanguage].genre}:{" "}
          </Text>
          <Text>{gdd.genre}</Text>
        </View>
        <View>
          <Text style={style.infoTitle}>
            {gddFormTranslator[currentLanguage].platform}:{" "}
          </Text>
          <Text>{gdd.platform}</Text>
        </View>
        <View>
          <Text style={style.infoTitle}>
            {gddFormTranslator[currentLanguage].view}:{" "}
          </Text>
          <Text>{gdd.view}</Text>
        </View>
      </View>
    </View>
  );
}
