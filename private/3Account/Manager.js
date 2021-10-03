function ClickRowTableManager(Employeid_id, id, event, reset = false) {
  kronos(HREF.InputSelectEmployeeOption).attr("remove", "selected");
  if (reset) kronos(HREF.SelectSpecificOptionEmploye(1)).attr("add", "selected", "true");
  else kronos(HREF.SelectSpecificEmployee(Employeid_id[id])).attr("add", "selected", "true");
  SimulateEvent(kronos(HREF.InputSelectEmployee)[0]);
  if (reset) kronos(HREF.DivAdminOption).html("");
  else {
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