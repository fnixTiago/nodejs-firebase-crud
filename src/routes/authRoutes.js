const { Router } = require('express');
const { db, auth } = require("../config");
const router = Router();
const User = db.collection("user");
// Endpoint para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      displayName: displayName || '',
    });
    // Guardar los datos del usuario en Firestore con el mismo UID como ID del documento
    await User.doc(userRecord.uid).set({
      displayName: displayName || '',
      email: email,
    });

    res.status(201).json({
      message: 'Usuario creado exitosamente y registrado en Firestore',
      userId: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName,
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(400).json({ message: 'Error al crear usuario', error: error.message });
  }
});

// Endpoint para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca al usuario por correo electrónico
    const userRecord = await auth.getUserByEmail(email);
    // Genera un token personalizado para el usuario
    const token = await auth.createCustomToken(userRecord.uid);
    const doc = User.doc(userRecord.uid);
    const item = await doc.get();
    const response = item.data();
    
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token: token,
      data: {
        id: userRecord.uid,
        ...response
      },
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(400).json({ status:400, message: 'Error en el inicio de sesión', error: error.message });
  }
});
// Endpoint para obtener el token
router.post('/profile/:uid', async (req, res) => {
  try {
    // Obtiene el token del encabezado Authorization
    const uid = req.params.uid
    // Obtiene la información del usuario usando el UID
    const userRecord = await auth.getUser(uid);

    // Envía la respuesta con el token y la información del usuario
    res.status(200).json({
      status:200,
      message: 'Se obtuvo el usuario exitosamente',
      data: {
        userId: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
      }
    });
  } catch (error) {
    console.error('Error al obtemer el token:', error);
      res.status(400).json({ status:400, message: 'Error al obtemer el token', error: error.message });
  }
});
// Endpoint para enviar un enlace de restablecimiento de contraseña
router.post('/forget-password', async (req, res) => {
  const { email } = req.body;

  try {
    await auth.generatePasswordResetLink(email);
    res.status(200).json({ status:200,  message: 'Correo de restablecimiento de contraseña enviado' });
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento:', error);
    res.status(400).json({ status:400, message: 'Error al enviar el correo de restablecimiento', error: error.message });
  }
});
const authenticateWithCustomToken = async (customToken) => {
  try {
    const userCredential = await signInWithCustomToken(auth, customToken);
    console.log("userCredential", userCredential)
    const idToken = await userCredential.user.getIdToken(); // Obtener el ID Token aquí
    return idToken; // Este es el ID Token que debes enviar al backend
  } catch (error) {
    console.error('Error en la autenticación con el Custom Token:', error);
    return null;
  }
};
// Endpoint en el backend para generar el Custom Token
router.post('/generateCustomToken', async (req, res) => {
  const { uid } = req.body;

  try {
    const customToken = await auth.createCustomToken(uid);
    res.json({ customToken });
  } catch (error) {
    console.error('Error al generar el Custom Token:', error);
    res.status(500).json({ message: 'Error al generar el Custom Token', error: error.message });
  }
});

module.exports = router;