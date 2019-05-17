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

    it("should return an empty list when passed an empty list", () => {
      expect(new Pharmacy([]).updateBenefitValue()).toEqual([]);
    });

    it("should return a list of length 1 when passed a list of length 1", () => {
      expect(
        new Pharmacy([new Drug("test", 2, 3)]).updateBenefitValue()
      ).toHaveLength(1);
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

    it("should side-effect deincrement the expiresIn and benefit", () => {
      const pharmacy = new Pharmacy([new Drug("test", 2, 3)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(1);
      expect(pharmacy.drugs[0].benefit).toBe(2);
    });
  });
});
