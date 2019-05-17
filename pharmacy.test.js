import { Drug, Pharmacy } from "./pharmacy";
import testCases from "./output";

describe("Pharmacy", () => {
  describe("updateBenefitValue()", () => {
    testCases.forEach((testCase, index) => {
      if (testCases[index + 1])
        it(`should match given data on iteration ${index + 1}`, () => {
          expect(new Pharmacy(testCase).updateBenefitValue()).toEqual(
            testCases[index + 1]
          );
        });
    });

    it("should decrement the benefit", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()[0].benefit
      ).toEqual(2);
    });

    it("should decrement the expiresIn", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()[0].expiresIn
      ).toEqual(1);
    });
  });
});
