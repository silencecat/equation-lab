# Equation Lab

[中文](./README.zh.md) | [日本語](./README.ja.md)

Equation Lab is a browser-based learning playground for upper-elementary students to build intuition for equations by dragging, regrouping, and balancing terms.

Live demo:
[GitHub Pages](https://silencecat.github.io/equation-lab/)

Demo preview:
[![Equation Lab demo](./docs/assets/equation_lab_demo.gif)](./docs/assets/equation_lab_demo.mp4)

The preview shows four core interactions: dragging a term across the equals sign, building an equation from cards, applying a tool to both sides, and expanding a grouped expression.

## What It Is

Equation Lab has two parallel learning modes:

- `Quest Track`: guided levels that introduce one algebra idea at a time
- `Playground`: free experimentation with custom equations, random problems, and multiple solution paths

The project is designed for children first, but it is also open to parents, teachers, and developers who want to improve the curriculum, wording, and interaction design.

## Core Features

- Drag terms to transform equations visually
- Show sign changes as a result of equivalent operations
- Apply `+`, `-`, `×`, and `÷` tools to both sides
- Support integers, simple fractions, grouped expressions, and story problems
- Offer multilingual UI and curriculum text in Chinese, Japanese, and English
- Run as a static website
- Export a single-file offline version for families who just want to double-click and use it

## For Parents

You can use Equation Lab in two simple ways:

- Open the online version through GitHub Pages
- Use the offline single-file version in [`dist/equation_lab_standalone.html`](./dist/equation_lab_standalone.html)

What children can do:

- Learn through guided levels
- Try their own equations in Playground mode
- Explore different solution paths instead of memorizing one trick

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
- child-friendly wording
- multilingual polishing
- interaction testing on real devices

If you are a parent and do not want to edit code, you can still help by opening an issue or discussion with:

- a confusing level
- a story problem idea
- a wording improvement
- a bug report with screenshot

## Project Goal

This project is not just a worksheet site. The goal is to help children understand that equations stay true when both sides change together.
