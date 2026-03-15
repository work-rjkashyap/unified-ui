"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var presets_exports = {};
__export(presets_exports, {
  blurIn: () => blurIn,
  blurInSubtle: () => blurInSubtle,
  countUp: () => countUp,
  crossfade: () => crossfade,
  dragDismiss: () => dragDismiss,
  expandHeight: () => expandHeight,
  expandHeightSlow: () => expandHeightSlow,
  fadeIn: () => fadeIn,
  fadeInFast: () => fadeInFast,
  fadeInSlow: () => fadeInSlow,
  hoverLift: () => hoverLift,
  hoverScale: () => hoverScale,
  modalContent: () => modalContent,
  modalContentSpring: () => modalContentSpring,
  motionProps: () => motionProps,
  numberRoll: () => numberRoll,
  overlayBackdrop: () => overlayBackdrop,
  pop: () => pop,
  popSubtle: () => popSubtle,
  press: () => press,
  pulse: () => pulse,
  reduceMotion: () => reduceMotion,
  revealMask: () => revealMask,
  scaleIn: () => scaleIn,
  scaleInLg: () => scaleInLg,
  scaleInSpring: () => scaleInSpring,
  shakeX: () => shakeX,
  slideDown: () => slideDown,
  slideDownSm: () => slideDownSm,
  slideInFromBottom: () => slideInFromBottom,
  slideInFromLeft: () => slideInFromLeft,
  slideInFromRight: () => slideInFromRight,
  slideLeft: () => slideLeft,
  slidePanelBottom: () => slidePanelBottom,
  slidePanelLeft: () => slidePanelLeft,
  slidePanelRight: () => slidePanelRight,
  slidePanelTop: () => slidePanelTop,
  slideRight: () => slideRight,
  slideUp: () => slideUp,
  slideUpLg: () => slideUpLg,
  slideUpSm: () => slideUpSm,
  slideUpSpring: () => slideUpSpring,
  spin: () => spin,
  springHover: () => springHover,
  springPress: () => springPress,
  staggerContainer: () => staggerContainer,
  staggerContainerFast: () => staggerContainerFast,
  staggerContainerSlow: () => staggerContainerSlow,
  tapScale: () => tapScale,
  toastSlideIn: () => toastSlideIn,
  toastSlideUp: () => toastSlideUp,
  withReducedMotion: () => withReducedMotion
});
module.exports = __toCommonJS(presets_exports);
var import_motion = require("../tokens/motion");
function buildTransition(duration, easingCurve) {
  return {
    duration,
    ease: [...easingCurve]
  };
}
function motionProps(preset) {
  return {
    variants: preset.variants,
    initial: "initial",
    animate: "animate",
    exit: "exit"
  };
}
const fadeIn = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: buildTransition(import_motion.durationSeconds.normal, import_motion.easing.standard)
};
const fadeInSlow = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: buildTransition(import_motion.durationSeconds.slow, import_motion.easing.decelerate)
};
const fadeInFast = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: buildTransition(import_motion.durationSeconds.fast, import_motion.easing.standard)
};
const scaleIn = {
  variants: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  },
  transition: buildTransition(import_motion.durationSeconds.normal, import_motion.easing.decelerate)
};
const scaleInSpring = {
  variants: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  },
  transition: import_motion.spring.snappy
};
const scaleInLg = {
  variants: {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 }
  },
  transition: buildTransition(import_motion.durationSeconds.slow, import_motion.easing.decelerate)
};
const slideUp = {
  variants: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 }
  },
  transition: buildTransition(import_motion.durationSeconds.normal, import_motion.easing.decelerate)
};
const slideUpSm = {
  variants: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 }
  },
  transition: buildTransition(import_motion.durationSeconds.moderate, import_motion.easing.decelerate)
};
const slideUpLg = {
  variants: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 24 }
  },
  transition: buildTransition(import_motion.durationSeconds.slow, import_motion.easing.decelerate)
};
const slideUpSpring = {
  variants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  transition: import_motion.spring.gentle
};
const slideDown = {
  variants: {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 }
  },
  transition: buildTransition(import_motion.durationSeconds.normal, import_motion.easing.decelerate)
};
const slideDownSm = {
  variants: {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 }
  },
  transition: buildTransition(import_motion.durationSeconds.moderate, import_motion.easing.decelerate)
};
const slideLeft = {
  variants: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  transition: buildTransition(import_motion.durationSeconds.normal, import_motion.easing.decelerate)
};
const slideRight = {
  variants: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  transition: buildTransition(import_motion.durationSeconds.normal, import_motion.easing.decelerate)
};
const slideInFromRight = {
  variants: {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" }
  },
  transition: buildTransition(import_motion.durationSeconds.slow, import_motion.easing.decelerate)
};
const slideInFromLeft = {
  variants: {
    initial: { opacity: 0, x: "-100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" }
  },
  transition: buildTransition(import_motion.durationSeconds.slow, import_motion.easing.decelerate)
};
const slideInFromBottom = {
  variants: {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" }
  },
  transition: buildTransition(import_motion.durationSeconds.slow, import_motion.easing.decelerate)
};
const expandHeight = {
  variants: {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: { opacity: 1, height: "auto", overflow: "hidden" },
    exit: { opacity: 0, height: 0, overflow: "hidden" }
  },
  transition: buildTransition(import_motion.durationSeconds.normal, import_motion.easing.standard)
};
const expandHeightSlow = {
  variants: {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: { opacity: 1, height: "auto", overflow: "hidden" },
    exit: { opacity: 0, height: 0, overflow: "hidden" }
  },
  transition: buildTransition(import_motion.durationSeconds.slow, import_motion.easing.decelerate)
};
const pop = {
  variants: {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.6 }
  },
  transition: import_motion.spring.bouncy
};
const popSubtle = {
  variants: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  transition: import_motion.spring.snappy
};
const blurIn = {
  variants: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" }
  },
  transition: buildTransition(import_motion.durationSeconds.slow, import_motion.easing.decelerate)
};
const blurInSubtle = {
  variants: {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" }
  },
  transition: buildTransition(import_motion.durationSeconds.normal, import_motion.easing.decelerate)
};
const staggerContainer = {
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: import_motion.stagger.normal,
        delayChildren: 0
      }
    },
    exit: {
      transition: {
        staggerChildren: import_motion.stagger.fast,
        staggerDirection: -1
      }
    }
  },
  transition: {}
};
const staggerContainerFast = {
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: import_motion.stagger.fast,
        delayChildren: 0
      }
    },
    exit: {
      transition: {
        staggerChildren: import_motion.stagger.fast,
        staggerDirection: -1
      }
    }
  },
  transition: {}
};
const staggerContainerSlow = {
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: import_motion.stagger.slow,
        delayChildren: 0.05
      }
    },
    exit: {
      transition: {
        staggerChildren: import_motion.stagger.normal,
        staggerDirection: -1
      }
    }
  },
  transition: {}
};
const overlayBackdrop = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: buildTransition(import_motion.durationSeconds.moderate, import_motion.easing.standard)
};
const modalContent = {
  variants: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97, y: 4 }
  },
  transition: import_motion.spring.stiff
};
const modalContentSpring = {
  variants: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.97, y: 4 }
  },
  transition: import_motion.spring.stiff
};
const toastSlideIn = {
  variants: {
    initial: { opacity: 0, x: 24, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 24, scale: 0.95 }
  },
  transition: import_motion.spring.snappy
};
const toastSlideUp = {
  variants: {
    initial: { opacity: 0, y: 16, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 16, scale: 0.95 }
  },
  transition: import_motion.spring.snappy
};
const press = {
  variants: {
    initial: { scale: 1 },
    animate: { scale: 1 },
    exit: { scale: 1 }
  },
  transition: import_motion.spring.snappy
};
const tapScale = {
  scale: 0.97,
  transition: import_motion.spring.snappy
};
const hoverScale = {
  scale: 1.02,
  transition: import_motion.spring.snappy
};
const hoverLift = {
  y: -2,
  transition: {
    duration: import_motion.durationSeconds.fast,
    ease: [...import_motion.easing.decelerate]
  }
};
const pulse = {
  variants: {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0.5, 1],
      transition: {
        duration: import_motion.durationSeconds.slowest * 3,
        ease: [...import_motion.easing.linear],
        repeat: Number.POSITIVE_INFINITY
      }
    },
    exit: { opacity: 0 }
  },
  transition: {}
};
const spin = {
  variants: {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: import_motion.durationSeconds.slowest * 2,
        ease: [...import_motion.easing.linear],
        repeat: Number.POSITIVE_INFINITY
      }
    },
    exit: { opacity: 0 }
  },
  transition: {}
};
function reduceMotion(_preset) {
  return {
    variants: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    transition: {
      duration: import_motion.durationSeconds.fast,
      ease: [...import_motion.easing.standard]
    }
  };
}
const shakeX = {
  variants: {
    initial: { x: 0, opacity: 1 },
    animate: {
      x: [0, -8, 8, -6, 6, -4, 4, 0],
      opacity: 1,
      transition: {
        duration: import_motion.durationSeconds.slow,
        ease: [...import_motion.easing.standard]
      }
    },
    exit: { x: 0, opacity: 1 }
  },
  transition: {
    duration: import_motion.durationSeconds.slow,
    ease: [...import_motion.easing.standard]
  }
};
const numberRoll = {
  variants: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 }
  },
  transition: {
    duration: import_motion.durationSeconds.normal,
    ease: [...import_motion.easing.decelerate]
  }
};
const crossfade = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: {
    duration: import_motion.durationSeconds.fast,
    ease: [...import_motion.easing.standard]
  }
};
const slidePanelRight = {
  variants: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" }
  },
  transition: import_motion.spring.stiff
};
const slidePanelLeft = {
  variants: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" }
  },
  transition: import_motion.spring.stiff
};
const slidePanelBottom = {
  variants: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" }
  },
  transition: import_motion.spring.stiff
};
const slidePanelTop = {
  variants: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" }
  },
  transition: import_motion.spring.stiff
};
const dragDismiss = {
  variants: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: {
      y: "100%",
      opacity: 0,
      transition: { duration: import_motion.durationSeconds.fast }
    }
  },
  transition: import_motion.spring.gentle
};
const countUp = {
  variants: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 }
  },
  transition: {
    duration: import_motion.durationSeconds.normal,
    ease: [...import_motion.easing.decelerate]
  }
};
const revealMask = {
  variants: {
    initial: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
    animate: { clipPath: "inset(0 0% 0 0)", opacity: 1 },
    exit: { clipPath: "inset(0 100% 0 0)", opacity: 0 }
  },
  transition: {
    duration: import_motion.durationSeconds.slow,
    ease: [...import_motion.easing.decelerate]
  }
};
const springPress = {
  scale: 0.97,
  transition: import_motion.spring.snappy
};
const springHover = {
  y: -2,
  transition: import_motion.spring.gentle
};
function withReducedMotion(preset, prefersReduced) {
  if (prefersReduced) {
    return reduceMotion(preset);
  }
  return preset;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blurIn,
  blurInSubtle,
  countUp,
  crossfade,
  dragDismiss,
  expandHeight,
  expandHeightSlow,
  fadeIn,
  fadeInFast,
  fadeInSlow,
  hoverLift,
  hoverScale,
  modalContent,
  modalContentSpring,
  motionProps,
  numberRoll,
  overlayBackdrop,
  pop,
  popSubtle,
  press,
  pulse,
  reduceMotion,
  revealMask,
  scaleIn,
  scaleInLg,
  scaleInSpring,
  shakeX,
  slideDown,
  slideDownSm,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  slideLeft,
  slidePanelBottom,
  slidePanelLeft,
  slidePanelRight,
  slidePanelTop,
  slideRight,
  slideUp,
  slideUpLg,
  slideUpSm,
  slideUpSpring,
  spin,
  springHover,
  springPress,
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,
  tapScale,
  toastSlideIn,
  toastSlideUp,
  withReducedMotion
});
