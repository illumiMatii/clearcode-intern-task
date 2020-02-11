# clearcode-intern-tasks
Tasks which I made in recruitment process for Clearcode

## :page_with_curl: Task 2: We want to know the visitor 

A simple program to predict the gender and country by the First Name and/or IP.

Firstable to make this program works good, you'll have to install [Node.js](https://nodejs.org/en/download/).

### :package: Packages

Use the package manager [npm](https://www.npmjs.com/) to install necessary packages.

```bash
npm install genderize
```
```bash
npm install ip2countrify
```


### :computer: Code

Import the packages which you installed into your code.

```js
const genderize = require("genderize"); // - package to predict the gender of a person given their name
const ip2countrify = require("ip2countrify"); // - package to map an IP to a contry
const request = require("request"); // - package to make HTTP calls
```


