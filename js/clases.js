
class sistema {
    constructor(){
        this.carreras = [];
        this.corredores = [];
        this.inscripciones = [];
        this.patrocinadores = [];
    }

    agregarCarrera(carrera) {
        this.carreras.push(carrera);
        this.carreras.sort(function(a,b) { return a.compararNombreCon(b)})
    }
    agregarPatrocinador(patrocinador) {
        this.patrocinadores.push(patrocinador);
    }
    agregarCorredor(corredor) {
        this.corredores.push(corredor);
        this.corredores.sort(function(a, b) { return a.compararNombreCon(b) });
    }
    agregarInscripcion(inscripcion) {
        this.inscripciones.push(inscripcion);
    }
    cantidadInscriptosPorDepartamento() {
        let inscriptosPorDepto = {};
        for (let i = 0; i < this.inscripciones.length; i++) {
            let inscripcion = this.inscripciones[i];
            let departamento = inscripcion.carreraInscripcion.departamentoCarrera;
            if (inscriptosPorDepto[departamento]) {
                inscriptosPorDepto[departamento]++;
            } else {
                inscriptosPorDepto[departamento] = 1;
            }
        }
        return inscriptosPorDepto;
    }
    cantidadCarrerasPorDepartamento() {
        let carrerasPorDepto = {};
        for (let i = 0; i < this.carreras.length; i++) {
            let carrera = this.carreras[i];
            let departamento = carrera.departamentoCarrera;
            if (carrerasPorDepto[departamento]) {
                carrerasPorDepto[departamento]++;
            } else {
                carrerasPorDepto[departamento] = 1;
            }
        }
        return carrerasPorDepto;
    }

    promedioInscriptos(){
         let totalCarreras = this.carreras.length;
    let totalInscriptos = this.inscripciones.length;
    let promedio = 0;

    if (totalCarreras > 0) {
        promedio = totalInscriptos / totalCarreras;
    }
    return promedio;
    } 
   masInscriptos(){
    let carrerasMasInscriptos = [];
    let maxInscriptos = 0;
    for( let i=0; i< this.carreras.length; i++){
        let carrera = this.carreras[i]
        if(carrera.numeroInscripto> maxInscriptos && !carrerasMasInscriptos.includes(carrera)){
            carrerasMasInscriptos = [];
            carrerasMasInscriptos.push(carrera);
            maxInscriptos = carrera.numeroInscripto;
                         
        } else{
        if (carrera.numeroInscripto == maxInscriptos && !carrerasMasInscriptos.includes(carrera)){
            carrerasMasInscriptos.push(carrera);
        }
      }
    }
    return carrerasMasInscriptos;
   }

   sinInscriptos(){
    let carrerasSinInscriptos=[]
    for(let i=0; i<this.carreras.length;i++){
        let carrera= this.carreras[i]
        if(carrera.numeroInscripto==0){
            carrerasSinInscriptos.push(carrera)
            
        }
        
    }
    
    carrerasSinInscriptos.sort(function(a,b){return a.compararPorFechaCon(b)})
    return carrerasSinInscriptos;
   }

   porcentajeElite(){
    let porcentaje= 0
    let totalCorredores= this.corredores.length
    let corredoresElite=0
    for(let i=0;i<this.corredores.length;i++){
        if(this.corredores[i].tipoCorredor=="élite"){
            corredoresElite = corredoresElite + 1;
        }
    }
    if (totalCorredores > 0) {
    porcentaje = (corredoresElite*100)/totalCorredores
        }
        return porcentaje;
    }
}

class carrera {
    constructor(nombre, departamento, fecha, cupo) {
        this.nombreCarrera = nombre;
        this.departamentoCarrera = departamento;
        this.fechaCarrera = fecha;
        this.cupoCarrera = cupo;
        this.cupoTotal = cupo;
        this.numeroInscripto = 0;
    }
 compararNombreCon(otraCarrera) {
    return this.nombreCarrera.localeCompare(otraCarrera.nombreCarrera);
 }

 compararPorFechaCon(otraCarrera){
   let fechaA= new Date(this.fechaCarrera);
   let fechaB= new Date(otraCarrera.fechaCarrera)
   return fechaA - fechaB
 }
}
class patrocinador {
    constructor(nombre, rubro, carreras){
        this.nombrePatrocinador = nombre;
        this.rubroPatrocinador = rubro;
        this.carrerasPatrocinador = carreras;
    }

    }
class corredor {
    constructor(nombre, edad, cedula, fechaVenFichaMed, tipo){
        this.nombreCorredor = nombre;
        this.edadCorredor = edad;
        this.cedulaCorredor = cedula;
        this.fechaVenFichaMedCorredor = fechaVenFichaMed;
        this.tipoCorredor = tipo;
        
        
    }
   
    compararNombreCon(otroCorredor) {
        return this.nombreCorredor.localeCompare(otroCorredor.nombreCorredor);
    }
}
class inscripcion {
    constructor(corredor, carrera, numero){
        this.corredorInscripcion = corredor;
        this.carreraInscripcion = carrera;
        this.numeroInscripcion = numero;
  }
}
