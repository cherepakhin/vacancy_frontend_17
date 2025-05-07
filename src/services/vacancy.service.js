import axios from "../http-common";
// Не удалять комментарий этот коммент и ниже строчку. Эта зависимость нужна для кода "Пример запроса".
// import axios from "axios";

class VacancyService {
  getAll() {
    console.log("VacancyService.getAll()");

// "Пример запроса". Не удалять комментарий.
//    let req= axios.create({
//      baseURL: "axios://127.0.0.1:8080/api",
//
//      mode: "no-cors",
//      headers: {
//        "Content-type": "application/json"
//      }
//    });
//    let vacancies = req.get("/vacancy/");

//    vacancies.then(function (response) {
//                      console.log("findByTitle received result: " + vacancies);
//                  });
//

    let vacancies = axios.get(`/vacancy/`);
    console.log("getAll received result: " + vacancies);
    console.log(vacancies);
    return vacancies;
  }

  get(n) {
    console.log("VacancyService.get n=" + n);
    return axios.get(`/vacancy/${n}`);
  }

  create(vacancy) {
    console.log("VacancyService.create");
    console.log(vacancy);
    console.log("------------------");
    let newVacancy = {
        n: -1,
        title: vacancy.title,
        description: vacancy.description,
        source: vacancy.source,
        comment: vacancy.comment,
        company: vacancy.company
    };
    console.log("VacancyService json for put")
    console.log(newVacancy);

    let createdVacancy = axios.put("/vacancy/", newVacancy);
    console.log("createdVacancy");
    console.log(createdVacancy);
    return createdVacancy;
  }

  update(n, data) {
    console.log("VacancyService.update: n=" + n);
    console.log(data);
    return axios.post(`/vacancy/`, data);
  }

  delete(n) {
    console.log("VacancyService.delete n=" + n);
    return axios.delete(`/vacancy/${n}`);
  }

  deleteAll() {
    console.log("Delete all");
    return axios.delete(`/vacancy`);
  }

  findByTitle(title) {
    console.log("findByTitle: " + title);
    let critery = {
        "byName": '%' + title + '%'
    }
    let vacancies = axios.post(`/vacancy/find`, critery);
    console.log(vacancies);
    return vacancies;
  }
}

export default new VacancyService();