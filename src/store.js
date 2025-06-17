import { create } from 'zustand';

export const useQuestionStore = create((set) => ({
  currentId: 'qi1',
  setCurrentId: (id) => set({ currentId: id }),

  selectedOptions: {},
  selectOption: (questionId, optionKey) =>
    set((state) => ({
      selectedOptions: {
        ...state.selectedOptions,
        [questionId]: optionKey
      }
    })),

  isSubMenuOpen: false,

  showTimer: false,
  setShowTimer: (val) => set({ showTimer: val }),

  timerDuration: null,
  setTimerDuration: (val) => set({ timerDuration: val }),

  toggleSubMenu: () => set((state) => ({ isSubMenuOpen: !state.isSubMenuOpen })),

  timeOptions: ['30초', '1분', '5분', '8분', '10분'],
  timeIndex: 2,
  increaseTime: () =>
    set((state) => ({
      timeIndex: Math.min(state.timeIndex + 1, state.timeOptions.length - 1)
    })),
  decreaseTime: () =>
    set((state) => ({
      timeIndex: Math.max(state.timeIndex - 1, 0)
    })),

timerId: null,
setTimerId: (id) => set({ timerId: id }),
clearTimer: () => {
  const { timerId } = useQuestionStore.getState();
  if (timerId) clearTimeout(timerId);
  set({ timerId: null });
},

// last time a question was rendered (ms timestamp)
lastRenderTime: 0,
setRenderTime: (t) => set({ lastRenderTime: t }),

  categoryAnswers: {},

  setCategoryAnswer: (category, level, id, value) => {
    set((state) => {
      const prev = state.categoryAnswers[category] || { main: null, sub: {} };
      if (level === 'main') {
        return {
          categoryAnswers: {
            ...state.categoryAnswers,
            [category]: { ...prev, main: value }
          }
        };
      } else {
        return {
          categoryAnswers: {
            ...state.categoryAnswers,
            [category]: {
              ...prev,
              sub: { ...prev.sub, [id]: value }
            }
          }
        };
      }
    });
  },

  getScore: () => {
    const data = useQuestionStore.getState().categoryAnswers;
    let total = 0;
    let count = 0;

    for (const [, { main, sub }] of Object.entries(data)) {
      if (main === 'O') {
        total += 1;
        count += 1;
      } else if (main === 'X') {
        count += 1;
      } else if (main === '-') {
        continue;
      } else {
        const valid = Object.values(sub).filter((v) => v !== '-');
        if (valid.length === 0) continue;
        const oCount = valid.filter((v) => v === 'O').length;
        total += oCount / valid.length;
        count += 1;
      }
    }

    const percentage = count > 0 ? Math.round((total / count) * 100) : 0;
    return { score: total, maxScore: count, percentage };
  },

  // Utility: parseQuestionId
  parseQuestionId: (id) => {
    const category = id.slice(0, 2);
    const level = id.endsWith("m") ? "main" : "sub";
    return { category, level };
  },

visitedPath: [],  // 이동 경로: [{id, time, k}, ...]

// record next question along with decision time and compute curvature
addToPath: (id, time) => set((s) => {
  // compute k: time <1000ms -> 0, time >15000ms -> 2, otherwise linear from 0->2
  let k;
  if (time < 1000) {
    k = 0;
  } else if (time > 15000) {
    k = 2;
  } else {
    k = ((time - 1000) / (15000 - 1000)) * 2;
  }
  return {
    visitedPath: [...s.visitedPath, { id, time, k }]
  };
}),
  resetPath: () => set({ visitedPath: [] }),
  // current zoom/pan transform for overlay coordinate correction
  transform: { scale: 1, dx: 0, dy: 0 },
  setTransform: (newTransform) => set({ transform: newTransform }),

}));