var url = "https://www.omdbapi.com/?"
var apikey = "apikey=56686ffa"
var pagina = 1;
$("#buscar").on("click", () => reiniciar());
$(window).scroll(buscar);
// vacia el div, reinicia la variable de las paginas a 1 y realiza la funcion buscar
function reiniciar() {
    $('#div1').empty();
    pagina = 1;
    buscar();
}
// comprueba la posicion del scroll y mete el spinner de carga, coge el nombre del input y crea la url completa y busca la respuesta
function buscar() {
    if (($(window).scrollTop()+ $(window).height()  >= $(document).height() - 150)) {
        var cargar = $('<div>');
        $(cargar).attr('class', 'spinner-grow text-primary');
        $('#div1').append(cargar);
        var nombreBuscar = $("#titulo").val();
        var nombre = nombreBuscar.split(" ");
        var buscar = "";
        //en caso de que el nombre contenga mas de una palabra las une por los espacion con +
        for (x = 0; x < nombre.length; x++) {
            if (x == 0 && nombre.length > 1) {
                buscar += nombre[x] + "+";
            } else if (x < nombre.length - 1) {
                buscar += nombre[x] + "+";
            } else {
                buscar += nombre[x];
            }
        }
        var urlBuscar = url + "s=" + buscar + "&page=" + pagina + "&" + apikey
        console.log(urlBuscar);
        $.ajax({
            //coge la url, coloca la respuestas y borra el spinner de carga y suma uno a la pagina 
            url: urlBuscar,
            success: function (respuesta) {
                console.log(respuesta);
                colocarPeliculas(respuesta);
                $(cargar).remove();
            }
        })
        pagina++;
    }
}
//pasandole como parametro el array de peliculas coloca las peliculas
function colocarPeliculas(respuesta) {
    $('#div1').attr('class', 'row justify-content-center')
    $.each(respuesta.Search, function (ind, peliculas) {
        //por cada respuesta encontrada crea un div card y al hacer click en el div hace la funcion datosPelicula()
        let pelicula = $('<div>');
        $(pelicula).attr('class', 'card text-center');
        $(pelicula).on('click', () => datosPelicula(pelicula.id))
        pelicula.id = peliculas.imdbID;
        $('#div1').append(pelicula);

        //a cada div card le inserta un img con la url que que encuentra en la respuesta de cada pelicula, 
        //en caso de que la respuesta no tenga imagen mete una imagen por defecto
        let imagen = $('<img>');
        imagen.url = peliculas.Poster;
        $(imagen).attr('class', 'card-img-top');
        if (imagen.url == 'N/A') {
            $(imagen).attr('src', './imagen/noImagen.jpg');
        } else {
            $(imagen).attr('src', imagen.url);
        }
        $(pelicula).append(imagen);
        //transicion al pasar el raton por encima del los div card
        $(pelicula).mouseenter(function () {
            $(imagen).css({
                "opacity": "0.6 ",
                "transition": "1s"

            })
            $(pelicula).css({
                "color": "white",
                "background-color": "#2A95E3",
                "transition": "1s"
            })
        })
        $(pelicula).mouseleave(function () {
            $(imagen).css({
                "opacity": "1",
                "transition": "1s"
            })
            $(pelicula).css({
                "color": "black",
                "background-color": "white",
                "transition": "1s"
            })
        })
        //Añade al div card un div con un h5 que contiene el titulo de la carta
        let cuerpo = $('<div>');
        $(cuerpo).attr('class', 'card-body ');
        let titulo = $('<h5>');
        $(titulo).attr('class', 'card-title');
        $(titulo).text(peliculas.Title);
        $(pelicula).append(cuerpo);
        $(cuerpo).append(titulo);
    })

}
//pasandole como parametro el id de la pelicula, busca todos los datos sobre la pelicula
function datosPelicula(id) {
    let id1 = "i=" + id;
    let urlDatos = url + id1 + "&" + apikey;
    $.ajax({
        url: urlDatos,
        success: function (respuesta) {
            console.log(respuesta);
            colocarModal(respuesta);
        }
    })

}
//pasandole como parametro los datos de la pelicula, coge la valoracion y rellena las estrellas, 
// la clase checked esta definida en el css
function pintarEstrellas(respuesta) {
    let puntuacion = respuesta.imdbRating;
    switch (Math.round((puntuacion / 2))) {
        case 1:
            $('#1').attr('class', 'fa fa-star-o checked');
            $('#2').attr('class', 'fa fa-star-o');
            $('#3').attr('class', 'fa fa-star-o');
            $('#4').attr('class', 'fa fa-star-o');
            $('#5').attr('class', 'fa fa-star-o');
            break;
        case 2:
            $('#1').attr('class', 'fa fa-star-o checked');
            $('#2').attr('class', 'fa fa-star-o checked');
            $('#3').attr('class', 'fa fa-star-o');
            $('#4').attr('class', 'fa fa-star-o');
            $('#5').attr('class', 'fa fa-star-o');
            break;
        case 3:
            $('#1').attr('class', 'fa fa-star-o checked');
            $('#2').attr('class', 'fa fa-star-o checked');
            $('#3').attr('class', 'fa fa-star-o checked');
            $('#4').attr('class', 'fa fa-star-o');
            $('#5').attr('class', 'fa fa-star-o');
            break;
        case 4:
            $('#1').attr('class', 'fa fa-star-o checked');
            $('#2').attr('class', 'fa fa-star-o checked');
            $('#3').attr('class', 'fa fa-star-o checked');
            $('#4').attr('class', 'fa fa-star-o checked');
            $('#5').attr('class', 'fa fa-star-o');
            break;
        case 5:
            $('#1').attr('class', 'fa fa-star-o checked');
            $('#2').attr('class', 'fa fa-star-o checked');
            $('#3').attr('class', 'fa fa-star-o checked');
            $('#4').attr('class', 'fa fa-star-o checked');
            $('#5').attr('class', 'fa fa-star-o checked');
            break;
        default:
            $('#1').attr('class', 'fa fa-star-o');
            $('#2').attr('class', 'fa fa-star-o');
            $('#3').attr('class', 'fa fa-star-o');
            $('#4').attr('class', 'fa fa-star-o');
            $('#5').attr('class', 'fa fa-star-o');
    }
}
//pasandole como parametro los datos de la pelicula rellena el modal con los datos recibidos
function colocarModal(respuesta) {
    $('.modal-title').text(respuesta.Title);
    //en caso de que la pelicula no tenga imagen le pone una imagen por defecto
    if (respuesta.Poster == 'N/A') {
        $('#imagen').attr('src', './imagen/noImagen.jpg');
    } else {
        $('#imagen').attr('src', respuesta.Poster);
    }
    $('#genero').text(respuesta.Genre)
    $('#estreno').text(respuesta.Released)
    $('#director').text(respuesta.Director)
    $('#escritor').text(respuesta.Writer)
    $('#actores').text(respuesta.Actors)
    $('#sinopsis').text(respuesta.Plot)
    $('#puntuacion').text(respuesta.imdbRating)
    pintarEstrellas(respuesta);
    $('#modelId').modal("show");
}