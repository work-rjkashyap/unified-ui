import { easing, durationSeconds, spring, stagger } from './chunk-EZ2L3XPS.mjs';
import { useSyncExternalStore, useMemo } from 'react';

// src/motion/presets.ts
function buildTransition(duration2, easingCurve) {
  return {
    duration: duration2,
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
var fadeIn = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: buildTransition(durationSeconds.normal, easing.standard)
};
var fadeInSlow = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate)
};
var fadeInFast = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: buildTransition(durationSeconds.fast, easing.standard)
};
var scaleIn = {
  variants: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate)
};
var scaleInSpring = {
  variants: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  },
  transition: spring.snappy
};
var scaleInLg = {
  variants: {
    initial: { opacity: 0, scale: 0.85 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.85 }
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate)
};
var slideUp = {
  variants: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 }
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate)
};
var slideUpSm = {
  variants: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 }
  },
  transition: buildTransition(durationSeconds.moderate, easing.decelerate)
};
var slideUpLg = {
  variants: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 24 }
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate)
};
var slideUpSpring = {
  variants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  transition: spring.gentle
};
var slideDown = {
  variants: {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 }
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate)
};
var slideDownSm = {
  variants: {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 }
  },
  transition: buildTransition(durationSeconds.moderate, easing.decelerate)
};
var slideLeft = {
  variants: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate)
};
var slideRight = {
  variants: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate)
};
var slideInFromRight = {
  variants: {
    initial: { opacity: 0, x: "100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" }
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate)
};
var slideInFromLeft = {
  variants: {
    initial: { opacity: 0, x: "-100%" },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" }
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate)
};
var slideInFromBottom = {
  variants: {
    initial: { opacity: 0, y: "100%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" }
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate)
};
var expandHeight = {
  variants: {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: { opacity: 1, height: "auto", overflow: "hidden" },
    exit: { opacity: 0, height: 0, overflow: "hidden" }
  },
  transition: buildTransition(durationSeconds.normal, easing.standard)
};
var expandHeightSlow = {
  variants: {
    initial: { opacity: 0, height: 0, overflow: "hidden" },
    animate: { opacity: 1, height: "auto", overflow: "hidden" },
    exit: { opacity: 0, height: 0, overflow: "hidden" }
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate)
};
var pop = {
  variants: {
    initial: { opacity: 0, scale: 0.6 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.6 }
  },
  transition: spring.bouncy
};
var popSubtle = {
  variants: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  transition: spring.snappy
};
var blurIn = {
  variants: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" }
  },
  transition: buildTransition(durationSeconds.slow, easing.decelerate)
};
var blurInSubtle = {
  variants: {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" }
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate)
};
var staggerContainer = {
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: stagger.normal,
        delayChildren: 0
      }
    },
    exit: {
      transition: {
        staggerChildren: stagger.fast,
        staggerDirection: -1
      }
    }
  },
  transition: {}
};
var staggerContainerFast = {
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: stagger.fast,
        delayChildren: 0
      }
    },
    exit: {
      transition: {
        staggerChildren: stagger.fast,
        staggerDirection: -1
      }
    }
  },
  transition: {}
};
var staggerContainerSlow = {
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: stagger.slow,
        delayChildren: 0.05
      }
    },
    exit: {
      transition: {
        staggerChildren: stagger.normal,
        staggerDirection: -1
      }
    }
  },
  transition: {}
};
var overlayBackdrop = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: buildTransition(durationSeconds.moderate, easing.standard)
};
var modalContent = {
  variants: {
    initial: { opacity: 0, scale: 0.96, y: 8 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.96, y: 8 }
  },
  transition: buildTransition(durationSeconds.normal, easing.decelerate)
};
var modalContentSpring = {
  variants: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 10 }
  },
  transition: spring.stiff
};
var toastSlideIn = {
  variants: {
    initial: { opacity: 0, x: 24, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 24, scale: 0.95 }
  },
  transition: spring.snappy
};
var toastSlideUp = {
  variants: {
    initial: { opacity: 0, y: 16, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 16, scale: 0.95 }
  },
  transition: spring.snappy
};
var press = {
  variants: {
    initial: { scale: 1 },
    animate: { scale: 1 },
    exit: { scale: 1 }
  },
  transition: spring.snappy
};
var tapScale = {
  scale: 0.97,
  transition: spring.snappy
};
var hoverScale = {
  scale: 1.02,
  transition: spring.snappy
};
var hoverLift = {
  y: -2,
  transition: {
    duration: durationSeconds.fast,
    ease: [...easing.decelerate]
  }
};
var pulse = {
  variants: {
    initial: { opacity: 1 },
    animate: {
      opacity: [1, 0.5, 1],
      transition: {
        duration: durationSeconds.slowest * 3,
        ease: [...easing.linear],
        repeat: Number.POSITIVE_INFINITY
      }
    },
    exit: { opacity: 0 }
  },
  transition: {}
};
var spin = {
  variants: {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: durationSeconds.slowest * 2,
        ease: [...easing.linear],
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
      duration: durationSeconds.fast,
      ease: [...easing.standard]
    }
  };
}
var shakeX = {
  variants: {
    initial: { x: 0, opacity: 1 },
    animate: {
      x: [0, -8, 8, -6, 6, -4, 4, 0],
      opacity: 1,
      transition: {
        duration: durationSeconds.slow,
        ease: [...easing.standard]
      }
    },
    exit: { x: 0, opacity: 1 }
  },
  transition: {
    duration: durationSeconds.slow,
    ease: [...easing.standard]
  }
};
var numberRoll = {
  variants: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 }
  },
  transition: {
    duration: durationSeconds.normal,
    ease: [...easing.decelerate]
  }
};
var crossfade = {
  variants: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  transition: {
    duration: durationSeconds.fast,
    ease: [...easing.standard]
  }
};
var slidePanelRight = {
  variants: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 }
  },
  transition: spring.gentle
};
var slidePanelLeft = {
  variants: {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 }
  },
  transition: spring.gentle
};
var slidePanelBottom = {
  variants: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 }
  },
  transition: spring.gentle
};
var slidePanelTop = {
  variants: {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 }
  },
  transition: spring.gentle
};
var dragDismiss = {
  variants: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: {
      y: "100%",
      opacity: 0,
      transition: { duration: durationSeconds.fast }
    }
  },
  transition: spring.gentle
};
var countUp = {
  variants: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 }
  },
  transition: {
    duration: durationSeconds.normal,
    ease: [...easing.decelerate]
  }
};
var revealMask = {
  variants: {
    initial: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
    animate: { clipPath: "inset(0 0% 0 0)", opacity: 1 },
    exit: { clipPath: "inset(0 100% 0 0)", opacity: 0 }
  },
  transition: {
    duration: durationSeconds.slow,
    ease: [...easing.decelerate]
  }
};
var springPress = {
  scale: 0.97,
  transition: spring.snappy
};
var springHover = {
  y: -2,
  transition: spring.gentle
};
function withReducedMotion(preset, prefersReduced) {
  if (prefersReduced) {
    return reduceMotion();
  }
  return preset;
}

// src/motion/hooks.ts
var mediaQuery = null;
function getMediaQuery() {
  if (typeof window === "undefined") return null;
  if (!mediaQuery) {
    mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  }
  return mediaQuery;
}
function getSnapshot() {
  const mq = getMediaQuery();
  return mq ? mq.matches : false;
}
function getServerSnapshot() {
  return false;
}
function subscribe(callback) {
  const mq = getMediaQuery();
  if (!mq) return () => {
  };
  mq.addEventListener("change", callback);
  return () => {
    mq.removeEventListener("change", callback);
  };
}
function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
function useMotion(preset) {
  const prefersReduced = useReducedMotion();
  return useMemo(
    () => withReducedMotion(preset, prefersReduced),
    [preset, prefersReduced]
  );
}
function useMotionProps(preset) {
  const safePreset = useMotion(preset);
  return useMemo(() => motionProps(safePreset), [safePreset]);
}
var INSTANT_SPRING = {
  stiffness: 1e4,
  damping: 1e4,
  mass: 0.01
};
function useMotionSpringConfig(config) {
  const prefersReduced = useReducedMotion();
  return useMemo(
    () => prefersReduced ? INSTANT_SPRING : config,
    [prefersReduced, config]
  );
}
function MotionSafe({ children, fallback }) {
  const prefersReduced = useReducedMotion();
  if (typeof children === "function") {
    return children(prefersReduced);
  }
  if (prefersReduced && fallback !== void 0) {
    return fallback;
  }
  return children;
}

export { MotionSafe, blurIn, blurInSubtle, countUp, crossfade, dragDismiss, expandHeight, expandHeightSlow, fadeIn, fadeInFast, fadeInSlow, hoverLift, hoverScale, modalContent, modalContentSpring, motionProps, numberRoll, overlayBackdrop, pop, popSubtle, press, pulse, reduceMotion, revealMask, scaleIn, scaleInLg, scaleInSpring, shakeX, slideDown, slideDownSm, slideInFromBottom, slideInFromLeft, slideInFromRight, slideLeft, slidePanelBottom, slidePanelLeft, slidePanelRight, slidePanelTop, slideRight, slideUp, slideUpLg, slideUpSm, slideUpSpring, spin, springHover, springPress, staggerContainer, staggerContainerFast, staggerContainerSlow, tapScale, toastSlideIn, toastSlideUp, useMotion, useMotionProps, useMotionSpringConfig, useReducedMotion, withReducedMotion };
