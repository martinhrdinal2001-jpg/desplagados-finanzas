// Parámetros de costo para calcular margen real por visita. Misma estructura que
// PROYECCION_PARAMS: estos son los valores "oficiales" — el dashboard permite jugar con
// otros valores en pantalla, pero si querés guardarlos, pedile a Claude que actualice este
// archivo. Arrancan en 0 a propósito: no se inventan tarifas — hay que cargarlas.
const COSTOS_PARAMS = {
  costoHoraMartinDelRio: 0,
  costoHoraMartinHrdina: 0,
  costoHoraTecnicoExterno: 0,
  costoKmFurgon: 0,
  costoAdministrativoPorVisita: 0,
  margenMinimoEsperado: 0.30,  // debajo de esto: "Revisar"
  margenCritico: 0.10,         // debajo de esto (o negativo): "Margen negativo"
  capacidadHorasMensualSocios: 0, // horas/mes disponibles entre los socios, para la alerta de Proyección
};
