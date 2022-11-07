// please use NodeJS to run this application

const fs = require('fs')
const { faker } = require('@faker-js/faker');

const obj = {}
obj.dataList = []
for(var i=0;i<200;i++){
    obj.dataList.push({ 
        key:i,
        data: faker.lorem.sentence()
    })
}

fs.writeFile("./src/data/data.json", JSON.stringify(obj), function(err) {
    if (err) {
        console.log(err);
    }
});