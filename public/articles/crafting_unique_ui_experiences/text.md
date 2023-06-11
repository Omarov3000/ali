---
folder: crafting_unique_ui_experiences
title: Crafting Unique UI Experiences
readingTime: 4
description: To build user interfaces in an efficient and consistent way I created a design system and a components library. During its development I focused on innovating and creating unique solutions to the needs of my application to make it stand out and convey its unique identity.
i: 2
gradient: linear-gradient(45deg, #f2df0d 0%, #b0eb00 25%, #18f20d 50%, #00f58f 75%, #0df2cc 100%)
color: #9dfd96
bg: #010e00
colorCard: #a4d0ff
bgCard: #001831
colorEm: #67fddb
bgEm: #10322a
---

Building consistent and efficient user interfaces (UIs) can be a daunting task, especially for an application as diverse as `Unni`. To address this, I've developed a design system and a components library named `U`. The `U` system is unique and innovative, aimed at giving `Unni` a distinct identity. The design system is equipped with features like an adaptive color palette, harmonious motion, fluid responsive design, and maximized performance.

### Features of the `U` System:

- Adaptive Color Palette: This feature generates unique color schemes based on user content, providing a personalized experience.
- Harmonious Motion: This integrates animated feedback for users, which is not only performant but visually appealing.
- Fluid Responsive Design: I've implemented design patterns such as fluid typography and spacing, simplifying the development of responsive interfaces.
- Maximized Performance: By steering clear of CSS-in-JS, the system ensures top-notch runtime performance and a reduced bundle size.

## Diving into the Color Palette

The `Unni` application allows users to write rich content including essays, interactive tests, and tasks. I wanted the users to feel like co-creators, hence I developed a feature that lets them decorate their essays with images. I then use these images to generate a unique color palette, enhancing their content.

Here's a step-by-step guide on how the color palette algorithm works:

1. Firstly, I quantize the image, reducing its colors to a smaller, manageable set.
2. Then, I score these colors based on their vibrancy and how much of the image they cover. I can also filter out any colors that are nearly monochrome at this step.
3. The color with the highest score becomes the source color, defining the overall color scheme.
4. I then generate the remaining colors in the palette in compliance with the WCAG standard to ensure optimal contrast.
5. Lastly, auxiliary colors are adjusted to be visually appealing. For example, if the source color is cool, error and success colors are shifted to cooler hues.

3D illustrations can engage users and add appeal to the application. But recoloring them can be a challenge. To do this, I follow these steps:

1. Create a luminance map to assess the brightness of each pixel in the illustration.
2. Apply a mask of the desired color to this map.
3. Merge the colors from the luminance map and the mask.

Since different illustrations may require different approaches, I built a tool that lets me upload an illustration and select the best method for it.

## Implementing Motion

Since interface elements' colors are content-dependent, providing feedback through color change is not always an option. So, I use resizing: interactive components get bigger when users hover over them and smaller when clicked. However, animating this could cause performance issues or visual flaws.

To solve this, I turned to variable fonts. These fonts contain multiple variations in a single file and allow manipulation of various elements such as weight, width, style, and optical size. Variable fonts can be easily animated, making them perfect for this purpose.

For complex scenarios, I use view transitions—animations for when elements appear, reorder, or disappear. These transitions help reduce cognitive load and perceived latency. The challenge, however, lies in the performance trade-off for animating layout properties.

FLIP (First, Last, Inverse, Play) helps solve this. It's a technique that animates layout changes using transform—a "fast" CSS property. FLIP measures the state before and after a property changes (First and Last), rolls back the state (Inverse), and then animates the change (Play).

## Achieving Responsiveness

Responsiveness is key in modern web development. To ease the development of responsive layouts, I employ fluid sizing for typography and spacing. This allows font sizes to adjust dynamically based on the viewport size, ensuring that your content is readable across different devices.

To further simplify this process, I've created opinionated wrappers around Flexbox and Grid. These wrappers can implement responsive patterns such as resizable cards grids that adjust both card widths and column counts, thereby reducing the amount of boilerplate code that needs to be written.

## Prioritizing Performance

Although CSS-in-JS can offer certain benefits, it adds runtime overhead. Each time components render, a CSS-in-JS library has to translate their styles into plain CSS to insert into the document. This forces the browser to do additional work, affecting performance.

To avoid this, I prefer using utility CSS classes for styling components. This approach accelerates development by simplifying code structure and reducing complexity. Inspired by Tailwind, I've developed a fully-typed customization system for my components. This system also includes property shorthands and bundles that help to write more concise and more readable CSS.

```u cards
to: lean_language_learning
title: Application
description: Read about how I used this library to build a product for efficient learning

to: edge_baas
title: Backend
description: Read about my edge-first fullstack framework for cheap data storage

to: efficient_development_environment
title: Development
description: Learn how I organized my development to get feedback blazing fast
```
