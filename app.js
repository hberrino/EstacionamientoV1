const botonMenu = document.getElementById("abrirMenu");
const menu = document.getElementById("menu");
const imagen = document.querySelector("img");
const titulo = document.querySelector("h1");
const cont = document.getElementById("contenido");

const est = new Estacionamiento();

botonMenu.addEventListener("click", () => {
    const estaAbierto = menu.style.display === "flex";

    if (estaAbierto) {
        
        menu.style.display = "none";
        botonMenu.textContent = "Abrir menú";
        imagen.style.display = "block";
        titulo.style.display = "block";
        cont.innerHTML = "";
        cont.classList.remove("visible");

    
        const mainContainer = document.querySelector("body > div");
        mainContainer.appendChild(botonMenu);
        botonMenu.style.marginTop = "20px";
    } else {
        
        menu.style.display = "flex";
        botonMenu.textContent = "Cerrar menú";
        imagen.style.display = "none";
        titulo.style.display = "none";
        
        mostrarFormularioRegistro();

        cont.insertAdjacentElement("afterend", botonMenu);
        botonMenu.style.marginTop = "25px";
    }
});

document.getElementById("registrarBtn").addEventListener("click", mostrarFormularioRegistro);
document.getElementById("retirarBtn").addEventListener("click", mostrarFormularioRetiro);
document.getElementById("verListaBtn").addEventListener("click", mostrarVehiculos);

function mostrarFormularioRegistro() {
    cont.classList.add("visible");
    cont.innerHTML = `
        <h3>Registrar vehículo</h3>
        <select id="tipo">
            <option value="Automotor">Automotor</option>
            <option value="Motocicleta">Motocicleta</option>
        </select>
        <input type="text" id="patente" placeholder="Ingrese patente">
        <button id="guardarVehiculo">Registrar</button>
    `;

    document.getElementById("guardarVehiculo").addEventListener("click", () => {
        const tipo = document.getElementById("tipo").value;
        const patente = document.getElementById("patente").value.trim();

        if (patente) {
            if (est.registrar(tipo, patente)) {
                cont.innerHTML = `<p>Vehículo ${tipo} (${patente}) registrado con éxito.</p>`;
            } else {
                cont.innerHTML = `<p>No hay espacios disponibles.</p>`;
            }
        } else {
            cont.innerHTML = `<p>Ingrese una patente válida.</p>`;
        }
    });
}

function mostrarFormularioRetiro() {
    cont.classList.add("visible");
    cont.innerHTML = `
        <h3>Retirar vehículo</h3>
        <input type="text" id="patenteRetiro" placeholder="Ingrese patente">
        <button id="retirarVehiculo">Retirar</button>
    `;

    document.getElementById("retirarVehiculo").addEventListener("click", () => {
        const patente = document.getElementById("patenteRetiro").value.trim();
        if (est.retirar(patente)) {
            cont.innerHTML = `<p>Vehículo con patente ${patente} retirado correctamente.</p>`;
        } else {
            cont.innerHTML = `<p>Vehículo no encontrado.</p>`;
        }
    });
}

function mostrarVehiculos() {
    cont.classList.add("visible");

    if (est.vehiculos.length === 0) {
        cont.innerHTML = `<p>No hay vehículos registrados.</p>`;
        return;
    }

    let html = "<h3>Vehículos estacionados</h3><ul>";
    est.vehiculos.forEach(v => {
        html += `<li>${v.tipo} - ${v.patente} (Ingreso: ${v.fechaIngreso})</li>`;
    });
    html += "</ul>";
    cont.innerHTML = html;
}