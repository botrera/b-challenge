const buildHeader = <T extends object>(header: T = undefined): object => ({
  ...header,
  'Content-Type': 'application/json',
});

const buildRequest = <T extends object, M extends object>(attributes: T, object: M): M => {
  const build = Object.assign({}, object);
  const keys = Object.keys(attributes);
  keys.forEach((key) => {
    build[key] = attributes[key];
  });

  return build;
};

export const genericFactory = {
  buildHeader,
  buildRequest,
};
