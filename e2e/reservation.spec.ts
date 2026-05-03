import { expect, test } from "@playwright/test";

test("submits a reservation request", async ({ page }) => {
  await page.route("**/api/reservations", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Reservation created successfully",
        reservation: {
          id: 1,
          name: "Avery Stone",
          email: "avery@example.com",
          date: "2026-12-24",
          time: "20:00",
          status: "pending",
        },
      }),
    });
  });

  await page.goto("/reserve");

  await page.getByLabel("Name").fill("Avery Stone");
  await page.getByLabel("Email").fill("avery@example.com");
  await page.getByLabel("Phone").fill("+91 98765 43210");
  await page.getByLabel("Guests").selectOption("4");
  await page.getByLabel("Date").fill("2026-12-24");
  await page.getByLabel("Time").fill("20:00");
  await page.getByLabel("Special Requests").fill("Window seat, please.");

  await page.getByRole("button", { name: "Request Reservation" }).click();

  await expect(page.getByText("Reservation request submitted")).toBeVisible();
  await expect(page.getByText("We’ll contact you shortly to confirm your table.")).toBeVisible();
});