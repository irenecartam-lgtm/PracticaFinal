Práctica Final Irene Carretero y Ariadna Jové

Introducción:

Esta práctica consiste en crear una web de viajes, donde se puedan crear, explorar y gestionar viajes.

La aplicación desarrollada, TripPlanner+, permite al usuario organizar viajes de forma interactiva mediante diferentes apartados conectados entre sí. A lo largo de la web, el usuario puede consultar destinos populares, crear viajes personalizados, añadir actividades, consultar el tiempo en distintas ciudades y obtener sugerencias mediante una IA integrada en formato de chat.

Objetivos:

El principal objetivo del proyecto ha sido desarrollar una web de viajes dinámica y responsive utilizando únicamente HTML, CSS y JavaScript vanilla. A lo largo de la práctica se han implementado diferentes funcionalidades interactivas, como formularios dinámicos, validación de fechas, creación y eliminación de viajes y actividades, navegación entre páginas mediante botones y almacenamiento persistente de datos con LocalStorage.

También se ha trabajado la estructura visual de la web utilizando clases e identificadores específicos en CSS para personalizar cada apartado y mantener un diseño homogéneo y organizado. Además, se han integrado servicios externos como la API meteorológica y el sistema de sugerencias mediante IA para mejorar la experiencia de usuario y simular una plataforma real de planificación de viajes.

Estructura

Para ello, primero miramos qué secciones debíamos crear. Decidimos hacer seis: página principal, destinos populares, apartado de consulta con IA, sección meteorológica, apartado “About Us” y formulario de contacto.

En total hemos dividido el trabajo en tres partes: el índice principal, la sección de IA y la parte de gestionar los viajes propios. Es por eso que hay 3 html y cada uno con su respectivo css y java script. Así, se nos ha hecho mucho más fácil conectar cada pestaña y gestionar las funciones de cada parte.

Como estructura general del índice principal, el Header continene todo los botones interactivos para accedera todas las secciones. En la página principal se observa una pequeña introducción y unas fotos. Luego tenemos la parte del carrousel, gestionada por arrays en el java script. A continuación pasamos a la parte de la IA, donde hay una introducción y un botón que nos lleva a otra pestaña. En clase, vimos como conectar la Api Key de la IA y cómo hacer que el chat respondiese. después encontramos el apartado del tiempo, que si se introduce una ciudad aparecen tarjetas que indican qué tiempo hará en los próximos 5 días. Luego, está el apartado About us, donde aparecemos nosotras: Irene y Ariadna con una breve introducción. Más abajo hay un formulario de contacto, y para terminar, está el footer con el menú repetido y las redes sociales.

Cabe destacar que hemos utilizado la API REST de EmailJS y que funciona correctamente: tanto al usuario como a nosotras nos llegan los mails. También para guardarnos los viajes creados hemos utilizado LocalStorage. Por último, hemos pensado en incluir botones interactivos que dirijiesen al usuario a diferentes partes de la web, para mejorar la UX así como utilizar la ayuda de la IA para incluir cosas que no hemos visto en clase como el carrousel, para ampliar nuestro conocimiento.


Posibles mejoras:

Algunas posibles mejoras que haríamos a la web serían ampliar el apartado de la IA, añadiendo un sistema donde se guardasen las conversaciones anteriores y se pudiesen consultar más tarde mediante un historial o diferentes hilos de chat.

Además en la parte de Destinos Populares, podríamos crear un botón que dirijiese al usuario a explorar los destinos deseados en la página principal, para profundizar en el destino deseado y visitar todas las posibilidades que ofrece.

Dificultades y resoluciones:

Uno de los apartados que más nos costó fue la sección del tiempo. No sabíamos cómo mostrar correctamente la previsión meteorológica de los siguientes cinco días para cada ciudad. Para solucionarlo, tuvimos que trabajar con una API externa y organizar la información recibida mediante JavaScript.
Además, añadimos varias validaciones para evitar errores cuando el usuario escribía mal el nombre de una ciudad o cuando directamente esa ciudad no existía. En esos casos, mostramos mensajes de error para mejorar la experiencia del usuario y evitar que la aplicación fallase.

Otra dificultad importante fue la responsividad del menú de navegación cuando la web pasaba a formato móvil. Para solucionarlo, creamos un menú hamburguesa utilizando un botón específico y una clase active que se añadía o eliminaba con JavaScript según si el menú estaba abierto o cerrado.
En el HTML utilizamos distintos id y class para identificar cada parte del menú y poder modificar su comportamiento dependiendo del tamaño de pantalla. Después, mediante @media en CSS, cambiamos la distribución del nav para que en móvil apareciese oculto y se mostrase verticalmente al pulsar el botón hamburguesa. Finalmente, en JavaScript utilizamos classList.toggle("active") para activar y desactivar el menú dinámicamente.
También tuvimos problemas con los botones dentro de las tarjetas de viajes. Cuando hacíamos clic en botones como “Add Activity” o “Delete Trip”, la tarjeta se cerraba automáticamente porque el evento click afectaba también al contenedor principal de la tarjeta.
Para solucionarlo utilizamos e.stopPropagation(), evitando que el evento del botón se propagase al elemento padre. De esta forma conseguimos que los botones funcionasen correctamente sin cerrar la tarjeta.

Por último, tuvimos dificultades con la validación de las fechas de los viajes. Necesitábamos evitar que el usuario introdujese fechas incorrectas, como una fecha final anterior a la inicial o fechas pasadas.
Para resolverlo, creamos una función en JavaScript que convertía las fechas en objetos Date y comparaba sus valores. Después, restábamos y comprobábamos el resultado para validar si las fechas eran correctas antes de guardar el viaje.

Conclusiones:

En conclusión, esta práctica nos ha permitido aplicar y profundizar muchos de los conocimientos trabajados durante la asignatura a través de HTML, CSS y JavaScript. A lo largo del proyecto hemos aprendido a estructurar mejor una web, conectar diferentes apartados entre sí y gestionar funcionalidades dinámicas de una forma más organizada.

Además, el desarrollo de la práctica nos ha ayudado mucho en la resolución de problemas, ya que durante el proceso han surgido bastantes errores relacionados con la responsividad, validaciones, eventos de botones o integración de APIs. Tener que investigar, probar distintas soluciones y corregir errores nos ha permitido entender mejor cómo funciona realmente una aplicación web completa.

También nos ha servido para explorar nuevas herramientas y posibilidades mediante la IA. Hemos podido resolver dudas y  ampliar funcionalidades que no habíamos trabajado en clase, como el carrousel. Esto nos ha ayudado a ampliar conocimientos de forma más autónoma y experimentar con nuevas formas de programar.

Finalmente, creemos que el proyecto ha servido para entender cómo organizar una aplicación más grande y dividir correctamente el trabajo entre HTML, CSS y JavaScript, manteniendo una estructura clara y funcional. Nos ha gustado mucho y creemos que es temario útil para nuestro futuro.