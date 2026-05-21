# Equation Lab

[中文](./README.zh.md) | [日本語](./README.ja.md)

Equation Lab is a browser-based learning playground for upper-elementary students to build equation intuition by dragging, regrouping, balancing, and explaining terms.

Live demo:
[GitHub Pages](https://silencecat.github.io/equation-lab/)

Demo preview:
[![Equation Lab demo](./docs/assets/equation_lab_demo.gif)](./docs/assets/equation_lab_demo.mp4)

The preview shows four core interactions: dragging a term across the equals sign, building an equation from cards, applying a tool to both sides, and expanding a grouped expression.

## What It Is

Equation Lab now has four clearly separated areas:

- `Learning Map`: a game-like journey view that groups levels by learning goal
- `Equation Quest`: guided levels for balance, inverse operations, fractions, brackets, and story problems
- `Arithmetic Foundations`: a structured practice map for number sense, operation relationships, multiplicative structure, factors/multiples, quantities/units, and mixed challenges
- `Playground`: free experimentation with custom equations and multiple solution paths

The project is designed for children first, but it is also open to parents, teachers, and developers who want to improve the curriculum, wording, and interaction design.

## Core Features

- Drag terms to transform equations visually
- Show sign changes as a result of equivalent operations
- Apply `+`, `-`, `×`, and `÷` tools to both sides
- Support integers, simple fractions, grouped expressions, and story problems
- Use short "read before you move" gates to slow down blind symbol shuffling
- Provide a separate arithmetic practice area without turning the main quest into a generic worksheet site
- Let children first spot structures through choice-based stages, then use fixed-length 10-question sessions that bank local coins only after completion
- Offer multilingual UI and curriculum text in Chinese, Japanese, and English
- Run as a static website
- Export a single-file offline version for families who just want to double-click and use it

## For Parents

You can use Equation Lab in two simple ways:

- Open the online version through GitHub Pages
- Use the offline single-file version in [`dist/equation_lab_standalone.html`](./dist/equation_lab_standalone.html)

What children can do:

- Follow the learning map step by step
- Practice arithmetic foundations through skill domains, modules, and short 10-question sessions
- Try their own equations in Playground mode
- Compare different solution paths instead of memorizing one trick

## For Developers

The app is a static HTML/CSS/JS project with a small build step that produces a self-contained single HTML file.

Main folders:

- [`src/`](./src/) source code
- [`dist/`](./dist/) built static files
- [`tests/`](./tests/) unit and browser regression tests
- [`docs/`](./docs/) internal notes and curriculum drafts

## Local Development

```bash
npm install
npm test
npm run test:e2e
npm run build
```

Useful outputs:

- [`dist/index.html`](./dist/index.html): GitHub Pages deployment target
- [`dist/equation_lab.html`](./dist/equation_lab.html): built single file
- [`dist/equation_lab_standalone.html`](./dist/equation_lab_standalone.html): offline single-file package for direct use

## Contributing

We especially welcome help with:

- curriculum clarity
- story problem writing
- calculation practice ideas that still connect to mathematical structure
- child-friendly wording
- multilingual polishing
- interaction testing on real devices

If you are a parent and do not want to edit code, you can still help by opening an issue or discussion with:

- a confusing level
- a story problem idea
- a wording improvement
- a bug report with screenshot

## Project Goal

This project is not just a worksheet site. The goal is to help children understand that equations stay true when both sides change together, and that calculation shortcuts come from structure rather than magic tricks.
