import calendarPage from "../pageobjects/calendarPage";

describe("Yahoo Calendar", function () {
  Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    console.log(err);
    return false;
  });
  before(function () {
    cy.fixture("example").then(function (data) {
      this.data = data;
    });
});
  const today = "2023-10-04";
  const fromDate = "2023-10-01";
  const toDate = "2023-10-07";

  it("Fetch Calendar", function () {

    const calendarPage1 = new calendarPage()
 
    cy.viewport(1800, 2000);
    cy.visit(`https://finance.yahoo.com/calendar/?day=${today}`);

    // Click on the "I agree" button to accept the cookies
    calendarPage1.getagreebutton().click();
    // Validate Earnings section
    validateEarnings(this.data.earning);

    // Validate Stock Splits section
    validateStockSplits(this.data.StockSplits);

    // Validate IPO Pricings section
    validateIPOPricings(this.data.IPOPricings);

    // Validate Economic Events section
    validateEconomicEvents(this.data.EconomicEvents);
  });

  /**
   * Validates the event with the given href, eventName and expectedCount.
   * @param {string} href - The href of the element to be validated.
   * @param {string} eventName - The name of the event to be validated.
   * @param {number} expectedCount - The expected count of the event to be validated.
   */
  function validateEvent(href, eventName, expectedCount) {
    cy.get(`[href="${href}"]`).then(($el) => {
      const text = $el[0].text.trim();
      cy.log(text);
      expect(text).to.include(eventName);
      expect(text).to.include(expectedCount.toString());
    });
  }

  /**
   * Validates earnings by getting the element with the specified href attribute,
   * trimming its text, logging it, and checking if it includes 'Earnings' and '163'.
   */
  function validateEarnings(expectedCount) {
    validateEvent(
      `/calendar/earnings?from=${fromDate}&to=${toDate}&day=${today}`,
      "Earnings",
      expectedCount
    );
  }

  /**
   * Validates the stock splits for a specific date range.
   * @function
   * @name validateStockSplits
   * @returns {void}
   */
  function validateStockSplits(expectedCount) {
    validateEvent(
      `/calendar/splits?from=${fromDate}&to=${toDate}&day=${today}`,
      "Stock Splits",
      expectedCount
    );
  }

  /**
   * Validates IPO Pricings by checking if the link with the specified href contains the expected text.
   * @function
   * @name validateIPOPricings
   * @returns {void}
   */
  function validateIPOPricings(expectedCount) {
    validateEvent(
      `/calendar/ipo?from=${fromDate}&to=${toDate}&day=${today}`,
      "IPO Pricings",
      expectedCount
    );
  }
  /**
   * Validates the economic events displayed on the Yahoo Finance calendar page.
   * @function
   * @name validateEconomicEvents
   * @returns {void}
   */
  function validateEconomicEvents(expectedCount) {
    validateEvent(
      `/calendar/economic?from=${fromDate}&to=${toDate}&day=${today}`,
      "Economic Events",
      expectedCount
    );
  }
});

