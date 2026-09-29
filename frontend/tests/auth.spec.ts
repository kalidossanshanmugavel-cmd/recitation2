import { test, expect } from "@playwright/test";

test("demo user can login and logout", async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Hello, Demo Student")).toBeVisible();

  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page).toHaveURL(/\/login$/);
});

test("invalid login displays an error", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("wrong@example.com");
  await page.getByLabel("Password").fill("wrong-password");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Invalid email or password")).toBeVisible();
});
