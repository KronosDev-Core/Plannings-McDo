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
  BtnRoleEmploye: "#OptionEmploye > button.btn.btn-outline-info.border-0",
  RoleEmployeeWorkTimeDiv: "#NextAdmin > form > div:nth-child(6) > div",
  InputSelectRole: "#NextAdmin > form > div:nth-child(6) > div > select",
  BtnSearchBar: "body > div.sticky-top > nav > div > div.d-flex > button.btn.LogoMcDo.me-4",
  InputSearchBar: "body > div.sticky-top > nav > div > div.d-flex > input",
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
  DivConnectPlannings: "body > div.sticky-top > nav > div > div.d-flex > div > button:nth-child(1)",
};
