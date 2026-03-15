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
var theme_exports = {};
__export(theme_exports, {
  COLOR_PRESETS: () => import_presets.COLOR_PRESETS,
  COLOR_PRESET_KEYS: () => import_presets.COLOR_PRESET_KEYS,
  DEFAULT_FONT_KEY: () => import_presets.DEFAULT_FONT_KEY,
  DEFAULT_MENU_ACCENT_KEY: () => import_presets.DEFAULT_MENU_ACCENT_KEY,
  DEFAULT_MENU_COLOR_KEY: () => import_presets.DEFAULT_MENU_COLOR_KEY,
  DEFAULT_RADIUS_KEY: () => import_presets.DEFAULT_RADIUS_KEY,
  DEFAULT_SHADOW_KEY: () => import_presets.DEFAULT_SHADOW_KEY,
  DEFAULT_STYLE_KEY: () => import_presets.DEFAULT_STYLE_KEY,
  DEFAULT_SURFACE_STYLE_KEY: () => import_presets.DEFAULT_SURFACE_STYLE_KEY,
  DEFAULT_THEME_CONFIG: () => import_presets.DEFAULT_THEME_CONFIG,
  DSThemeProvider: () => import_provider.DSThemeProvider,
  FONT_PRESETS: () => import_presets.FONT_PRESETS,
  MENU_ACCENT_PRESETS: () => import_presets.MENU_ACCENT_PRESETS,
  MENU_COLOR_PRESETS: () => import_presets.MENU_COLOR_PRESETS,
  RADIUS_PRESETS: () => import_presets.RADIUS_PRESETS,
  SHADOW_PRESETS: () => import_presets.SHADOW_PRESETS,
  STYLE_PRESETS: () => import_presets.STYLE_PRESETS,
  SURFACE_STYLE_PRESETS: () => import_presets.SURFACE_STYLE_PRESETS,
  ThemeCustomizer: () => import_customizer.ThemeCustomizer,
  ThemeCustomizerContext: () => import_customizer_store.ThemeCustomizerContext,
  ThemeCustomizerProvider: () => import_customizer_store.ThemeCustomizerProvider,
  buildDarkThemeVars: () => import_contract.buildDarkThemeVars,
  buildLightThemeVars: () => import_contract.buildLightThemeVars,
  buildThemeCSS: () => import_contract.buildThemeCSS,
  buildThemeOverrides: () => import_presets.buildThemeOverrides,
  contract: () => import_contract.contract,
  cssVar: () => import_contract.cssVar,
  generateThemeCSS: () => import_presets.generateThemeCSS,
  getColorPreset: () => import_presets.getColorPreset,
  getFontPreset: () => import_presets.getFontPreset,
  getMenuAccentPreset: () => import_presets.getMenuAccentPreset,
  getMenuColorPreset: () => import_presets.getMenuColorPreset,
  getRadiusPreset: () => import_presets.getRadiusPreset,
  getShadowPreset: () => import_presets.getShadowPreset,
  getStylePreset: () => import_presets.getStylePreset,
  useDSTheme: () => import_provider.useDSTheme,
  useThemeCustomizer: () => import_customizer_store.useThemeCustomizer
});
module.exports = __toCommonJS(theme_exports);
var import_contract = require("./contract");
var import_customizer = require("./customizer");
var import_customizer_store = require("./customizer-store");
var import_presets = require("./presets");
var import_provider = require("./provider");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  COLOR_PRESETS,
  COLOR_PRESET_KEYS,
  DEFAULT_FONT_KEY,
  DEFAULT_MENU_ACCENT_KEY,
  DEFAULT_MENU_COLOR_KEY,
  DEFAULT_RADIUS_KEY,
  DEFAULT_SHADOW_KEY,
  DEFAULT_STYLE_KEY,
  DEFAULT_SURFACE_STYLE_KEY,
  DEFAULT_THEME_CONFIG,
  DSThemeProvider,
  FONT_PRESETS,
  MENU_ACCENT_PRESETS,
  MENU_COLOR_PRESETS,
  RADIUS_PRESETS,
  SHADOW_PRESETS,
  STYLE_PRESETS,
  SURFACE_STYLE_PRESETS,
  ThemeCustomizer,
  ThemeCustomizerContext,
  ThemeCustomizerProvider,
  buildDarkThemeVars,
  buildLightThemeVars,
  buildThemeCSS,
  buildThemeOverrides,
  contract,
  cssVar,
  generateThemeCSS,
  getColorPreset,
  getFontPreset,
  getMenuAccentPreset,
  getMenuColorPreset,
  getRadiusPreset,
  getShadowPreset,
  getStylePreset,
  useDSTheme,
  useThemeCustomizer
});
