import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { enUS, fr } from "date-fns/locale";
import { Calendar1 } from "lucide-react";
import "react-day-picker/dist/style.css";
import "./index.css";

export default function DatePicker({
  value,
  onChange,
  className,
  popupClassName,
  showTodayButton,
  label,
  locale,
  captionLayout = "label",
  error,
  helperText,
}) {
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(value ?? new Date());

  // Adjusts the locale used for displaying the date in the calendar and in the trigger
  const calendarLocale =
    locale === "fr" ? fr : locale === "en" ? enUS : undefined;
  const dateFormatLocale =
    locale === "fr" ? "fr-FR" : locale === "en" ? "en-US" : undefined;

  // Called when the user selects a date in the calendar.
  // - Updates the value
  // - Closes the popup
  const handleChange = (date) => {
    if (!date) return;
    onChange(date);
    setOpen(false);
  };

  // Allows to directly select today's date via the "Today / Aujourd'hui" button.
  const handleTodayClick = () => {
    handleChange(new Date());
  };

  return (
    <div
      className={`dp ${className ?? ""}`}
      // Close the popup when clicking outside the component
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      tabIndex={-1}
    >
      <div
        className={`dp-trigger ${error ? "dp-trigger--error" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* Displays the label above when a date is selected */}
        <span
          className={`dp-label ${value ? "dp-label-displayed" : ""} ${error ? "dp-label--error" : ""}`}
        >
          {label}
        </span>

        {/* Selected date or placeholder if no date is selected */}
        <span
          className={`${value ? "dp-value" : "dp-placeholder"} ${error ? "dp-placeholder--error" : ""}`}
        >
          {value
            ? value.toLocaleDateString(dateFormatLocale, {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              })
            : label}
        </span>
        <Calendar1 size={22} color={error ? "#d32f2f" : "#71756A"} />
      </div>

      {/* Error message */}
      {error && helperText && (
        <span className="dp-error-text">{helperText}</span>
      )}

      {open && (
        <>
          {/* Backdrop to close the popup when clicking outside */}
          <div className="dp-backdrop" onClick={() => setOpen(false)} />

          <div className={`dp-popup ${popupClassName ?? ""}`}>
            {/* Calendar */}
            <DayPicker
              mode="single"
              showOutsideDays
              month={month}
              onMonthChange={setMonth}
              selected={value}
              onSelect={handleChange}
              locale={calendarLocale}
              captionLayout={captionLayout}
            />

            {/* Optional button to select today's date */}
            {showTodayButton && (
              <button onClick={handleTodayClick} className="dp-popup-today-btn">
                {locale === "fr" ? "Aujourd'hui" : "Today"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
