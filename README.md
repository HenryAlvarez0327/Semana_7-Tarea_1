# Semana 7 - Tarea 1
## Generación de Reporte de Factura mediante JavaScript
###  Descripción
Este proyecto consiste en la implementación de un módulo de generación de facturas dentro de una aplicación CRUD de productos desarrollada con **Angular** y conectada a una API en **.NET**. La funcionalidad principal es permitir al usuario seleccionar productos, indicar cantidades y generar automáticamente un reporte de factura dinámico utilizando **JavaScript nativo** y la función `window.print()` para impresión o guardado en PDF.
###  Objetivo
Generar un reporte de factura dinámico desde el navegador, calculando subtotal, IVA y total en tiempo real a partir de productos seleccionados, sin necesidad de librerías externas de reportes.
###  Tecnologías utilizadas
* Angular (Standalone Components)
* TypeScript
* HTML + CSS
* JavaScript nativo
* .NET Web API
* LocalStorage (persistencia de datos del cliente)
###  Funcionalidades implementadas
* Listado dinámico de productos desde API.
* Buscador en tiempo real.
* Selección múltiple de productos.
* Campo de cantidad por producto.
* Formulario de datos del cliente:
  * Nombre
  * Cédula/RUC
  * Dirección
  * Teléfono
* Cálculo automático de:
  * Subtotal
  * IVA (15%)
  * Total
* Generación automática de factura en nueva ventana.
* Impresión directa o guardado como PDF mediante `window.print()`.
* Persistencia de datos del cliente usando LocalStorage.
###  Lógica de generación de factura
El sistema realiza los siguientes pasos al presionar **Generar Factura**:
1. Obtiene productos seleccionados.
2. Calcula totales según cantidad y precio.
3. Genera HTML dinámico con JavaScript.
4. Abre una nueva ventana.
5. Inserta la factura generada.
6. Ejecuta `window.print()` automáticamente.
###  Método de impresión
Se utiliza la función:
window.print()
La cual permite:
* Imprimir directamente
* Guardar como PDF
* Exportar reporte
Esto cumple con el requisito solicitado en la tarea de generar reportes mediante JavaScript.
###  Resultado obtenido
El sistema genera una factura visual profesional que incluye:
* Datos de la empresa
* Datos del cliente
* Lista de productos
* Totales
* Número de factura automático
* Fecha y hora
###  Conclusión
Se logró implementar correctamente un sistema de generación de facturas dinámicas mediante JavaScript puro integrado dentro de una aplicación Angular. Esta solución demuestra que es posible construir reportes funcionales y profesionales sin depender de librerías externas, cumpliendo completamente con los requisitos académicos planteados en la actividad.
###  Autor
Proyecto desarrollado por:
**Henry Alvarez**
Asignatura: Aplicaciones Web
Semana: 7
Tipo: Tarea Práctica
# Evidencia
<img width="1894" height="980" alt="image" src="https://github.com/user-attachments/assets/eded7917-b3a0-495f-9327-382cfec8b550" />
<img width="1186" height="408" alt="image" src="https://github.com/user-attachments/assets/0f7e8cc0-20e5-4816-8d14-22b1bd2e6e39" />
<img width="1889" height="977" alt="image" src="https://github.com/user-attachments/assets/0b5db807-fd03-497c-8a33-ea2222b5a062" />
<img width="1904" height="963" alt="image" src="https://github.com/user-attachments/assets/79338b95-8846-41a2-9965-ccb65db6fad9" />
<img width="1918" height="409" alt="image" src="https://github.com/user-attachments/assets/3d5027e3-4dcc-4c7f-84ee-b3adea23e2a1" />
<img width="1131" height="184" alt="image" src="https://github.com/user-attachments/assets/dfee6012-f7e3-426c-8f0e-5a66b8a41c5f" />
<img width="1907" height="1037" alt="image" src="https://github.com/user-attachments/assets/6769545d-cd0e-49e6-951b-d17d4642c416" />
<img width="1913" height="971" alt="image" src="https://github.com/user-attachments/assets/33a6f23b-9c6e-45cf-baea-bbfa6829c5e9" />
