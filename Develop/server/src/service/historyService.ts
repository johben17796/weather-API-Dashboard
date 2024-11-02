// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
    constructor(name: string, id: string) {
      this.name = name;
      this.id = id; 
    }
}
// TODO: Complete the HistoryService class
class HistoryService {
  private searchHistory = './searchHistory.json';
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    const response = await fetch(this.searchHistory);
    const readData = await response.json;
    return readData;
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    const response = await fetch(this.searchHistory, {
      method: 'POST',
      body: JSON.stringify(cities),
  })
  return response;
}
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const response = 
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
      const response = await fetch(`${this.searchHistory}/${city.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(city),
      });
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {} DO THIS LATER PLEASE :(
}

export default new HistoryService();
