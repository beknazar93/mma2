export const filterClients = (clients, filters) => {
    let filtered = clients;
    const {
      searchTerm,
      selectedTrainer,
      selectedMonth,
      selectedDay,
      selectedSport,
      selectedYear,
    } = filters;
  
    if (searchTerm) {
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedTrainer) {
      filtered = filtered.filter((client) => client.trainer === selectedTrainer);
    }
    if (selectedSport) {
      filtered = filtered.filter((client) => client.sport_category === selectedSport);
    }
    if (selectedMonth) {
      filtered = filtered.filter((client) => client.month === selectedMonth);
    }
    if (selectedDay) {
      filtered = filtered.filter((client) => client.day === selectedDay);
    }
    if (selectedYear) {
      filtered = filtered.filter(
        (client) => String(client.year).trim() === String(selectedYear).trim()
      );
    }
    return filtered;
  };
  