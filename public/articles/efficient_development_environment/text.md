---
folder: efficient_development_environment
title: Efficient Development Environment
readingTime: 4
description: I created an environment which allows me to interactively develop and test components of web applications without mocking. It serves as a replacement for Storybook with better integration for my other libraries for both frontend and backend.
i: 3
category: libs
gradient: linear-gradient(45deg, #fd684c 0%, #fa7000 25%, #f5a300 50%, #ebd300 75%, #d9ff1a 100%)
color: oklch(86.2% 0.133 88)
bg: oklch(14.32% 0.029 88)
colorCard: #f3cf76
bgCard: #271d05
colorEm: oklch(90.42% 0.137 119)
bgEm: oklch(28.93% 0.042 119)
---

UDemo is an environment I've created for the efficient development of web applications. It's designed to enable interactive development and testing of components without needing any form of mocking. Essentially, UDemo serves as a substitute for Storybook, but with improved integration for my frontend `U` and backend `UB` libraries.

<div class="grid" />

Here's a brief rundown of its features:

- Isolated Development: With UDemo, each component can be built and tested independently in a sandbox environment. This approach enables me to scrutinize hard-to-reach states and edge cases effectively.
- Deep Introspection: UDemo comes equipped with tools that aid in exploring the server state swiftly, hence making it quicker and easier to discover and rectify errors. These tools are also useful in managing production data.
- Visual Testing: UDemo allows me to create and test any desired state for both frontend and backend aspects of my application directly in the browser.
- Fake Data: UDemo provides flexible mechanisms to handle fake data, making it ideal for testing and development. This feature allows me to populate my stories with realistic data.

<div class="col" />

<video src="navigation.mp4" alt="Switching different stories" />

<div class="end" />

## Isolated Component Stories

In UDemo, a 'story' is a function that outlines the context in which a component is rendered.

For example, the story below shows the context for editing a cat's profile. The `CatProfileEditor` component needs an authenticated user, a database entry, and a file in an object storage to process the profile editing use case.

```tsx
export function Cats_Profile_Editing() {
  return (
    <Story
      user={{ id: 'catOwner' }}
      tables={{ cat: [{ id: 1, name: 'Furrball', breed: 'Persian' }] }}
      files={{ images: [{ id: 1, src: '/fakeImages/furrball.jpg' }] }}
    >
      <CatProfileEditor />
    </Story>
  )
}
```

Files containing story definitions end with `.stories.tsx`, and they are imported using Vite's glob import. UDemo requires a different entry point for the deployment and development versions of the application. Here, `app.html` is the entry point for the production version, while 'demo.html' is used as the development entry point for UDemo.

```txt
CatsApp/
├── src/
│   ├── CatProfileEditor.tsx
│   └── CatProfileEditor.stories.tsx
├── app.html (imports index.tsx)
└── demo.html (imports demo.tsx)
```

Each story can contain documentation, and UDemo can be published along with the production application. I use UDemo as a canary version of my application.

## Data Introspection

<div class="grid" />

Modern web applications often involve several microservices that interact with client-side caches. This makes debugging and error tracking more challenging. UDemo, however, integrates with the `UB` framework's fake implementations responsible for server-side data management. It provides a user interface for viewing and editing data across various microservices, thereby achieving the desired state. Tools for filtering and searching logs are also available, making it easier to handle complex use cases that involve changes in different parts of UI components and backend services.

UDemo's utility doesn't stop at the development stage. If an issue slips into the production environment, UDemo can easily switch to a production mode with a shortcut, allowing its tools to work seamlessly with real backend services and data. Other tools are included for service utilization measurement, data migration execution, and admin panel creation.

<div class="col" />

<video src="explorer.mp4" alt="Persisted data exploration" />

<div class="end" />

## Visual Testing

UDemo employs isolated stories and data introspection as the foundations for effective web application testing. While unit tests are valuable, they often lack the desired level of confidence and require changes to implementation to make testing possible. This can lead to more obscure business logic and can slow down refactorings.

On the other hand, end-to-end tests provide a high degree of confidence because they mimic the way users interact with the application. Tools like Cypress are excellent for writing these tests because they allow for a full inspection of the React components tree and the Document Object Model (DOM) if a test fails. The downside, however, is that they're time-consuming to write and execute, as they demand thorough setup and teardown of all data before every test run. Furthermore, they can occasionally be unstable.

That's where integration tests come in. They strike a good balance between confidence and cost. Cypress provides Component Testing, which facilitates visual integration tests. Paired with UDemo's ability to easily create any desirable state, this allows me to focus primarily on integration testing, eliminating the need for separate end-to-end and unit tests.

In conclusion, UDemo is a comprehensive environment that streamlines the process of developing, testing, and debugging web applications. It’s designed with the goal of improving the overall efficiency of the development process, making it easier to create high-quality web applications.

<video src="test.mp4" alt="Testing demonstration from Cypress" />

```u cards
to: lean_language_learning
title: Application
description: Read about how I used this library to build a product for efficient learning

to: crafting_unique_ui_experiences
title: Frontend
description: Learn how I built my performant and colorful component library

to: edge_baas
title: Backend
description: Read about my edge-first fullstack framework for cheap data storage
```
