import { RootState } from "@store/store";
import { useSelector } from "react-redux";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { gddFormTranslator } from "@components/Forms/GddForm/localisation/gddFormTranslator";
import { View, Text } from "@react-pdf/renderer";
import { generalInfoStyle as style } from "../styles/PDFStyle";

export default function PreviewGeneralInfo() {
  const { title, genre, platform, view } = useSelector(
    (state: RootState) => state.gddSlice.gdd
  );
  const currentLanguage = useCurrentLanguage();
  return (
    <View style={style.container}>
      <View style={style.gameTitle}>
        <Text>{title}</Text>
      </View>
      <View style={style.gameInfoContainer}>
        <View >
          <Text style={style.infoTitle}>{gddFormTranslator[currentLanguage].genre}: </Text>
          <Text>{genre}</Text>
        </View>
        <View>
          <Text style={style.infoTitle}>{gddFormTranslator[currentLanguage].platform}: </Text>
          <Text>{platform}</Text>
        </View>
        <View>
          <Text style={style.infoTitle}>{gddFormTranslator[currentLanguage].view}: </Text>
          <Text>{view}</Text>
        </View>
      </View>
    </View>

  );
}
