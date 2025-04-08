const validateConectar = require('../schemas/conectarSchema');
const {db} = require("../config");
const { Router } = require('express');
const router = Router();
const Conectar = db.collection("conectar");
// Create
router.post("/",validateConectar ,async (req, res) => {
  try {
    const data = req.body;
    await Conectar.add({ ...data });
    return res.status(200).json({ message: "Usuario creado", conectar: data });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/:id", (req, res) => {
  (async () => {
    try {
      const doc = Conectar.doc(req.params.id);
      const item = await doc.get();
      const response = item.data();
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send(error);
    }
  })();
});
// get all 
router.get("/", async (req, res) => {
  try {
    let query = Conectar;
    const querySnapshot = await query.get();
    let docs = querySnapshot.docs;

    const response = docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/:id", validateConectar,async (req, res) => {
  try {
    const document = Conectar.doc(req.params.id);
    const data = req.body;
    await document.update(data);
    return res.status(200).json();
  } catch (error) {
    return res.status(500).json();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const doc = Conectar.doc(req.params.id);
    await doc.delete();
    return res.status(200).json();
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;