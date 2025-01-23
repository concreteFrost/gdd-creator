import {
  createGameplay,
  editGameplay,
  initialGameplay,
} from "../gameplaySlice";
import { mockGameplay } from "@mocks/gdd/gddStoreMock";
import gameplaySlice from "../gameplaySlice";
import { GamePlay } from "@_types/gddTypes";

describe("gameplay slice", () => {
  it("should create gameplay", () => {
    const data: GamePlay = mockGameplay;

    const onCreate = gameplaySlice(initialGameplay, createGameplay(data));
    expect(onCreate.gameplay).toStrictEqual(data);
  });
  it("should edit gameplay info", () => {
    const data: GamePlay = mockGameplay;
    const dataEdited: Omit<GamePlay, "id" | "gddId"> = {
      ...mockGameplay,
      story: "another story",
    };

    const onCreate = gameplaySlice(initialGameplay, createGameplay(data));
    const onEdit = gameplaySlice(onCreate, editGameplay(dataEdited));

    expect(onEdit.gameplay.story).toBe(dataEdited.story);
  });
});
