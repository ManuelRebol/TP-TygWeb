<<<<<<< Updated upstream
$(document).ready(function () {

    $('.apis').hide();
    $('.map-overlay').hide();

    const frases = [
        { text: "“No sé con qué armas se peleará la tercera guerra mundial, pero la cuarta será con palos y piedras” - Albert Einstein", class: "sombra1" },
        { text: "“Un hombre provisto de papel, lápiz y goma, y con sujeción a una disciplina estricta, es, en efecto, una Máquina de Turing universal” - Alan Turing", class: "sombra2" },
        { text: "“A partir de entonces, cuando algo iba mal con un ordenador, nos decían que tenía bichos (bugs)” - Grace Murray Hopper", class: "sombra3" }
    ];


    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    $('#frase').text(fraseAleatoria.text).addClass(fraseAleatoria.class);

    $('#api1').click(function (e) {
        $('.apis').empty();
        $('.apis').hide();
        $('.map-overlay').hide();
        e.preventDefault();
        perroAleatorio()
    });

    $('#api2').click(function (e) {
        $('.apis').empty();
        $('.apis').hide();
        $('.map-overlay').hide();
        $('.inputDay').prop('checked', true);
        $('#options-view-button').prop('disabled', false);
        $('#switch').prop('checked',false).change();

        e.preventDefault();
        mapa();
    });




    function perroAleatorio() {
        $('#perroAleatorio').show();

        $.ajax({
            url: 'https://random.dog/woof.json',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const perroAleatorio = $('#perroAleatorio');
                if (data.url.endsWith('.mp4') || data.url.endsWith('.webm')) {
                    //Es un video
                    perroAleatorio.append(`<video controls>
                                          <source src="${data.url}" type="video/mp4">
                                       </video>`);
                } else {
                    //Es una imagen o gif
                    perroAleatorio.append(`<img src="${data.url}" alt="perroAleatorio Aleatorio de Perros">`);
                }
            },
            error: function (req, status, err) {
                console.log(req, status, err);
            }
        });
    }


    function mapa() {
        $('#mapa').show();
        $('.map-overlay').show();

        mapboxgl.accessToken = 'pk.eyJ1IjoibWFub2xhcyIsImEiOiJjbHdtbjV2dG8yMmZqMnNvY2JuZjZodXJhIn0.GriQgL3MrRjqDpBCOfWoZw';

        // Inicializar el mapa
        const mapa = new mapboxgl.Map({
            container: 'mapa',
            style:'mapbox://styles/mapbox/standard',
            center: [-57.92588780370186, -34.90405329824272], // Coordenadas iniciales [lng, lat]
            zoom: 2,
            boxzoom: true,
            projection: 'globe',
            attributionControl: false,

        });


        mapa.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );

        // Añadir controles de navegación
        mapa.addControl(new mapboxgl.NavigationControl());
        mapa.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        }));
        mapa.addControl(new mapboxgl.AttributionControl({
            customAttribution: 'TP individual TygWeb'
        }));
        mapa.addControl(new mapboxgl.FullscreenControl({ container: $('body') }));

        // Función para agregar un marcador
        function addMarker(lng, lat) {
            const markerHeight = 56;
            const markerRadius = 10;
            const linearOffset = 25;
            const popupOffsets = {
                'top': [0, 0],
                'top-left': [0, 0],
                'top-right': [0, 0],
                'bottom': [0, -markerHeight],
                'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
                'left': [markerRadius, (markerHeight - markerRadius) * -1],
                'right': [-markerRadius, (markerHeight - markerRadius) * -1]
            };


            new mapboxgl.Marker({
                color: 'red',
                scale: 2
            })
                .setLngLat([lng, lat])
                .addTo(mapa)
                .setPopup(new mapboxgl.Popup({
                    maxWidth: '400px',
                    offset: popupOffsets
                }).setHTML(`<div style="display:flex;flex-direction:column;justify-content:space-between;">
                <h3 style="flex:3;margin:0;">Universidad Tecnológica Nacional – Facultad Regional La Plata (U.T.N. – F.R.L.P.)</h3><p style="margin-bottom:0">Coordenadas: ${lat}, ${lng}</p></div>`)) // Añadir popup al marcador
                .togglePopup();
        }

        // Realizar la solicitud a la API de Mapbox
        $.ajax({
            url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                access_token: mapboxgl.accessToken
            },
            success: function (response) {
                var coord = { lat: -57.92588780370186, lng: -34.90405329824272 };
                //Llamar a la función para agregar un marcador
                addMarker(coord.lat, coord.lng);

                console.log('Mapa cargado con éxito');
            },
            error: function (error) {
                console.error('Error al cargar la API:', error);
            }
        });
        $('input[name="platform"]').on('change', function () {
            mapa.setConfigProperty('basemap', 'lightPreset', this.value);
        });

        $('#switch').on('change',function(){
            if(this.checked){
                mapa.setStyle('mapbox://styles/mapbox/satellite-streets-v12');
                
                $('.inputDay').prop('checked', true);
                $('#options-view-button').prop('checked', false);
                $('#options-view-button').prop('disabled', true);
                




            }else{
                $('#options-view-button').prop('disabled', false);
                mapa.setStyle('mapbox://styles/mapbox/standard');
            }
        });
    }
});
=======
$(document).ready(function () {
  //oculto divs contenedores de las apis, switch de vista satelital y dropdown de modos
  $(".apis").hide();
  $(".map-overlay").hide();

  //defino mis frases
  const frases = [
    {
      text: "“No sé con qué armas se peleará la tercera guerra mundial, pero la cuarta será con palos y piedras” - Albert Einstein",
      class: "sombra1",
    },
    {
      text: "“Un hombre provisto de papel, lápiz y goma, y con sujeción a una disciplina estricta, es, en efecto, una Máquina de Turing universal” - Alan Turing",
      class: "sombra2",
    },
    {
      text: "“A partir de entonces, cuando algo iba mal con un ordenador, nos decían que tenía bichos (bugs)” - Grace Murray Hopper",
      class: "sombra3",
    },
  ];

  //función que me permite colocar una frase aleatoria de entre las tres opciones
  const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
  $("#frase").text(fraseAleatoria.text).addClass(fraseAleatoria.class);

  //al clickear #api1 vacío y oculto los contenedores de apis, así como switch de vista satelital y dropdown de modos, y llamo a la api de perro aleatorio
  $("#api1").click(function (e) {
    $(".apis").empty();
    $(".apis").hide();
    $(".map-overlay").hide();
    e.preventDefault();
    perroAleatorio();
  });

  //al clickear #api2 vacío y oculto los contenedores de apis, así como setear el dropdown de modo en día y colapsarlo, setear el switch de vista satelital en apagado, y llamo a la api de mapas.
  $("#api2").click(function (e) {
    $(".apis").empty();
    $(".apis").hide();
    $(".inputDay").prop("checked", true);
    $("#options-view-button").prop("disabled", false);
    $("#switch").prop("checked", false).change();

    e.preventDefault();
    mapa();
  });

  function perroAleatorio() {
    //Realizo peticion a la api de perro aleatorio
    $.ajax({
      url: "https://random.dog/woof.json",
      method: "GET",
      dataType: "json",
      success: function (data) {
        // muestro api de perro aleatorio
        $("#perroAleatorio").show();

        //em caso de funcionar correctamente, analiza si el contenido es video o imagen/gif para setear las etiquetas html correspondientes
        const perroAleatorio = $("#perroAleatorio");
        if (data.url.endsWith(".mp4") || data.url.endsWith(".webm")) {
          //Es un video
          perroAleatorio.append(`<video controls>
                                          <source src="${data.url}" type="video/mp4">
                                       </video>`);
        } else {
          //Es una imagen o gif
          perroAleatorio.append(
            `<img src="${data.url}" alt="perroAleatorio Aleatorio de Perros">`
          );
        }
        console.log(data);
      },
      error: function (req, status, err) {
        console.log(req, status, err);
      },
    });
  }

  function mapa() {
    //muestro contenedores de mapa, switch de vista satelital y dropdown de modos
    $("#mapa").show();
    $(".map-overlay").show();

    // token de acceso público de mapbox
    mapboxgl.accessToken =
      "pk.eyJ1IjoibWFub2xhcyIsImEiOiJjbHdtbjV2dG8yMmZqMnNvY2JuZjZodXJhIn0.GriQgL3MrRjqDpBCOfWoZw";

    // Inicializar el mapa
    const mapa = new mapboxgl.Map({
      container: "mapa", //div que lo contiene
      style: "mapbox://styles/mapbox/standard", //estilo de mapa
      center: [-57.92588780370186, -34.90405329824272], // Coordenadas iniciales [lng, lat] (cooredenadas de la utn)
      zoom: 2, //zoom inicial
      boxzoom: true, //permite hacer zoom apretando shift + mousedrag
      projection: "globe", //muestra proyección de tipo globo
      attributionControl: false, 
    });

    //añade controles de ubicación
    mapa.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    // Añade controles de navegación
    mapa.addControl(new mapboxgl.NavigationControl());
    mapa.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    // añade etiqueta personal de atribución
    mapa.addControl(
      new mapboxgl.AttributionControl({
        customAttribution: "TP individual TygWeb",
      })
    );
    mapa.addControl(new mapboxgl.FullscreenControl({ container: $("body") }));

    // Función para agregar un marcador, en este caso ubicado en la utn
    function addMarker(lng, lat) {
      const markerHeight = 56;
      const markerRadius = 10;
      const linearOffset = 25;
      const popupOffsets = {
        top: [0, 0],
        "top-left": [0, 0],
        "top-right": [0, 0],
        bottom: [0, -markerHeight],
        "bottom-left": [
          linearOffset,
          (markerHeight - markerRadius + linearOffset) * -1,
        ],
        "bottom-right": [
          -linearOffset,
          (markerHeight - markerRadius + linearOffset) * -1,
        ],
        left: [markerRadius, (markerHeight - markerRadius) * -1],
        right: [-markerRadius, (markerHeight - markerRadius) * -1],
      };

      //funcion que crea el marcador y le añade un popup con información de ubicación
      new mapboxgl.Marker({
        color: "red",
        scale: 2,
      })
        .setLngLat([lng, lat])
        .addTo(mapa)
        .setPopup(
          new mapboxgl.Popup({
            maxWidth: "400px",
            offset: popupOffsets,
          })
            .setHTML(`<div id="popupMarker">
                <h3>Universidad Tecnológica Nacional – Facultad Regional La Plata (U.T.N. – F.R.L.P.)</h3><p>Coordenadas: ${lat}, ${lng}</p></div>`)
        ) // Añadir popup al marcador
        .togglePopup();
    }

    // Realizo la solicitud a la API de Mapbox
    $.ajax({
      url: "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        access_token: mapboxgl.accessToken,
      },
      success: function (response) {
        var coord = { lat: -57.92588780370186, lng: -34.90405329824272 };
        //Llamo a la función para agregar un marcador
        addMarker(coord.lat, coord.lng);

        console.log("Mapa cargado con éxito\n", response);
      },
      error: function (error) {
        console.error("Error al cargar la API:", error);
      },
    });

    //recibe evento de cambio en el dropdown de modo y stea el modo correspondiente
    $('input[name="platform"]').on("change", function () {
      mapa.setConfigProperty("basemap", "lightPreset", this.value);
    });

    //recibe evento de cambio del switch de vista satelital, si se prende setea la vista satelital e inhabilita el cambio de modo seteandolo en day por defecto. Del contrario, si se apaga habilita el cambio de modo y setea la vista estándar
    $("#switch").on("change", function () {
      if (this.checked) {
        mapa.setStyle("mapbox://styles/mapbox/satellite-streets-v12");

        $(".inputDay").prop("checked", true);
        $("#options-view-button").prop("checked", false);
        $("#options-view-button").prop("disabled", true);
      } else {
        $("#options-view-button").prop("disabled", false);
        mapa.setStyle("mapbox://styles/mapbox/standard");
      }
    });
  }
});
>>>>>>> Stashed changes
