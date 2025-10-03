class Vehiculo {
    constructor(tipo, patente) {
        this.tipo = tipo;
        this.patente = patente;
        this.fechaIngreso = new Date().toLocaleString();
        this.sigue = true;
    } 
}

class Estacionamiento {
    static CAPACIDAD = 30;
    constructor() {
        this.espaciosDisponibles = Estacionamiento.CAPACIDAD;
        this.vehiculos = [];
    }

    registrar(tipo, patente) {
        if (this.espaciosDisponibles > 0) {
            let v = new Vehiculo(tipo, patente);
            this.vehiculos.push(v);
            this.espaciosDisponibles--;
            return true;
        } else {
            return false; 
        }
    }

    retirar(patente) {
        let index = this.vehiculos.findIndex(v => v.patente === patente);
        if (index !== -1) {
            this.vehiculos.splice(index, 1); 
            this.espaciosDisponibles++;      
            return true;                    
        } else {
            return false;                     
        }
    }
}

let est = new Estacionamiento();

function menu() {
    let opcion;
    do {
        opcion = prompt(
            "Seleccione una opción:\n" +
            "1 - Registrar vehículo\n" +
            "2 - Retirar vehículo\n" +
            "3 - Salir"
        );

        switch(opcion) {
            case "1":
                // menú tipo de vehículo
                let tipo;
                do {
                    let tipoOpcion = prompt(
                        "Seleccione el tipo de vehículo:\n" +
                        "1 - Automotor\n" +
                        "2 - Motocicleta"
                    );

                    if (tipoOpcion === "1") tipo = "Automotor";
                    else if (tipoOpcion === "2") tipo = "Motocicleta";
                    else alert("Opción inválida, intente nuevamente");

                } while (!tipo);

                let patente = prompt("Ingrese la patente:");
                if (confirm(`Confirma registrar el vehículo ${tipo} con patente ${patente}?`)) {
                    if (est.registrar(tipo, patente)) {
                        alert("Vehiculo registrado correctamente, bienvenido! | " + new Date().toLocaleString());
                    } else {
                        alert("Estacionamiento sin espacios libres, lamentamos las molestias");
                    }
                } else {
                    alert("Registro cancelado");
                }
                break;

            case "2":
                let patenteRetiro = prompt("Ingrese la patente del vehículo a retirar: ");
                if (confirm(`Confirma retirar el vehículo con patente ${patenteRetiro}?`)) {
                    if (est.retirar(patenteRetiro)) {
                        alert("Retiro exitoso, hasta luego");
                    } else {
                        alert("Vehículo no encontrado");
                    }
                } else {
                    alert("Retiro cancelado");
                }
                break;

            case "3":
                alert("Saliendo del menú");
                break;

            default:
                alert("Opción incorrecta");
        }

    } while(opcion !== "3");
}