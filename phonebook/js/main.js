'use strict';

import { data } from '../../data.js';

{
  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
  };

  const createLogo = (title) => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. Пользователь - ${title}`;
    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    main.classList.add('main');
    const mainContainer = createContainer();
    main.mainContainer = mainContainer;
    main.append(mainContainer);
    return main;
  };

  const createButtonsGroup = (params) => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({ className, type, text }) => {
      const button = document.createElement('button');
      button.type = type;
      button.className = className;
      button.textContent = text;
      return button;
    });
    btnWrapper.append(...btns);
    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML(
      'beforeend',
      `
    <tr>
       <th class='delete'>Удалить</th>
       <th>Имя</th>
       <th>Фамилия</th>
       <th>Телефон</th>
       <th></th>
    </tr>
    `
    );

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;
    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');
    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML(
      'beforeend',
      `
      <button class="close" type="submit"></button>
      <h2 class="form-title">Добавить контакт</h2>
      <div class="form-group">
        <label class="form-label" for="name">Имя</label>
        <input class="form-input" type="text" name="name" id="name" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="surename">Фамилия</label>
        <input class="form-input" type="text" name="surename" id="surename" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Телефон</label>
        <input class="form-input" type="number" name="phone" id="phone" required>
      </div>
    
    `
    );
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);
    form.append(...buttonGroup.btns);
    overlay.append(form);
    return {
      overlay,
      form,
    };
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    const copy = document.createElement('span');
    copy.textContent = `Все права защищены ©Boris`;
    footer.append(copy);
    footer.classList.add('footer');
    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);
    const table = createTable();
    const form = createForm();
    const footer = createFooter();
    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, form.overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      formOverlay: form.overlay,
      form: form.form,
    };
  };

  const createRow = ({ name: firstName, surname, phone }) => {
    const tr = document.createElement('tr');
    tr.classList.add('tr');
    const tdDel = document.createElement('td');
    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    const tdSurename = document.createElement('td');
    tdSurename.textContent = surname;
    const tdPhone = document.createElement('td');
    const tdEdit = document.createElement('td');
    const linkPhone = document.createElement('a');
    linkPhone.href = `tel:${phone}`;
    linkPhone.textContent = phone;
    const buttonDel = document.createElement('button');
    const buttonEdit = document.createElement('button');
    buttonEdit.title = 'Редактировать';
    buttonEdit.classList.add('btn-edit');
    tdPhone.append(linkPhone);
    tdDel.classList.add('delete');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);
    tr.linkPhone = linkPhone;
    tdEdit.append(buttonEdit);
    tr.append(tdDel, tdName, tdSurename, tdPhone, tdEdit);
    return tr;
  };

  const renderContacts = (el, data) => {
    const allRow = data.map(createRow);
    el.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach((contact) => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.linkPhone.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const init = (selector, title) => {
    const app = document.querySelector(selector);
    const phoneBook = renderPhoneBook(app, title);
    const { list, logo, btnAdd, formOverlay } = phoneBook;

    const allRow = renderContacts(list, data);
    hoverRow(allRow, logo);
    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });
    const close = document.querySelector('.close');
    formOverlay.addEventListener('click', (e) => {
      if (e.target === formOverlay || e.target === close) {
        formOverlay.classList.remove('is-visible');
      }
    });
  };

  window.phoneBookInit = init;
}
