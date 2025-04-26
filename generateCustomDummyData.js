const { faker } = require('@faker-js/faker');  // Destructure to use the correct reference
const fs = require('fs');

// Generate 100 dummy employees with custom structure
const employees = [];
for (let i = 0; i < 100; i++) {
  const employee = {
    id: Number(i + 1),
    username: faker.internet.userName(),  // Correct usage
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    birthDate: faker.date.past(30).toISOString(), // Generate a birth date from 30 years ago
    basicSalary: parseFloat(faker.finance.amount(30000, 120000, 2)), // Random salary between 30k and 120k
    status: faker.helpers.arrayElement(['Active', 'Inactive', 'On Leave', 'Suspended']), // Random status
    group: faker.helpers.arrayElement(['Engineering', 'Marketing', 'Sales', 'HR', 'Product', 'BE', 'FE', 'QA', 'BA', 'DO']), // Random group
    description: faker.lorem.sentence(), // Random description
  };

  employees.push(employee);
}

// Write the generated data to db.json
const data = { employees };
fs.writeFileSync('db.json', JSON.stringify(data, null, 2), 'utf-8');

console.log('Custom dummy data generated successfully!');