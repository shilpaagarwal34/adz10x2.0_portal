import { expect, test } from "@playwright/test";

test.describe("Society public/draft access", () => {
  test("login page renders expected fields", async ({ page }) => {
    await page.goto("/login");

    await expect(page.getByRole("heading", { name: /log in to/i })).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: /username\s*\/\s*email/i })
    ).toBeVisible();
    await expect(page.getByPlaceholder("***********")).toBeVisible();
    await expect(page.getByRole("button", { name: /^login$/i })).toBeVisible();
  });

  test("profile edit route requires authentication", async ({ page }) => {
    await page.goto("/society/profile/edit");
    await expect(page).toHaveURL(/\/login$/);
  });

  test("society profile draft view renders key sections", async ({ page }) => {
    await page.goto("/society/profile");

    await expect(
      page.getByRole("heading", { name: "Society Information" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Contact Information" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /billing details/i })).toBeVisible();
  });

  test("payments page shows draft guidance when unauthenticated", async ({ page }) => {
    await page.goto("/society/payment");
    await expect(
      page.getByText(/draft view: sign up or log in to access real payments/i)
    ).toBeVisible();
  });

  test("users add button is disabled when unauthenticated", async ({ page }) => {
    await page.goto("/society/users");
    await expect(page.getByRole("button", { name: /add new user/i })).toBeDisabled();
  });
});
