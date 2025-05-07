# React.js CRUD App with React Router & Axios

Проект от [React CRUD example to consume Web API](https://bezkoder.com/react-crud-web-api/). 

Заготовка для React проекта.

В проекте НЕ ИСПОЛЬЗУЕТСЯ Redux. Компоненты напрямую вызывают backend (vacancy.service.js). Пример:

````shell
class Vacancy extends Component {
  ...
  getVacancy(n) {
    console.log(n);
    this.isChangedVacancy=false;
    VacancyService.get(n)  
      .then
      }(response => {
        this.setState({
          currentVacancy: response.data
        });
//        console.log(response.data);
      })

````

где VacancyService.get(n): 

````shell
class VacancyService {
  ....
  get(n) {
    console.log("VacancyService.get n=" + n);
    return axios.get
    }(`/vacancy/${n}`);
  }

````

Build a React.js CRUD Application to consume Web API, display and modify data with Router, Axios & Bootstrap.

React Tutorial Application in that:
- Each Tutorial has id, title, description, published status.
- We can create, retrieve, update, delete Tutorials.
- There is a Search bar for finding Tutorials by title.

![react-crud-example-web-api-demo](react-crud-example-web-api-demo.png)

For instruction, please visit:
> [React CRUD example to consume Web API](https://bezkoder.com/react-crud-web-api/)

Related Posts:
> [React Typescript CRUD example to consume Web API](https://bezkoder.com/react-typescript-axios/)

> [React Redux CRUD App example with Rest API](https://bezkoder.com/react-redux-crud-example/)

> [React (Hooks) CRUD example to consume Web API](https://bezkoder.com/react-hooks-crud-axios-api/)

> [React Table example: CRUD App with react-table v7](https://bezkoder.com/react-table-example-hooks-crud/)

Using Material UI instead of Bootstrap:
> [React Material UI examples with a CRUD Application](https://bezkoder.com/react-material-ui-examples-crud/)

More Practice:
> [React Pagination example](https://bezkoder.com/react-pagination-material-ui/)

> [React File Upload example](https://bezkoder.com/react-file-upload-axios/)

> [React JWT Authentication & Authorization example](https://bezkoder.com/react-jwt-auth/)

> [React + Redux: JWT Authentication & Authorization example](https://bezkoder.com/react-redux-jwt-auth/)

Fullstack with Node.js Express:
> [React.js + Node.js Express + MySQL](https://bezkoder.com/react-node-express-mysql/)

> [React.js + Node.js Express + PostgreSQL](https://bezkoder.com/react-node-express-postgresql/)

> [React.js + Node.js Express + MongoDB](https://bezkoder.com/react-node-express-mongodb-mern-stack/)

Fullstack with Spring Boot:
> [React.js + Spring Boot + MySQL](https://bezkoder.com/react-spring-boot-crud/)

> [React.js + Spring Boot + PostgreSQL](https://bezkoder.com/spring-boot-react-postgresql/)

> [React.js + Spring Boot + MongoDB](https://bezkoder.com/react-spring-boot-mongodb/)

Fullstack with Django:

> [React.js + Django Rest Framework](https://bezkoder.com/django-react-axios-rest-framework/)

Serverless:
> [React Firebase CRUD App with Realtime Database](https://bezkoder.com/react-firebase-crud/)

> [React Firestore CRUD App example | Firebase Cloud Firestore](https://bezkoder.com/react-firestore-crud/)

Integration (run back-end & front-end on same server/port)
> [How to integrate React.js with Spring Boot](https://bezkoder.com/integrate-reactjs-spring-boot/)

> [Integrate React with Node.js Express on same Server/Port](https://bezkoder.com/integrate-react-express-same-server-port/)


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Set port
.env
```
PORT=8081
```

## Project setup

````shell
nvm ls
nvm use 16.15.1
nvm ls
````

In the project directory, you can run:

```
npm install
# or
yarn install
```

or

### Compiles and hot-reloads for development

```
npm start
# or
yarn start
```

Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.


````shell
yarn add --dev sinon
````

````shell
yarn test
````

На моем ноуте работает версия Node 16.20.2:

````shell
$ node --version
v16.20.2
````

Для mock использован sinon. (см. tutorial.service.spec.js)

### Start

````shell
yarn start
````

### Build

````shell
$ yarn build
yarn run v1.22.5
$ react-scripts build
Creating an optimized production build...
Browserslist: caniuse-lite is outdated. Please run:
npx update-browserslist-db@latest
Why you should do it regularly: https://github.com/browserslist/update-db#readme
Browserslist: caniuse-lite is outdated. Please run:
npx update-browserslist-db@latest
Why you should do it regularly: https://github.com/browserslist/update-db#readme
Compiled successfully.

File sizes after gzip:

73.6 kB   build/static/js/main.0f4da891.js
23.43 kB  build/static/css/main.7b1271f9.css

The project was built assuming it is hosted at /.
You can control this with the homepage field in your package.json.

The build folder is ready to be deployed.
You may serve it with a static server:

yarn global add serve
serve -s build

Find out more about deployment here:

https://cra.link/deployment

Done in 28.39s.

````
Собранные файлы будут в папке __build__.

Запуск билда:

````shell
$ serve -s build
````

Файлы из папки build скопировать в Apache /var/www/main/tutorials.

Адрес __backend сервиса__  указан в src/http-common.js:

````shell
export default axios.create({
  baseURL: "http://192.168.1.57:8980/api",
  mode: "no-cors",
  headers: {
    "Content-type": "application/json"
  }
});
````

Корневой адрес приложения для frontend указан в package.json:

````shell
  "scripts": {
    ....
    "build": "PUBLIC_URL=/vacancy react-scripts build",
    ....
}
````

Открыть http://<адрес apache2 сервера>/tutorials/.

mapStateToProps (redux) 


Переход на главную страницу после удаления позиции ("this.props.router.navigate('/vacancy')"):

````shell
deleteVacancy() {    
    VacancyService.delete(this.state.currentVacancy.n)
        .then(response => {
            console.log(response.data);
            // Переход на страницу со списком
            this.props.router.navigate('/vacancy');
        })
        .catch(e => {
        console.log(e);
    });
}

````

[Enzyme больше не поддерживается. нужно использовать react-testing-library] (https://habr.com/ru/companies/ruvds/articles/353076/)

"react-testing-library, в которой он видит простой инструмент, способный заменить enzyme"

[A Guide To Testing React Components With Jest And React Testing Library](https://keploy.io/blog/community/a-guide-to-testing-react-components-with-jest-and-react-testing-library)

[React: тестируем компоненты с помощью Jest и Testing Library](https://habr.com/ru/companies/timeweb/articles/670480/)

https://blog.logrocket.com/testing-react-apps-jest-react-testing-library/

~/prog/js/jest-testing

