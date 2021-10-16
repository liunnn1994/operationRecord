import rewire from "rewire"
const main = rewire("./main")
const bootstrap = main.__get__("bootstrap")
// @ponicode
describe("bootstrap", () => {
    test("0", async () => {
        await bootstrap()
    })
})
