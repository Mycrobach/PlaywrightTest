const { test, expect } = require('@playwright/test');

test('Close pop-up and search for matematika', async ({ page }) => {
  // Navigate to the Ruangguru website
  await page.goto('https://app.ruangguru.com/');

  // Wait for the 'Ayo, daftar GRATIS' pop-up to appear and close it
  const popUpSelector = 'text=Ayo, daftar GRATIS Ruangguru untuk akses ribuan video belajar, latihan soal, dan fitur seru lainnya!';
  if (await page.isVisible(popUpSelector)) {
    await page.click(`button[aria-label='Close']`); // Assuming the pop-up has a close button
  }

  // Handle the 'Pilih Kelas' pop-up
  const kelasSelector = 'text=Kelas 6';
  const kurikulumSelector = 'text=Kurikulum Merdeka';
  const simpanButtonSelector = 'button:has-text("Simpan")';

  if (await page.isVisible(kelasSelector)) {
    await page.click(kelasSelector);
    await page.click(kurikulumSelector);
    await page.click(simpanButtonSelector);
  }

  // Locate the search bar and perform a search
  const searchBarSelector = 'input[placeholder="Coba cari materi belajarmu di sini"]';
  await page.fill(searchBarSelector, 'matematika');
  await page.press(searchBarSelector, 'Enter');

  // Add an assertion to verify search results (if applicable)
  await expect(page).toHaveURL(/.*matematika.*/);
});