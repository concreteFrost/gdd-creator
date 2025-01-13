import {
  addMechanic,
  editMechanic,
  deleteMechanic,
  MechanicsState,
} from "../mechanicsSlice";
import mechanicsSlice, { initialMechanics } from "../mechanicsSlice";
import { GameMechanic } from "@_types/gddTypes";
import { deleteMechanicType } from "../mechanicsTypeSlice";

const mockMechanic: GameMechanic = {
  id: "",
  name: "New Mechanic",
  description: "Some desc",
  typeId: "123",
  //interactions: [],
  examples: [],
  gddId: "",
};

// const mockType: MechanicType = {
//   id: "123",
//   type: "some type",
// };

describe("mechanics slice", () => {
  let slice: MechanicsState;
  beforeEach(() => {
    slice = mechanicsSlice(initialMechanics, addMechanic(mockMechanic));
  });
  it("should add new mechanics", () => {
    expect(slice.mechanics[0].name).toBe("New Mechanic");
    expect(slice.mechanics[0].id).toBeDefined();
  });
  it("should delete mechanics", () => {
    const onAdd = mechanicsSlice(initialMechanics, addMechanic(mockMechanic));
    expect(onAdd.mechanics).toHaveLength(1);

    const id = onAdd.mechanics[0].id;

    const onDelete = mechanicsSlice(onAdd, deleteMechanic(id));
    expect(onDelete.mechanics).toHaveLength(0);
  });
  it("should edit mechanics", () => {
    const toEdit: GameMechanic = {
      ...slice.mechanics[0],
      name: "Kurwa",
      description: "Ja perdole",
    };
    const onEdit = mechanicsSlice(slice, editMechanic(toEdit));
    expect(onEdit.mechanics[0].name).toBe("Kurwa");
  });
  it("should set typeId to 'unknown' for mechanics with deleted type", () => {
    const deleteAction = deleteMechanicType("123");
    const newState = mechanicsSlice(slice, deleteAction);

    expect(newState.mechanics[0].typeId).toBe("unknown");
  });
});
