/*
Используя два информационных ресурса (API) - https://jsonplaceholder.typicode.com/users и https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true
1. Получить список пользователей (users) с ресурса https://jsonplaceholder.typicode.com/users
2. Для каждого пользователя получить его географические координаты (latitude и longitude)  
3. Используя эти координаты, получить текущую погоду для каждого пользователя с ресурса https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true
4. Определить пользователя с самой высокой температурой и вывести его имя, телефон  
 и температуру в консоль.
 
 Решите задачу с использованием
 5.fetch  
 6.axios (для одного из запросов).
 
*/

import axios from 'axios';

async function returnUser(id) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
  return response.data; 
}

async function returnWeather(latitude, longitude) {    
  const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
  return response.data; 
}

const persons = [];

for (let i = 1; i <= 10; i++) {
  const userData = await returnUser(i);
  
  
  const lat = userData.address.geo.lat;
  const lng = userData.address.geo.lng;

  const weatherData = await returnWeather(lat, lng);

  
  let myObj = {
    id: userData.id,
    name: userData.name,
    phone: userData.phone,
    latitude: lat,
    longitude: lng,
    temperature: weatherData.current_weather.temperature,
    windspeed: weatherData.current_weather.windspeed,
    winddirection: weatherData.current_weather.winddirection,
  };

  persons.push(myObj);
}

console.log(persons);

const hottestTemperature = persons.reduce((max, user) => {
  return user.temperature > max.temperature ? user : max;
}, persons[0]);

console.log('Пользователь с самой высокой температурой:', hottestTemperature);
