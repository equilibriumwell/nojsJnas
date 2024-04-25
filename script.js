const fs = require("fs");
const http = require("http");
const url = require("url");
const { text } = require("stream/consumers");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");
//blocking code
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

//non-blocking
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     // need to put utf-8 as second argument to encode the txt file other wise it will give a type of address
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       // need to put utf-8 as second argument to encode the txt file other wise it will give a type of address
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n ${data3}`, "utf-8", (err) => {
//         console.log("Your file has been written 😊");
//       });
//     });
//   });
// });
// console.log("Will read file!");

// const http = require("http");
// const url = require("url");

/////////////////////////////////////////////
//Files

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// console.log(textIn);

// const textOut = `This is waht we know about the avocado ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// console.log("File has been written!");

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Files were written successfully!");
//       });
//     });
//   });
// });

// console.log("will red file!");

// function traditionalFunction() {
//   console.log(this);
// }

// traditionalFunction();
/////////////////////////////////////////////
//Server
// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);

//   if (!product.organic) {
//     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//     return output;
//   }
// };
// const tempOverview = fs.readFileSync(
//   `${__dirname}/templates/template-overview.html`,
//   "utf-8"
// );

// Without __dirname, Node.js will look for the
// template-overview.html file relative to the current
// working directory. This may work if your current working
// directory happens to be the
// same as the directory containing your module, but it's
// not a reliable approach.
// const tempCard = fs.readFileSync(
//   `${__dirname}/templates/template-card.html`,
//   "utf-8"
// );
// const tempProduct = fs.readFileSync(
//   `${__dirname}/templates/template-product.html`,
//   "utf-8"
// );

// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
// the above requests are blocking but after the intial load.
// When the server has a request, since these live outside of the
// server function.
// const dataOBJ = JSON.parse(data);

// const server = http.createServer((req, res) => {
//   const pathName = req.url;

//   if (pathName === "/" || pathName === "/overview") {
//     res.writeHead(200, { "Content-type": "text/html" });

//     const cardsHtml = dataOBJ
//       .map((el) => replaceTemplate(tempCard, el))
//       .join("");

//     const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
//     // console.log(cardsHtml);
//     res.end(output);
//   } else if (pathName === "/product") {
//     res.end("This is the PRODUCT");
//   } else if (pathName === "/api") {
//     // fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {

//     res.writeHead(200, { "Content-type": "application/json" });
//     res.end(data);
//     // });
//   } else {
//     res.writeHead(404, {
//       "Content-type": "text/html",
//       "my-own-header": "hello-world",
//     });
//     res.end("<h1>Page not Found!<h1>");
//   }
// });

// server.listen(8000, () => {
//   console.log("Listening to requests on port 8000");
// });

// If the DHCP Client Service shows an
// "Access Denied" error, you can try
// editing the registry permissions.
//  You can do this by navigating to
//  HKLM\System\CurrentControlSet\Services
//  \WinHttpAutoProxySvc and setting the Start
//  DWORD to Value = 4 (Disabled).
//   You can then reboot. You can also
//    try giving "Full control" permission
//     to these three users: DHCP, Network
//      Service, and Add local admin:
//      MachineName\administrator.
// This was to attempt to write a random ip address

//server

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const dataObj = JSON.parse(data);

// const slugs = dataObj.map(el => (el.productName,{
//   lower:true}
// ))
const server = http.createServer((req, res) => {
  console.log(req.url);

  const { query, pathname } = url.parse(req.url, true);
  // const pathName = req.url;

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
    // res.end(tempOverview);
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
  //url can be alleviated with simple pathing, but once logic is implemented in the url, it will cause issues...
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
