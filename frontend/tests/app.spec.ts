import { test, expect } from "@playwright/test";

const filePath = "tests/fixtures/sample-statement.pdf";

test.describe("Income Insights dashboard", () => {
  test("loads key dashboard content", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Bank Statement Intelligence" })
    ).toBeVisible();
    await expect(page.getByText("Upload bank statements")).toBeVisible();
    await expect(page.getByRole("button", { name: "Run OCR analysis" })).toBeVisible();

    await expect(page.getByRole("heading", { name: "Monthly income" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Income by category" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Growth trend" })).toBeVisible();

    await expect(page.getByRole("heading", { name: "Income transactions" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Export CSV" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Export PDF" })).toBeVisible();
  });

  test("supports selecting a statement file", async ({ page }) => {
    await page.goto("/");

    const input = page.getByTestId("upload-input");
    await input.setInputFiles(filePath);

    await expect(page.getByTestId("upload-progress")).toBeVisible();
    await expect(page.getByText("sample-statement.pdf")).toBeVisible();
    await expect(page.getByTestId("upload-success")).toBeVisible();
  });
});
