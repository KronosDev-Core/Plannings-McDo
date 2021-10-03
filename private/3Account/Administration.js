function ClickRowTableAdmin(Employeid_id, id, event) {
  kronos(HREF.InputSelectEmployeeOption).attr("remove", "selected");
  kronos(HREF.SelectSpecificEmployee(Employeid_id[id])).attr("add", "selected", "true");
  SimulateEvent(kronos(HREF.InputSelectEmployee)[0]);

  if (event.target.tagName == "TD") {
    setTimeout(() => {
      kronos(HREF.InputSelectOptionOption).attr("remove", "selected");
      kronos(HREF.SelectSpecificOption("NewWor")).attr("add", "selected", "true");
      SimulateEvent(kronos(HREF.InputSelectOption)[0]);
      kronos(HREF.InputSelectOption)[0].scrollIntoView(true);
      setTimeout(() => {
        kronos(HREF.InputFormDate).value(`${new Date(new Date(Number(localStorage.getItem("currentWeek"))).setDate(new Date(Number(localStorage.getItem("currentWeek"))).getDate()+(Number(event.target.cellIndex)-2))).FormatYMD()}`)
      }, 100);
    }, 100);
  } else if (event.target.tagName == "DIV") {
    setTimeout(() => {
      kronos(HREF.InputSelectOptionOption).attr("remove", "selected");
      kronos(HREF.SelectSpecificOption("NewWor")).attr("add", "selected", "true");
      SimulateEvent(kronos(HREF.InputSelectOption)[0]);
      kronos(HREF.InputSelectOption)[0].scrollIntoView(true);
      setTimeout(() => {
        kronos(HREF.InputFormDate).value(`${new Date(new Date(Number(localStorage.getItem("currentWeek"))).setDate(new Date(Number(localStorage.getItem("currentWeek"))).getDate()+(Number(event.path[1].cellIndex)-2))).FormatYMD()}`)
      }, 100);
    }, 100);
  } else if (!(event.target.tagName == "P")) {
    setTimeout(() => {
      kronos(HREF.InputSelectOptionOption).attr("remove", "selected");
      kronos(HREF.SelectSpecificOption("EditEmp")).attr("add", "selected", "true");
      SimulateEvent(kronos(HREF.InputSelectOption)[0]);
      kronos(HREF.InputSelectOption)[0].scrollIntoView(true);
    }, 100);
  } else {
    setTimeout(() => {
      kronos(HREF.InputSelectOptionOption).attr("remove", "selected");
      kronos(HREF.SelectSpecificOption("EditWor")).attr("add", "selected", "true");
      SimulateEvent(kronos(HREF.InputSelectOption)[0]);
      setTimeout(() => {
        kronos(HREF.InputSelectSubOptionOption).attr("remove", "selected");
        kronos(HREF.SelectSpecificSubOption(event.target.classList[0].replaceAll("Time-", ""))).attr("add", "selected", "true");
        SimulateEvent(kronos(HREF.InputSelectSubOption)[0]);
        kronos(HREF.InputSelectSubOption)[0].scrollIntoView(true);
      }, 100);
    }, 100);
  }
}