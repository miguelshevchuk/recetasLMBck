type MapError = Record<string, ErrorType>;

export class ErrorType {

    mensaje:string
    status:number

    constructor(mensaje, status=406){
        this.mensaje = mensaje
        this.status = status
    }
    
}


export const ErrorMap: MapError = {
    CREDENCIALES_INVALIDAS: new ErrorType("Las credenciales ingresadas son invalidas", 401),
    JWT_SECRET: new ErrorType("Error de configuracion"),
    JWT_CREATE: new ErrorType("Error al generar el token"),
    USUARIO_INEXISTENTE: new ErrorType("Usuario Invalido", 401),
    RECETA_NO_PROPIA: new ErrorType("No tiene permisos para modificar la receta seleccionada", 401),
    USUARIO_EXISTENTE: new ErrorType("El email ya se encuentra en uso", 400),
    CLOUDINARY_ERROR: new ErrorType("Ocurrio un error al procesar el reel", 500),
    NO_EXISTEN_RECETAS: new ErrorType("No existen recetas para la consulta realizada"),
    PARAMETRO_PASOS_VACIO: new ErrorType("Debe agregar al menos un paso"),
    PARAMETRO_INGREDIENTES_VACIO: new ErrorType("Debe agregar al menos un ingrediente"),
    SIN_CALIFICAR: new ErrorType("No se Califico la receta seleccionada"),
    
}
