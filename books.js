const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const mystery = "http://books.toscrape.com/catalogue/category/books/mystery_3/index.html";

const books_data = [];

async function getBooks(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const books = $("article");
    books.each(function () {
      const title = $(this).find("h3 a").text();
      const price = $(this).find(".price_color").text();
      const stock = $(this).find(".availability").text().trim();
      books_data.push({ title, price, stock });
    });

    const baseUrl = "http://books.toscrape.com/catalogue/category/books/mystery_3/";
    if ($(".next a").length > 0) {
      const next = baseUrl + $(".next a").attr("href");
      getBooks(next);
    } else {
      // Format data as plain text
      const plainText = books_data
        .map(book => `Title: ${book.title}\nPrice: ${book.price}\nStock: ${book.stock}\n`)
        .join("\n");

      // Write to a plain text file
      fs.writeFileSync("./books.txt", plainText, "utf8");
      console.log("Data written to books.txt");
    }
  } catch (err) {
    console.error(err);
  }
}

getBooks(mystery);
