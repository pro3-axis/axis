# Axis · Sprint 3

Webapp de Proyectos III con Node.js, TypeScript y Vite. La agenda, Axel y el correo simulado funcionan en el navegador. Los eventos, las prioridades y los cambios de horario resueltos se guardan localmente.

## Arrancar

Requiere Node.js 22.12 o superior.

```sh
npm ci
npm run dev
```

`npm run build` comprueba los tipos y genera el sitio en `dist/`. `npm run preview` sirve esa compilación.

## Demo

La agenda arranca el miércoles 25 de noviembre de 2026. Usa «Hoy» para volver a la fecha de la demo.

1. Pulsa «Tutoría el jueves a las 17:00» en Axel y confirma el evento libre.
2. Pulsa «Reunión el miércoles a las 16:30». Coincide con la reunión de prácticas. Pulsa «Usar hueco» y confirma la alternativa de las 19:30.
3. Abre «Correo», revisa una propuesta y confírmala. En la bandeja, el correo queda marcado como «En agenda».
4. En «Requieren acción», revisa el correo de cambio de la reunión de prácticas. Axel compara los dos horarios y detecta el solape con Ingeniería del software. Puedes aceptar el solape o elegir un hueco libre y confirmar. Axis mueve el evento original y marca el correo como «Cambio aplicado».
5. Edita las prioridades desde «Mis calendarios» para ver cómo cambia el orden de correos y conflictos. Un filtro de visibilidad solo afecta a lo que se muestra en la cuadrícula.

Axel acepta frases como «Tengo una tutoría el jueves a las 17:00» y «Repasar física el 27 de noviembre a las 12:00 en Universidad». Los días de la semana se buscan a partir del día seleccionado, incluido ese mismo día. Con «el siguiente jueves» o «el próximo jueves», la búsqueda empieza al día siguiente del seleccionado. «El jueves 3» y «el 3 jueves» buscan la primera fecha en que coincidan tanto el día de la semana como el número de día del mes. También admite fechas como «el 27/11» y «el día 27». Una fecha sin año usa el año seleccionado. Un día sin mes usa el mes seleccionado. Si omites el día, Axel usa el día seleccionado. Para indicar un intervalo, escribe «Estudiar mates el 3 de diciembre de 9 a 11» o «Repasar el viernes de 9:30 a 11:15». Si solo indicas la hora de inicio, el evento dura una hora. El calendario por defecto es Personal. Las horas de agenda van de 08:00 a 22:00. Para una propuesta que se solapa, Axis busca el siguiente hueco en pasos de 15 minutos, durante un máximo de siete días. Las prioridades organizan los avisos y la bandeja. Un evento ocupado siempre cuenta al buscar huecos.


Puedes mover cualquier evento de la agenda desde Axel. Prueba «Cambia la reunión de prácticas a las 12:30» para mantener el día, o «Mueve la reunión de prácticas al viernes a las 12:30» para cambiar el día. Si solo indicas una hora de inicio se conserva la duración. Axel pide que elijas si hay varios eventos con el mismo nombre y comprueba el nuevo horario antes de que confirmes el cambio.
