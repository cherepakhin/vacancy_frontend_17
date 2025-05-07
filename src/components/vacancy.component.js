import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import VacancyService from "../services/vacancy.service";
import { withRouter } from '../common/with-router';

class Vacancy extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getVacancy = this.getVacancy.bind(this);

    this.updateVacancy = this.updateVacancy.bind(this);
    this.deleteVacancy = this.deleteVacancy.bind(this);
    this.onChangeSource = this.onChangeSource.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.goBack = this.goBack.bind(this);
    this.setChanged = this.setChanged.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.translateStatus = this.translateStatus.bind(this);
//    const [show, setShow] = React.useState(false);

    this.getVacancy = this.getVacancy.bind(this);

    this.onCloseConfirm = this.onCloseConfirm.bind(this);
    this.onAcceptConfirm = this.onAcceptConfirm.bind(this);
    this.onClickOpenConfirm = this.onClickOpenConfirm.bind(this);

    this.openedConfirm = false;

    this.state = {
      currentVacancy: {
        n: null,
        name: "",
        description: "",
        source: "",
      },
      message: "",
      changedVacancy: false,
      openedConfirm: false
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    console.log(this.props);
    this.getVacancy(this.props.router.params.n);
  }

  onCloseConfirm() {
    console.log("onCloseConfirm");
    console.log(this.openedConfirm);
    this.openedConfirm = false;
    this.setState({
        openedConfirm: false
    })
    console.log(this.openedConfirm);
  }

  onAcceptConfirm() {
    console.log("onAcceptConfirm");
    console.log(this.openedConfirm);
    this.openedConfirm = false;
    this.setState({
        openedConfirm: false
    })
    console.log(this.openedConfirm);
    this.props.router.navigate('/vacancy');
  }

  onClickOpenConfirm() {
    console.log("onClickOpenConfirm");
    console.log(this.openedConfirm);
    this.openedConfirm = true;
    this.setState({
        openedConfirm: true
    })
    console.log(this.openedConfirm);
  }

  getVacancy(n) {
    console.log(n);
    this.isChangedVacancy=false;
    VacancyService.get(n)
      .then(response => {
        this.setState({
          currentVacancy: response.data
        });
//        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  setChanged() {
    console.log("setChanged");
    this.isChangedVacancy = true;
    console.log("isChangedVacancy:" + this.isChangedVacancy);
  }

  onChangeTitle(e) {
    console.log(e.target.value);
    const name = e.target.value;
    this.setChanged();
    this.setState(function(prevState) {
      return {
        currentVacancy: {
          ...prevState.currentVacancy,
          title: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    this.setChanged();

    this.setState(prevState => ({
      currentVacancy: {
        ...prevState.currentVacancy,
        description: description
      }
    }));
  }

  onChangeSource(e) {
    console.log(e);
    const source = e.target.value;
    this.setChanged();

    this.setState(prevState => ({
      currentVacancy: {
        ...prevState.currentVacancy,
        source: source
      }
    }));
  }

  onChangeStatus(status) {
    console.log("status");
    console.log(status);
    this.setChanged();
//        const source = e.target.value;

    this.setState(prevState => ({
      currentVacancy: {
        ...prevState.currentVacancy,
        status: status
      }
    }));

//    let data = {
//      n: this.state.currentVacancy.n,
//      title: this.state.currentVacancy.title,
//      link: this.state.currentVacancy.link,
//      description: this.state.currentVacancy.description,
//      submitted: status
//    };

//    VacancyService.update(this.state.currentVacancy.n, data)
//      .then(response => {
//        console.log(response);
//        console.log(status);
//        this.setState(prevState => ({
//          currentVacancy: {
//            ...prevState.currentVacancy,
//            published: status
//          }
//        }));
//        console.log(response.data);
//      })
//      .catch(e => {
//        console.log(e);
//      });
//
//    this.setState(function(newState) {
//      return {
//        currentVacancy: {
//          ...newState.currentVacancy
//        }
//      };
//    });

  }

  updateVacancy() {
    VacancyService.update(
      this.state.currentVacancy.n,
      this.state.currentVacancy
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Обновлено."
        });
      })
      .catch(e => {
        console.log(e);
      });
    console.log("isChangedVacancy:" + this.isChangedVacancy);
    this.isChangedVacancy = false;
    this.goBack();
    console.log("isChangedVacancy:" + this.isChangedVacancy);
  }

  handleChangeStatus(event) {
//    this.setState({
//      status: event.target.value
//    });
//    alert('Выбрано: ' + event.target.value);
    console.log('Выбрано: ' + event.target.value)
    this.setChanged();
    event.preventDefault();
    this.setState(prevState => ({
      currentVacancy: {
        ...prevState.currentVacancy,
        status: event.target.value
      }
    }));

  }

  deleteVacancy() {
    VacancyService.delete(this.state.currentVacancy.n)
      .then(response => {
        console.log(response.data);
        // Переход на страницу со списком
        // this.props.router.navigate('/vacancy');
        this.goBack();
      })
      .catch(e => {
        console.log(e);
      });
  }

  goBack() {
    console.log("goBack");
    console.log("isChangedVacancy:" + this.isChangedVacancy);
    if(this.isChangedVacancy) {
        this.onClickOpenConfirm();
        return;
    }
    this.props.router.navigate('/vacancy');
  }

  translateStatus(status) {
    console.log("translateStatus");
    console.log(status);
    let ret = status;
    if(status === 'in_plan') { ret = "Не откликался"; }
    if(status === 'in_work') { ret = "В работе"; }
    console.log(ret);
    return ret;
  }

  render() {
    const { currentVacancy } = this.state;
    console.log(currentVacancy);
    console.log(this.openedConfirm);
    return (
      <div>
        <Modal
                animation={false}
                show={this.openedConfirm}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Внимание</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Изменения не сохранены. Выйти?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.onCloseConfirm} className="text-center">
                    Нет
                  </Button>
                  <Button variant="primary" onClick={this.onAcceptConfirm} className="text-center">Да</Button>
                </Modal.Footer>
        </Modal>

        {currentVacancy ? (
          <div id="edit-form" className="edit-form">
            <h4 id="id_title" data-testid="title">Описание вакансии</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Название</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentVacancy.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Описание</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentVacancy.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="link">Источник</label>
                <input
                  type="text"
                  className="form-control"
                  id="vacancy_link"
                  value={currentVacancy.source}
                  onChange={this.onChangeSource}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status_select">Состояние:</label>
                 <select id="status_select" className="form-control"
                        value={currentVacancy.status}
                        onChange={this.handleChangeStatus}>
                   <option value="in_work">В работе</option>
                   <option value="in_plan">Не откликался</option>
                   <option value="deleted">Удалена</option>
                 </select>
              </div>
            </form>
            <div className="btn-toolbar margin-top-0_5em">
                <button
                  className="btn btn-danger btn-7em text-center"
                  onClick={this.deleteVacancy}
                >
                  Удалить
                </button>

                <button
                  type="submit"
                  id="id_btn_submit"
                  className="btn btn-primary btn-7em text-center pad1px margin1px"
                  onClick={this.updateVacancy}
                >
                  Сохранить
                </button>

                <button
                  type="submit"
                  id="id_btn_return"
                  className="btn btn-warning btn-7em text-center"
                  onClick={this.goBack}
                >
                  Вернуться
                </button>
            </div>
            <div className="mt-2">{this.state.message}</div>
          </div>
        ) : (
          <div>
            <br />
            <p>Выбери вакансию...</p>
          </div>
        )}
      </div>
    );
  }
}

export {
    Vacancy as VacancyForTest
};

export default withRouter(Vacancy);