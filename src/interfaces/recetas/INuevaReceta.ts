export interface INuevaReceta {
    nombre: string
    descripcion: string
    dificultad: number
    categoria: number
    ingredientes: string[]
    preparacion: IPaso[] 
    imagen:string
  }

  interface IPaso{
    pasoNro: number
    paso: string
  }
