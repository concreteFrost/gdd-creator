import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Line,
} from "@react-pdf/renderer";
import { useSelector } from "react-redux";
import { RootState } from "@store/store";
import {
  Character,
  CharacterAbilities,
  CharacterTraits,
} from "@_types/gddTypes";
import { sidebarTranslator } from "@components/Sidebar/localisation/sidebarTranslator";
import {
  CharacterFormFields,
  characterFormTranslator,
} from "@components/Forms/CharacterForm/localisation/characterFormTranslator";
import { useCurrentLanguage } from "@hooks/useCurrentLanguage";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Roboto",
    flexDirection: "column",
  },
  container: {
    margin: "0 auto",
    maxWidth: 600,
    width: "100%",
    marginBottom: 20,
  },
  header: {
    color: "#333",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: "#d4d4d4",
    paddingBottom: 5,
    marginBottom: 20,
  },
  characterContainer: {
    marginBottom: 20,

    padding: 10,
    borderRadius: 5,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  section: {
    marginBottom: 15,
    flexGrow: 1,
  },
  paragraphHeader: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  list: {
    marginLeft: 15,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
  },
});

function PreviewCharacters() {
  const { characters } = useSelector(
    (state: RootState) => state.charactersSlice
  );

  if (characters.length === 0) return null;

  const currentLang = useCurrentLanguage();
  const headerName = sidebarTranslator[currentLang].characters;
  const t = characterFormTranslator[currentLang];

  return (
    <Page size={"A4"} style={styles.page}>
      <View style={styles.container}>
        <View>
          <Text>section 1</Text>
        </View>
        <View>
          <Text>section 1</Text>
        </View>

        <Text style={styles.header}>{headerName}</Text>
        {characters.map((character: Character) => (
          <CharacterPDFElement key={character.id} character={character} t={t} />
        ))}
      </View>
    </Page>
  );
}

function CharacterPDFElement({
  character,
  t,
}: {
  character: Character;
  t: CharacterFormFields;
}) {
  return (
    <View style={styles.characterContainer}>
      <Text style={styles.subHeader}>{character.name}</Text>
      {/* {character.mainImage?.path && (
        <Image
          src={character.mainImage.path}
          style={{ width: 100, height: 100, margin: "0 auto" }}
        />
      )} */}
      <View style={styles.section}>
        <Text style={styles.paragraphHeader}>{t.role}:</Text>
        <Text>{character.role}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.paragraphHeader}>{t.backstory}:</Text>
        <Text>{character.backstory}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.paragraphHeader}>{t.abilities}:</Text>
        <View style={styles.list}>
          {character.abilities.length > 0 ? (
            character.abilities.map((abilities: string) => (
              <Text key={abilities} style={styles.listItem}>
                {abilities}
              </Text>
            ))
          ) : (
            <Text>-</Text>
          )}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.paragraphHeader}>{t.traits}:</Text>
        <View style={styles.list}>
          {character.traits.length > 0 ? (
            character.traits.map((trait: string) => (
              <Text key={trait} style={styles.listItem}>
                {trait}
              </Text>
            ))
          ) : (
            <Text>-</Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default PreviewCharacters;
