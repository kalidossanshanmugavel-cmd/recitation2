import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL("/");
});

test("courses are displayed", async ({ page }) => {
  await page.getByRole("link", { name: "Courses" }).click();
  await expect(page.getByText("Python Fundamentals")).toBeVisible();
  await expect(page.getByText("FastAPI Development")).toBeVisible();
  await expect(page.getByText("React Development")).toBeVisible();
});
