//creando selectores
const categoria = document.querySelector('#categoria')
const year = document.querySelector('#year')
const precio = document.querySelector('#precio')
const autor = document.querySelector('#autor')
const editorial = document.querySelector('#editorial')
const resultado = document.querySelector('#resultado')

//Creando objeto
const datoBusqueda ={
    categoria:'',
    year:'',
    precio:'',
    autor:'',
    editorial:'',
}

//funcion para las opciones de filtro de año (la empresa no vende autos de 10 año o menos(en este caso))
const max = new Date().getFullYear()
//año actual "min"
const min = max-10
libros.forEach(libro => {
    const opcion = document.createElement('option')
    opcion.value=libro.year //option con valor de "i" (FOR) 
    opcion.textContent =libro.year //Agg option al html
    year.appendChild(opcion) //donde se agg etiqueta de html desde java
})


//Evento al cargar el DOM
document.addEventListener('DOMContentLoaded',()=>{
    //Va mostrar todo lo que hay en el archivo Db.js en ('resultados')
    mostrarLibros(libros)
})

//función 
function mostrarLibros(arregloLibros){
    //console.log(arregloLibros)
    limpiarHtml();//llamado de función para cuando selecciones no muestre todos si no lo que seleccionas
    console.log(arregloLibros)
    arregloLibros.forEach(i=>{
        const{titulo,categoria,year,precio,autor,editorial,} =i
        //imprimiendo
        const libroHTML = document.createElement('p')
        libroHTML.textContent = `Categoria: ${categoria}- Año: ${year} Precio:
        ${precio}- Autor: ${autor} Editorial: ${editorial}`
        //mandando a imprimir en el HTML
        resultado.appendChild(libroHTML)
    });
}

//Función para limpiar HTMl cuando seleccionas marca (ya que al cargar aparecen todos los resultados)
function limpiarHtml(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

categoria.addEventListener('change', e=>{
    //console.log(e.target.value) //para detectar lo que hace "change"
    //guardar en el objeto
    datoBusqueda.categoria = e.target.value;
    console.log(datoBusqueda)
    filtraLibro();
});

//Evento para cuando seleccionas autor
autor.addEventListener('change', e=>{
    // console.log(e.target.value);
     datoBusqueda.autor = e.target.value;
     console.log(datoBusqueda)
     filtraLibro();
 })
 
 //Evento para cuando seleccionas editorial
 editorial.addEventListener('change', e=>{
    // console.log(e.target.value);
     datoBusqueda.editorial = e.target.value;
     console.log(datoBusqueda)
     filtraLibro();
 })

//Evento para cuando seleccionas año 
year.addEventListener('change', e=>{
    //console.log(e.target.value)
    datoBusqueda.year =Number(e.target.value);
    // console.log(datoBusqueda);
    filtraLibro();
})

//Evento para cuando seleccionas el precio
precio.addEventListener('change', e=>{
    //console.log(e.target.value)// si ingresa verificando 
    datoBusqueda.precio =Number(e.target.value);//Guardando en datos búsqueda y recibiendo string y pasando a Number
    console.log(datoBusqueda)
    filtraLibro();
})

//Función para filtrar
function filtraLibro(){
     const resultado1 =
      libros.filter(filtrarCategoria).filter(filtrarYear).filter(filtrarPrecio).filter(filtrarAutor).filter(filtrarEditorial)

     //comentado ya que se necesita que ingrese a esa función después del "if" "mostrarAutos(resultado)";
     
     //Mensaje si no encuentra criterio de búsqueda// los log son para verificar donde va ingresando 
       // console.log(resultado.length)
       // console.log(resultado)
     if(resultado1.length === 0){
        //console.log('No hay resultados')
        const noResult = document.createElement('p');
        //Se usó "textcontet" porque solo permite texto. "inneHTML" permite texto(dentro de la etiqueta)pero en especial es para etiquetas HTML
        noResult.textContent = 'No hay resultados para su búsqueda';
        //Agg clase de css "noResult.classList.add('alerta')"
        noResult.classList.add('alerta','error'); //<= clases asignadas de css
        limpiarHtml();//<= limpiando html para mostrar solo el mensaje de noResult
        resultado.appendChild(noResult);//<= impimiendo mensaje de noResult
     }else{
        mostrarLibros(resultado1)//<= Este es la funcion que antes estaba fuera del "if" ('se cambió a resultado1 para evitar confusion por otro con ese nombre o algo asi')
     }
}

// función Filtro de categoria
function filtrarCategoria(libro){
    if(datoBusqueda.categoria){
        return libro.categoria.trim().toLowerCase() === datoBusqueda.categoria.trim().toLowerCase();
    }
    return libro;
}

//Función filtro de autor
function filtrarAutor(libro){
    if(datoBusqueda.autor){
        return libro.autor === datoBusqueda.autor; 
    }
    return libro;
}

//Función filtro de editorial
function filtrarEditorial(libro){
    if(datoBusqueda.editorial){
        return libro.editorial === datoBusqueda.editorial; 
    }
    return libro;
}

//Función filtro de year
function filtrarYear(libro){
    if(datoBusqueda.year){
        return libro.year === datoBusqueda.year;
    }
    return libro;
}

//Función filtro de precio
function filtrarPrecio(libro){
    if(datoBusqueda.precio){
        return libro.precio === datoBusqueda.precio; 
    }
    return libro;
}