const validateUser = require('../schemas/userSchema');
const {db} = require("../config");
const { Router } = require('express');
const router = Router();
const User = db.collection("user");
// Create
router.post("/",validateUser ,async (req, res) => {
  try {
    const data = req.body;
    await User.add({ ...data });
    return res.status(200).json({status:200, message: "Usuario registrado", data: data });
  } catch (error) {
    return res.status(500).send({ status:500,message: 'Error al registrar al usuario', error: error.message });
  }
});

router.get("/:id", (req, res) => {
  (async () => {
    try {
      const doc = User.doc(req.params.id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).send({status:200,message: "Usuario obtenido exitosamente",data:response});
    } catch (error) {
      return res.status(500).send({ status:500,message: 'Error al traer al usuario', error: error.message });
    }
  })();
});
// get all 
router.get("/", async (req, res) => {
  try {
    let query = User;
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return res.status(200).json({
        status:200,message: 'Usuarios traidos exitosamente',data:response
   });
  } catch (error) {
    return res.status(500).json({ status:500,message: 'Error al traer la lista de usuarios', error: error.message });
  }
});

router.put("/:id", validateUser,async (req, res) => {
  try {
    const document = User.doc(req.params.id);
    const data = req.body;
    await document.update(data);
    return res.status(200).json({
        status:200,message: 'Usuario editado exitosamente',data
   });
  } catch (error) {
    return res.status(500).json({ status:500,message: 'Error al editar usuario', error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const doc = User.doc(req.params.id);
    await doc.delete();
    return res.status(200).json({
         status:500,message: 'Usuario eliminado exitosamente'
    });
  } catch (error) {
    return res.status(500).send({ status:500,message: 'Error al eliminar usuario', error: error.message });
  }
});

module.exports = router;