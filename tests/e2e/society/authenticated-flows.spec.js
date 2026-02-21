import { expect, test } from "@playwright/test";
import { seedTemporarySocietySession } from "../utils/temporarySocietySession";

test.describe("Society authenticated flows", () => {
  test.beforeEach(async ({ page }) => {
    await seedTemporarySocietySession(page, {
      profileCompletion: 80,
      balanceAmount: 250,
    });
  });

  test("dashboard loads after login", async ({ page }) => {
    await page.goto("/society");
    await expect(page).toHaveURL(/\/society$/);
  });

  test("profile view has collapsible billing section", async ({ page }) => {
    await page.goto("/society/profile");

    await expect(
      page.getByRole("heading", { name: "Society Information" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Contact Information" })
    ).toBeVisible();

    const billingToggle = page.getByRole("button", { name: /billing details/i });
    await expect(billingToggle).toBeVisible();
    await billingToggle.click();

    await expect(page.getByText("Account No.")).toBeVisible();
    await expect(page.getByText("Bank IFSC Code")).toBeVisible();
  });

  test("profile edit has collapsed optional sections and QR field", async ({ page }) => {
    await page.goto("/society/profile/edit");

    const billingToggle = page.getByRole("button", { name: /billing details/i });
    const photosToggle = page.getByRole("button", { name: /society photos/i });
    const docsToggle = page.getByRole("button", { name: /society documents/i });

    await expect(billingToggle).toBeVisible();
    await expect(photosToggle).toBeVisible();
    await expect(docsToggle).toBeVisible();

    await billingToggle.click();
    await expect(page.getByText("Account Holder Name")).toBeVisible();
    await expect(page.getByText(/Billing QR Code/i)).toBeVisible();
  });

  test("media management shows draft and submit actions", async ({ page }) => {
    await page.goto("/society/media-management");

    await expect(page.getByRole("button", { name: /save as draft/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /submit rates/i })).toBeVisible();
  });

  test("users guard appears when profile completion is below 100%", async ({ page }) => {
    await page.goto("/society/users");

    await page.getByRole("button", { name: /add new user/i }).click();
    await expect(
      page.getByRole("heading", { name: /complete profile required/i })
    ).toBeVisible();
  });

  test("payment page withdraw path is reachable", async ({ page }) => {
    await page.goto("/society/payment");

    const withdrawButton = page.getByRole("button", { name: /withdraw amount/i });
    await expect(withdrawButton).toBeVisible();
    const isDisabled = await withdrawButton.isDisabled();

    expect(isDisabled).toBeFalsy();
    await withdrawButton.click();
    await expect(page.getByText(/complete profile details/i)).toBeVisible();
  });
});
