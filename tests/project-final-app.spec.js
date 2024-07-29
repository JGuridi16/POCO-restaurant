const { chromium } = require('playwright');

(async () => {
  try {
    // Lanzar el navegador
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Navegar a la página de inicio de sesión
    await page.goto('https://poco-restaurant.netlify.app/login');

    // Prueba 1: Verificar que la página de inicio de sesión se carga correctamente
    await page.waitForSelector('form');
    console.log('Prueba 1: La página de inicio de sesión se carga correctamente');

    // Prueba 2: Intentar iniciar sesión con credenciales vacías y verificar el mensaje de error
    await page.click('button[type="submit"]');
    const errorMessage = await page.textContent('.error-message');
    console.log('Prueba 2: Mensaje de error para credenciales vacías:', errorMessage);

    // Prueba 3: Intentar iniciar sesión con credenciales incorrectas y verificar el mensaje de error
    await page.fill('input[name="username"]', 'usuario_incorrecto');
    await page.fill('input[name="password"]', 'contraseña_incorrecta');
    await page.click('button[type="submit"]');
    const errorMessageIncorrect = await page.textContent('.error-message');
    console.log('Prueba 3: Mensaje de error para credenciales incorrectas:', errorMessageIncorrect);

    // Prueba 4: Verificar que los campos de usuario y contraseña estén presentes
    const usernameField = await page.$('input[name="username"]');
    const passwordField = await page.$('input[name="password"]');
    if (usernameField && passwordField) {
      console.log('Prueba 4: Los campos de usuario y contraseña están presentes');
    } else {
      console.log('Prueba 4: Faltan uno o más campos de usuario/contraseña');
    }

    // Prueba 5: Verificar que el botón de inicio de sesión esté presente y habilitado
    const loginButton = await page.$('button[type="submit"]');
    const isLoginButtonEnabled = await loginButton.isEnabled();
    if (isLoginButtonEnabled) {
      console.log('Prueba 5: El botón de inicio de sesión está presente y habilitado');
    } else {
      console.log('Prueba 5: El botón de inicio de sesión no está habilitado');
    }

    // Cerrar el navegador
    await browser.close();
  } catch (error) {
    console.error('Error ejecutando el script de pruebas:', error);
  }
})();
