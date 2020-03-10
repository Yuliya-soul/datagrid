import faker from 'faker';
faker.seed(781);
export const makeFake=(index)=>{
return{
    "id":11+index,
    "rank":index,
    "name":faker.name.firstName(),
    "lastName":faker.name.lastName(),
    "email":faker.internet.email(),
    "LocationName":faker.address.city(),
    "isActive":faker.random.boolean(),
    "phone":faker.phone.phoneNumberFormat(),
    "description":faker.lorem.text(),
    "idNumber":faker.random.number(),
    "date":faker.date.recent(),
    "payment":faker.commerce.price(),
    "currency":faker.finance.currencySymbol()
};

}
const data1 =[...new Array(50)].map((_,index)=>makeFake(index));


export default{
    "data1":data1
}