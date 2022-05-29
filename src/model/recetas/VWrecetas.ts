// import {
//     ViewEntity,
//     Connection,
//     ViewColumn
//   } from 'typeorm'
// import { Receta } from './Receta'

// @ViewEntity({
//     name: "VW_RECETAS",
//     expression: (connection: Connection) => connection.createQueryBuilder()
//             .select("r.recetaId", "recetaId")        
//             .addSelect("r.nombre", "nombre")
//             .addSelect("r.descripcion", "descripcion")
//             .addSelect("r.dificultad", "dificultad")
//             .addSelect("r.imagen", "imagen")
//             .addSelect("AVG(c.calificacion)", "calificacionPromedio")
//             .from(Receta, "r")
//             .innerJoin('r.calificaciones', 'c')
//             .groupBy('r.recetaId')
//             .addGroupBy("c.calificacion")
            
// })
// export class VWReceta {

//     @ViewColumn()
//     reelId!: number

//     @ViewColumn()
//     grupoId!: number

//     @ViewColumn()
//     titulo!: string

//     @ViewColumn()
//     cantidadLikes!: number
 
//     @ViewColumn()
//     imagen!: number
// }
