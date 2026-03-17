# DatePicker

A customizable React date picker component.

<img src="./screenshots/preview.png" alt="DatePicker preview" width="400" />

---

## Installation

```bash
npm install componentName
```

or

```bash
pnpm install componentName
```

---

## Basic usage

```jsx
import { useState } from "react";
import DatePicker from "componentName";

export default function App() {
  const [date, setDate] = useState();

  return (
    <DatePicker value={date} onChange={setDate} label="Date de naissance" />
  );
}
```

---

## Props

| Prop              | Type                                                      | Default     | Description                                  |
| ----------------- | --------------------------------------------------------- | ----------- | -------------------------------------------- |
| `value`           | `Date`                                                    | `undefined` | Selected date                                |
| `onChange`        | `(date: Date) => void`                                    | —           | Callback called on selection                 |
| `label`           | `string`                                                  | —           | Field label                                  |
| `locale`          | `"fr"` \| `"en"`                                          | `undefined` | Language of the calendar and date format     |
| `captionLayout`   | `"dropdown"` \| `"dropdown-years"` \| `"dropdown-months"` | `"label"`   | Month/year selector style                    |
| `showTodayButton` | `boolean`                                                 | `false`     | Displays a button to select the current date |
| `className`       | `string`                                                  | —           | CSS class to change the style of the input   |
| `popupClassName`  | `string`                                                  | —           | CSS class to modify the calendar popup       |
| `error`           | `boolean`                                                 | `false`     | Displays the field in error state            |
| `helperText`      | `string`                                                  | —           | Error message displayed below the field      |

---

## Controlled component

The `DatePicker` is a **controlled component**: it does not manage its own internal state. The `value` and `onChange` props are required to make it work correctly.

> ⚠️ Do not declare a local `useState` inside the `DatePicker` — always manage the value from the parent component.

```jsx
// ✅ Correct — state is managed by the parent
const [date, setDate] = useState(null);

<DatePicker value={date} onChange={setDate} label="Date of birth" />;
```

```jsx
// ❌ Incorrect — do not manage the value inside the component itself
export default function DatePicker({ label }) {
  const [value, setValue] = useState(null); // ← wrong
  ...
}
```

---

## Examples

### With the “Today” button and the French locale

```jsx
<DatePicker
  value={date}
  onChange={setDate}
  label="Date of birth"
  locale="fr"
  showTodayButton
/>
```

<img src="./screenshots/exToday.png" alt="Example today button + French locale" width="400" />

### With a dropdown month/year selector

```jsx
<DatePicker
  value={date}
  onChange={setDate}
  label="Date of birth"
  captionLayout="dropdown"
/>
```

<img src="./screenshots/exDropdown.png" alt="Example with dropdown" width="400" />

---

## Style customization

The component exposes two props for customizing styles: `className` on the label and `popupClassName` on the calendar popup.

### Example

```jsx
<DatePicker
  value={date}
  onChange={setDate}
  label="Date"
  className="my-datepicker"
  popupClassName="my-datepicker-popup"
  captionLayout="dropdown"
  showTodayButton
/>
```

```css
/* INPUT STYLE */
/* Input style */
.my-datepicker .dp-trigger {
  border-radius: 50px;
  border-color: blue;
  background-color: bisque;
}

/* Label style when a date is selected */
.my-datepicker .dp-label.dp-label-displayed {
  color: blue;
  border: 1px solid blue;
  background-color: bisque;
  border-radius: 50px;
}

/* Style of the value in the input */
.my-datepicker .dp-value {
  color: blue;
}

/* Placeholder style in the input */
.my-datepicker .dp-placeholder {
  color: blue;
}

/* Backdrop (only visible on mobile devices) */
.my-datepicker .dp-backdrop {
  background-color: black;
}

/* POPUP STYLE */
/* Calendar container style */
.my-datepicker-popup {
  background-color: bisque;
  border-color: blue;
  border-radius: 25px;
}

/* Style of the “Today” button */
.my-datepicker-popup .dp-popup-today-btn {
  background-color: white;
  border: 1px solid blue;
  border-radius: 50px;
}
```

### Available classes

#### With `className`

| Class                                         | Description                               |
| --------------------------------------------- | ----------------------------------------- |
| `.my-datepicker .dp-trigger`                  | Input style                               |
| `.my-datepicker .dp-placeholder`              | Placeholder style in the input            |
| `.my-datepicker .dp-value`                    | Style of the value in the input           |
| `.my-datepicker .dp-label.dp-label-displayed` | Label style when a date is selected       |
| `.my-datepicker .dp-backdrop`                 | Backdrop (only visible on mobile devices) |

#### With `popupClassName`

| Class                                      | Description                 |
| ------------------------------------------ | --------------------------- |
| `.my-datepicker-popup`                     | Calendar container style    |
| `.my-datepicker-popup .dp-popup-today-btn` | Style of the “Today” button |

#### Calendar styles (`react-day-picker`)

The `rdp-*` classes come from `react-day-picker`. You can override them via `popupClassName`:

```css
.my-datepicker-popup {
  /* Selected date */
  & .rdp-root {
    --rdp-selected-border: 1px solid blue;
  }

  /* Chevrons */
  & .rdp-chevron {
    fill: blue;
  }

  /* Today's date */
  & .rdp-today .rdp-day_button {
    color: blue;
  }
}
```

<img src="./screenshots/style.png" alt="Example with dropdown" width="400" />

> For the complete list of `rdp-*` classes, see the [react-day-picker documentation](https://daypicker.dev).

---

## Screenshots

| Close                              | Open                            | Mobile                              |
| ---------------------------------- | ------------------------------- | ----------------------------------- |
| ![Close](./screenshots/closed.png) | ![Open](./screenshots/open.png) | ![Mobile](./screenshots/mobile.png) |

---

## Dependencies

- [react-day-picker](https://daypicker.dev) — Calendar
- [date-fns](https://date-fns.org) — Locale management
- [lucide-react](https://lucide.dev) — Calendar icon
- [dayjs](https://day.js.org) — Recommended for timezone-safe date formatting
