const drugUpdateRules = {
  "Herbal Tea": ({ expiresIn }) => ({
    expiresIn: -1,
    benefit: expiresIn > 0 ? 1 : 2
  }),
  "Magic Pill": () => ({}),
  Fervex: ({ expiresIn, benefit }) => {
    if (expiresIn <= 0) return { expiresIn: -1, benefit: -benefit };
    else if (expiresIn <= 5) return { expiresIn: -1, benefit: 3 };
    else if (expiresIn <= 10) return { expiresIn: -1, benefit: 2 };
    else return { expiresIn: -1, benefit: 1 };
  }
};

const drugUpdateDefaultRule = ({ expiresIn }) => ({
  expiresIn: -1,
  benefit: -(expiresIn > 0 ? 1 : 2)
});

const fixBenefitBounds = benefit => {
  if (benefit > 50) return 50;
  else if (benefit < 0) return 0;
  else return benefit;
};

const updateDrugEndOfDay = drug => {
  const delta = (drugUpdateRules[drug.name] || drugUpdateDefaultRule)(drug);

  return {
    ...drug,
    expiresIn: drug.expiresIn + (delta.expiresIn || 0),
    benefit: fixBenefitBounds(drug.benefit + (delta.benefit || 0))
  };
};

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    this.drugs = this.drugs.map(updateDrugEndOfDay);

    return this.drugs;
  }
}
