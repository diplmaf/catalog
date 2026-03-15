# 🚗 Каталог автомобилей дилерского центра, Николаева ИС-323 

- type Car = {
    id: number;
    brand: string;
    model: string;
    year: number;
    used: boolean;
    price: number;
};

объявление типа для автомобиля с полями: ID, производитель, модель, год выпуска, состояние, цена

- let cars: Car[] = [];

создание массива для хранения автомобилей с указанным типом Car

- let nextId: number = 1;

переменная для генерации уникальных идентификаторов автомобилей

- function addCar(brand: string, model: string, year: number, used: boolean, price: number): void {

функция для добавления нового автомобиля в каталог

- const newCar: Car = {
    id: nextId,
    brand: brand,
    model: model,
    year: year,
    used: used,
    price: price
};

создание объекта автомобиля с переданными параметрами

- cars.push(newCar);

добавление созданного автомобиля в массив

- nextId++;

увеличение счетчика ID для следующего автомобиля

- function showAllCars(): void {

функция для отображения всех автомобилей в каталоге

- if (cars.length === 0) {
    console.log("Каталог пуст");
}

проверка на пустой каталог и вывод сообщения

- for (let i = 0; i < cars.length; i++) {
    const car = cars[i];
    const status = car.used ? "Б/у" : "Новая";
    console.log(`ID: ${car.id} | ${car.brand} | ${car.model} | ${car.year} г. | ${status}`);
}

цикл для перебора и вывода информации о каждом автомобиле

- function findCar(id: number): Car | null {

функция для поиска автомобиля по ID

- if (cars[i].id === id) {
    console.log(`Найдена: ${cars[i].brand} ${cars[i].model}`);
    return cars[i];
}

проверка совпадения ID и возврат найденного автомобиля

- function updateCar(id: number, newPrice: number): boolean {

функция для обновления цены автомобиля по ID

- cars[i].price = newPrice;
    console.log(`Обновлена цена у ID ${id}: ${newPrice} руб.`);
    return true;

изменение цены и подтверждение успешного обновления

- function deleteCar(id: number): boolean {

функция для удаления автомобиля по ID

- cars = cars.filter(car => car.id !== id);

фильтрация массива для удаления автомобиля с указанным ID

- console.log(`Удалена машина ID ${id}`);

подтверждение удаления автомобиля

- addCar("Toyota", "Camry", 2022, false, 2500000);
addCar("BMW", "X5", 2020, true, 3500000);
addCar("Lada", "Vesta", 2023, false, 1200000);

добавление тестовых автомобилей в каталог

- showAllCars();

вывод всех автомобилей для проверки

- findCar(2);

поиск автомобиля с ID 2

- updateCar(1, 2400000);

обновление цены автомобиля с ID 1

- deleteCar(3);

удаление автомобиля с ID 3


# Спасибо за внимание
