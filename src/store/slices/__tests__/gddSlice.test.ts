import { createGDD, initialState } from "@store/slices/gddSlice";
import gddSlice from "@store/slices/gddSlice";
import { GamePlatform, GameView, GDD } from "@_types/gddTypes";

describe("gdd slice", () => {
  it("should create new gdd with unique id", () => {
    const payload = {
      ...initialState.gdd,
      title: "new game",
      genre: "rpg",
      view: GameView.ThirdPerson,
      platform: GamePlatform.Mobile,
    };
    console.log(payload);
    const slice = gddSlice(initialState, createGDD(payload));

    expect(slice.gdd.view).toBe(GameView.ThirdPerson);
    expect(slice.gdd.id.length).toBeGreaterThan(0);
  });
});
