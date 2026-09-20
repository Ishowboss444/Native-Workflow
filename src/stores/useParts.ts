import { create } from "zustand";

export type General = {
  code: string;
  title: string;
  description: string;
  allCount: string; // TextInput gives strings; convert with Number() when you send it to the API
  deadline: string; // "YYYY-MM-DD"
};

type PartsState = {
  newPart: {
    general: General;
  };
  setGeneral: (patch: Partial<General>) => void;
  reset: () => void;
};

const emptyGeneral: General = {
  code: "",
  title: "",
  description: "",
  allCount: "",
  deadline: "",
};

export const usePartsStore = create<PartsState>((set) => ({
  newPart: { general: { ...emptyGeneral } },

  setGeneral: (patch) =>
    set((s) => ({
      newPart: { ...s.newPart, general: { ...s.newPart.general, ...patch } },
    })),

  reset: () => set({ newPart: { general: { ...emptyGeneral } } }),
}));