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