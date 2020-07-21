const expression=require('express');
const router=expression.Router();
const musuario=require('../models/usuario');
var multer  = require('multer');
const path = require('path');
var storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
  })
   
  var upload = multer({ storage: storage })
//var upload = multer({ dest: 'uploads/' })
function estalogeado (req,res, next) {
    //console.log(req.user);
    if (req.user){
     next();
    }else{
        res.redirect('/');
    }
}

router.get('/admin',estalogeado,(req,res)=>{
    musuario.listado()
        .then(datos=>{
            res.render('admin',{datos});
        });
})
router.get('/credential/:id',(req,res)=>{
    musuario.buscar(req.params.id).then(datos=>{
//            res.redirect('/admin');
        //console.log(datos);
        res.render('credential',{datos});
    });
});
router.post('/personal',upload.single('avatar'),estalogeado,(req,res)=>{
    console.log(req.file);
    musuario.insertar(req.body.nombre,req.body.cargo,req.file.filename)
        .then(datos=>{
            res.redirect('/admin');
        });
})
router.post('/personalmodificar',estalogeado,(req,res)=>{
    musuario.modificar(req.body.nombre,req.body.cargo,req.body.id)
        .then(datos=>{
            res.redirect('/admin');
        });
})
router.get('/eliminar/:id',estalogeado,(req,res)=>{
    musuario.eliminar(req.params.id)
        .then(datos=>{
            res.redirect('/admin');
        });
});
module.exports=router;