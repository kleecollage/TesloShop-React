export const currencyFormatter = (value: number) => {
  return value.toLocaleString('mx-Mx', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  })
}