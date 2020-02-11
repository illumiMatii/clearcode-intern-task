const genderize = require("genderize");
const ip2countrify = require("ip2countrify");
const request = require("request");

const visitorsData = [
    {
        id:'63faedf7-f1fb-42d7-93b1-950a23c19c0d',
        firstName: 'Zuzanna',
        countryCode:'NL'
    },
    {
        id:'0976a56f-b6d4-4155-b4b2-7ad0f8d4821f',
        firstName: 'Sasha'
    }
];

function enrichVisitorsData(visitorsData) {
    visitorsData.forEach(visitor => {

        let url = "https://api.nationalize.io/?name=" + visitor.firstName;
        
        genderize(visitor.firstName, (err, obj) => {
            if (obj.probability >= 0.75){
                visitor["gender"] = obj.gender;
            }

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
            } else if(visitor.countryCode == null) {
                ip2countrify.lookup(
                    visitor.ip, (ip, results, error) => {
                        if(!error){
                            visitor["countryCode"] = results.countryCode;                        
                        }
                        console.log(visitor);
                    });
            } else {
                console.log(visitor);
            }
        });
    });
}

enrichVisitorsData(visitorsData);
