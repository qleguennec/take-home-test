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

    it("should side-effect decrement the expiresIn and benefit", () => {
      const pharmacy = new Pharmacy([new Drug("test", 2, 3)]);
      pharmacy.updateBenefitValue();

      expect(pharmacy.drugs[0].expiresIn).toBe(1);
      expect(pharmacy.drugs[0].benefit).toBe(2);
    });

    it("should decrement the benefit by 2 when the expiresIn is equal to 0", () => {
      expect(
        new Pharmacy([new Drug("test", 0, 2)]).updateBenefitValue()[0].benefit
      ).toEqual(0);
    });

    it("should decrement the benefit by 2 when the expiresIn is less than 0", () => {
      expect(
        new Pharmacy([new Drug("test", -1, 2)]).updateBenefitValue()[0].benefit
      ).toEqual(0);
    });

    it("should not decrement the benefit to a negative value", () => {
      expect(
        new Pharmacy([new Drug("test", 0, 0)]).updateBenefitValue()[0].benefit
      ).toBeGreaterThanOrEqual(0);
    });

    it("should not increment the benefit to a value greater than 50", () => {
      expect(
        new Pharmacy([new Drug("test", 0, 50)]).updateBenefitValue()[0].benefit
      ).toBeLessThanOrEqual(50);
    });

    describe("Herbal Tea", () => {
      it("should increment the benefit", () => {
        expect(
          new Pharmacy([new Drug("Herbal Tea", 2, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(6);
      });

      it("should increment the benefit by two units when the expiresIn is equal to 0", () => {
        expect(
          new Pharmacy([new Drug("Herbal Tea", 0, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(7);
      });

      it("should increment the benefit by two units when the expiresIn is less than 0", () => {
        expect(
          new Pharmacy([new Drug("Herbal Tea", -1, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(7);
      });

      it("should not increment the benefit to a value greater than 50", () => {
        expect(
          new Pharmacy([new Drug("Herbal Tea", 0, 50)]).updateBenefitValue()[0]
            .benefit
        ).toBeLessThanOrEqual(50);
      });

      it("should decrement the expiresIn", () => {
        expect(
          new Pharmacy([new Drug("Herbal Tea", 2, 3)]).updateBenefitValue()[0]
            .expiresIn
        ).toEqual(1);
      });
    });

    describe("Magic Pill", () => {
      it("should not change the benefit", () => {
        expect(
          new Pharmacy([new Drug("Magic Pill", 2, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(5);
      });

      it("should not change the expiresIn", () => {
        expect(
          new Pharmacy([new Drug("Magic Pill", 2, 3)]).updateBenefitValue()[0]
            .expiresIn
        ).toEqual(2);
      });
    });

    describe("Fervex", () => {
      it("should decrement the expiresIn", () => {
        expect(
          new Pharmacy([new Drug("Fervex", 2, 3)]).updateBenefitValue()[0]
            .expiresIn
        ).toEqual(1);
      });

      it("should not increment the benefit to a value greater than 50", () => {
        expect(
          new Pharmacy([new Drug("Herbal Tea", 0, 50)]).updateBenefitValue()[0]
            .benefit
        ).toBeLessThanOrEqual(50);
      });

      it("should increment the benefit when the expiresIn is greater than 10", () => {
        expect(
          new Pharmacy([new Drug("Fervex", 11, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(6);
      });

      it("should increment the benefit by 2 when the expiresIn is equal to 10", () => {
        expect(
          new Pharmacy([new Drug("Fervex", 10, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(7);
      });

      it("should increment the benefit by 2 when the expiresIn is less than 10", () => {
        expect(
          new Pharmacy([new Drug("Fervex", 9, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(7);
      });

      it("should increment the benefit by 3 when the expiresIn is equal to 5", () => {
        expect(
          new Pharmacy([new Drug("Fervex", 5, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(8);
      });

      it("should increment the benefit by 3 when the expiresIn is less than 5", () => {
        expect(
          new Pharmacy([new Drug("Fervex", 4, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(8);
      });

      it("should reset the benefit to 0 when the expiresIn is equal to 0", () => {
        expect(
          new Pharmacy([new Drug("Fervex", 0, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(0);
      });

      it("should reset the benefit to 0 when the expiresIn is less than 0", () => {
        expect(
          new Pharmacy([new Drug("Fervex", -1, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(0);
      });
    });

    describe("Dafalgan", () => {
      it("should decrement the expiresIn", () => {
        expect(
          new Pharmacy([new Drug("Dafalgan", 2, 3)]).updateBenefitValue()[0]
            .expiresIn
        ).toEqual(1);
      });

      it("should decrement the benefit by 2", () => {
        expect(
          new Pharmacy([new Drug("Dafalgan", 2, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(3);
      });

      it("should decrement the benefit by 4 when the expiresIn is equal to 0", () => {
        expect(
          new Pharmacy([new Drug("Dafalgan", 0, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(1);
      });

      it("should decrement the benefit by 4 when the expiresIn is less than 0", () => {
        expect(
          new Pharmacy([new Drug("Dafalgan", -1, 5)]).updateBenefitValue()[0]
            .benefit
        ).toBe(1);
      });
    });
  });
});
