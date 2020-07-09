export const compose = (...funcs) => (Component) =>
  funcs.reduceRight((acc, func) => func(acc), Component)
