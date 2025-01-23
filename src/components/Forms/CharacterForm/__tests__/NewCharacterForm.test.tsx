import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";
import NewCharacterForm from "../NewCharacterForm";
import { mockGdd } from "@mocks/gdd/gddStoreMock";

describe("NewCharacterForm",()=>{

    const useSelector = jest.spyOn(reactRedux,"useSelector");
    const useDispatch = jest.spyOn(reactRedux,"useDispatch");

    beforeEach(()=>{
        useSelector.mockImplementation(()=>mockGdd);
        useDispatch.mockImplementation(()=>jest.fn());
      
        render(<NewCharacterForm></NewCharacterForm>);
    })
    afterEach(()=>{
        jest.clearAllMocks()
    })

    it("should render the form",()=>{
        expect(screen.getByText("Abilities")).toBeInTheDocument();
    })
    it("should change input values",async()=>{
        const nameInput = screen.getByTestId("test-title") as HTMLInputElement;

        await userEvent.type(nameInput,"newValues");
        expect(nameInput.value).toBe("newValues");
        expect(useDispatch).toHaveBeenCalledTimes(10);
    })
    it("should add abilities and traits",async()=>{
        const abilitiesInput = screen.getByTestId("test-abilities-input") as HTMLInputElement;
        const traitsInput = screen.getByTestId("test-traits-input") as HTMLInputElement;

        await userEvent.type(abilitiesInput,"new ability{enter}");
        await userEvent.type(traitsInput,"new trait{enter}");

        expect(abilitiesInput.value).toBe("");
        expect(traitsInput.value).toBe("");

        expect(screen.getByText("new ability")).toBeInTheDocument();
        expect(screen.getByText("new trait")).toBeInTheDocument();
    });
    it("should prevent form submission if character name is empty",async()=>{
        const submitBtn = screen.getByTestId("test-submit-form") as HTMLInputElement;
        await userEvent.click(submitBtn);
        expect(screen.getByText("Name is required")).toBeInTheDocument();
        expect(useDispatch).toHaveBeenCalledTimes(1);
    })


})