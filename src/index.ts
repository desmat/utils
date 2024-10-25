import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export function uuid(): string {
  // console.log("utils.misc.uuid()");
  return uuidv4().substring(0, 8);
}

// from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
export function hashCode(str: string): number {
  let hash = 0,
    i, chr;
  if (str.length === 0) return hash;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export function hashId(str: string): string {
  return Math.abs(hashCode(str)).toString(16);
}

export function normalizeWord(word: string): string {
  return word && word.replace(/[.,]/, "").toLowerCase();
}

export function kvArrayToObject(array: any[]) {
  return array.reduce((o, [k, v]) => Object.assign(o, { [k]: v }), {});
}

export function searchParamsToMap(searchParams: string): object {
  return kvArrayToObject(
    searchParams
      .split("&")
      .filter(Boolean)
      .map((e) => e.split(","))
      // .flat() // TODO check if this breaks anything
      .map((e: any) => e.split("=")));
}

export function mapToSearchParams(m: object): string {
  return Object.entries(m)
    .map((e) => e.join("="))
    .join("&");
}

export function listToMap(
  l: any[],
  opts?: {
    keyFn?: (e: any) => string,
    valFn?: (e: any) => any,
  }
): { [key: string]: any } {
  const keyFn = opts?.keyFn || function (e: any) { return e?.id };
  const valFn = opts?.valFn || function (e: any) { return e };

  return kvArrayToObject(l.map((e: any) => [keyFn(e), valFn(e)]));
}

export function mapToList(
  m: any = {},
  entryFn: (e: [any, any]) => any = ([k, v]: any) => v
): any[] {
  return Object.entries(m).map((e: any) => entryFn(e));
}

// export function mapToKeyVals(m: object): [k: string, v: any] {
//   return Object.entries(m || {}) || [];
// }

export function round(n: number, digits?: any) {
  const exp = 10 ** digits || 10;
  return Math.round(n * exp) / exp;
}

export const nullFunction = () => undefined;

export function findHoleInDatecodeSequence(dateCodes: string[]): string | undefined {
  return dateCodes
    .sort()
    .reduce((prev: any, curr: any) => {
      // find first 'hole' in sequence    
      const currInt = curr && Math.floor(moment(curr).valueOf() / 1000 / 60 / 60 / 24);
      const prevInt = prev && Math.floor(moment(prev).valueOf() / 1000 / 60 / 60 / 24);
      // console.log("findHoleInDatecodeSequence", { prev, curr, currInt, prevInt, diff: currInt - prevInt });

      if (isNaN(curr)) return prev;

      if (!prevInt) return curr;

      if (currInt && currInt > 0 && currInt - prevInt > 1) {
        return prev;
      }

      return curr;
    }, undefined);
}

// used all over by Tailwind UI
export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
  // Array.from(
  // new Set(
  classes.filter(Boolean)
    // ))
    .join(' ');
}

export async function delay(ms: number) {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), ms);
  });
}

// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffleArray(array: any[]) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
