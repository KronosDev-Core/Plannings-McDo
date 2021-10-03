const HTML = {
  SelectOptionEmployee: (data) => {
    return `<option value="${data._id}">${data.id} | ${
      data.name
    } | ${String(data.MaxHour).replace(".", ",")}h/sem</option>`;
  },
  SelectOptionTimeWork: (data) => {
    if (data.Absent) {
      return `<option value="${data._id}">Absent le ${new Date(
        Number(data.DayDate)
      ).toDateString()}`;
    } else {
      return `<option value="${data._id}">Present de ${data.StartHour.replace(".", "h")} à ${
        data.EndHour.replace(".", "h")
      } le ${new Date(Number(data.DayDate)).FormatDM()}`;
    }
  },
  DivFormCardFooterHtmlForm: `
    <div class="w-100 d-inline-flex">
        <div class="rounded-pill w-10"><hr></div>
        <div class="mx-2 my-auto text-nowrap"><p class="m-auto">Select Employee</p></div>
        <div class="w-100 rounded-pill"><hr></div>
    </div>

    <div class="row m-1">
        <div class="col input-group">
            <select class="form-select" aria-label="select employee">
                <option selected="true" disabled>Select Employee</option>
                <option value="new">New Employee</option>
            </select>
        </div>
    </div>

    <div id="OptionAdmin"></div>
    <div id="SubOptionAdmin"></div>
    <div id="NextAdmin"></div>
    `,
  AdminFormOption: (data) => {
  var extra = "";

  if (data.permission === "Manager") extra = "disabled"
    
  return `
  <div class="w-100 d-inline-flex">
      <div class="rounded-pill w-10"><hr></div>
      <div class="mx-2 my-auto text-nowrap"><p class="m-auto">Select Option</p></div>
      <div class="w-100 rounded-pill"><hr></div>
  </div>

  <div class="row m-1">
      <div class="col input-group">
          <select class="form-select" aria-label="select option">
              <option  ${data.permission === "Manager" ? "" : "selected"} disabled>Select Option</option>
              <option value="EditEmp" ${extra}>Edit Employee</option>
              <option value="NewWor" ${extra}>New Time Work</option>
              <option value="EditWor" ${data.permission === "Manager" ? "selected" : ""}>Edit Time Work</option>
          </select>
      </div>
  </div>`;
  },
  AdminFormSubOption: `
  <div class="w-100 d-inline-flex">
      <div class="rounded-pill w-10"><hr></div>
      <div class="mx-2 my-auto text-nowrap"><p class="m-auto">Select Time Work</p></div>
      <div class="w-100 rounded-pill"><hr></div>
  </div>

  <div class="row m-1">
      <div class="col input-group">
          <select class="form-select" aria-label="select option">
              <option selected="true" disabled>Select Time Work</option>
          </select>
      </div>
  </div>`,
  TemplateFormEmployee: (data) => {
    console.log(data)
    var title = data.type === "new" ? "New employee" : "Edit employee",
      DeleteBtn = data.type === "new" ? "disabled" : "",
      SendBtn = data.type === "new" ? "Save Employee" : "Edit Employee",
      FullName = data.type === "new" ? "" : `value="${data.value.name}"`,
      id = data.type === "new" ? "" : `value="${data.value.id}"`,
      MaxHour = data.type === "new" ? "" : `value="${data.value.MaxHour}"`,
      DefaultId =
        data.type === "new"
          ? ""
          : `<input type="text" class="d-none" name="_id" value="${data.value._id}">`;

    return `
    <div class="w-100 d-inline-flex">
        <div class="rounded-pill w-10"><hr></div>
        <div class="mx-2 my-auto text-nowrap"><p class="m-auto">${title}</p></div>
        <div class="w-100 rounded-pill"><hr></div>
    </div>
    <p class="fst-italic fs-6 fw-light text-danger">Le numéro de pointage doit être unique. (il ne doit pas être renseigné auprès d'un autre employé enregistré)</p>
    <form method="POST" action="/Employe">
        ${DefaultId}
        <input type="text" class="d-none" name="type" value="${data.type}">
        <input type="text" class="d-none" name="pays" value="${data.account.pays}">
        <input type="number" class="d-none" name="restaurant" value="${data.account.Restaurant}">
        <div class="row m-1">   
            <div class="col input-group">
                <span class="input-group-text">Prénom et Nom</span>
                <input type="text" class="form-control text-uppercase" name="name" placeholder="Prénom et Nom" aria-autocomplete="both" ${FullName} required>
                <div class="invalid-feedback">
                ${DATA.ErrorValidationForm}
                </div>
            </div>
        </div>

        <div class="row m-1">
            <div class="col input-group">
                <span class="input-group-text">Numéro de pointage</span>
                <input type="number" class="form-control" name="id" placeholder="Numéro de pointage" ${id} required>
                <div class="invalid-feedback">
                    ${DATA.ErrorValidationForm}
                </div>
                <span class="input-group-text">Heure Max</span>
                <input type="number" class="form-control" name="MaxHour" placeholder="Heure max" step="any" ${MaxHour} required>
                <div class="invalid-feedback">
                    ${DATA.ErrorValidationForm}
                </div>
            </div>
        </div>

        <div class="row m-1 justify-content-md-center">
            <div class="col-auto btn-group" role="group">
                <button type="button" class="btn btn-outline-danger" ${DeleteBtn}>Delete Employee</button>
                <button type="reset" class="btn btn-outline-secondary">Reset Form</button>
                <button type="submit" class="btn btn-outline-success">${SendBtn}</button>
            </div>
        </div>
    </form>
    `;
  },
  InputRoleEmployee: (data) => {
    console.log(data)
    var Option = "", extra = false;

    if (data.Role !== "" && Object.keys(DATA.Role).indexOf(data.Role) !== -1) extra = true;
    
    Object.keys(DATA.Role).forEach((elem, index) => {
      if (extra && elem === data.Role) Option += `<option value="${elem}" selected>${DATA.Role[Object.keys(DATA.Role)[index]]}</option>`
      else Option += `<option value="${elem}">${DATA.Role[Object.keys(DATA.Role)[index]]}</option>`
    });

    return `
    <span class="input-group-text">Role</span>
    <select name="Role" class="form-select">
      <option ${extra ? "" : "selected"} disabled>Sélectionner un rôle</option>
      ${Option}
    </select>
    <div class="invalid-feedback">
      ${DATA.ErrorValidationForm}
    </div>
    <span class="input-group-text">Ligne</span>
    <input type="text" class="form-control" name="Line" placeholder="Ligne" value="${data.Line === "" ? "" : data.Line}" ${data.Line === "" ? "disabled" : ""}>
    <div class="invalid-feedback">
        ${DATA.ErrorValidationForm}
    </div>
    `
  },
  TemplateFormTimeWork: (data) => {
    var title = data.type === "new" ? "New time work" : "Edit time work",
      DeleteBtn = data.type === "new" ? "disabled" : "",
      SendBtn = data.type === "new" ? "Save time work" : "Edit time work",
      check = data.type !== "new" && data.value.Absent ? "checked" : "",
      DayDate =
        data.type === "new"
          ? ""
          : `value="${new Date(Number(data.value.DayDate)).FormatYMD()}"`,
      DefaultId =
        data.type === "new"
          ? ""
          : `<input type="text" class="d-none" name="_id" value="${data.value._id}">`,
      PermDisabled = data.permission === "Manager" ? "readonly" : "";

    if (data.type !== "new") {
      if (data.value.Absent) {
        var StartHour = "disabled",
          EndHour = "disabled";
      } else {
        var StartHour = `value="${data.value.StartHour.replace(".", ":")}"`,
          EndHour = `value="${data.value.EndHour.replace(".", ":")}"`;
      }
    }

    return `
    <div class="w-100 d-inline-flex">
        <div class="rounded-pill w-10"><hr></div>
        <div class="mx-2 my-auto text-nowrap"><p class="m-auto">${title}</p></div>
        <div class="w-100 rounded-pill"><hr></div>
    </div>

    <form method="POST" action="/Horaire">
        <input type="text" class="d-none" name="StartWeek" value="${data.StartWeek.getTime()}">
        <input type="text" class="d-none" name="type" value="${data.type}">
        ${DefaultId}

        <div class="row m-1">
            <div class="col input-group">
                <span class="input-group-text">Numéro de pointage</span>
                <input type="number" class="form-control" name="id" placeholder="Numéro de pointage" value="${data.id}" readonly>
                <div class="invalid-feedback">
                    ${DATA.ErrorValidationForm}
                </div>

                
                <div class="form-control" ${PermDisabled}>
                    <input type="checkbox" class="form-check-input" value="" name="Absent" ${check} ${PermDisabled}>
                    Absent / Week-end
                </div>
                <div class="invalid-feedback">
                    ${DATA.ErrorValidationForm}
                </div>
            </div>
        </div>

        <div class="row m-1">
            <div class="col input-group">
                <span class="input-group-text">Date</span>
                <input type="date" class="form-control" name="DayDate" ${DayDate} required ${PermDisabled}>
                <div class="invalid-feedback">
                  ${DATA.ErrorValidationForm}
                </div>
                <span class="input-group-text">Horaire</span>
                <input type="time" class="form-control" name="StartHour" ${StartHour} required ${PermDisabled}>
                <div class="invalid-feedback">
                  ${DATA.ErrorValidationForm}
                </div>
                <span class="input-group-text">-</span>
                <input type="time" class="form-control" name="EndHour" ${EndHour} required ${PermDisabled}>
                <div class="invalid-feedback">
                  ${DATA.ErrorValidationForm}
                </div>
            </div>
        </div>

        <div class="row m-1">
          <div class="col input-group">
            ${data.permission === "Manager" ? HTML.InputRoleEmployee(data.value) : ""}
          </div>
        </div>
      
        <div class="row m-1 justify-content-md-center">
            <div class="col-auto btn-group" role="group">
            <button type="button" class="btn btn-outline-danger" ${DeleteBtn}>Delete Time Work</button>
            <button type="reset" class="btn btn-outline-secondary">Reset Form</button>
            <button type="submit" class="btn btn-outline-success">${SendBtn}</button>
            </div>
        </div>
    </form>
    `;
  },
  TemplateLineTable: (data) => {
    return `
        <tr>
            <th name="id" scope="row">${data.id}</th>
            <th name="fullname">${String(data.name).toUpperCase()}</th>
            <td name="monday" class="w-auto"></td>
            <td name="tuesday" class="w-auto"></td>
            <td name="wednesday" class="w-auto"></td>
            <td name="thursday" class="w-auto"></td>
            <td name="friday" class="w-auto"></td>
            <td name="saturday" class="w-auto"></td>
            <td name="sunday" class="w-auto"></td>
            <th name="maxhour"> / ${data.MaxHour}</th>
        </tr>
        `;
  },
  TemplateLineCard: (data) => {
    var special = "";

    if (Object.keys(data).indexOf("close") !== -1) {
      special = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
      </svg>`;
    } else if (Object.keys(data).indexOf("open") !== -1) {
      special = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 0 16 16">
        <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
      </svg>`;
    }

    if (data.type === "danger") {
      return `
      <div class="my-2 p-1 w-50 text-center align-content-center align-items-center d-flex flex-row justify-content-evenly bagde rounded-pill alert alert-danger shadow container-fluid">
        ${special}
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cpu-fill" viewBox="0 0 16 16">
          <path d="M6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
          <path d="M5.5.5a.5.5 0 0 0-1 0V2A2.5 2.5 0 0 0 2 4.5H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2A2.5 2.5 0 0 0 4.5 14v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14a2.5 2.5 0 0 0 2.5-2.5h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14A2.5 2.5 0 0 0 11.5 2V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5zm1 4.5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3A1.5 1.5 0 0 1 6.5 5z" />
        </svg>
        <div class="align-middle">${data.time}</div>
      </div>
      `;
    }

    if (data.type === "moderate") {
      return `
      <div class="my-2 p-1 w-50 text-center align-content-center align-items-center d-flex flex-row justify-content-evenly bagde rounded-pill alert alert-warning shadow container-fluid">
      ${special}
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
        </svg>
        <div>${data.time}</div>
      </div>
      `;
    }

    if (data.type === "chill") {
      return `
      <div class="my-2 p-1 w-50 text-center align-content-center align-items-center d-flex flex-row justify-content-evenly bagde rounded-pill alert alert-success shadow container-fluid">
        ${special}
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-dash-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
          <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
        <div>${data.time}</div>
      </div>
      `;
    }

    if (data.type === "neutral") {
      return `
      <div class="my-2 p-1 w-50 text-center align-content-center align-items-center d-flex flex-row justify-content-evenly bagde rounded-pill alert alert-light shadow container-fluid">
        <div>Abs</div>
      </div>
      `;
    }

    if (data.type === "pause") {
      return `
      <div class="my-2 p-1 w-50 text-center align-content-center align-items-center d-flex flex-row justify-content-evenly bagde rounded-pill alert alert-light shadow container-fluid">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
        </svg>  
        <div>Pause</div>
      </div>
      `;
    }
  },
  OptionEmploye: `
  <button class="btn btn-outline-info border-0" data-bs-toggle="tooltip" tabindex="0" data-bs-placement="bottom" data-bs-html="true" title=""><i class="bi bi-clipboard"></i></button>
  <button class="btn btn-outline-warning border-0" data-bs-toggle="tooltip" tabindex="0" data-bs-placement="bottom" data-bs-html="true" title=""><i class="bi bi-cash-coin"></i></button>
  `,
  TemplateFormMainPage: (data) => {
    var OptionPays = "";

    data.World.forEach((elem, index) => {
      OptionPays += `
      <option value="${elem.alpha2}">${elem.alpha2.toUpperCase()} | ${elem.name}</option>`;
    });

    return `
    <div class="row m-1">
      <div class="col input-group">
        <span class="input-group-text">Pays</span>
        <select name="Pays" class="form-select rounded-end">
          <option selected disabled>Sélectionner un pays</option>
          ${OptionPays}
        </select>
        <div class="invalid-feedback">
          test
        </div>
      </div>
    </div>
    <div class="row m-1 d-none">
      <div class="col input-group">
        <span class="input-group-text">Département</span>
        <select name="Departement" class="form-select rounded-end">
          
        </select>
        <div class="invalid-feedback">
          test
        </div>
      </div>
    </div>
    <div class="row m-1 d-none">
      <div class="col input-group">
        <span class="input-group-text">Restaurant</span>
        <select name="Restaurant" class="form-select rounded-end">
        </select>
        <div class="invalid-feedback">
          test
        </div>
      </div>
    </div>
    <div class="d-flex flex-row align-content-between m-auto my-2 d-none">
      <button class="btn btn-outline-warning mx-3">Employee</button>
      <button class="btn btn-outline-secondary mx-3">Manager</button>
      <button class="btn btn-outline-success mx-3">Administration</button>
    </div>
    `;
  },
  OptionDepartement: (data) => {
    var Option = "<option selected disabled>Sélectionner votre département</option>";
    data.Departement.forEach(elem => {
      if (data.pays === elem.pays) {
        Option += `
        <option value="${elem.code}">${elem.code} | ${elem.name}</option>
        `;
      }
    });
    return Option;
  },
  OptionRestaurant: (data) => {
    var DataPreSort = {}, Option = "<option selected disabled>Sélectionner votre restaurant</option>";

    data.forEach((elem, index) => {
      if (Object.keys(DataPreSort).indexOf(elem.ville) === -1) {
        DataPreSort[elem.ville] = [elem];
      } else {
        DataPreSort[elem.ville].push(elem);
      }
    });

    Object.keys(DataPreSort).forEach((elem, index) => {
      Option += `<optgroup label="${elem}">`
      DataPreSort[elem].forEach((elem, index) => {
        Option += `<option value="${elem.id}">${elem.name}</option>`
      })
      Option += "</optgroup>"
    });

    return Option;
  },
  AccountPlannings: (data) => {
    if (data.permission == "view") {
      return `
      ${data.username}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill ms-2" viewBox="0 0 16 16">
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
      </svg>
      `;
    } else if (data.permission == "Administration" || data.permission == "Manager") {
      return `
      ${data.username}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill ms-2" viewBox="0 0 16 16">
        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
      </svg>
      `;
    }
  },
  TimeTable: (FullHeure, data, SameWeek) => {
    if (FullHeure.search(";") !== -1) {
      var SplitHeure = FullHeure.split(";"),
        res = "";

      SplitHeure.forEach((element, index) => {
        var [Work, WarnningIcon, _] = TimeWorkCurrent(SameWeek, data[index], FullHeure=element);

        if (index + 1 == SplitHeure.length) {
          res += `
          <div>
            ${WarnningIcon}
            <p class="Time-${data[index]._id} ${Work}">${element}</p>
          </div>`;
        } else {
          res += `
          <div>
            ${WarnningIcon}
            <p class="Time-${data[index]._id} ${Work}">${element}</p>
          </div>
          <hr class="dropdown-divider">
          `;
        }

      });

      return res;
    } else {
      var [Work, WarnningIcon, _] = TimeWorkCurrent(SameWeek, data=data, FullHeure=FullHeure);

      return `
      <div class="d-flex">
        ${WarnningIcon}
        <p class="Time-${data._id} ${Work}">${FullHeure}</p>
      </div>`;
    }
  }
};