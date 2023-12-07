
import appReducer from "./appSlice"

describe("apps reducer", () => {

  it("should handle initial state", () => {
    expect(appReducer(undefined, { type: "unknown" })).toEqual({
      appRows: null,
      status: "idle",
      activeApp: null,
      appUsers: null
    })
  })
})
