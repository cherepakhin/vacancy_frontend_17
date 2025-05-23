import React, { Component } from "react";
import VacancyService from "../services/vacancy.service";

export default class AddVacancy extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSource = this.onChangeSource.bind(this);
    this.saveVacancy = this.saveVacancy.bind(this);
    this.newVacancy = this.newVacancy.bind(this);

    this.state = {
      n: -1,
      title: "",
      description: "", 
      published: false,
      source: "",
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeSource(e) {
    this.setState({
      source: e.target.value
    });
  }

  saveVacancy() {
    let data = {
      title: this.state.title,
      description: this.state.description,
      source: this.state.source,
      published: this.state.published,
      submitted: this.state.submitted
    };

    VacancyService.create(data)
      .then(response => {
        this.setState({
          n: response.data.n,
          title: response.data.title,
          description: response.data.description,
          link: response.data.link,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newVacancy() {
    this.setState({
      n: null,
      title: "",
      description: "",
      link: "",
      published: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newVacancy}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Вакансия</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Описание</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="link">Источник</label>
              <input
                type="text"
                className="form-control"
                id="sourceVacancy"
                required
                value={this.state.source}
                onChange={this.onChangeSource}
                name="sourceVacancy"
              />
            </div>

            <button onClick={this.saveVacancy} className="btn btn-success">
              Сохранить
            </button>
          </div>
        )}
      </div>
    );
  }
}
