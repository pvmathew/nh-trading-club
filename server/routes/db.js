const express = require("express");
const router = express.Router();

const { promisify } = require("util");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const creds = require("../client_secret.json");

const doc = new GoogleSpreadsheet(
  "1DFEA505Wkaise_wNEEsUH2ObEqGcrKjxV5CGevqKiac"
);

let sheets;
let rows;
let cells;

async function accessSpreadsheet() {
  await doc.useServiceAccountAuth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });

  await doc.loadInfo();

  sheets = {
    housewares: await doc.sheetsById["1006135046"],
    miscellaneous: await doc.sheetsById["1873411337"],
  };
  rows = {
    housewares: await sheets.housewares.getRows(),
    miscellaneous: await sheets.miscellaneous.getRows(),
  };
  cells = {
    housewares: await sheets.housewares.loadCells(
      "A1:C" + rows.housewares.length
    ),
    miscellaneous: await sheets.miscellaneous.loadCells(
      "A1:C" + rows.miscellaneous.length
    ),
  };
}

accessSpreadsheet();

router.get("/", async (req, res) => {
  const { itemName } = req.query;
  const category = req.query.category.toLowerCase();

  const filteredRows = rows[category]
    .filter((row, index) =>
      row.Name.toLowerCase().includes(itemName.toLowerCase())
    )
    .map((row) => {
      let index =
        rows[category].findIndex(
          (i) => i.Variation === row.Variation && i.Name === row.Name
        ) + 1;
      let cell = sheets[category].getCell(index, 1);
      let formula = cell.formula;

      const regex = /".*?"/g;
      const found = formula.match(regex);
      const image = found[0].slice(1, found[0].length - 1);

      return {
        name: row.Name,
        var: row.Variation,
        img: image,
      };
    });

  res.send(filteredRows);
});

module.exports = router;
