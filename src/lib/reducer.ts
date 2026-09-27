import { MAX_LEADERS } from "./presets";
import type { Person, PosterData, Stickers } from "./types";

// Reducer stays pure: random values (UUIDs, randomized copy, samples) are built by the caller and passed in.
export type Action =
  | { [K in keyof PosterData]-?: { type: "setField"; key: K; value: PosterData[K] } }[keyof PosterData]
  | { type: "merge"; patch: Partial<PosterData> } // randomize copy, load sample, reset, lang switch
  | { type: "addLeader"; person: Person }
  | { type: "removeLeader"; id: string }
  | { type: "updateLeader"; id: string; patch: Partial<Person> }
  | { type: "updateHero"; patch: Partial<Person> }
  | { type: "toggleSticker"; key: keyof Stickers };

export const setField = <K extends keyof PosterData>(key: K, value: PosterData[K]) =>
  ({ type: "setField", key, value }) as Action;

export function posterReducer(state: PosterData, action: Action): PosterData {
  switch (action.type) {
    case "setField":
      return { ...state, [action.key]: action.value };
    case "merge":
      return { ...state, ...action.patch };
    case "addLeader":
      if (state.leaders.length >= MAX_LEADERS) return state;
      return { ...state, leaders: [...state.leaders, action.person] };
    case "removeLeader":
      return { ...state, leaders: state.leaders.filter((l) => l.id !== action.id) };
    case "updateLeader":
      return {
        ...state,
        leaders: state.leaders.map((l) => (l.id === action.id ? { ...l, ...action.patch } : l)),
      };
    case "updateHero":
      return { ...state, hero: { ...state.hero, ...action.patch } };
    case "toggleSticker":
      return { ...state, stickers: { ...state.stickers, [action.key]: !state.stickers[action.key] } };
  }
}
