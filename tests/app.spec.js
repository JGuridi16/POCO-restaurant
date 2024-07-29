import { test, expect } from '@playwright/test';

const WEBSITE_URL = 'https://poco-restaurant.netlify.app';

test.describe('Carga de pagina', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEBSITE_URL);
    await page.goto(WEBSITE_URL);
    await page.getByTestId('username').fill('r_rosario');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
  });

  test('La elemento de navegacion Inicio debe cargarse correctamente', async ({ page }) => {
    const element = page.getByText('Inicio', { exact: true });
    await expect(element).toBeAttached();
  });
  
  test('La elemento de navegacion Reservaciones debe cargarse correctamente', async ({ page }) => {
    const element = page.getByText('Reservaciones', { exact: true });
    await expect(element).toBeAttached();
  });
  
  test('La elemento de navegacion Mis Reservaciones debe cargarse correctamente', async ({ page }) => {
    const element = page.getByText('Mis Reservaciones', { exact: true });
    await expect(element).toBeAttached();
  });
  
  test('La página debe cargarse correctamente', async ({ page }) => {
    const element = page.locator('.main-app');
    await expect(element).toBeAttached();
  });
  
  test('El botón de ver mas debe cargarse correctamente', async ({ page }) => {
    const element = page.getByRole('button', { name: 'Ver más', exact: true });
    await expect(element).toBeAttached();
  });
  
  test('El banner de ver mas debe cargarse correctamente', async ({ page }) => {
    const element = page.locator('.thumbnail');
    await expect(element).toBeAttached();
  });
});

test.describe('Funcionalidad de Logo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEBSITE_URL);
    await page.goto(WEBSITE_URL);
    await page.getByTestId('username').fill('r_rosario');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
  });

  test('El logo de la pagina debe cargarse correctamente', async ({ page }) => {
    const element = page.locator('.navbar-brand', { exact: true });
    await expect(element).toBeAttached();
  });
  
  test('La imagen del logo de la pagina debe cargarse correctamente', async ({ page }) => {
    const element = page.locator('.navbar-brand img');
    await expect(element).toBeAttached();
  });
  
  test('La imagen del logo de la pagina debe ser una', async ({ page }) => {
    const element = page.locator('.navbar-brand img');
    await expect(element).toHaveCount(1);
  });
  
  test('El enlace del logo debe navegar a la página principal', async ({ page }) => {
    await page.locator('.navbar-brand img').click();
    await expect(page).toHaveURL(`${WEBSITE_URL}/home`);
  });
  
  test('El logo de la pagina tiene atributo alt', async ({ page }) => {
    const element = page.locator('.navbar-brand img');
    await expect(element).toHaveAttribute('alt');
  });
  
  test('El logo de la pagina tiene atributo height', async ({ page }) => {
    const element = page.locator('.navbar-brand img');
    await expect(element).toHaveAttribute('height');
  });
  
  test('El logo de la pagina tiene atributo width', async ({ page }) => {
    const element = page.locator('.navbar-brand img');
    await expect(element).toHaveAttribute('width');
  });
  
  test('El logo de la pagina tiene estilo de boton', async ({ page }) => {
    const element = page.locator('.navbar-brand img');
    await expect(element).toHaveCSS('cursor', 'pointer');
  });

  test('El enlace del logo no debe redirigir a ruta vacia', async ({ page }) => {
    await page.locator('.navbar-brand img').click();
    await expect(page).not.toHaveURL(`${WEBSITE_URL}/`);
  });
});

test.describe('Redireccionamiento de URL de elementos de barra de navegación', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEBSITE_URL);
    await page.goto(WEBSITE_URL);
    await page.getByTestId('username').fill('r_rosario');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
  });
  
  test('El enlace "Inicio" debe navegar a la página principal', async ({ page }) => {
    await page.click('a[href="/home"]');
    await expect(page).toHaveURL(WEBSITE_URL+'/home');
  });
  
  test('El enlace "Reservaciones" debe navegar a las reservaciones', async ({ page }) => {
    await page.click('a[href="/online-reservation"]');
    await expect(page).toHaveURL(WEBSITE_URL+'/online-reservation');
  });
  
  test('El enlace "Mis Reservaciones" debe navegar a las reservaciones del usuario', async ({ page }) => {
    await page.click('a[href="/my-reservations"]');
    await expect(page).toHaveURL(WEBSITE_URL+'/my-reservations');
  });
});

test.describe('Espacios de reservaciones', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(WEBSITE_URL);
    await page.goto(WEBSITE_URL);
    await page.getByTestId('username').fill('r_rosario');
    await page.getByTestId('password').fill('123456');
    await page.getByRole('button', { name: 'Acceder' }).click();
    await page.waitForURL(WEBSITE_URL + '/home');
    await page.click('a[href="/online-reservation"]');
    await page.waitForURL(WEBSITE_URL + '/online-reservation');
  });

  // Verificar que los elementos del menú se muestran correctamente
  test('Navegar a ver reservaciones disponibles', async ({ page }) => {
    await expect(page).toHaveURL(WEBSITE_URL + '/online-reservation');
  });
  
  // Verificar que el botón de reserva está visible en la página principal
  test('Deben existir inicialmente 6 espacios disponibles para reservar', async ({ page }) => {
    const element = page.getByRole('button', { name: 'Reservar ahora' });
    await expect(element).toHaveCount(6);
  });
  
  // Verificar que el formulario de reserva se muestra al hacer clic en el botón de reserva
  test('El formulario de reserva debe mostrarse al hacer clic en el botón de reserva', async ({ page }) => {
    await page.getByRole('button', { name: 'Reservar ahora', exact: true }).first().click();
    const reservationForm = page.locator('.modal-body form');
    await expect(reservationForm).toBeVisible();
  });

  // Verificar que el mensaje de error se muestra cuando se envía un formulario vacío
  test('Debe mostrar mensaje de error al enviar formulario vacío', async ({ page }) => {
    await page.getByRole('button', { name: 'Reservar ahora', exact: true }).first().click();
    
    await page.getByRole('button', { name: 'Reservar', exact: true }).click();
    const element = page.getByText(/Completar campos requeridos./i);
    await expect(element).toBeVisible();
  });

  // Verificar que se puede enviar el formulario de contacto
  test('El formulario de reserva debe ser enviado correctamente', async ({ page }) => {
    await page.getByRole('button', { name: 'Reservar ahora', exact: true }).first().click();
    await page.fill('input[id="formBasicFullname"]', 'Luis Pérez');
    await page.fill('input[id="formBasicDocId"]', '40200000000');
    await page.fill('input[id="formBasicFrom"]', '13:15');
    await page.fill('input[id="formBasicUntil"]', '15:15');
    await page.getByRole('button', { name: 'Reservar', exact: true }).click();
    await expect(page.getByText(/Completar campos requeridos./i)).not.toBeVisible();
  });
});