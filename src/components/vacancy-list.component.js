import React, { Component } from "react";
import VacancyService from "../services/vacancy.service";
import { Link } from "react-router-dom";

export default class VacancyList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveVacancies = this.retrieveVacancies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveVacancy = this.setActiveVacancy.bind(this);
    this.removeAllVacancies = this.removeAllVacancies.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      vacancies: [],
      currentVacancy: {"n": 0},
      currentIndex: -1,
      searchName: ""
    };

    console.log("VacancyList.constructor");
    console.log("VacancyList.props:");
    console.log(props);
    this.refreshList();
    console.log(props);
  }

  componentDidMount() {
    console.log("mount");
    this.retrieveVacancies();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveVacancies() {
     VacancyService.getAll().then(response => {
          console.log(response.data);
          this.setState({
            vacancies: response.data,
            currentVacancy: {...response.data[0]},
            currentIndex: 0
          });

       }).catch(e => {
         console.log(e);
       });
  }

  refreshList() {
    console.log("refreshList()");
    this.retrieveVacancies();
    console.log(this.vacancies); //undefined т.к. в retrieveVacancies еще не сработал then()
    console.log(this.state.vacancies); // [] т.к. в retrieveVacancies еще не сработал then()
  }

  setActiveVacancy(vacancy, index) {
    console.log("selected n:" + vacancy.n);
    console.log("selected vacancy:" + JSON.stringify(vacancy));
    this.setState({
      currentVacancy: {...vacancy},
      currentIndex: index
    });
  }

  removeAllVacancies() {
    VacancyService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchName() {
    this.setState({
      currentVacancy: null,
      currentIndex: -1
    });

    if(this.state.searchName === '') {
        return this.retrieveVacancies();
    }
    VacancyService.findByTitle(this.state.searchName) // http.get(`/tutorial/by?name=${name}`)
      .then(response => {
        this.setState({
          vacancies: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  translateStatus(status) {
      if(status === 'in_plan') { return "В работе"; }
      if(status === 'deleted') { return "Удалена"; }
      return status;
  }

  render() {
    const { searchName, vacancies, currentVacancy, currentIndex } = this.state;

    return (
    <div className="col-md-12">
      <div className="list row col-md-12">
          <div className="input-group mb-3 padding-left-0">
            <input
              id="input-search-by-name"
              type="text"
              className="form-control"
              placeholder="Найти по названию"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                id="button-find"
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >Найти</button>
            </div>
        </div>
      </div>
      <div className="list row col-md-12">
         <h4 className="col-md-4 inline padding-left-0">Список вакансий</h4>
         <h4 className="col-md-8 inline padding-left-05em">Описание</h4>
      </div>
      <div className="list row col-md-12">
      <div className="list-group col-md-4 inline">
            {vacancies &&
              vacancies.map((vacancy, index) => (
                <div className={ "list-group-item " + (index === currentIndex ? "active" : "")}
                  onClick={() => this.setActiveVacancy(vacancy, index)}
                  key={index}
                >
                  {vacancy.n}. {vacancy.title}
                </div>
              ))}
      </div>
      <div className="col-md-8 inline padding-left-1em" id="description_block">
        <div>
          <div>
              <strong>N: </strong>{currentVacancy.n}
          </div>
          <div>
            <strong>Название: </strong>{currentVacancy.title}
          </div>
          <div>
            <strong>Описание: </strong>{currentVacancy.description}
          </div>
          <div>
            <strong>Источник: </strong><a href={currentVacancy.source}>{currentVacancy.source}</a>
          </div>
          <div>
            <strong>Статус: </strong>{currentVacancy.status}
          </div>
          <Link to={"/vacancies/" + currentVacancy.n} className="btn btn-primary btn-7em margin-top-0_5em">Изменить</Link>
          {/* TODO: реализовать удаление с диалогом подтверждения */}
          <Link to={"/vacancies/" + currentVacancy.n} className="btn btn-danger btn-7em margin-left_0_5em margin-top-0_5em">Удалить</Link>
        </div>
      </div>
      </div>
    </div>
    )
  }
}