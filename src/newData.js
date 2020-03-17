import faker from "faker";

function RoleMaker(number){
  if (number===0) return 'Activist'
  if (number===1) return 'Student'
  if (number===2) return 'Mentor'
}
function ChangeDate(date){
const Xmas95 = new Date(`${date}`);
const day = Xmas95.getDate();
const month=Xmas95.getMonth();
const year=Xmas95.getFullYear();
const date1= [year,month,day]

return date1
}

const createRow = () => ({
  id: faker.random.uuid(),
  rank: faker.random.number({ min: 0, max: 1000 }),
  name: faker.name.firstName(),
  lastName:faker.name.lastName(),
  email:faker.internet.email(),
  LocationName:faker.address.city(),
  isActive:`${faker.random.boolean()}`,
  phone:faker.phone.phoneNumberFormat(),
  description:faker.lorem.text(),
  date:`${ChangeDate(faker.date.recent(10))[0]}-${ChangeDate(faker.date.recent(10))[1]}-${ChangeDate(faker.date.recent(10))[2]}`,
  payment:`${faker.finance.currencySymbol()}`+faker.commerce.price(),
  role:RoleMaker(faker.random.number({ min: 0, max: 2 }))

});

const createData = ((qty = 3200) => {
  let data = [];

  for (let i = 0; i < qty; i++) {
    const row = createRow();

    data.push(row);
  }

  return data;
})();

export default {data: createData, initData: createData};
