export function checkReagents(input) {
  let keys = ['reference', 'batch', 'uuid', 'concentration'];
  for (let reagent = 0; reagent < input.length; reagent++) {
    let entries = Object.entries(input[reagent]);
    let inputKeys = entries.map((item) => item[0]);
    for (let i = 0; i < keys.length; i++) {
      let boolean = inputKeys.find((item) => item === keys[i]);
      if (!boolean) {
        throw new Error(
          `Property ${keys[i].toUpperCase()} not defined in reagent ${reagent}`,
        );
      }
    }

    let inputValues = entries.map((item) => item[1]);
    for (let i = 0; i < keys.length - 1; i++) {
      let boolean = inputValues.findIndex(
        (item) => item === null || item === '',
      );
      if (!boolean) {
        throw new Error(
          `Property ${keys[i].toUpperCase()} has undefined value`,
        );
      }
    }
  }
}
