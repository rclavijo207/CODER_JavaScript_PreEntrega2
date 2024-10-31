//  Variables
let isRunning = true;                           //  Control de ejecución
let option;                                     //  Opción de ejecución
let listOfSlots = []                            //  Slots y fechas respectivas
let listOfProducts = []                         //  Listado de productos
const SYS_DATE = new Date();                    //  Fecha actual
const DATE_FORMAT = {                           //  Formato para fechas
    weekday: 'long', 
    day: 'numeric', 
    month: 'long'};
let cart = {                                    //  Carrito de compras
    items : [],
    total: 0
};


//  Clases
class Slot{
    constructor(id, room, date, hour){
        this.id = id;
        this.room = room;
        this.date = date;
        this.hour = hour;
        this.isVacant = true;
    }
    showSlot(){
        let msg = "Reserva:\n";
        msg += `\n    ID:               ${this.id}`;
        msg += `\n    Playroom:         ${this.room}`;
        msg += `\n    Fecha:            ${this.date}`;
        msg += `\n    Hora:             ${this.hour}`;
        console.log(msg);
    }
    displaySlot(){
        if(this.isVacant){
            let msg = `ID: ${this.id} `;
            msg += `PlayRoom: ${this.room} `;
            msg += `Fecha: ${this.date.toLocaleDateString("es-ES", DATE_FORMAT)} `;
            msg += `Hora: ${this.hour} `;
            console.log(msg);
        }
    }
}

class Product{
    constructor(id, name, price){
        this.id = id;
        this.name = name;
        this.price = price;
    }
    showProduct(){
        let msg = `ID:  ${this.id}  `;
        msg += `Nombre: ${this.name}    `;
        msg += `Precio: ${this.price}`;
        console.log(msg);
    }
}


//  Funciones
function selectOption(){
    let msg = "Seleccione:\n\n";
    msg += `\n    1:    Reservar PlayRoom`;
    msg += `\n    2:    Consultar reserva`;
    msg += `\n    3:    Pedir a domicilio`;
    msg += `\n    4:    Salir`;
    let op = parseInt(prompt(msg));
    return op;
}

function slotsGenerator(){
    let hour;
    let limit = new Date(SYS_DATE);
    limit.setMonth(limit.getMonth() + 1);
    //  Generar fechas a un mes vista
    for(let d = SYS_DATE; d <= limit; d.setDate(d.getDate() + 1)){
        //  Generar fechas (jueves, viernes, sábados)
        if(d.getDay() >= 4){
            //  Generar tres horarios por fecha
            for(let h = 1; h <= 3; h++){
                switch(h){
                    case 1:
                        hour = "13:00";
                        break;
                    case 2:
                        hour = "15:00";
                        break;
                    case 3:
                        hour = "17:00";
                        break;
                }
                listOfSlots.push(new Slot((listOfSlots.length + 1), "Café", d, hour));
                listOfSlots.push(new Slot((listOfSlots.length + 1), "Crema", d, hour));
            }
        }
    }
}

function searchArr(arr){
    //  Buscar por ID
    let id = prompt("Ingrese número del ID.");
    index = arr.findIndex(arr => arr.id == id);
    return index;
}

function bookPlayroom(){
    //  Mostrar horarios disponibles
    console.log("Fechas disponibles:\n");
    for(const slot of listOfSlots){
        slot.displaySlot();
    }
    //  Agendar
    let finded = false;
    while(!finded){
        // Buscar
        index = searchArr(listOfSlots);
        if(index >= 0 && listOfSlots[index].isVacant === true){
            alert("Slot disponible.");
            finded = true;
        }
        else{
            alert("Slot NO disponible.");
        }
    }
    //  Guardar reserva y modificar slot
    listOfSlots[index].isVacant = false;
    //  Muestreo
    listOfSlots[index].showSlot();
    alert("Reserva completada. ¡Muchas gracias!");
}

function searchBooking(){
    //  Buscar por ID
    let index = searchArr(listOfSlots);
    if(index >= 0 && listOfSlots[index].isVacant === false){
        alert("Reserva encontrada.");
        //  Muestreo
        listOfSlots[index].showSlot();
        //  Operar con la reserva
        let op = prompt("¿Desea cancelar la reserva? SI/NO.");
        op = op.toLocaleLowerCase();
        if(op === "si"){
            //  Eliminar
            listOfSlots[index].isVacant = true;
            alert("Se ha eliminado la reserva.");
        }
    }
    else{
        alert("No existe reserva con ese número de ID.");
    }
}

function loadProducts(){
    // Productos
    const hot = [
        {name: "Cappuccino", price: 80.00},
        {name: "Latte", price: 80.00},
        {name: "Espresso", price: 50.00},
        {name: "Mocca", price: 90.00},
        {name: "Te verde", price: 50.00},
        {name: "Chocolate caliente", price: 80.00}
    ];
    const cold = [
        {name: "Frappé", price: 60.00},
        {name: "Milkshake chocolate", price: 80.00},
        {name: "Milkshake vainilla", price: 80.00},
        {name: "Te helado", price: 60.00},
        {name: "Jugo naranja", price: 50.00},
        {name: "Jugo frutilla", price: 50.00}
    ];
    const sweet = [
        {name: "Brownie", price: 100.00},
        {name: "Pastafrola membrillo", price: 120.00},
        {name: "Cookies (3 un.)", price: 80.00},
        {name: "Pasteles membrillo (2 un.)", price: 100.00},
        {name: "Selva negra", price: 130.00},
        {name: "Red Velvet", price: 130.00}
    ];
    const salty = [
        {name: "Scons (6 un.)", price: 60.00},
        {name: "Tostados (2 un.)", price: 100.00},
        {name: "Medialunas (4 un.)", price: 90.00},
        {name: "Buñuelos alga (8 un.)", price: 110.00},
        {name: "Wrap pollo", price: 150.00},
        {name: "Pascualina", price: 120.00}
    ];
    //  Cargar productos
    for(let i = 1; i <= 4; i++){
        let name, price;
        //  Iterar categoría de productos
        for(let p = 0; p <= salty.length - 1; p++){
            switch(i){
                case 1:
                    name = hot[p].name;
                    price = hot[p].price;
                    break;
                case 2:
                    name = cold[p].name;
                    price = cold[p].price;
                    break;
                case 3:
                    name = sweet[p].name;
                    price = sweet[p].price;
                    break;
                case 4:
                    name = salty[p].name;
                    price = salty[p].price;
                    break;
            }
            listOfProducts.push(new Product(listOfProducts.length + 1, name, price));
        }
    }
}

function shopProducts(){
    let run = true;
    let op;
    let msg = "¿Qué desea hacer?\n\n";
    msg += "    1: Añadir producto\n";
    msg += "    2: Quitar producto\n";
    msg += "    3: Confirmar pedido\n";
    msg += "    4: Volver";
    //  Mostrar productos
    console.log("Productos:\n");
    for(const product of listOfProducts){
        product.showProduct();
    }
    //  Interracciones
    while(run){
        op = parseInt(prompt(msg));
        switch(op){
            case 1:     //  Añadir producto
                addProduct();
                break;
            case 2:     //  Quitar producto
                removeProduct();
                break;
            case 3:     //  Confirmar pedido
                cartCheckout();
                break;
            case 4:     //  Volver
                run = false;
                break;
            default:     //  Error
                alert("¡Debe elegir una opción válida!");
                break;
        }
    }
}

function addProduct(){
    //  Buscar
    let index = searchArr(listOfProducts);
    //  Añadir si existe
    if(index > -1){
        cart.items.push(listOfProducts[index]);
        cart.total += parseInt(listOfProducts[index].price);
        alert("Se ha añadido el producto");
        //  Mostrar carrito
        displayCart();
    }
    else{
        alert("¡Producto no encontrado!");
    }
}

function removeProduct(){
    //  Buscar
    let index = searchArr(cart.items);
    //  Eliminar si existe
    if(index >= 0){
        cart.total -= cart.items[index].price;
        cart.items.splice(index, 1);
        alert("Eliminado del carrito con éxito.");
    }
    else{
        alert("No se ha encontrado el producto.");
    }
    //  Mostrar carrito
    displayCart();

}

function displayCart(){
    //
    let msg = `\nCarrito:\n\n`;
    for(const item of cart.items){
        msg += `\nID:   ${item.id}  ${item.name}            $${item.price}`;
    }
    msg += `\n\n      TOTAL : $${cart.total}`;
    console.log(msg);
}

function cartCheckout(){
    //  Ejecutar si el carrito no está vacío
    if(cart.items.length > 0){
        displayCart();
        let msg = "¿Desea confirmar su pedido? SI/NO";
        let op = prompt(msg);
        op = op.toLocaleLowerCase();
        if(op === "si"){
            alert("Gracias por su pedido.");
        }
    }
    else{
        alert("No tiene productos en su carrito.");
    }
}


//  Ejecución
slotsGenerator();
loadProducts();
while(isRunning){
    option = selectOption();
    switch(option){
        case 1:     //  Reservar PlayRoom
            bookPlayroom();
            break;
        case 2:     //  Consultar reserva
            searchBooking();
            break;
        case 3:     //  Pedir a domicilio
        shopProducts();
            break;
        case 4:     //  Salir
            isRunning = false;
            alert("¡Hasta pronto!");
            break;
        default:     //  Error
            alert("¡Debe elegir una opción válida!");
            break;
    }
}
