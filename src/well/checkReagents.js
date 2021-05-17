export function checkReagents(well, options={}) {
  const {
    checkKeys = true,
    checkValues = true,
    keys = ['reference', 'batch', 'uuid', 'concentration']
  } = options;
  const reagents = well.reagents;
  if (reagents.length === 0) throw new Error(`The well ${well.id} has no reagents`);
  for (let reagent of reagents) {
    const entries = Object.entries(reagent);
    if (checkKeys) {
      const inputKeys = entries.map((item) => item[0]);
      for (let i = 0; i < keys.length; i++) {
        const boolean = inputKeys.find((item) => item === keys[i]);
        if (!boolean) {
          throw new Error(
            `Property ${keys[i].toUpperCase()} not defined for ${reagent.label} at ${well.id}`,
          );
        }
      }
    }

    if (checkValues) {
      const inputValues = entries.map((item) => item[1]);
      for (let i = 0; i < keys.length; i++) {
        const index = inputValues.findIndex(
          (item) => item === null || item === undefined || item === '',
        );
        if (index !== -1) {
          throw new Error(
            `Property ${entries[index][0].toUpperCase()} has undefined value for ${reagent.label} at ${well.id}`,
          );
        }
      }
    }
  }
}
