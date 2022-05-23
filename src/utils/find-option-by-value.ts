import { Option } from 'components/form'

export const findOptionByValue = <T extends string>(options: Option<T>[], value: T) =>
  options.find((w) => w.value === value)
