# Employee Management App

I use **Faker.js** to generate 100 dummy data entries and **JSON Server** to run a fake API.

## 1. Run Employee Data (Port 3000)

For employee data, please run:

```bash
json-server --watch db/db.json --port 3000
```

✅ Make sure you are inside the `db` folder and running on **port 3000**.

## 2. Run Groups Data (Port 3001)

For groups data, please run:

```bash
json-server --watch db/groups.json --port 3001
```

✅ Make sure you are inside the `db` folder and running on **port 3001**.

## 3. Run Users Data (Port 3002)

For users data, please run:

```bash
json-server --watch db/users.json --port 3002
```

✅ Make sure you are inside the `db` folder and running on **port 3002**.

## 4. Run the Application

To run the app, simply use:

```bash
npm run start
```

---

## Notes
- Make sure all three JSON servers are running before starting the application.
- This setup simulates real-world API interactions using `json-server`.
- If you don't have `json-server` installed, you can install it globally using:

```bash
npm install -g json-server
```