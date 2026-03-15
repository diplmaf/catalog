type Vehicle = {
    id: number;
    make: string;
    model: string;
    year: number;
    isUsed: boolean;
    price: number;
};

let vehicleCatalog: Vehicle[] = [];

let currentId: number = 101;

function createVehicle(make: string, model: string, year: number, isUsed: boolean, price: number): void {
    const newVehicle: Vehicle = {
        id: currentId,
        make: make,
        model: model,
        year: year,
        isUsed: isUsed,
        price: price
    };
    
    vehicleCatalog.push(newVehicle);
    console.log(`Добавлен автомобиль: ${make} ${model} (ID: ${currentId})`);
    currentId++;
}

function showAllVehicles(): void {
    console.log("\n=== ВЕСЬ КАТАЛОГ АВТОМОБИЛЕЙ ===");
    
    if (vehicleCatalog.length === 0) {
        console.log("Каталог пуст");
        return;
    }
    
    vehicleCatalog.forEach(vehicle => {
        const condition = vehicle.isUsed ? "Б/У" : "Новая";
        console.log(`ID: ${vehicle.id} | ${vehicle.make} ${vehicle.model} | ${vehicle.year} г. | ${condition} | ${vehicle.price} руб.`);
    });
}

function findVehicleById(searchId: number): Vehicle | null {
    console.log(`\nПоиск автомобиля с ID: ${searchId}`);
    
    const foundVehicle = vehicleCatalog.find(vehicle => vehicle.id === searchId);
    
    if (foundVehicle) {
        console.log(`Найдена: ${foundVehicle.make} ${foundVehicle.model}`);
        return foundVehicle;
    } else {
        console.log(`Машина с ID ${searchId} не найдена`);
        return null;
    }
}

function updateVehiclePrice(vehicleId: number, newPrice: number): boolean {
    console.log(`\nОбновление цены для ID: ${vehicleId}`);
    
    const index = vehicleCatalog.findIndex(vehicle => vehicle.id === vehicleId);
    
    if (index !== -1) {
        vehicleCatalog[index].price = newPrice;
        console.log(`Обновлена цена у ID ${vehicleId}: ${newPrice} руб.`);
        return true;
    } else {
        console.log(`Машина с ID ${vehicleId} не найдена`);
        return false;
    }
}

function deleteVehicle(vehicleId: number): boolean {
    console.log(`\nУдаление автомобиля с ID: ${vehicleId}`);
    
    const initialLength = vehicleCatalog.length;
    
    vehicleCatalog = vehicleCatalog.filter(vehicle => vehicle.id !== vehicleId);
    
    if (vehicleCatalog.length < initialLength) {
        console.log(`Удалена машина ID ${vehicleId}`);
        return true;
    } else {
        console.log(`Машина с ID ${vehicleId} не найдена`);
        return false;
    }
}

console.log("ПРОГРАММА УПРАВЛЕНИЯ КАТАЛОГОМ МАШИН");
console.log("CRUD операции для каталога машин\n");

createVehicle("Toyota", "Camry", 2022, false, 2500000);
createVehicle("BMW", "X5", 2020, true, 3500000);
createVehicle("Lada", "Vesta", 2023, false, 1200000);

showAllVehicles();

console.log("\n--- Поиск ---");
findVehicleById(102);

console.log("\n--- Изменение ---");
updateVehiclePrice(101, 2400000);

console.log("\n--- Удаление ---");
deleteVehicle(103);

console.log("\n--- РЕЗУЛЬТАТ ---");
showAllVehicles();

console.log("\nПРОГРАММА ЗАВЕРШЕНА");
