# Architecture Rules

## Project Overview

This project is a personal portfolio website that showcases:

- Personal profile
- Technical skills
- Projects and case studies
- Career insights for technology students
- Certifications and achievements
- Contact information

The website should reflect professional software engineering practices while demonstrating growth as a Computer Science student.

## Developer Profile Context

The project owner is a Bachelor of Science in Computer Science (BSCS) student.

### Current technologies and tools

**Programming languages**

- JavaScript
- TypeScript
- Python
- Java
- C++
- C#

**Database technologies**

- PostgreSQL
- Supabase

**Web technologies**

- HTML
- CSS
- JavaScript
- TypeScript

**Development tools**

- XAMPP
- Git
- GitHub
- Cursor

### Learning mindset

The project owner is continuously learning and is open to adopting new technologies, frameworks, tools, architectural patterns, and industry best practices when appropriate.

The codebase should remain maintainable, scalable, and easy to extend as new technologies are learned and incorporated.

## Architecture Principles

All code generated for this project must follow the following principles.

### 1. Separation of Concerns

Business logic must not be mixed with UI components.

**Bad:**

```tsx
function ProjectCard() {
  const projects = fetchProjects();
}
```

**Good:**

```tsx
function ProjectCard() {
  const projects = useProjects();
}
```

Business logic belongs in:

- `services/`
- `hooks/`
- `lib/`

UI belongs in:

- `components/`

### 2. Reusability

Avoid duplicate code.

If functionality appears more than once:

- Extract reusable components
- Extract utility functions
- Extract custom hooks

### 3. Scalability

Code should be organized so that new features can be added without major refactoring.

New features should be isolated whenever possible.

### 4. Readability

Code should prioritize readability over cleverness.

Requirements:

- Meaningful variable names
- Meaningful function names
- Clear folder structure
- Consistent formatting

### 5. Type Safety

Always use TypeScript types.

Avoid:

- `any`

Prefer:

```ts
interface Project {}
type Skill = {};
```

### 6. Single Responsibility Principle

Each file should have one primary responsibility.

Examples:

- `Button.tsx` → Button UI
- `project.service.ts` → Project data logic
- `useTheme.ts` → Theme logic

Avoid large files containing multiple unrelated responsibilities.

## Folder Structure

```
src/
├── app/
├── components/
│   ├── common/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── features/
│   ├── career-insights/
│   └── portfolio/
├── services/
├── hooks/
├── lib/
├── store/
├── data/
├── types/
├── constants/
└── styles/
```

## Feature Architecture

Features should own their own components, types, services, and logic whenever practical.

Example:

```
features/
├── career-insights/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   ├── types/
│   └── data/
└── portfolio/
    ├── components/
    ├── services/
    ├── hooks/
    ├── types/
    └── data/
```

This keeps each feature self-contained and easier to maintain.

## Career Insights Module

**Purpose:** Provide technology career guidance for students.

**Potential content:**

- Technology job market trends
- In-demand careers
- Emerging careers
- Skill requirements
- Learning roadmaps
- Industry insights
- Salary information
- Career recommendations

**Rules:**

- Data-driven where possible
- Easy to update
- Components must remain reusable
- Store content in static TypeScript or JSON files under `features/career-insights/data/`

## Portfolio Module

**Purpose:** Showcase the developer's work and growth.

**Contains:**

- Projects
- Skills
- Certifications
- Achievements
- Experiences
- Contact information

**Rules:**

- Projects should be data-driven
- Easy to add new projects
- Easy to update project details
- Support future filtering and search

## Component Rules

### Common Components

**Location:** `components/common/`

**Examples:** Button, Card, Modal, Input, Badge

**Rules:**

- Highly reusable
- No business logic
- Generic

### Layout Components

**Location:** `components/layout/`

**Examples:** Navbar, Footer, Sidebar

**Rules:**

- Responsible only for page layout

### Section Components

**Location:** `components/sections/`

**Examples:** Hero, About, Projects, Contact

**Rules:**

- Page-specific sections
- Can compose smaller components

## Service Layer Rules

**Location:** `features/<feature>/services/`

**Responsibilities:**

- Reading static data from TypeScript/JSON files
- Client-side validation and transformations
- Encapsulating feature logic (e.g. contact form submission via `mailto:`)

Never place data-fetching or business logic directly inside UI components.

**Bad:** `fetch(...)` or inline data arrays inside a component.

**Good:** `portfolioService.getProjects()`

## Hook Rules

**Location:** `hooks/`

**Responsibilities:**

- Shared logic
- State management helpers
- UI behavior

**Examples:** `useTheme()`, `useScrollSpy()`, `useProjects()`

## Type Rules

**Location:** `types/`

Every major entity should have a dedicated type.

**Examples:** Project, Skill, Certification, CareerInsight

## Styling Rules

Requirements:

- Consistent spacing
- Mobile-first approach
- Responsive design
- Accessibility considerations
- Maintain visual consistency

Avoid inline styling unless absolutely necessary.

## Accessibility Standards

Minimum requirements:

- Semantic HTML
- Keyboard navigation support
- Proper heading hierarchy
- Form labels
- Color contrast compliance
- Focus indicators

## Documentation Requirements

Every major feature should contain:

- Purpose
- Responsibilities
- Dependencies
- Future improvements

Complex functions should include documentation comments.

## Future Growth Guidelines

This portfolio is expected to evolve over time.

Future additions may include:

- Blog system (MDX or static data files)
- Analytics (client-side only, e.g. Plausible)
- AI-powered career recommendations (optional third-party API)
- Resume generator (client-side)

The architecture should support future expansion without requiring major restructuring. Prefer static data and client-side solutions over custom backends unless there is a clear need.

## Cursor Instructions

When generating code:

- Follow this architecture exactly.
- Maintain separation of concerns.
- Prefer reusable components.
- Use TypeScript whenever possible.
- Avoid code duplication.
- Keep files focused on a single responsibility.
- Generate scalable solutions rather than quick fixes.
- Follow clean code principles.
- Prioritize maintainability over complexity.
- Assume the project will continue growing over time.
- Explain architectural decisions when creating significant new features.
- Prefer industry-standard patterns over custom patterns unless justified.
- Write code as if it will be maintained by a professional development team.
