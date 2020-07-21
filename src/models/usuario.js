const conexion=require('../database');
module.exports={
    verificar(usuario,clave){
        return new Promise((resolve,reject) =>{
            conexion.query('select * from usuarios WHERE nombre=? AND clave=?',[usuario,clave],(err,usuario)=>{
                if (err) reject(err)
                else if (usuario.length>=1) resolve(usuario[0]);
                else  resolve(false);
            });
        } )
    },
    listado (){
        return new Promise((resolve,reject)=>{
            conexion.query('select * from personal',
                (err,rows)=>{
                    if (err) reject(err);
                    else resolve(rows);
                }
            )
        })
    },
    buscar(id){
        return new Promise((resolve,reject)=>{
            conexion.query('select * from personal WHERE idpersonal=?',[id],
                (err,rows)=>{
                    if (err) reject(err);
                    else resolve(rows);
                }
            )
        })
    },
    insertar(nombre,cargo,imagen){
        return new Promise((resolve,reject) =>{
            conexion.query('INSERT INTO personal SET nombre=?, cargo=?, imagen=?',[nombre,cargo,imagen],(err,usuario)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                else  resolve("si");
            });
        } )
    },
    modificar(nombre,cargo,id){
        return new Promise((resolve,reject) =>{
            conexion.query('UPDATE personal SET nombre=?, cargo=? WHERE idpersonal=?',[nombre,cargo,id],(err,usuario)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                else  resolve("si");
            });
        } )
    },
    eliminar(id){
        return new Promise((resolve,reject) =>{
            conexion.query('DELETE FROM personal WHERE idpersonal=?',[id],(err,usuario)=>{
                if (err) reject(err)
                //else if (usuario.length>=1) resolve(usuario[0]);
                else  resolve("si");
            });
        } )
    },
}