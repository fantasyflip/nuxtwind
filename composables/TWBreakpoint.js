import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const nuxtBreakpoints = useBreakpoints(breakpointsTailwind);

export const useTWBreakpoint = (breakpointValues) => {
  let breakpoints = ref({
    base: {
      width: 0,
      state:
        nuxtBreakpoints.sm.value ||
        nuxtBreakpoints.md.value ||
        nuxtBreakpoints.lg.value ||
        nuxtBreakpoints.xl.value ||
        nuxtBreakpoints["2xl"].value
          ? false
          : true,
      value: breakpointValues?.base || null,
    },
    sm: {
      width: 640,
      state: nuxtBreakpoints.sm.value,
      value: breakpointValues?.sm || null,
    },
    md: {
      width: 768,
      state: nuxtBreakpoints.md.value,
      value: breakpointValues?.md || null,
    },
    lg: {
      width: 1024,
      state: nuxtBreakpoints.lg.value,
      value: breakpointValues?.lg || null,
    },
    xl: {
      width: 1280,
      state: nuxtBreakpoints.xl.value,
      value: breakpointValues?.xl || null,
    },
    "2xl": {
      width: 1536,
      state: nuxtBreakpoints["2xl"].value,
      value: breakpointValues?.["2xl"] || null,
    },
    current: {},
  });

  if (breakpoints.value["2xl"].state) {
    breakpoints.value.current = {
      width: breakpoints.value["2xl"].width,
      value: breakpoints.value["2xl"].value,
      name: "2xl",
    };
  } else if (breakpoints.value.xl.state) {
    breakpoints.value.current = {
      width: breakpoints.value.xl.width,
      value: breakpoints.value.xl.value,
      name: "xl",
    };
  } else if (breakpoints.value.lg.state) {
    breakpoints.value.current = {
      width: breakpoints.value.lg.width,
      value: breakpoints.value.lg.value,
      name: "lg",
    };
  } else if (breakpoints.value.md.state) {
    breakpoints.value.current = {
      width: breakpoints.value.md.width,
      value: breakpoints.value.md.value,
      name: "md",
    };
  } else if (breakpoints.value.sm.state) {
    breakpoints.value.current = {
      width: breakpoints.value.sm.width,
      value: breakpoints.value.sm.value,
      name: "sm",
    };
  } else {
    breakpoints.value.current = {
      width: breakpoints.value.base.width,
      value: breakpoints.value.base.value,
      name: "base",
    };
  }

  return breakpoints;
};
