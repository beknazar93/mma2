import React from "react";

const Filters = ({
  searchTerm,
  setSearchTerm,
  selectedTrainer,
  setSelectedTrainer,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedDay,
  setSelectedDay,
  selectedSport,
  setSelectedSport,
  clients,
}) => {
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
        gap: "10px", // Расстояние между элементами
        flexWrap: "wrap", // Перенос строк, если элементы не помещаются
        marginBottom: "20px",
      }}
    >
      {/* Поле поиска */}
      <input
        type="text"
        placeholder="Поиск клиентов..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          flex: "1", // Умное растяжение
          minWidth: "150px", // Минимальная ширина
        }}
      />

      {/* Фильтр по тренеру */}
      <select
        value={selectedTrainer}
        onChange={(e) => setSelectedTrainer(e.target.value)}
        style={{
          padding: "10px",
          flex: "1",
          minWidth: "150px",
        }}
      >
        <option value="">Все тренеры</option>
        {uniqueValues("trainer").map((trainer, index) => (
          <option key={index} value={trainer}>
            {trainer}
          </option>
        ))}
      </select>

      {/* Фильтр по виду спорта */}
      <select
        value={selectedSport}
        onChange={(e) => setSelectedSport(e.target.value)}
        style={{
          padding: "10px",
          flex: "1",
          minWidth: "150px",
        }}
      >
        <option value="">Все виды спорта</option>
        {uniqueValues("sport_category").map((sport, index) => (
          <option key={index} value={sport}>
            {sport}
          </option>
        ))}
      </select>

      {/* Фильтр по году */}
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)} // Использование setSelectedYear
        style={{
          padding: "10px",
          flex: "1",
          minWidth: "150px",
        }}
      >
        <option value="">Все годы</option>
        {uniqueValues("year").map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Фильтр по месяцу */}
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        style={{
          padding: "10px",
          flex: "1",
          minWidth: "150px",
        }}
      >
        <option value="">Все месяцы</option>
        {uniqueValues("month").map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>

      {/* Фильтр по дню */}
      <select
        value={selectedDay}
        onChange={(e) => setSelectedDay(e.target.value)}
        style={{
          padding: "10px",
          flex: "1",
          minWidth: "150px",
        }}
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
