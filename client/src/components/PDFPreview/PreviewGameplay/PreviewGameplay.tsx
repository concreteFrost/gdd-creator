import { sidebarTranslator } from "@components/Sidebar/localisation/sidebarTranslator";
import { gamplayFormTranslator } from "@components/Forms/GameplayForm/localisation/gameplayFormTranslator";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import {
  container,
  longText,
  subSectionContainer,
  sectionHeaderTitle,
  subHeader,
} from "../styles/PDFStyle";
import { formatQuillOutput } from "@utils/quillToText";
import { GamePlay } from "@_types/gddTypes";

const style = StyleSheet.create({
  container: container,
  sectionHeader: sectionHeaderTitle,
  subSectionContainer: subSectionContainer,
  storyContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  storyTitle: subHeader,
  storyContent: longText,
  gameplayGeneralInfo: {
    display: "flex",
    flexDirection: "row",
    fontSize: "0.8rem",
    justifyContent: "space-between",
  },
});

interface Props {
  gamePlay: GamePlay;
}

export default function PreviewGameplay({ gamePlay }: Props) {
  const currentLang = useCurrentLanguage();
  const headerName = sidebarTranslator[currentLang].gameplay;
  const paragraphNames = gamplayFormTranslator[currentLang];

  return (
    <View style={style.container}>
      {/**header */}
      <View style={style.sectionHeader}>
        <Text>{headerName}</Text>
      </View>
      {/**section container */}
      <View style={style.subSectionContainer}>
        {/**story */}
        <View style={style.storyContainer}>
          {/**header */}
          <Text style={style.storyTitle}>{paragraphNames.story}</Text>
          {/**story content */}
          <Text style={style.storyContent}>
            {formatQuillOutput(gamePlay.story)}
          </Text>
        </View>
        {/**gameplay info */}
        <View style={style.gameplayGeneralInfo}>
          <View>
            <Text>{paragraphNames.difficulty}:</Text>
            <Text>{gamePlay.difficulty}</Text>
          </View>
          <View>
            <Text>{paragraphNames.pacing}:</Text>
            <Text>{gamePlay.pacing}</Text>
          </View>
          <View>
            <Text>{paragraphNames.playerExperience}:</Text>
            <Text>{gamePlay.playerExperience}</Text>
          </View>
        </View>
      </View>

      {/* <section className={overviewStyles.paragraphs_container}>
        <div className={overviewStyles.paragraph_element}>

          <div className={overviewStyles.goals_and_progression}>
          {objectives.length > 0 ? (
            <div>
              <strong>{paragraphNames.objectives}:</strong>
              <ul>
                {objectives.map((objective: GameObjective) => (
                  <li key={objective.id}>{objective.name}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {progression.length > 0 ? (
            <div>
              <strong>{paragraphNames.progression}:</strong>
              <ul>
                {progression.map((progression: GameProgression) => (
                  <li key={progression.id}>{progression.name}</li>
                ))}
              </ul>
            </div>
          ) : null}
          </div>
         
        </div>
      </section> */}
    </View>
  );
}
