import { useState } from "react";
import { CalendarIcon } from "../svg";
import "./datePicker.css";

enum Period {
  ThreeDays = "3 дня",
  Week = "Неделя",
  Month = "Месяц",
  Year = "Год",
}

interface DatePickerProps {
  onDateChange: (startDate: string, endDate: string) => void;
}

const DatePicker = ({ onDateChange }: DatePickerProps) => {
  const [date, setDate] = useState("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");

  const handlePeriodSelect = (period: Period) => {
    const today = new Date();
    const end = new Date(today);

    let start: Date;
    switch (period) {
      case Period.ThreeDays:
        start = new Date(today.setDate(today.getDate() - 3));
        break;
      case Period.Week:
        start = new Date(today.setDate(today.getDate() - 7));
        break;
      case Period.Month:
        start = new Date(today.setMonth(today.getMonth() - 1));
        break;
      case Period.Year:
        start = new Date(today.setFullYear(today.getFullYear() - 1));
        break;
      default:
        start = end;
    }

    onDateChange(
      start.toISOString().split("T")[0],
      end.toISOString().split("T")[0]
    );
    setMenuOpen(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDate(e.target.value);
  };

  const handleCustomDateSubmit = () => {
    if (customStartDate && customEndDate) {
      onDateChange(customStartDate, customEndDate);
      setCustomStartDate("");
      setCustomEndDate("");
      setMenuOpen(false);
    }
  };

  return (
    <div className="date-picker">
      <div onClick={() => setMenuOpen(!menuOpen)} className="calendar">
        <CalendarIcon /> 3 дня
      </div>
      {menuOpen && (
        <ul className="date-menu">
          <li onClick={() => handlePeriodSelect(Period.ThreeDays)}>3 дня</li>
          <li onClick={() => handlePeriodSelect(Period.Week)}>Неделя</li>
          <li onClick={() => handlePeriodSelect(Period.Month)}>Месяц</li>
          <li onClick={() => handlePeriodSelect(Period.Year)}>Год</li>
          <div className="date-text">Указать дату</div>

          <div className="date-input-wrapper">
            <div className="date-input">
              <input
                type="date"
                id="start-date"
                className="custom-date"
                value={customStartDate}
                onChange={handleDateChange}
                required
                style={{ display: "none" }}
              />
              <label
                htmlFor="date"
                className={`date-label ${date ? "active" : ""}`}
              >
                {customStartDate
                  ? customStartDate
                      .split("-")
                      .reverse()
                      .join(".")
                      .replace(/\d/g, "_")
                  : "___.___._____"}
              </label>
              <p className="date-dash"> - </p>
              <input
                type="date"
                id="end-date"
                className="custom-date"
                value={customEndDate}
                onChange={handleDateChange}
                required
                style={{ display: "none" }}
              />
              <label htmlFor="end-date" className="date-label">
                {customEndDate
                  ? customEndDate
                      .split("-")
                      .reverse()
                      .join(".")
                      .replace(/\d/g, "_")
                  : "___.___._____"}
              </label>
            </div>
            <div className="calendar-button">
              <button onClick={handleCustomDateSubmit}>
                <CalendarIcon />
              </button>
            </div>
          </div>
        </ul>
      )}
    </div>
  );
};

export default DatePicker;
