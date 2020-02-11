# clearcode-intern-tasks
Task which I made in recruitment process for Clearcode.

## :page_with_curl: Task 2: We want to know the visitor 

A program to predict the gender and country by the First Name and/or IP.

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

 I've imported packages to code which I've installed earlier.

```js
const genderize = require("genderize"); // - package to predict the gender of a person given their name
const ip2countrify = require("ip2countrify"); // - package to map an IP to a contry
const request = require("request"); // - package to make HTTP calls
```

 Next I've created ```genderize``` function to predict a gender by the name of a ```visitor```:

```js
genderize(visitor.firstName, (err, obj) => {
    if (obj.probability >= 0.75){
        visitor["gender"] = obj.gender;
    }
```
 * This function checks if ```visitor.firstName``` value probability is greater or equal ```0.75``` and if its ```true``` genderize function add ```visitor["gender"]``` with value to the database.

Then I made ```if``` statement with ```request``` function to predict the nationality of a ```visitor``` by the ```firstName```:

* To make it works correctly I've created earlier, a variable called ```url``` in "main" ```forEach``` function:
```js
let url = "https://api.nationalize.io/?name=" + visitor.firstName;
```

```js
if(visitor.ip == null && visitor.countryCode == null) {
    request(url, (error, response, data) => {
        if (!error) {
            const parsedData = JSON.parse(data);
            parsedData["country"].forEach(result => {
                if(result.probability >= 0.75) {
                    visitor["countryCode"] = result.country_id;
                }
            });
        }
        console.log(visitor);
});
```
* The ```if``` statement checks if there's no ```visitor.ip``` and ```visitor.countryCode``` in ```visitor``` data. If it's true and there's no error, the ```request``` function is changing ```data``` into an ```object``` called ```parsedData```. Then with ```forEach``` function program checks if the ```probability``` of belonging to the nation by the ```firstName``` is greater or equal to ```0.75``` the function adds ```visitor["countryCode]``` with value of ```result.country_id```.

Later I've made an ```else if``` statement with ```ip2countrify``` function to predict the nationality, by the ```visitor.ip```:

```js
else if(visitor.countryCode == null) {
    ip2countrify.lookup(
        visitor.ip, (ip, results, error) => {
            if(!error){
                visitor["countryCode"] = results.countryCode;                        
            }
            console.log(visitor);
        });
}
```

* The ```else if``` statement checks is there's no ```countryCode``` in ```visitor``` object. Then the ```ip2countrify``` function checks the ```visitor.ip``` and if IP matches with any country, the function add value of ```results.countryCode``` to ```visitor["countryCode"]```.


### :gift: Example

I want to show a quick example how this script works:

* We have an object like this:
```js
const visitorsData = [
    {
        id:'63faedf7-f1fb-42d7-93b1-950a23c19c0d',
        firstName: 'Zuzanna',
        countryCode:'NL'
    },
    {
        id:'0976a56f-b6d4-4155-b4b2-7ad0f8d4821f',
        firstName: 'Sasha',
        ip: "5.6.7.8"
    },
    {
        id: '63fabdf6-f5a2-56k1-23v7-163j87k63h1x',
        firstName: 'Caroline',
    }
];
```
* The output of the script will be:

```js
{
  id: '63faedf7-f1fb-42d7-93b1-950a23c19c0d',
  firstName: 'Zuzanna',
  countryCode: 'NL',
  gender: 'female'
}
{
  id: '0976a56f-b6d4-4155-b4b2-7ad0f8d4821f',
  firstName: 'Sasha',
  ip: '5.6.7.8',
  countryCode: 'DE'
}
{
  id: '63fabdf6-f5a2-56k1-23v7-163j87k63h1x',
  firstName: 'Caroline',
  gender: 'female'
}
```
