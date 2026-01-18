const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let cars = [];
let nextId = 1;

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function addCar() {
  console.log('\n--- Добавить новую машину ---');
  const manufacturer = await askQuestion('Производитель: ');
  const model = await askQuestion('Модель: ');
  const year = parseInt(await askQuestion('Год выпуска: '));
  const condition = await askQuestion('Состояние (новая / Б/У): ');
  const price = parseFloat(await askQuestion('Цена (руб.): '));

  const car = {
    id: nextId++,
    manufacturer,
    model,
    year,
    condition,
    price
  };

  cars.push(car);
  console.log('✅ Машина добавлена:', car);
}


function listCars() {
  console.log('\n=== Каталог машин ===');
  if (cars.length === 0) {
    console.log('Каталог пуст.');
    return;
  }
  cars.forEach(car => {
    console.log(
      `ID: ${car.id}, Производитель: ${car.manufacturer}, Модель: ${car.model}, ` +
      `Год: ${car.year}, Состояние: ${car.condition}, Цена: ${car.price} руб.`
    );
  });
}

function findCarById(id) {
  return cars.find(car => car.id === id);
}

async function updateCar() {
  console.log('\n--- Редактировать машину ---');
  const id = parseInt(await askQuestion('Введите ID машины для редактирования: '));
  const car = findCarById(id);

  if (!car) {
    console.log('❌ Машина с таким ID не найдена.');
    return;
  }

  console.log('Текущие данные:', car);
  car.manufacturer = await askQuestion(`Новый производитель (${car.manufacturer}): `) || car.manufacturer;
  car.model = await askQuestion(`Новая модель (${car.model}): `) || car.model;
  const yearInput = await askQuestion(`Новый год (${car.year}): `);
  car.year = yearInput ? parseInt(yearInput) : car.year;
  car.condition = await askQuestion(`Новое состояние (${car.condition}): `) || car.condition;
  const priceInput = await askQuestion(`Новая цена (${car.price}): `);
  car.price = priceInput ? parseFloat(priceInput) : car.price;

  console.log('✅ Машина обновлена:', car);
}

async function deleteCar() {
  console.log('\n--- Удалить машину ---');
  const id = parseInt(await askQuestion('Введите ID машины для удаления: '));
  const index = cars.findIndex(car => car.id === id);

  if (index === -1) {
    console.log('❌ Машина с таким ID не найдена.');
    return;
  }

  const deleted = cars.splice(index, 1)[0];
  console.log('✅ Машина удалена:', deleted);
}

async function showMenu() {
  console.log('\n--- Меню дилерского центра ---');
  console.log('1. Добавить машину');
  console.log('2. Показать все машины');
  console.log('3. Редактировать машину');
  console.log('4. Удалить машину');
  console.log('5. Выйти');

  const choice = await askQuestion('Выберите действие (1–5): ');

  switch (choice.trim()) {
    case '1': await addCar(); break;
    case '2': listCars(); break;
    case '3': await updateCar(); break;
    case '4': await deleteCar(); break;
    case '5':
      console.log('До свидания!');
      rl.close();
      return;
    default:
      console.log('⚠️ Неверный выбор. Попробуйте снова.');
  }

  
  await showMenu();
}


console.log('🚗 Добро пожаловать в каталог дилерского центра!');
showMenu().catch(err => {
  console.error('Ошибка:', err);
  rl.close();
});