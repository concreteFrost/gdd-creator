import { initialState } from "../gddSlice";
import {
  addMechanic,
  editMechanic,
  deleteMechanic,
  addMechanicType,
  editMechanicType,
  deleteMechanicType,
  MechanicsState,
} from "../mechanicsSlice";
import mechanicsSlice, { initialMechanics } from "../mechanicsSlice";
import { GameMechanic, MechanicType } from "@_types/gddTypes";

const mockMechanic: GameMechanic = {
  id: "",
  name: "New Mechanic",
  description: "Some desc",
  typeId: "123",
  interactions: [],
  examples: [],
  gddId: "",
};

const mockType: MechanicType = {
  id: "123",
  type: "some type",
};

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
  it("should add mechanics type", () => {
    const onAdd = mechanicsSlice(initialMechanics, addMechanicType(mockType));
    expect(onAdd.types[0].type).toBe("some type");
    expect(onAdd.types[0].id).toBeDefined();
  });
  it("should edit mechanics types", () => {
    const onAdd = mechanicsSlice(initialMechanics, addMechanicType(mockType));
    const toEdit = {
      ...onAdd.types[0],
      type: "another type",
    };

    const onEdit = mechanicsSlice(onAdd, editMechanicType(toEdit));
    expect(onEdit.types[0].type).toBe("another type");
  });
  it("should delete mechanics types", () => {
    const onTypeAdd = mechanicsSlice(
      initialMechanics,
      addMechanicType(mockType)
    );
    const onMechanicAdd = mechanicsSlice(
      onTypeAdd,
      addMechanic({ ...mockMechanic, typeId: onTypeAdd.types[0].id })
    );

    const onDelete = mechanicsSlice(
      onMechanicAdd,
      deleteMechanicType(onMechanicAdd.types[0].id)
    );
    expect(onDelete.types.length).toBe(0);
    expect(onDelete.mechanics[0].typeId).toBe("unknown");
  });
});
