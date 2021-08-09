import { getErrorMessage } from "../src/utils";

describe("Check validation rules", () => {
  test("Return an error message", () => {
    expect(getErrorMessage({ name: "email", value: "", rules: "required" }))
      .toBe("email is required");
  });

  test("Return email error message", () => {
    expect(getErrorMessage({ name: "email", value: "test@test", rules: "email" }))
      .toBe("email is invalid");
  });

  test("Return empty email error message", () => {
    expect(getErrorMessage({ name: "email", value: "test@test.com", rules: "email" }))
      .toBe("");
  });

  test("Return letters error message", () => {
    expect(getErrorMessage({ name: "name", value: "1#4", rules: "letters" }))
      .toBe("name is invalid");
  });

  test("Return empty letters error message", () => {
    expect(getErrorMessage({ name: "name", value: "LETTERS", rules: "letters" }))
      .toBe("");
  });  

  test("Return number error message", () => {
    expect(getErrorMessage({ name: "age", value: "number", rules: "number" }))
      .toBe("age is invalid");
  });

  test("Return empty number error message", () => {
    expect(getErrorMessage({ name: "age", value: 1, rules: "number" }))
      .toBe("");
  });

  test("Return url error message", () => {
    expect(getErrorMessage({ name: "url", value: "http://examplecom", rules: "url" }))
      .toBe("url is invalid");
  });

  test("Return empty url error message", () => {
    expect(getErrorMessage({ name: "url", value: "http://example.com", rules: "url" }))
      .toBe("");
  });  

})
