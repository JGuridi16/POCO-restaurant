import { test, expect } from '@playwright/test';

const WEBSITE_URL = 'https://poco-restaurant.netlify.app';

test.describe('Componentes de pagina de login', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEBSITE_URL);
  });

  test('Campo usuario', async ({ page }) => {
    const element = page.getByTestId('username');
    await expect(element).toBeVisible();
  });
  test('Campo contraseña', async ({ page }) => {
    const element = page.getByTestId('password');
    await expect(element).toBeVisible();
  });
  test('Botón acceder', async ({ page }) => {
    const element = page.getByRole('button', { name: 'Acceder' });
    await expect(element).toBeVisible();
  });
  test('Toaster de validacion', async ({ page }) => {
    await page.getByRole('button', { name: 'Acceder' }).click();
    expect(page.getByText(/Completar campos requeridos./i)).toBeTruthy();
  });
});

test.describe('Componentes de home con info de usuario', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEBSITE_URL);
    await page.getByTestId('username').fill('j_martinez');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
  });

  test('Texto de bienvenida a usuario', async ({ page }) => {
    const element = page.getByTestId('user-banner');
    await expect(element).toBeVisible();
  });
  test('Nombre completo de usuario en bienvenida', async ({ page }) => {
    const name = 'Jose';
    const lastname = 'Martinez';
    const element = page.getByTestId('user-banner');
    await expect(element).toContainText(`${name} ${lastname}`);
  });
  test('No existe otro nombre completo de usuario en bienvenida', async ({ page }) => {
    const name = 'Marrero';
    const lastname = 'Gomez';
    const element = page.getByTestId('user-banner');
    await expect(element).not.toContainText(`${name} ${lastname}`);
  });
});

test.describe('Componentes de layout con correo de usuario', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEBSITE_URL);
    await page.getByTestId('username').fill('j_martinez');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
  });

  test('Botón de cerrar sesión', async ({ page }) => {
    const element = page.getByRole('button', { name: 'Cerrar sesión' })
    await expect(element).toBeVisible();
  });
  test('Contenedor de correo electrónico de usuario', async ({ page }) => {
    const element = page.getByTestId('email-data');
    await expect(element).toBeVisible();
  });
  test('Contenedor con otro nombre completo de usuario no existente', async ({ page }) => {
    const element = page.getByTestId('email-data-test');
    await expect(element).not.toBeVisible();
  });
  test('Correo electrónico de usuario', async ({ page }) => {
    const loggedUserEmail = 'jose_martinez@gmail.com';
    const element = page.getByTestId('email-data');
    await expect(element).toContainText(loggedUserEmail);
  });
  test('No existe otro nombre completo de usuario', async ({ page }) => {
    const otherUserEmail = 'marrero_gomez@gmail.com';
    const element = page.getByTestId('email-data');
    await expect(element).not.toContainText(otherUserEmail);
  });
});

test.describe('Pagina de Login', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEBSITE_URL);
  });

  test('Acceder con usuario vacio', async ({ page }) => {
    await page.getByTestId('password').fill('000000');
    await page.getByRole('button', { name: 'Acceder' }).click();

    expect(page.getByText(/Completar campos requeridos./i)).toBeTruthy();
  });
  test('Acceder con contraseña vacia', async ({ page }) => {
    await page.getByTestId('username').fill('j_martinez');
    await page.getByRole('button', { name: 'Acceder' }).click();

    expect(page.getByText(/Completar campos requeridos./i)).toBeTruthy();
  });
  test('Acceder con usuario inválido', async ({ page }) => {
    await page.getByTestId('username').fill('j_martinez');
    await page.getByTestId('password').fill('invalid');
    await page.getByRole('button', { name: 'Acceder' }).click();

    expect(page.getByText(/Usuario o contraseña incorrectos./i)).toBeTruthy();
  });
  test('Acceder con contraseña inválida', async ({ page }) => {
    await page.getByTestId('username').fill('invalid');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();

    expect(page.getByText(/Usuario o contraseña incorrectos./i)).toBeTruthy();
  });
  test('Mostrar toaster cuando iniciamos con credenciales válidas', async ({ page }) => {
    await page.getByTestId('username').fill('j_martinez');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
    expect(page.getByText(/Inicio de sesión satisfactorio./i)).toBeTruthy();
  });
  test('Acceder con credenciales válidas', async ({ page }) => {
    await page.getByTestId('username').fill('j_martinez');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
    await expect(page.getByRole('button', { name: 'Cerrar sesión' })).toBeVisible();
  });
});

test.describe('Inicio de sesión en home', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEBSITE_URL);
    await page.getByTestId('username').fill('j_martinez');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
  });

  test('Mostrar usuario logueado', async ({ page }) => {
    const element = page.getByText('jose_martinez@gmail.com');

    expect(element).toBeTruthy();
  });
  test('Mostrar bienvenida a usuario logueado', async ({ page }) => {
    const element = page.getByText('Jose Martinez');

    expect(element).toBeTruthy();
  });
});

test.describe('Pantalla de login con combinaciones invalidas pero existentes', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEBSITE_URL);
  });

  test('Inicio de sesion con User1 (obtener email)', async ({ page }) => {
    await page.getByTestId('username').fill('j_guridi');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
    const element = page.getByTestId('email-data');

    expect(element).not.toContainText('jose_martinez@gmail.com');
  });
  test('Inicio de sesion con User1 (obtener nombre)', async ({ page }) => {
    await page.getByTestId('username').fill('j_guridi');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
    const element = page.getByTestId('user-banner');

    expect(element).not.toContainText('Jose Martinez');
  });
  test('Inicio de sesion con User2 (obtener email)', async ({ page }) => {
    await page.getByTestId('username').fill('j_martinez');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
    const element = page.getByTestId('email-data');

    expect(element).not.toContainText('v_pion@gmail.com');
  });
  test('Inicio de sesion con User2 (obtener nombre)', async ({ page }) => {
    await page.getByTestId('username').fill('j_martinez');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
    const element = page.getByTestId('user-banner');

    expect(element).not.toContainText('Victor Pion');
  });
});
