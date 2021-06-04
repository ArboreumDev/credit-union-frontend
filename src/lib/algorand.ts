/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given adress
 * @return {Boolean}
 */
export const isAlgorandAddress = function (address) {
  return address.length === 58
  // TODO make an actual check e.g. use proper algorand checksum test
  //   return /^[0-9A-Z]{52}$/i.test(address)
}
