var faker = require('faker');

var randomName1 = faker.name.findName();
var randomEmail1 = faker.internet.email();
var randomFinance1 = faker.finance.accountName();
var randomName2 = faker.name.findName();
var randomEmail2 = faker.internet.email();
var randomFinance2 = faker.finance.accountName();
var user1 = {name:randomName1, email:randomEmail1, account:randomFinance1};
var user2 = {name:randomName2, email:randomEmail2, account:randomFinance2};

module.exports = {user1: user1, user2: user2};
