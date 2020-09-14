function toFixedNumber(num, digits, base = 10) {
  const pow = Math.pow(base, digits)
  return Math.round(num * pow) / pow
}

export const irr_dec_to_perc = (irr: number, digits = 1) =>
  toFixedNumber(irr * 100, digits)
