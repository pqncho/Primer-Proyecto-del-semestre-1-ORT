

window.addEventListener("load", inicio)
 let miSistema= new sistema();

function inicio(){
    document.getElementById("idBotonDatos").addEventListener("click", mostrarDatos)
    mostrarDatos();
    document.getElementById("idBotonEstadisticas").addEventListener("click", mostrarEstadisticas)
    document.getElementById("idAgregarCarrera").addEventListener("click", agregarCarrera);
    document.getElementById("idAgregarPatrocinador").addEventListener("click", agregarPatrocinador);
    document.getElementById("idAgregarCorredor").addEventListener("click", agregarCorredor);
    document.getElementById("idAgregarInscripcion").addEventListener("click", agregarInscripcion);
    document.getElementById("idCarreraEstadisticas").addEventListener("change", agregarInscriptosConsulta);
    document.getElementById("idOrden").addEventListener("change", agregarInscriptosConsulta)
    document.getElementById("idOrden2").addEventListener("change", agregarInscriptosConsulta)
    document.getElementById("porCarreras").addEventListener("change", mapaDeUruguay);
    document.getElementById("porInscripciones").addEventListener("change", mapaDeUruguay);
}

function mostrarDatos() {
    document.getElementById("idSectionDatos").style.display = "block";
    document.getElementById("idSectionEstadisticas").style.display = "none";
}

function mostrarEstadisticas(){
    document.getElementById("idSectionDatos").style.display = "none";
    document.getElementById("idSectionEstadisticas").style.display = "block";
    mapaDeUruguay();
}

    function agregarCarrera() {
        let esValido=true
        let formularioCarreras= document.getElementById("idFormularioCarreras");

    if (!formularioCarreras.reportValidity()) {
        
        esValido=false;
        
    }else {
        
let nombre = document.getElementById("idNombreCarrera").value;
let departamento = document.getElementById("idDepartamentoCarrera").value;
let fecha = document.getElementById("idFechaCarrera").value;
let cupo = document.getElementById("idCuposCarrera").value;
 
for (let i = 0; i < miSistema.carreras.length && esValido; i++) {

    if (miSistema.carreras[i].nombreCarrera == nombre) {
         alert("La carrera ya existe.");
        
        esValido=false; 
    }
}

if(esValido==true){
let nuevaCarrera= new carrera(nombre, departamento, fecha, cupo);
miSistema.agregarCarrera(nuevaCarrera);
document.getElementById("idPorcentajeElite").textContent="Porcentaje de corredores de élite: " + miSistema.porcentajeElite().toFixed(2) + "%"
    miSistema.promedioInscriptos();
    document.getElementById("idPromedio").textContent = "Promedio de inscriptos: " + miSistema.promedioInscriptos().toFixed(2);
agregarCarreraPatrocinador();
agregarCarreraInscripcion();
agregarAListaSinInscriptos();
agregarASelectConsulta();
mapaDeUruguay();
        }
    }
}
function agregarASelectConsulta(){
let selectConsulta= document.getElementById("idCarreraEstadisticas")
selectConsulta.innerHTML=""
for(let i=0; i<miSistema.carreras.length; i++){
    let nodoOption= document.createElement("option")
   let nodoTexto= document.createTextNode(miSistema.carreras[i].nombreCarrera)
    nodoOption.appendChild(nodoTexto);
    selectConsulta.appendChild(nodoOption)
   
}
agregarInscriptosConsulta()
}
function agregarCarreraPatrocinador() {
    
    let selectPatrocinador= document.getElementById("idCarrerasPatrocinador");
    selectPatrocinador.innerHTML="";
    
    for(let i=0; i<miSistema.carreras.length ; i++){
        let nodoOption= document.createElement("option");
        let nodoTexto = document.createTextNode(miSistema.carreras[i].nombreCarrera);
        nodoOption.appendChild(nodoTexto);
        selectPatrocinador.appendChild(nodoOption);
   }
}

function agregarCarreraInscripcion() {
    
    let selectCarreraInscripcion = document.getElementById("idCarreraInscripcion");
    selectCarreraInscripcion.innerHTML = "";

    for (let i = 0; i < miSistema.carreras.length; i++) {
        let nodoOption = document.createElement("option");
        let nodoTexto = document.createTextNode(miSistema.carreras[i].nombreCarrera);
        nodoOption.appendChild(nodoTexto);
        selectCarreraInscripcion.appendChild(nodoOption);
      }
    }
    
    function agregarInscriptosConsulta(){
        let inscriptos=[]
        
        let nombreCarrera=document.getElementById("idCarreraEstadisticas").value
        for(let i=0;i<miSistema.inscripciones.length;i++){
            if(nombreCarrera==miSistema.inscripciones[i].carreraInscripcion.nombreCarrera){
            inscriptos.push(miSistema.inscripciones[i])
            
            }
        }
        if(document.getElementById("idOrden").checked){
            inscriptos.sort(function(a,b){
                return a.corredorInscripcion.nombreCorredor.localeCompare(b.corredorInscripcion.nombreCorredor)})

        } else{
            inscriptos.sort(function(a,b){
              return a.carreraInscripcion.numeroInscripto - b.carreraInscripcion.numeroInscripto
            })
        }
        let tabla=document.getElementById("idTabla")
        while(tabla.rows.length >1){
            tabla.deleteRow(1)
        }

        for(let i=0; i<inscriptos.length;i++){
            
            let corredor= inscriptos[i].corredorInscripcion
            let nodoFila=tabla.insertRow()
            let nodoCelda0=nodoFila.insertCell(0)
            let nodoCelda1=nodoFila.insertCell(1)
            let nodoCelda2=nodoFila.insertCell(2)
            let nodoCelda3=nodoFila.insertCell(3)
            let nodoCelda4=nodoFila.insertCell(4)
            let nodoTexto0= document.createTextNode(corredor.nombreCorredor)
            let nodoTexto1= document.createTextNode(corredor.edadCorredor)
            let nodoTexto2= document.createTextNode(corredor.cedulaCorredor)
            let nodoTexto3= document.createTextNode(formatearFecha(corredor.fechaVenFichaMedCorredor))
            let nodoTexto4 = document.createTextNode(inscriptos[i].numeroInscripcion)
            nodoCelda0.appendChild(nodoTexto0)
            nodoCelda1.appendChild(nodoTexto1)
            nodoCelda2.appendChild(nodoTexto2)
            nodoCelda3.appendChild(nodoTexto3)
            nodoCelda4.appendChild(nodoTexto4)
            if(corredor.tipoCorredor=="élite"){
                nodoCelda0.className="backRojo"
                nodoCelda1.className="backRojo"
                nodoCelda2.className="backRojo"
                nodoCelda3.className="backRojo"
                nodoCelda4.className="backRojo"
            }
           
    }
}
    

function agregarPatrocinador() {
        let esValido=true
        let formularioPatrocinador = document.getElementById("idFormularioPatrocinadores");
    
        if (!formularioPatrocinador.reportValidity()) {
        
        esValido=false;
       
        } else {
        let nombre = document.getElementById("idNombrePatrocinador").value;
        let rubro = document.getElementById("idRubroPatrocinador").value; 
        let select = document.getElementById("idCarrerasPatrocinador");
        let carreras = [];

        if(!validarSelectMultiple()){
        alert("Debe seleccionar al menos una carrera.");
        esValido=false;
}
for(let i=0; i<select.selectedOptions.length && esValido; i++) {
    carreras.push(select.selectedOptions[i].value);
} 
    // Verificar si el patrocinador ya existe
for (let i = 0; i < miSistema.patrocinadores.length && esValido; i++) {
    if (miSistema.patrocinadores[i].nombrePatrocinador == nombre) {
       miSistema.patrocinadores[i].rubroPatrocinador = rubro; // Actualizar el rubro si ya existe
       miSistema.patrocinadores[i].carrerasPatrocinador = carreras; // Actualizar las carreras si ya existe
       alert("El patrocinador ya existe. Se ha actualizado su información.");
       esValido=false;
    }
}

    if(esValido==true){
    let nuevoPatrocinador = new patrocinador(nombre, rubro, carreras);
    miSistema.agregarPatrocinador(nuevoPatrocinador);
        }
    }
}

function agregarAListaMasInscriptos(){
  
    let nodoUl = document.getElementById("idCarrerasMasInscriptos");
    nodoUl.innerHTML="";
    for(let i=0; i<miSistema.masInscriptos().length; i++){
       let cupoTotal= miSistema.masInscriptos()[i].cupoTotal
       let nodoLi = document.createElement("li");
       nodoLi.textContent = miSistema.masInscriptos()[i].nombreCarrera + " en " + miSistema.masInscriptos()[i].departamentoCarrera + " el " + formatearFecha(miSistema.masInscriptos()[i].fechaCarrera) + " Cupo: " +cupoTotal + " Inscriptos: " + miSistema.masInscriptos()[i].numeroInscripto;
       nodoUl.appendChild(nodoLi);
}
}
function agregarAListaSinInscriptos(){
    let nodoUl=document.getElementById("idCarrerasSinInscriptos")
    nodoUl.innerHTML=""
    for(let i=0; i<miSistema.sinInscriptos().length;i++){
        let cupoTotal= miSistema.sinInscriptos()[i].cupoTotal
        let nodoLi=document.createElement("li")
        nodoLi.textContent= miSistema.sinInscriptos()[i].nombreCarrera + " en " + miSistema.sinInscriptos()[i].departamentoCarrera + " el " + formatearFecha(miSistema.sinInscriptos()[i].fechaCarrera) + " cupo: " + cupoTotal 
        nodoUl.appendChild(nodoLi)
    }
}
function validarSelectMultiple (){
    selectValido=true
    let select = document.getElementById("idCarrerasPatrocinador");
    if (select.selectedOptions.length == 0) {
        selectValido=false;
        
    }
    return selectValido;
}

function agregarCorredor() {
        let esValido=true
        let formularioCorredor = document.getElementById("idFormularioCorredores");
    
        if (!formularioCorredor.reportValidity()) {
        
        esValido=false;
        
    } else { 
        
    let nombre = document.getElementById("idNombreCorredor").value;
    let edad = document.getElementById("idEdadCorredor").value;
    let cedula = document.getElementById("idCedulaCorredor").value;
    let fecha = document.getElementById("idFechaCorredor").value;
    let tipo;

    if (document.getElementById("idElite").checked) {
        tipo = "élite";
    } else {
        tipo = "común";
    }

    for(let i=0; i<miSistema.corredores.length && esValido; i++){
    if(miSistema.corredores[i].cedulaCorredor == cedula ) {
        alert("El corredor con esta cédula ya existe.");
        
        esValido=false
    }
   }

   if(esValido==true){
   let nuevoCorredor = new corredor(nombre, edad, cedula, fecha, tipo);
   miSistema.agregarCorredor(nuevoCorredor);
   agregarCorredorInscripcion();
   } 

  }
}

function agregarCorredorInscripcion() {
    
    let selectCorredorInscripcion = document.getElementById("idCorredor");
    selectCorredorInscripcion.innerHTML = "";
    for (let i = 0; i < miSistema.corredores.length; i++) {
        let nodoOption = document.createElement("option");
        let nodoTexto = document.createTextNode(miSistema.corredores[i].nombreCorredor + " - " + miSistema.corredores[i].cedulaCorredor);
        nodoOption.appendChild(nodoTexto);
        selectCorredorInscripcion.appendChild(nodoOption);
      }
    }  


    function agregarInscripcion() {
let formularioInscripciones = document.getElementById("idFormularioInscripciones");
let esValido= true;
    if (!formularioInscripciones.reportValidity()) {
        
        esValido=false; 
      
    } else {
        
        let carrera= null
        let corredor =null;
        let nombreCarrera = document.getElementById("idCarreraInscripcion").value;
        let cedulaCorredorInscripto = document.getElementById("idCorredor").value.split(" - ")[1]
        let patrocinador = {};
        //Obtenemos el patrocinador de la carrera
for(let i=0; i<miSistema.patrocinadores.length && esValido; i++){
            if(miSistema.patrocinadores[i].carrerasPatrocinador.includes(nombreCarrera)) {
                patrocinador = miSistema.patrocinadores[i];
            }
        }
       
        
        //Obtenemos el corredor
         for(let i=0; i<miSistema.corredores.length && esValido; i++){
                if(cedulaCorredorInscripto == miSistema.corredores[i].cedulaCorredor) {
                    corredor = miSistema.corredores[i];
            }
            
        }

    //Obtenemos la carrera
    for (let i = 0; i < miSistema.carreras.length && esValido; i++) {
        if(nombreCarrera == miSistema.carreras[i].nombreCarrera) {
            carrera = miSistema.carreras[i];
          }
        }

        if (corredor == null && esValido || carrera == null && esValido) {
            alert("Corredor o carrera no encontrados.");
            esValido=false;
        }
        
        //Validacion Ficha Medica
        let fechaVenFicha= new Date(corredor.fechaVenFichaMedCorredor);
        let fechaCarrera= new Date(carrera.fechaCarrera);
        if (fechaVenFicha < fechaCarrera && esValido) {
            alert("La ficha médica del corredor ha vencido.");
            esValido=false;
        }


            //Validacion de si el corredor ya está inscripto en la carrera
            for (let i=0; i<miSistema.inscripciones.length && esValido; i++) {
                
                if(miSistema.inscripciones[i].carreraInscripcion.nombreCarrera == carrera.nombreCarrera) {
                    if(miSistema.inscripciones[i].corredorInscripcion.cedulaCorredor == corredor.cedulaCorredor) {
                        alert("El corredor ya está inscripto en esta carrera.");
                        esValido=false;
                    }
                }
            }

        //Validacion de cupo
         if (carrera.cupoCarrera <= 0 && esValido) {
            alert("No hay cupos disponibles para esta carrera.");
            esValido=false;
        }

        if(esValido==true){
            carrera.numeroInscripto = carrera.numeroInscripto + 1;
            agregarAListaMasInscriptos();
            let numeroAsignado = carrera.numeroInscripto;
            carrera.cupoCarrera = carrera.cupoCarrera - 1;
            alert("Número: " + numeroAsignado + "\nNombre: " + corredor.nombreCorredor +" "+ corredor.edadCorredor + " años, " + "CI: " + cedulaCorredorInscripto + " Ficha Médica " + formatearFecha(corredor.fechaVenFichaMedCorredor) + "\n" + corredor.tipoCorredor + "\nCarrera: " + nombreCarrera + " en " + carrera.departamentoCarrera + " el " + formatearFecha(carrera.fechaCarrera) +" Cupo: " + carrera.cupoCarrera + "\n" + patrocinador.nombrePatrocinador + " "  + "(" + patrocinador.rubroPatrocinador + ")");
                let textoPDF =  "Número: " + numeroAsignado + 
                                "\nNombre: " + corredor.nombreCorredor + " " + corredor.edadCorredor + " años, " +
                                "CI: " + cedulaCorredorInscripto + 
                                "\nFicha Médica: " + formatearFecha(corredor.fechaVenFichaMedCorredor) + 
                                "\nTipo: " + corredor.tipoCorredor +
                                "\nCarrera: " + nombreCarrera + " en " + carrera.departamentoCarrera + " el " + formatearFecha(carrera.fechaCarrera) + 
                                "\nCupos restante: " + carrera.cupoCarrera + 
                                "\nPatrocinador: " + patrocinador.nombrePatrocinador + " (" + patrocinador.rubroPatrocinador + ")";

                                const { jsPDF } = window.jspdf;
                                let pdf = new jsPDF();
                                pdf.text(textoPDF, 10, 20);
                                pdf.save("inscripcion_" + cedulaCorredorInscripto + ".pdf");


                                let nuevaInscripcion = new inscripcion(corredor, carrera, numeroAsignado);
            miSistema.agregarInscripcion(nuevaInscripcion);
            document.getElementById("idPorcentajeElite").textContent="Porcentaje de corredores de élite: " + miSistema.porcentajeElite().toFixed(2) + "%"
            miSistema.promedioInscriptos();
            document.getElementById("idPromedio").textContent = "Promedio de inscriptos: " + miSistema.promedioInscriptos().toFixed(2);
            agregarInscriptosConsulta();
            mapaDeUruguay();  
            agregarAListaSinInscriptos()                 
        }   
     }       
   }
   
   function formatearFecha(fechaTexto) {
        let fecha = new Date(fechaTexto);
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let anio = fecha.getFullYear();
        return dia + "/" + mes + "/" + anio;
}

    


google.charts.load("current", {
    packages: ["geochart"],
});

let codigosDepartamentos = {
    "Artigas": "Artigas",
    "Canelones": "Canelones",
    "Cerro Largo": "Cerro Largo",
    "Colonia": "Colonia",
    "Durazno": "Durazno",
    "Flores": "Flores",
    "Florida": "Florida",
    "Lavalleja": "Lavalleja",
    "Maldonado": "Maldonado",
    "Montevideo": "Montevideo",
    "Paysandú": "Paysandú",
    "Río Negro": "Río Negro",
    "Rivera": "Rivera",
    "Rocha": "Rocha",
    "Salto": "Salto",
    "San José": "San José",
    "Soriano": "Soriano",
    "Tacuarembó": "Tacuarembó",
    "Treinta y Tres": "Treinta y Tres"
};

google.charts.setOnLoadCallback(mapaDeUruguay);

function mapaDeUruguay() {
    let infoMapa = [["Codigo departamento", "Cantidad"]];

    let datos;
    if (document.getElementById("porCarreras").checked) {
        datos = miSistema.cantidadCarrerasPorDepartamento();
    } else {
        datos = miSistema.cantidadInscriptosPorDepartamento();
    }

    let nombresDeptos = Object.keys(codigosDepartamentos);

    for (let i = 0; i < nombresDeptos.length; i++) {
        let nombreDepto = nombresDeptos[i];
        let codigo = codigosDepartamentos[nombreDepto];
        if (codigo !== undefined) {
            let cantidad = datos[nombreDepto];
            if (cantidad === undefined) {
                cantidad = 0;
            }
            infoMapa.push([codigo, cantidad]);
        }
    }

    let opcionesMapa = {
        region: "UY",
        resolution: "provinces",
        displayMode: "regions",
        colorAxis: { colors: ["#edfdff", "#3a4f75"] },
        datalessRegionColor: "#f0f0f0"
    }

    let chart = new google.visualization.GeoChart(document.getElementById("idMapaUruguay"));
    chart.draw(google.visualization.arrayToDataTable(infoMapa), opcionesMapa);
}