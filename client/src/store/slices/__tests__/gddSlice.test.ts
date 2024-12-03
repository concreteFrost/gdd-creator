import { createGDD, initialState } from "@store/slices/gddSlice";
import gddSlice from "@store/slices/gddSlice";
import { GamePlatform, GameView, GDD } from "@_types/gddTypes";

describe("gdd slice", () => {
  it("should create new gdd with unique id", () => {
    const payload = {
      ...initialState,
      title: "new game",
      genre: "rpg",
      view: GameView.Isometric,
      platform: GamePlatform.Mobile,
    };
    const slice = gddSlice(initialState, createGDD(payload.gdd));

    expect(slice.gdd.view).toBe(GameView.Isometric);
    expect(slice.gdd.id.length).toBeGreaterThan(0);
  });
});
