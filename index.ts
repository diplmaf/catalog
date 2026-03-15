
interface IAutomobile {
    id: number;
    manufacturer: string;
    modelName: string;
    productionYear: number;
    isSecondHand: boolean;
    cost: number;
}


class CarCatalog {
    private automobileCollection: IAutomobile[] = [];
    private currentId: number = 1000; // Начинаем с другого числа для ID

 
    addAutomobile(
        manufacturer: string, 
        modelName: string, 
        productionYear: number, 
        isSecondHand: boolean, 
        cost: number
    ): void {
        const newAutomobile: IAutomobile = {
            id: this.currentId,
            manufacturer: manufacturer,
            modelName: modelName,
            productionYear: productionYear,
            isSecondHand: isSecondHand,
            cost: cost
        };
        
        this.automobileCollection.push(newAutomobile);
        console.log(`✅ Добавлен автомобиль: ${manufacturer} ${modelName} (ID: ${this.currentId})`);
        this.currentId += 5; // Увеличиваем на 5 для разнообразия
    }

    displayAllAutomobiles(): void {
        console.log("\n" + "=".repeat(60));
        console.log("📋 ТЕКУЩИЙ КАТАЛОГ АВТОМОБИЛЕЙ");
        console.log("=".repeat(60));
        
        if (this.automobileCollection.length === 0) {
            console.log("⚠️ Каталог пуст");
            return;
        }

        console.log("ID\tПроизводитель\tМодель\t\tГод\tСостояние\tЦена (руб)");
        console.log("-".repeat(60));
        
        this.automobileCollection.forEach(auto => {
            const condition = auto.isSecondHand ? "Б/У" : "Новая";
            console.log(
                `${auto.id}\t${auto.manufacturer}\t\t${auto.modelName}\t\t${auto.productionYear}\t${condition}\t\t${auto.cost.toLocaleString()}`
            );
        });
        console.log("=".repeat(60));
    }

 
    searchAutomobileById(searchId: number): IAutomobile | undefined {
        console.log(`\n🔍 Поиск автомобиля с ID: ${searchId}`);
        
        const foundAuto = this.automobileCollection.find(auto => auto.id === searchId);
        
        if (foundAuto) {
            const condition = foundAuto.isSecondHand ? "Б/У" : "Новая";
            console.log(`✅ Найден: ${foundAuto.manufacturer} ${foundAuto.modelName}, ${foundAuto.productionYear} г., ${condition}, ${foundAuto.cost.toLocaleString()} руб.`);
            return foundAuto;
        } else {
            console.log(`❌ Автомобиль с ID ${searchId} не найден`);
            return undefined;
        }
    }

   
    updateAutomobilePrice(autoId: number, newCost: number): boolean {
        console.log(`\n🔄 Обновление цены для ID: ${autoId}`);
        
        const autoIndex = this.automobileCollection.findIndex(auto => auto.id === autoId);
        
        if (autoIndex !== -1) {
            const oldPrice = this.automobileCollection[autoIndex].cost;
            this.automobileCollection[autoIndex].cost = newCost;
            console.log(`✅ Цена обновлена: ${oldPrice.toLocaleString()} руб. → ${newCost.toLocaleString()} руб.`);
            return true;
        } else {
            console.log(`❌ Не удалось обновить: автомобиль с ID ${autoId} не найден`);
            return false;
        }
    }

    updateCompleteAutomobileInfo(
        autoId: number, 
        newManufacturer?: string, 
        newModel?: string, 
        newYear?: number, 
        newCondition?: boolean, 
        newCost?: number
    ): boolean {
        console.log(`\n🔄 Полное обновление информации для ID: ${autoId}`);
        
        const autoIndex = this.automobileCollection.findIndex(auto => auto.id === autoId);
        
        if (autoIndex === -1) {
            console.log(`❌ Автомобиль с ID ${autoId} не найден`);
            return false;
        }
      if (newManufacturer) this.automobileCollection[autoIndex].manufacturer = newManufacturer;
        if (newModel) this.automobileCollection[autoIndex].modelName = newModel;
        if (newYear) this.automobileCollection[autoIndex].productionYear = newYear;
        if (newCondition !== undefined) this.automobileCollection[autoIndex].isSecondHand = newCondition;
        if (newCost) this.automobileCollection[autoIndex].cost = newCost;

        console.log(`✅ Информация обновлена`);
        return true;
    }

    removeAutomobile(autoId: number): boolean {
        console.log(`\n🗑️ Удаление автомобиля с ID: ${autoId}`);
        
        const initialLength = this.automobileCollection.length;
        this.automobileCollection = this.automobileCollection.filter(auto => auto.id !== autoId);
        
        if (this.automobileCollection.length < initialLength) {
            console.log(`✅ Автомобиль с ID ${autoId} успешно удален`);
            return true;
        } else {
            console.log(`❌ Автомобиль с ID ${autoId} не найден`);
            return false;
        }
    }

    filterByYear(minYear: number, maxYear: number): void {
        console.log(`\n🔎 Фильтрация автомобилей ${minYear}-${maxMaxYear} годов выпуска:`);
        
        const filtered = this.automobileCollection.filter(
            auto => auto.productionYear >= minYear && auto.productionYear <= maxYear
        );
        
        if (filtered.length === 0) {
            console.log("Автомобили не найдены");
            return;
        }

        filtered.forEach(auto => {
            console.log(`- ${auto.manufacturer} ${auto.modelName} (${auto.productionYear})`);
        });
    }

    showStatistics(): void {
        console.log("\n📊 СТАТИСТИКА КАТАЛОГА");
        console.log("-".repeat(30));
        console.log(`Всего автомобилей: ${this.automobileCollection.length}`);
        
        const newCars = this.automobileCollection.filter(auto => !auto.isSecondHand).length;
        const usedCars = this.automobileCollection.filter(auto => auto.isSecondHand).length;
        
        console.log(`Новых: ${newCars}`);
        console.log(`Б/У: ${usedCars}`);
        
        if (this.automobileCollection.length > 0) {
            const totalSum = this.automobileCollection.reduce((sum, auto) => sum + auto.cost, 0);
            const avgPrice = totalSum / this.automobileCollection.length;
            console.log(`Средняя цена: ${Math.round(avgPrice).toLocaleString()} руб.`);
        }
    }
}


function demonstrateCrudOperations(): void {
    console.log("\n🚗 ПРОГРАММА УПРАВЛЕНИЯ КАТАЛОГОМ АВТОМОБИЛЕЙ");
    console.log("=".repeat(50));

    const catalog = new CarCatalog();
   
    console.log("\n📝 ШАГ 1: Добавление автомобилей в каталог");
    catalog.addAutomobile("Toyota", "Camry", 2022, false, 2500000);
    catalog.addAutomobile("BMW", "X5", 2020, true, 3500000);
    catalog.addAutomobile("Lada", "Vesta", 2023, false, 1200000);
    catalog.addAutomobile("Mercedes", "E-Class", 2021, true, 4200000);
    catalog.addAutomobile("Honda", "Civic", 2022, false, 2100000);

    console.log("\n📖 ШАГ 2: Просмотр всего каталога");
    catalog.displayAllAutomobiles();

    console.log("\n🔍 ШАГ 3: Поиск автомобиля по ID");
    catalog.searchAutomobileById(1005);
    catalog.searchAutomobileById(9999); // Несуществующий ID

    console.log("\n📝 ШАГ 4: Обновление цены автомобиля");
    catalog.updateAutomobilePrice(1000, 2400000);

    console.log("\n📝 ШАГ 5: Полное обновление информации");
    catalog.updateCompleteAutomobileInfo(1010, undefined, undefined, undefined, false, 3800000);
 
    console.log("\n📖 ШАГ 6: Каталог после обновлений");
    catalog.displayAllAutomobiles();

    console.log("\n🗑️ ШАГ 7: Удаление автомобиля");
    catalog.removeAutomobile(1015);
    catalog.removeAutomobile(9999); // Попытка удалить несуществующий

    console.log("\n📖 ШАГ 8: Финальный каталог");
    catalog.displayAllAutomobiles();
  
    catalog.showStatistics();
  
    catalog.filterByYear(2020, 2022);

    console.log("\n✅ ПРОГРАММА ЗАВЕРШЕНА");
}


demonstrateCrudOperations();
