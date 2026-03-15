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
var primitives_exports = {};
__export(primitives_exports, {
  Body: () => import_typography.Body,
  Caption: () => import_typography.Caption,
  Container: () => import_container.Container,
  Divider: () => import_divider.Divider,
  Grid: () => import_stack.Grid,
  Heading: () => import_typography.Heading,
  InlineCode: () => import_typography.InlineCode,
  Label: () => import_typography.Label,
  Overline: () => import_typography.Overline,
  Stack: () => import_stack.Stack,
  Subheading: () => import_typography.Subheading,
  Typography: () => import_typography.Typography
});
module.exports = __toCommonJS(primitives_exports);
var import_container = require("./container");
var import_divider = require("./divider");
var import_stack = require("./stack");
var import_typography = require("./typography");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Body,
  Caption,
  Container,
  Divider,
  Grid,
  Heading,
  InlineCode,
  Label,
  Overline,
  Stack,
  Subheading,
  Typography
});
