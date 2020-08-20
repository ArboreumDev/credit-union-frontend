/**
 * All the common utility functions.
 */

import { hasOwnProperty } from "react";

class UtilityService {
  checkEmpty(obj) {
    if (obj === undefined || obj === null || obj === {} || obj === []) {
      return true;
    }
    if (typeof obj === "string" || typeof obj === "number") {
      return obj.toString().trim().length === 0;
    }
    for (let key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
  }
}

const utilityService = new UtilityService();

export default utilityService;
