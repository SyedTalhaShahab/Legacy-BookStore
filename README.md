This program Scrapes a website with JavaScript.
Then creates a text file with the JavaSrcipt scrape to be saved locally.
Then it sends the text file to be read by the website the person sees.

## If these files are present, then simply run the program
books.js, books.txt, index.html, main.js, package-lock.json, package.json

## If the files are not present, then read the directions below to generate them


## The Software needed for this

1. Node.js

## Set up Node.js project
create a folder to store the JavaScript file.

Navigate to the created folder and run the initialization command:
```bash
npm init -y
```

## Installing Node.js packages
```bash
npm install axios cheerio json2csv
```
this JS file uses the link
https://books.toscrape.com/catalogue/category/books/mystery_3/index.html

From the terminal, run the Node JS file:

```bash
node books.js
```
