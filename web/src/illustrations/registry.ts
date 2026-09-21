// Vector-illustration library, ported from ax-site (class/claude-code-basics/video/src/assets/illustration),
// where each component was generated with agy against templates/STYLE.md and then reviewed. Every module
// exports `canvas = { w, h }` and a component with the file's name; all on-screen text comes from props.
import type React from "react"

type Mod = { canvas: { w: number; h: number } } & Record<string, unknown>
const mods = import.meta.glob<Mod>("./lib/*.tsx", { eager: true })

export type Illo = { Component: React.FC<Record<string, unknown>>; canvas: { w: number; h: number } }

export const ILLUSTRATIONS: Record<string, Illo> = Object.fromEntries(
  Object.entries(mods).flatMap(([path, mod]) => {
    const name = path.split("/").pop()!.replace(/\.tsx$/, "")
    const Component = mod[name] as React.FC<Record<string, unknown>> | undefined
    return Component && mod.canvas ? [[name, { Component, canvas: mod.canvas }]] : []
  }),
)
