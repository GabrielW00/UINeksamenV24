import { useMemo } from "react";
/*Sjekker tilgjengelighet basert på Pokemon sin id */
export function hasHomeSprite(data) {
  if (data?.id >= 906 && data?.id <= 1008) {
    return false;
  } else {
    return true;
  }
}

export function isPokemonAvailable(data) {
  if (data?.id >= 1009) {
    return false;
  } else {
    return true;
  }
}
