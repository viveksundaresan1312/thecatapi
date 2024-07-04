// https://on.cypress.io/api

describe("Visit CatAPI Page", () => {
	beforeEach(() => {
		cy.visit("/");
		cy.wait(3000);
	});

	it("Should make sure the red dot blinking on the unused icons is not blinking anymore once its used", () => {
		// Add to favorite
		cy.get('button[aria-label="Add to favourites"]')
			.parent()
			.then((element) => {
				let blink_enable = element.find(
					".absolute.top-0.right-0.inline-flex.bg-primary"
				);
				cy.wrap(blink_enable).should("exist");

				cy.wrap(blink_enable)
					.get('button[aria-label="Add to favourites"]')
					.should("be.visible")
					.click()
					.wait(1000);

				cy.wrap(blink_enable).should("not.exist");
			});

		// Navigate to Favs
		cy.get('button[type="button"]')
			.contains("Favs")
			.parent()
			.then((element) => {
				let blink_enable = element.find(
					".absolute.top-0.right-0.inline-flex.bg-primary"
				);
				cy.wrap(blink_enable).should("exist");

				cy.get('button[type="button"]').contains("Favs").click();
				cy.wait(1000);

				cy.wrap(blink_enable).should("not.exist");
			});

		// Navigate to list view
		cy.wait(5000);
		cy.get('div[role="button"]')
			.eq(1)
			.should("not.have.class", "stroke-primary")
			.parent()
			.then((element) => {
				let blink_enable = element.find(
					".absolute.top-0.right-0.inline-flex.bg-primary"
				);
				cy.wrap(blink_enable).should("exist");

				cy.wrap(element).get('div[role="button"]').eq(1).click();
				cy.wait(1000);

				cy.wrap(blink_enable).should("not.exist");
			});

		// Navigate to Breeds
		cy.get('button[type="button"]')
			.contains("Breeds")
			.parent()
			.then((element) => {
				let blink_enable = element.find(
					".absolute.top-0.right-0.inline-flex.bg-primary"
				);
				cy.wrap(blink_enable).should("exist");

				cy.get('button[type="button"]').contains("Breeds").click();
				cy.wait(1000);

				cy.wrap(blink_enable).should("not.exist");
			});
	});

	it("Should make sure that the favorite selected cats are listed in the Favs tab", () => {
		let imageUrl;
		cy.get("section#voting")
			.find("img")
			.invoke("attr", "src")
			.then((imgSrc) => {
				imageUrl = imgSrc;
			});
		cy.wait(2000);

		cy.get('button[aria-label="Add to favourites"]')
			.should("be.visible")
			.click()
			.wait(1000);

		cy.get('button[type="button"]').contains("Favs").click();
		cy.wait(6000);

		cy.get(".aspect-square img")
			.invoke("attr", "src")
			.then((imgSrc) => {
				expect(imgSrc).to.equal(imageUrl);
			});
	});

	it("Should navigate to breeds page and select a breed from the dropdown", () => {
		cy.get('button[type="button"]').contains("Breeds").click();
		cy.wait(2000);
		cy.get(".svelte-select").click().type("Cyprus").type("{enter}");
	});

	it("Should upvote a cat", () => {
		cy.wait(2000);
		cy.get('button[aria-label="Upvote"]').click();
	});

	it("Should downvote a cat", () => {
		cy.wait(2000);
		cy.get('button[aria-label="Downvote"]').click();
	});
});
