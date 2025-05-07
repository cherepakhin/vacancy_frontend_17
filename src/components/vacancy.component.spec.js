import React from 'react';
import '@testing-library/jest-dom';
import {render, Simulate, wait} from '@testing-library/react';
import { screen } from '@testing-library/react';
// Тут добавляется средство проверки ожиданий
//import 'react-testing-library/extend-expect'
// Mock-объект находится в директории __mocks__
import axiosMock from 'axios';
import { VacancyForTest, Vacancy } from "./vacancy.component";


describe('tests vacancy.component', () => {
  test('individual test', () => {
    expect(1).toBe(1);
    expect("value").toEqual("value");
    expect(true).toBeTruthy();
  });

  test('array contains item', () => {
    const array = ["item1", "item2"]
    const item = "item1";

    expect(array).toContain(item);
  });

  test('test title by id', () => {
    let router = {router:{params: {n: "1", name: "NAME_1", description: "DESCRIPTION_1", source: "SOURCE_1"}}};
    const vacancyComponent = render(<VacancyForTest {...router}/>);

    const titleById = vacancyComponent.container.querySelector('#id_title_label');
    expect(titleById.textContent).toBe("Название");
  });

  test('test INPUT for title querySelector by ID', () => {
    let router = {router:{params: {n: "1", name: "NAME_1", description: "DESCRIPTION_1", source: "SOURCE_1"}}};
    const vacancyComponent = render(<VacancyForTest {...router}/>);

    const titleInput = vacancyComponent.container.querySelector('#title');
//    expect(titleInput).toBeInTheDocument();
    expect(titleInput.value).toBe("");
  });

  test('button BACK check CLASS', () => {
    let router = {router:{params: {n: "1", name: "NAME_1", description: "DESCRIPTION_1", source: "SOURCE_1"}}};
    const vacancyComponent = render(<VacancyForTest {...router}/>);

    const btnReturn = vacancyComponent.container.querySelector('#id_btn_return');
//    expect(btnReturn).toBeInTheDocument();
//    expect(btnReturn).toHaveClass("btn btn-warning btn-7em text-center");
  });

// этот тест для React 16.9. Нужно переписать на версии 17+. см vacancy.component17.spec.js
  test('button BACK check LABEL', () => {
    let router = {router:{params: {n: "1", name: "NAME_1", description: "DESCRIPTION_1", source: "SOURCE_1"}}};
    const vacancyComponent = render(<VacancyForTest {...router}/>);

    const btnReturn = vacancyComponent.container.querySelector('#id_btn_return');
//    expect(btnReturn).toBeInTheDocument();
//    expect(btnReturn).toHaveTextContent("Вернуться");
  });

// этот тест для React 16.9. Нужно переписать на версии 17+. см vacancy.component17.spec.js
//  test('input for LINK in component', () => {
//    let router = {router:{params: {n: "1", name: "NAME_1", description: "DESCRIPTION_1", source: "SOURCE_1"}}};
//    const vacancyComponent = render(<VacancyForTest {...router}/>);
//
//    const btnReturn = vacancyComponent.container.querySelector('#vacancy_link');
//    expect(btnReturn).toBeInTheDocument();
//  });
});


