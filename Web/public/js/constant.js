const ErrorValidationForm = "Ce Champ doit être rempli !";

const DATA = {
  DayWeekDate: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  DayWeekDataTable: [9, 3, 4, 5, 6, 7, 8],
  Role: {
    LST: "Service à table",
    LCA: "Chargé d'acceuil",
    LN: "Néttoyage lobby",
    CPE: "Passage éxterieur",
    CBL: "Boisson lobby",
    CBD: "Boisson drive",
    CG: "Glace",
    CPB: "Passage boisson",
    CVL: "Vérif lobby",
    CVD: "Vérif Drive",
    CEL: "Encaissement lobby",
    CED: "Encaissement drive",
    CRC: "Rappel Commande",
    CTD: "Tablette drive",
    CTL: "Tablette lobby",
    COL: "OAT lobby",
    COD: "OAT drive",
    CO: "OAT",
    CF: "Frite",
    CRZ: "RZ Comptoir",
    KRZ: "RZ Cuisine",
    KP: "Pain",
    KG: "Garniture",
    KU: "UHC",
    KDU: "Double UHC",
    KCF: "Cuisson frit",
    KCV: "Cuisson viande",
    KDC: "Double cuisson",
    CK: "Close Cuisine",
    CL: "Close Lobby",
    CC: "Close Comptoir"
  },
  Pays: {
    "IM": "Île de Man",
    "HR": "Croatie",
    "GW": "Guinée-Bissau",
    "IN": "Inde",
    "KE": "Kenya",
    "LA": "Laos",
    "IO": "Territoire britannique de l'océan Indien",
    "HT": "Haïti",
    "LB": "Liban",
    "GY": "Guyana",
    "KG": "Kirghizistan",
    "HU": "Hongrie",
    "LC": "Sainte-Lucie",
    "IQ": "Irak",
    "KH": "Cambodge",
    "JM": "Jamaïque",
    "IR": "Iran",
    "KI": "Kiribati",
    "IS": "Islande",
    "MA": "Maroc",
    "JO": "Jordanie",
    "IT": "Italie",
    "JP": "Japon",
    "MC": "Monaco",
    "KM": "Comores",
    "MD": "Moldavie",
    "LI": "Liechtenstein",
    "KN": "Saint-Christophe-et-Niévès",
    "ME": "Monténégro",
    "NA": "Namibie",
    "MF": "Saint-Martin",
    "LK": "Sri Lanka",
    "KP": "Corée du Nord",
    "MG": "Madagascar",
    "NC": "Nouvelle-Calédonie",
    "MH": "Îles Marshall",
    "KR": "Corée du Sud",
    "NE": "Niger",
    "NF": "Île Norfolk",
    "MK": "Macédoine",
    "NG": "Nigéria",
    "ML": "Mali",
    "MM": "Myanmar (Birmanie)",
    "LR": "Libéria",
    "NI": "Nicaragua",
    "KW": "Koweït",
    "MN": "Mongolie",
    "LS": "Lesotho",
    "PA": "Panamá",
    "MO": "Macau",
    "LT": "Lituanie",
    "KY": "Îles Caïmans",
    "MP": "Îles Mariannes du Nord",
    "LU": "Luxembourg",
    "NL": "Pays-Bas",
    "KZ": "Kazakhstan",
    "MQ": "Martinique",
    "LV": "Lettonie",
    "MR": "Mauritanie",
    "PE": "Pérou",
    "MS": "Montserrat",
    "QA": "Qatar",
    "NO": "Norvège",
    "PF": "Tahïti (Polynésie française)",
    "MT": "Malte",
    "LY": "Libye",
    "NP": "Népal",
    "PG": "Papouasie-Nouvelle-Guinée",
    "MU": "Maurice",
    "PH": "Philippines",
    "MV": "Maldives",
    "OM": "Oman",
    "NR": "Nauru",
    "MW": "Malawi",
    "MX": "Mexico",
    "PK": "Pakistan",
    "MY": "Malaisie",
    "NU": "Niue",
    "PL": "Pologne",
    "MZ": "Mozambique",
    "PM": "Saint-Pierre-et-Miquelon",
    "PN": "Îles Pitcairn",
    "RE": "La Réunion",
    "SA": "Arabie saoudite",
    "SB": "Îles Salomon",
    "NZ": "Nouvelle-Zélande",
    "SC": "Seychelles",
    "SD": "Soudan",
    "PR": "Porto Rico",
    "SE": "Suède",
    "PS": "Territoires palestiniens occupés",
    "PT": "Portugal",
    "SG": "Singapour",
    "TC": "Îles Turques-et-Caïques",
    "SH": "Sainte-Hélène",
    "TD": "Tchad",
    "SI": "Slovénie",
    "PW": "Palaos",
    "SJ": "Svalbard et Jan Mayen",
    "UA": "Ukraine",
    "RO": "Roumanie",
    "TF": "Terres australes et antarctiques françaises",
    "SK": "Slovaquie",
    "PY": "Paraguay",
    "TG": "Togo",
    "SL": "Sierra Leone",
    "TH": "Thaïlande",
    "SM": "Saint-Marin",
    "SN": "Sénégal",
    "RS": "Serbie (Yougoslavie)",
    "TJ": "Tadjikistan",
    "VA": "Cité du Vatican",
    "SO": "Somalie",
    "TK": "Tokelau",
    "UG": "Ouganda",
    "RU": "Russie",
    "TL": "Timor oriental",
    "VC": "Saint-Vincent-et-les-Grenadines",
    "TM": "Turkménistan",
    "SR": "Suriname",
    "RW": "Rwanda",
    "TN": "Tunisie",
    "VE": "Venezuela",
    "TO": "Tonga",
    "ST": "Sao Tomé-et-Principe",
    "VG": "Îles Vierges britanniques",
    "SV": "Salvador",
    "UM": "Îles mineures éloignées des États-Unis",
    "TR": "Turquie",
    "VI": "Îles Vierges(US)",
    "WF": "Wallis-et-Futuna",
    "TT": "Trinité-et-Tobago",
    "SY": "Syrie",
    "SZ": "Swaziland",
    "TV": "Tuvalu",
    "TW": "Taïwan",
    "VN": "Viêt Nam",
    "US": "États-Unis(USA)",
    "TZ": "Tanzanie",
    "YE": "Yémen",
    "ZA": "Afrique du Sud",
    "XK": "République du Kosovo",
    "UY": "Uruguay",
    "VU": "Vanuatu",
    "UZ": "Ouzbékistan",
    "WS": "Samoa",
    "ZM": "Zambie",
    "AC": "Île de l'Ascension",
    "AD": "Andorre",
    "YT": "Mayotte",
    "AE": "Émirats arabes unis",
    "YU": "Serbia and Montenegro",
    "BA": "Serbie-et-Monténégro",
    "AF": "Afghanistan",
    "BB": "Barbade",
    "AG": "Antigua-et-Barbuda",
    "BD": "Bangladesh",
    "AI": "Anguilla",
    "BE": "Belgique",
    "CA": "Canada",
    "BF": "Burkina Faso",
    "BG": "Bulgarie",
    "ZW": "Zimbabwe",
    "AL": "Albanie",
    "CC": "Îles Cocos",
    "BH": "Bahreïn",
    "AM": "Arménie",
    "CD": "République démocratique du Congo",
    "BI": "Burundi",
    "AN": "Antilles néerlandaises",
    "BJ": "Bénin",
    "AO": "Angola",
    "CF": "République centrafricaine",
    "CG": "République du Congo",
    "AQ": "Antarctique",
    "CH": "Suisse",
    "BM": "Bermudes",
    "AR": "Argentine",
    "CI": "Côte d'Ivoire",
    "BN": "Brunei Darussalam",
    "DE": "Allemagne",
    "AS": "Samoa américaines",
    "BO": "Bolivie",
    "AT": "Autriche",
    "CK": "Îles Cook",
    "AU": "Australie",
    "CL": "Chili",
    "EC": "Équateur",
    "CM": "Cameroun",
    "BR": "Brésil",
    "AW": "Aruba",
    "CN": "Chine",
    "EE": "Estonie",
    "BS": "Bahamas",
    "DJ": "Djibouti",
    "AX": "Åland",
    "CO": "Colombie",
    "BT": "Bhoutan",
    "DK": "Danemark",
    "EG": "Égypte",
    "AZ": "Azerbaïdjan",
    "EH": "Sahara occidental",
    "BV": "Île Bouvet",
    "DM": "Dominique",
    "CR": "Costa Rica",
    "BW": "Botswana",
    "GA": "Gabon",
    "DO": "République dominicaine",
    "BY": "Biélorussie",
    "GB": "Royaume-Uni",
    "CU": "Cuba",
    "BZ": "Bélize",
    "CV": "Cap-Vert",
    "GD": "Grenade",
    "FI": "Finlande",
    "GE": "Géorgie",
    "FJ": "Fidji",
    "CX": "Île Christmas",
    "GF": "Guyane",
    "FK": "Îles Malouines",
    "CY": "Chypre",
    "GG": "Guernesey",
    "CZ": "République tchèque",
    "GH": "Ghana",
    "FM": "Micronésie",
    "ER": "Érythrée",
    "GI": "Gibraltar",
    "ES": "Espagne",
    "FO": "Îles Féroé",
    "ET": "Éthiopie",
    "GL": "Groenland",
    "DZ": "Algérie",
    "GM": "Gambie",
    "ID": "Indonésie",
    "FR": "France",
    "GN": "Guinée",
    "IE": "Irlande",
    "HK": "Hong Kong",
    "GP": "Guadeloupe",
    "GQ": "Guinée équatoriale",
    "HM": "Îles Heard-et-MacDonald",
    "GR": "Grèce",
    "HN": "Honduras",
    "JE": "Jersey",
    "GS": "Géorgie du Sud-et-les Îles Sandwich du Sud",
    "FX": "France métropolitaine",
    "GT": "Guatemala",
    "GU": "Guam",
    "IL": "Israël"
  }
};


const FUNCTION = {
  ConvertTimeTable: (FullHeure, data, SameWeek) => {
    if (FullHeure.search(";") !== -1) {
      var SplitHeure = FullHeure.split(";"),
        res = "";

      SplitHeure.forEach((element, index) => {
        var Work = '';

        if (SameWeek) {
          var elemSplit = element.split(" - "), Time1 = elemSplit[0].split(":"), Time2 = elemSplit[1].split(":");
          var h1 = Number(Time1[0]), m1 = Number(Time1[1]),
              h2 = Number(Time2[0]), m2 = Number(Time2[1]),
              h3 = new Date().getHours(), m3 = new Date().getMinutes();

          if (h2 < 5) h2 += 23;
  
          
          if (data[index].DayDate === `${new Date().setFullTime(2, 0, 0, 0)}`) {
            if ((h3 > h1 && h3 < h2) || ((h3 == h1 && m3 >= m1) || (h3 == h2 && !(m3 > m2)))) {
              Work = "text-warning";
            } else {
              if (h2 < h3 || (h2 == h3 && m3 >= m2)) Work = "text-success"
              else Work = "text-danger";
            }
          } else {
            if (new Date(Number(data[index].DayDate)).getDay() < new Date().getDay() || (new Date().getDay() === 0 && new Date(Number(data[index].DayDate)).getDay() != 0)) Work = "text-success"
            else Work = "text-danger";
          }
        }


        if (index + 1 == SplitHeure.length) {
          res += `<p class="Time-${data[index]._id} ${Work}">${element}</p>`;
        } else {
          res += `<p class="Time-${data[index]._id} ${Work}">${element}</p>
                  <hr class="dropdown-divider">
                  `;
        }

      });

      return res;
    } else {
      var Work = '';

      if (SameWeek) {
        var elemSplit = FullHeure.split(" - "), Time1 = elemSplit[0].split(":"), Time2 = elemSplit[1].split(":");
        var h1 = Number(Time1[0]), m1 = Number(Time1[1]),
            h2 = Number(Time2[0]), m2 = Number(Time2[1]),
            h3 = new Date().getHours(), m3 = new Date().getMinutes();

        if (h2 < 5) h2 += 23;
  
        if (data.DayDate === `${new Date().setFullTime(2, 0, 0, 0)}`) {
          if ((h3 > h1 && h3 < h2) || ((h3 == h1 && m3 >= m1) || (h3 == h2 && !(m3 > m2)))) {
            Work = "text-warning";
          } else {
            if (h2 < h3 || (h2 == h3 && m3 >= m2)) Work = "text-success"
            else Work = "text-danger";
          }
        } else {
          if (new Date(Number(data.DayDate)).getDay() < new Date().getDay() || new Date(Number(data.DayDate)).getDay() != 0) Work = "text-success"
          else Work = "text-danger";
        }
      }

      return `<p class="Time-${data._id} ${Work}">${FullHeure}</p>`;
    }
  },
};

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
        <div class="row m-1">   
            <div class="col input-group">
                <span class="input-group-text">Prénom et Nom</span>
                <input type="text" class="form-control text-uppercase" name="name" placeholder="Prénom et Nom" aria-autocomplete="both" ${FullName} required>
                <div class="invalid-feedback">
                ${ErrorValidationForm}
                </div>
            </div>
        </div>

        <div class="row m-1">
            <div class="col input-group">
                <span class="input-group-text">Numéro de pointage</span>
                <input type="number" class="form-control" name="id" placeholder="Numéro de pointage" ${id} required>
                <div class="invalid-feedback">
                    ${ErrorValidationForm}
                </div>
                <span class="input-group-text">Heure Max</span>
                <input type="number" class="form-control" name="MaxHour" placeholder="Heure max" step="any" ${MaxHour} required>
                <div class="invalid-feedback">
                    ${ErrorValidationForm}
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
      ${ErrorValidationForm}
    </div>
    <span class="input-group-text">Ligne</span>
    <input type="text" class="form-control" name="line" placeholder="Ligne" value="${data.line === undefined ? "" : data.line}" ${data.line === undefined ? "disabled" : ""}>
    <div class="invalid-feedback">
        ${ErrorValidationForm}
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
                    ${ErrorValidationForm}
                </div>

                
                <div class="form-control" ${PermDisabled}>
                    <input type="checkbox" class="form-check-input" value="" name="Absent" ${check} ${PermDisabled}>
                    Absent / Week-end
                </div>
                <div class="invalid-feedback">
                    ${ErrorValidationForm}
                </div>
            </div>
        </div>

        <div class="row m-1">
            <div class="col input-group">
                <span class="input-group-text">Date</span>
                <input type="date" class="form-control" name="DayDate" ${DayDate} required ${PermDisabled}>
                <div class="invalid-feedback">
                  ${ErrorValidationForm}
                </div>
                <span class="input-group-text">Horaire</span>
                <input type="time" class="form-control" name="StartHour" ${StartHour} required ${PermDisabled}>
                <div class="invalid-feedback">
                  ${ErrorValidationForm}
                </div>
                <span class="input-group-text">-</span>
                <input type="time" class="form-control" name="EndHour" ${EndHour} required ${PermDisabled}>
                <div class="invalid-feedback">
                  ${ErrorValidationForm}
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
    // ${FUNCTION.ConvertTimeTable("19:00 - 23:00")}
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
      <div class="my-2 p-1 w-80 text-center align-content-center align-items-center d-flex flex-row justify-content-evenly bagde rounded-pill alert alert-danger shadow container-fluid">
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
      <div class="my-2 p-1 w-80 text-center align-content-center align-items-center d-flex flex-row justify-content-evenly bagde rounded-pill alert alert-warning shadow container-fluid">
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
      <div class="my-2 p-1 w-80 text-center align-content-center align-items-center d-flex flex-row justify-content-evenly bagde rounded-pill alert alert-success shadow container-fluid">
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
      <div class="my-2 p-1 w-80 text-center align-content-center align-items-center d-flex flex-row justify-content-evenly bagde rounded-pill alert alert-light shadow container-fluid">
        <div>Abs</div>
      </div>
      `;
    }

    if (data.type === "pause") {
      return `
      <div class="my-2 p-1 w-80 text-center align-content-center align-items-center d-flex flex-row justify-content-evenly bagde rounded-pill alert alert-light shadow container-fluid">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
        </svg>  
        <div>Pause</div>
      </div>
      `;
    }
  },
  OptionEmploye: `
  <button class="btn btn-outline-dark border-0" data-bs-toggle="tooltip" tabindex="0" data-bs-placement="bottom" data-bs-html="true" title=""><i class="bi bi-clipboard"></i></button>
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
  }
};

const HREF = {
  DivFormCardFooter:
    "body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto > div > div.card-footer",
  ListUniqueWorkerButton: "div.card-body > ul li button",
  AnimationArrow: "RotateArrow",
  RowTableCard:
    "body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto > div > div.card-body.table-responsive > table > tbody tr",
  ListUniqueWorkerHeader:
    "body > div.my-3.h-100.w-100.container-fluid > div > div.col > div > div.card-header > div > h5",
  InputSelectEmployee:
    "body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto > div > div.card-footer > div.row.m-1 > div > select",
  InputSelectEmployeeOption:
    "body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto > div > div.card-footer > div.row.m-1 > div > select option",
  InputSelectOption: "#OptionAdmin > div.row.m-1 > div > select",
  InputSelectOptionOption: "#OptionAdmin > div.row.m-1 > div > select option",
  InputSelectSubOption: "div#SubOptionAdmin > div.row.m-1 > div > select",
  InputSelectSubOptionOption:
    "div#SubOptionAdmin > div.row.m-1 > div > select option",
  DivNextAdminForm: "div#NextAdmin",
  DivAdminOption: "#OptionAdmin",
  DivAdminSubOption: "div#SubOptionAdmin",
  InputFormID: "#NextAdmin > form > div:nth-child(3) > div > input",
  InputFormDate:
    "#NextAdmin > form > div:nth-child(4) > div > input:nth-child(2)",
  InputFormStartWeek: "div#NextAdmin > form > input:nth-child(1)",
  InputFormTimeStart:
    "#NextAdmin > form > div:nth-child(4) > div > input:nth-child(5)",
  InputFormTimeEnd:
    "#NextAdmin > form > div:nth-child(4) > div > input:nth-child(8)",
  InputFormCheckAbsent:
    "#NextAdmin > form > div:nth-child(3) > div > div.form-control > input",
  InputFormFullName: "#NextAdmin > form > div:nth-child(3) > div > input",
  TitleTableCard:
    "body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto > div > div.card-header > div > h5",
  ButtonFormCardFooter:
    "div#NextAdmin > form > div.row.m-1.justify-content-md-center > div > button.btn.btn-outline-success",
  ButtonDeleteForm:
    "div#NextAdmin > form > div.row.m-1.justify-content-md-center > div > button.btn.btn-outline-danger",
  BodyTable:
    "body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto > div > div.card-body.table-responsive > table > tbody",
  TableSpecificLine: (data) => {
    if (data.column !== undefined) return `body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto > div > div.card-body.table-responsive > table > tbody > tr:nth-child(${data.row}) > td:nth-child(${data.column})`
    else return `body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto > div > div.card-body.table-responsive > table > tbody > tr:nth-child(${data.row})`
  },
  CardSpecificDay: (data) => {
    return `#collapse${data}`;
  },
  SelectSpecificEmployee: (data) => {
    return `body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto.mb-3 > div > div.card-footer > div.row.m-1 > div > select > option[value='${data}']`;
  },
  SelectSpecificOptionEmploye: (data) => {return `body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto.mb-3 > div > div.card-footer > div.row.m-1 > div > select > option:nth-child(${data})`},
  SelectSpecificOption: (data) => {
    return `#OptionAdmin > div.row.m-1 > div > select > option[value='${data}']`;
  },
  SelectSpecificSubOption: (data) => {
    return `div#SubOptionAdmin > div.row.m-1 > div > select > option[value='${data}']`;
  },
  SelectTimeWeek: "body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto.mb-3 > div > div.card-header > div > select",
  SelectTimeWeekAllOption: "body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto.mb-3 > div > div.card-header > div > select option",
  SelectTimeWeekOption: (data) => {
    return `body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto.mb-3 > div > div.card-header > div > select > option:nth-child(${data+1})`
  },
  SpecificColumnTable: (data) => { return `body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto.mb-3 > div > div.card-body.table-responsive > table * > tr *:nth-child(${data})` },
  SpecificDropDownCard: (data) => { return `body > div.my-3.h-100.w-100.container-fluid > div > div.col > div > div.card-body > ul > li > button > div[value="${data}"]`; },
  AllPTextWarning: "body > div.my-3.h-100.w-100.container-fluid > div > div.col-auto.mb-3 > div > div.card-body.table-responsive > table > tbody > tr td p.text-warning",
  PTotalEmpWork: "p#TotalEmpWork",
  BtnOptionEmploye: "#BtnOptionEmploye",
  DivOptionEmploye: "#OptionEmploye",
  BtnSalaireEmploye: "#OptionEmploye > button.btn.btn-outline-warning.border-0",
  BtnRoleEmploye: "#OptionEmploye > button.btn.btn-outline-dark.border-0",
  RoleEmployeeWorkTimeDiv: "#NextAdmin > form > div:nth-child(6) > div",
  InputSelectRole: "#NextAdmin > form > div:nth-child(6) > div > select",
  BtnSearchBar: "body > div.sticky-top.bg-light > nav > div > div.d-flex > button.btn.LogoMcDo.me-4",
  InputSearchBar: "body > div.sticky-top.bg-light > nav > div > div.d-flex > input",
  InputLineWork: "#NextAdmin > form > div:nth-child(6) > div > input",
  MainPageBtn: "body > div > div:nth-child(2) > div.d-flex.flex-row.align-content-between.m-auto.my-2 button",
  MainPageDivBtn: "body > div > div:nth-child(2) > div.d-flex.flex-row.align-content-between.m-auto.my-2",
  DivMainPageForm: "body > div > div:nth-child(2)",
  SelectMainPage: "body > div > div:nth-child(2) div div select",
  SelectDepartement: "body > div > div:nth-child(2) > div:nth-child(2) > div > select",
  divSpecificMainPage: (data) => {return `body > div > div:nth-child(2) > div:nth-child(${data})`},
  SelectSpecificMainPage: (data) => {return `body > div > div:nth-child(2) > div:nth-child(${data}) > div > select`},
  DivConnectionLandingPage: "#DivConnection",
  BtnConnectionLandingPage: "#DivConnection > div:nth-child(3) > button",
  IptUsername: "#DivConnection > div:nth-child(1) > div > input",
  IptPassword: "#DivConnection > div:nth-child(2) > div > input",
};
