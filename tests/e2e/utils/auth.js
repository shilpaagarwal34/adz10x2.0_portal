import { expect } from "@playwright/test";

export function hasSocietyCredentials() {
  return Boolean(
    process.env.SOCIETY_EMAIL?.trim() && process.env.SOCIETY_PASSWORD?.trim()
  );
}

export async function loginAsSociety(page) {
  const email = process.env.SOCIETY_EMAIL;
  const password = process.env.SOCIETY_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Missing SOCIETY_EMAIL / SOCIETY_PASSWORD. Add env vars to run authenticated tests."
    );
  }

  await page.goto("/login");
  await page.getByRole("textbox", { name: /username\s*\/\s*email/i }).fill(email);
  await page.getByPlaceholder("***********").fill(password);
  await page.getByRole("button", { name: /^login$/i }).click();

  await page.waitForURL(/\/society(\/.*)?$/, { timeout: 30_000 });
  await expect(page).toHaveURL(/\/society(\/.*)?$/);
}
