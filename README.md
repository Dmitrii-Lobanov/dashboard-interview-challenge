# 🧪 Take-Home Assignment: Analytics Dashboard

## 🧾 Overview

Build a **simple analytics dashboard** that displays and manages a list of users.

You should focus on:

* Clean architecture
* Good UX
* Maintainable code

---

# 🎯 Requirements

## 1. Data fetching

Use this API:

👉 [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

### You must:

* Fetch data on load
* Handle:

  * Loading state
  * Error state

---

## 2. Users Table (CORE FEATURE)

Display users in a table with:

### Columns:

* Name
* Email
* Company

---

## 3. Table features

### ✅ Sorting

* Click column header to sort (asc/desc)

---

### ✅ Filtering (search)

* Input field
* Filter by:

  * Name
  * Email

👉 MUST include:

* Debounce (300–500ms)

---

### ✅ Pagination

* Show 5–10 users per page
* Navigation (next/prev)

---

## 4. UI / UX

Must include:

* Loading indicator
* Empty state (no results)
* Error message

---

## 5. Code quality

We will evaluate:

* Component structure
* Reusability
* Readability
* TypeScript usage

---

# ⚙️ Technical constraints

## Use:

* React
* TypeScript

## Optional:

* Next.js
* State management (Zustand, Redux, or hooks)

---

# 🚀 Bonus (choose 1–2 max)

* URL query params for filters
* Memoization (`useMemo`, `useCallback`)
* Basic unit test
* Virtualized list

---

# ⏱ Time expectation

👉 3–4 hours max

We value:

* Simplicity
* Clarity

NOT:

* Overengineering

---

# 📦 Deliverables

1. GitHub repo (use GitHub)
2. Live demo (use Vercel)
3. README including:

   * Setup instructions
   * Tech choices
   * Trade-offs

---

# 🧠 What we’ll ask in follow-up interview

Be ready for:

* Why this state management?
* How would you scale this to 100k users?
* How would you optimize performance?
* What would you improve with more time?

---

# 🔥 Pro tips (this is what gets offers)

## 1. Don’t just “make it work”

Structure it like:

* `/components`
* `/hooks`
* `/services`
* `/types`

---

## 2. Keep logic clean

Avoid:

* Massive components
* Inline logic everywhere

---

## 3. Think like a product engineer

Add:

* Clear empty state
* Smooth UX

---

# 🧠 What passing vs failing looks like

## ❌ Fail

* Works but messy
* No structure
* No debounce
* No UX polish

---

## ✅ Pass

* Clean code
* Good structure
* Works correctly

---

## 🔥 Strong hire

* Clean + thoughtful
* Explains decisions
* Shows scalability thinking
