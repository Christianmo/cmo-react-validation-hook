import { act, renderHook } from "@testing-library/react-hooks";
import useValidation  from "../src/index";

describe("Fields validation", () => {
  test("Return invalid name field", () => {
    const initialState = {
      name: { rules: "required", value:"" },
    }

    const updatedState = {
      name: { rules: "required", value:"", errorMessage: "name is required" },
    }

    const { result } = renderHook(() => useValidation(initialState));
    expect(result.current.handleChange).toBeDefined();

    act(() => result.current.handleChange({ target: { name: "name", value: "" } }));

    expect(result.current.fields).toEqual(updatedState);
  });

  test("Return invalid email field", () => {
    const initialState = {
      email: { rules: "email", value:"" },
    }

    const updatedState = {
      email: { rules: "email", value:"", errorMessage: "email is invalid"},
    }

    const { result } = renderHook(() => useValidation(initialState));
    expect(result.current.handleChange).toBeDefined();

    act(() => result.current.handleChange({ target: { name: "email", value: "test@test" } }));

    expect(result.current.fields).toEqual(updatedState);
  });  
});