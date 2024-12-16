const Filters = ({ filters, setFilters, clients }) => {
  const uniqueValues = (key) => {
    return [...new Set(clients.map((client) => client[key]))].filter(
      (value) => value
    );
  };

  const daysInMonth = Array.from({ length: 31 }, (_, index) =>
    (index + 1).toString()
  );

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Поиск клиентов..."
        value={filters.searchTerm}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
        }
      />

      <select
        value={filters.selectedTrainer}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, selectedTrainer: e.target.value }))
        }
      >
        <option value="">Все тренеры</option>
        {uniqueValues("trainer").map((trainer, index) => (
          <option key={index} value={trainer}>
            {trainer}
          </option>
        ))}
      </select>

      <select
        value={filters.selectedSport}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, selectedSport: e.target.value }))
        }
      >
        <option value="">Все виды спорта</option>
        {uniqueValues("sport_category").map((sport, index) => (
          <option key={index} value={sport}>
            {sport}
          </option>
        ))}
      </select>

      <select
        value={filters.selectedYear}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, selectedYear: e.target.value }))
        }
      >
        <option value="">Все годы</option>
        {uniqueValues("year").map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>

      <select
        value={filters.selectedMonth}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, selectedMonth: e.target.value }))
        }
      >
        <option value="">Все месяцы</option>
        {uniqueValues("month").map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>

      <select
        value={filters.selectedDay}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, selectedDay: e.target.value }))
        }
      >
        <option value="">Все дни</option>
        {daysInMonth.map((day, index) => (
          <option key={index} value={day}>
            {day}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
