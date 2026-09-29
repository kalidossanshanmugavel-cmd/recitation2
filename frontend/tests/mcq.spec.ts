import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.getByRole("button", { name: "Login" }).click();
  await page.getByRole("link", { name: "MCQ" }).click();
});

test("MCQ page shows one question at a time", async ({ page }) => {
  await expect(page.getByText("MCQ Assessment")).toBeVisible();
  await expect(page.getByText(/Question 1 of/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Previous" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Next" })).toBeVisible();
  await expect(page.getByText("Mark for review")).toHaveCount(0);
  await expect(page.getByRole("radio")).toHaveCount(4);
});

test("learner can move through and submit an assessment", async ({ page }) => {
  while (await page.getByRole("button", { name: "Next" }).count()) {
    await page.getByRole("radio").first().check();
    await page.getByRole("button", { name: "Next" }).click();
  }

  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "Submit Assessment" }).click();
  await expect(page.getByText(/Score:/)).toBeVisible();
});
