import {
  addMechanicType,
  deleteMechanicType,
  editMechanicType,
} from "../mechanicsTypeSlice";
import mechanicsTypeSlice, { initialTypes } from "../mechanicsTypeSlice";
import { MechanicType } from "@_types/gddTypes";

const mockType: MechanicType = {
  id: "123",
  type: "some type",
};

describe("mechanics type slice", () => {
  it("should add mechanics type", () => {
    const onAdd = mechanicsTypeSlice(initialTypes, addMechanicType(mockType));
    expect(onAdd.types[0].type).toBe("some type");
    expect(onAdd.types[0].id).toBeDefined();
  });
  it("should edit mechanics types", () => {
    const onAdd = mechanicsTypeSlice(initialTypes, addMechanicType(mockType));
    const toEdit = {
      ...onAdd.types[0],
      type: "another type",
    };

    const onEdit = mechanicsTypeSlice(onAdd, editMechanicType(toEdit));
    expect(onEdit.types[0].type).toBe("another type");
  });
  it("should delete mechanics types", () => {
    const onTypeAdd = mechanicsTypeSlice(
      initialTypes,
      addMechanicType(mockType)
    );

    const onDelete = mechanicsTypeSlice(
      onTypeAdd,
      deleteMechanicType(onTypeAdd.types[0].id)
    );
    expect(onDelete.types.length).toBe(0);
  });
});
