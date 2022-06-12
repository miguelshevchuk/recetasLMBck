export interface IUpdateReceta {
    recetaId: number
    nombre: string
    descripcion: string
    dificultad: number
    categoria: number
    ingredientes: string[]
    pasos: IPaso[] 
  }

  interface IPaso{
    pasoNro: number
    paso: string
  }
