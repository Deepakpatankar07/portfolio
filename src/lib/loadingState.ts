"use client";

let hasLoaded = false;

export function setAppLoaded() {
  hasLoaded = true;
}

export function getAppLoaded() {
  return hasLoaded;
}