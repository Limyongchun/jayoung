"use client";

import { useEffect } from "react";

const STALE_KEYS = ["jayoung-projects"];

export default function StorageCleaner() {
  useEffect(() => {
    STALE_KEYS.forEach((key) => {
      try { localStorage.removeItem(key); } catch {}
    });
  }, []);
  return null;
}
