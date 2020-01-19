var url = "http://www.omdbapi.com/?"
var apikey = "apikey=56686ffa"
var pagina = 1;
$("#buscar").on("click", () => reiniciar());
$(window).scroll(buscar);
//
function reiniciar() {
    $('#div1').empty();
    pagina = 1;
    buscar();
}
//
function buscar() {
    if (($(window).scrollTop() + $(window).height() >= $(document).height() - 150)) {
        var cargar = $('<div>');
        $(cargar).attr('class', 'spinner-grow text-primary');
        $('#div1').append(cargar);
        var nombreBuscar = $("#titulo").val();
        var nombre = nombreBuscar.split(" ");
        var buscar = "";
        //
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

function colocarPeliculas(respuesta) {
    $('#div1').attr('class', 'row justify-content-center')
    $.each(respuesta.Search, function (ind, peliculas) {
        //
        let pelicula = $('<div>');
        $(pelicula).attr('class', 'card text-center');
        $(pelicula).on('click', () => datosPelicula(pelicula.id))
        pelicula.id = peliculas.imdbID;
        $('#div1').append(pelicula);

        //
        let imagen = $('<img>');
        imagen.url = peliculas.Poster;
        $(imagen).attr('class', 'card-img-top');
        if (imagen.url == 'N/A') {
            $(imagen).attr('src', './imagen/noImagen.jpg');
        } else {
            $(imagen).attr('src', imagen.url);
        }
        //
        $(pelicula).append(imagen);
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
        //
        let cuerpo = $('<div>');
        $(cuerpo).attr('class', 'card-body ');
        let titulo = $('<h5>');
        $(titulo).attr('class', 'card-title');
        $(titulo).text(peliculas.Title);
        $(pelicula).append(cuerpo);
        $(cuerpo).append(titulo);
    })

}
//
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
//
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
//
function colocarModal(respuesta) {
    $('.modal-title').text(respuesta.Title);
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