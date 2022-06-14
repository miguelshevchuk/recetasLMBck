export interface IUpdateReceta {
    id: number
    nombre: string
    descripcion: string
    dificultad: number
    categoria: number
    ingredientes: string[]
    preparacion: IPaso[] 
  }

  interface IPaso{
    pasoNro: number
    paso: string
  }
