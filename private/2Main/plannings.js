if (window.location.pathname == "/plannings") {

  if (localStorage.getItem("account") == null) window.location.pathname = "/";

  kronos(() => {
    let FullWeek = [getRangeWeek()],
      StartWeek = FullWeek[0][0];
    FullWeek.push(getRangeWeek(new Date(new Date(FullWeek[0][1]).setDate(FullWeek[0][1].getDate() + 1))), getRangeWeek(new Date(new Date(FullWeek[0][1]).setDate(FullWeek[0][1].getDate() + 8))))
  
    FullWeek.forEach((elem, index) => {
      kronos(HREF.SelectTimeWeekOption(index)).html(`Semaine du ${elem[0].FormatDM()} au ${elem[1].FormatDM()}`);
    })
  
    localStorage.removeItem("employee");
  
    let EmployeTableLine = {},
      DataPreSortTable = {},
      Employeid_id = {},
      SameWeek = null,
      EmployeNameId = {},
      TimeWork = {current: {}, day: {}};
  
    function TitleWeek(index = 0) {
      var StartWeek = FullWeek[index][0],
        EndWeek = FullWeek[index][1];
  
      localStorage.setItem("currentWeek", FullWeek[index][2]);
  
      kronos(HREF.TitleTableCard).html(
        `Semaine du ${FormatCompactDate(StartWeek)}/${
          StartWeek.getMonth() > 9
            ? EndWeek.getMonth() + 1
            : "0" + (EndWeek.getMonth() + 1)
        } au ${FormatCompactDate(EndWeek)}/${
          EndWeek.getMonth() > 9
            ? EndWeek.getMonth() + 1
            : "0" + (EndWeek.getMonth() + 1)
        }`
      );
  
  
    }
  
    if (!localStorage.getItem("currentWeek")) TitleWeek()
    else {
      var find = false;
      FullWeek.forEach((elem, index) => {
        if (!(index === 0)) {
          if (elem[2] === Number(localStorage.getItem("currentWeek"))) {
            kronos(HREF.SelectTimeWeekAllOption).attr("remove", "selected");
            kronos(HREF.SelectTimeWeekOption(index)).attr("add", "selected");
            TitleWeek(index);
            find = true
          }
        }
      })
  
      if (!find) TitleWeek()
    }
  
    if (Number(localStorage.getItem("currentWeek")) === FullWeek[0][2]) SameWeek = true
    else SameWeek = false;
  
    kronos(HREF.SelectTimeWeek).on('change', (event) => {
      TitleWeek(Number(event.target.value))
      document.location.reload();
    });
  
    kronos(HREF.ListUniqueWorkerButton).forEach((elem) =>
      elem.addEventListener("click", (event) => {
        if (
          event.target.ownerSVGElement !== undefined &&
          event.target.ownerSVGElement != null
        )
          event.target.ownerSVGElement.classList.toggle(HREF.AnimationArrow);
        else if (event.target.tagName === "svg")
          event.target.classList.toggle(HREF.AnimationArrow);
        else if (event.target.tagName === "DIV")
          event.target.nextElementSibling.classList.toggle(HREF.AnimationArrow);
        else event.target.children[1].classList.toggle(HREF.AnimationArrow);
      })
    );
  
    if (JSON.parse(localStorage.getItem("account")).permission === "Administration" || JSON.parse(localStorage.getItem("account")).permission === "Manager") {
      kronos(HREF.DivFormCardFooter).html(HTML.DivFormCardFooterHtmlForm);
      kronos(HREF.DivConnectPlannings).html(HTML.AccountPlannings(JSON.parse(localStorage.getItem("account"))));
    } else if (JSON.parse(localStorage.getItem("account")).permission === "viewer") {
      kronos(HREF.DivConnectPlannings).html(HTML.AccountPlannings(JSON.parse(localStorage.getItem("account"))));
    } else {
      kronos(HREF.DivFormCardFooter).remove();
    }
  
    DATA.DayWeekDate.forEach((elem, index) => {
      var day = new Date().getDay();
  
      if (SameWeek) {
        if (day === 0) {
          if (elem === DATA.DayWeekDate[day]) {
            kronos(HREF.SpecificDropDownCard(elem)).class("add", "text-warning")
          } else {
            kronos(HREF.SpecificDropDownCard(elem)).class("add", "text-success")
          }
        } else {
          if (elem === DATA.DayWeekDate[day]) {
            kronos(HREF.SpecificDropDownCard(elem)).class("add", "text-warning")
          } else {
            if (index < day) kronos(HREF.SpecificDropDownCard(elem)).class("add", "text-success")
            else kronos(HREF.SpecificDropDownCard(elem)).class("add", "text-danger")
            kronos(HREF.SpecificDropDownCard(DATA.DayWeekDate[0])).class("add", "text-danger")
          }
        }
      }
  
    })
    
    // Admin Section
    if (JSON.parse(localStorage.getItem("account")).permission === "Administration" || JSON.parse(localStorage.getItem("account")).permission === "Manager") {
      kronos().request("POST", "/Employe", {
          type: "get",
          pays: JSON.parse(localStorage.getItem("account")).pays,
          restaurant: Number(JSON.parse(localStorage.getItem("account")).Restaurant),
        }, 
        (data) => {
          data.forEach((elem) => {
            kronos(HREF.InputSelectEmployee).append(HTML.SelectOptionEmployee(elem));
          });
  
          kronos(HREF.InputSelectEmployee).on("change", (event) => {
            kronos(HREF.DivNextAdminForm).html("");
            kronos(HREF.DivAdminSubOption).html("");
            console.log(event.target.value, event.target.value !== "Select Employee")
            if (event.target.value !== "new" && event.target.value !== "Select Employee") {
              kronos().request(
                "POST",
                "/Employe", {
                  type: "getOne",
                  _id: event.target.value
                },
                (data) => {
                  localStorage.setItem("employee", JSON.stringify(data[0]));
                  kronos(HREF.DivAdminOption).html(HTML.AdminFormOption(JSON.parse(localStorage.getItem("account"))));
                  kronos(HREF.InputSelectOption).on("change", (event) => {
                    kronos(HREF.DivNextAdminForm).html("");
                    console.log(event.target.value, data)
  
                    if (event.target.value === "EditEmp") {
                      kronos(HREF.DivAdminSubOption).html("");
                      kronos(HREF.DivNextAdminForm).html(
                        HTML.TemplateFormEmployee({
                          type: "edit",
                          id: Number(JSON.parse(localStorage.getItem("employee")).id),
                          value: JSON.parse(localStorage.getItem("employee")),
                          account: JSON.parse(localStorage.getItem("account")),
                        })
                      );
                    
                      kronos(HREF.ButtonDeleteForm).on("click", (event) => {
                        kronos().request(
                          "POST",
                          "/Employe", {
                            type: "remove",
                            _id: JSON.parse(localStorage.getItem("employee"))._id,
                            id: JSON.parse(localStorage.getItem("employee")).id,
                          },
                          (data) => {}
                        );
                        window.location.reload();
                      });
                    }
  
                    if (event.target.value === "NewWor") {
                      kronos(HREF.DivAdminSubOption).html("");
                      kronos(HREF.DivNextAdminForm).html(
                        HTML.TemplateFormTimeWork({
                          type: "new",
                          id: JSON.parse(localStorage.getItem("employee")).id,
                          StartWeek: new Date(Number(localStorage.getItem("currentWeek"))),
                        })
                      );
  
                      kronos("div#NextAdmin > form > input:nth-child(2)").on(
                        "change",
                        (event) => {
                          event.target.value = "new";
                        }
                      );
  
                      kronos(HREF.InputFormCheckAbsent).on("change", (event) => {
                        kronos(HREF.InputFormTimeStart).attr("toggle", "disabled");
                        kronos(HREF.InputFormTimeEnd).attr("toggle", "disabled");
                      });
  
                      kronos(HREF.InputFormDate).on("change", (event) => {
                        kronos(HREF.InputFormStartWeek).value(
                          String(
                            getRangeWeek(new Date(event.target.value))[0].setHours(0)
                          )
                        );
                      });
                    }
  
                    if (event.target.value === "EditWor") {
                      kronos(HREF.DivAdminSubOption).html(HTML.AdminFormSubOption);
                      kronos().request(
                        "POST",
                        "/Horaire", {
                          type: "get",
                          subtype: "employe",
                          week: Number(localStorage.getItem('currentWeek')),
                          id: JSON.parse(localStorage.getItem("employee")).id,
                        },
                        (data) => {
                          data.forEach((elem) => {
                            kronos(HREF.InputSelectSubOption).append(
                              HTML.SelectOptionTimeWork(elem)
                            );
                          });
  
                          kronos(HREF.InputSelectSubOption).on("change", (event) => {
                            kronos().request(
                              "POST",
                              "/Horaire", {
                                type: "getOne",
                                _id: event.target.value
                              },
                              (data) => {
                                var extra = ""
                                if (JSON.parse(localStorage.getItem("account")).permission === "Manager") extra = "Manager"
                                else extra = "Administration"
                                kronos(HREF.DivNextAdminForm).html(
                                  HTML.TemplateFormTimeWork({
                                    type: "edit",
                                    id: JSON.parse(localStorage.getItem("employee")).id,
                                    value: data,
                                    StartWeek: new Date(Number(localStorage.getItem("currentWeek"))),
                                    permission: extra,
                                  })
                                );
  
                                kronos(HREF.InputFormDate).on("change", (event) => {
                                  kronos(HREF.InputFormStartWeek).value(
                                    String(
                                      getRangeWeek(
                                        new Date(event.target.value)
                                      )[0].setHours(0)
                                    )
                                  );
                                });
  
                                kronos(HREF.InputSelectRole).on('change', (event) => {
                                  console.log(event)
                                  if (event.target.value[0] === "K" && event.target.value[1] !== "C") {
                                    kronos(HREF.InputLineWork).attr("remove", "disabled");
                                  } else {
                                   kronos(HREF.InputLineWork).attr("add", "disabled", "true");
                                  }
                                })
  
                                kronos(HREF.InputFormCheckAbsent).on(
                                  "change",
                                  (event) => {
                                    kronos(HREF.InputFormTimeStart).attr(
                                      "toggle",
                                      "disabled"
                                    );
                                    kronos(HREF.InputFormTimeEnd).attr(
                                      "toggle",
                                      "disabled"
                                    );
                                  }
                                );
  
                                kronos(HREF.ButtonDeleteForm).on("click", (event) => {
                                  kronos().request(
                                    "POST",
                                    "/Horaire", {
                                      type: "remove",
                                      _id: data._id,
                                    },
                                    (data) => {}
                                  );
                                  window.location.reload();
                                });
                              }
                            );
                          });
                        }
                      );
                    }
                  });
                }
              );
            } else if (event.target.value === "new") {
              localStorage.removeItem("employee");
              kronos(HREF.DivAdminOption).html("")
              kronos(HREF.DivNextAdminForm).html(
                HTML.TemplateFormEmployee({
                  type: "new",
                  account: JSON.parse(localStorage.getItem("account")),
                })
              );
            }
          });
      })
    };
  
    // Create Line in Table (Name, ID, MaxHour, Time Hour, Abs)
    kronos().request("POST", "/Employe", {
      type: "get",
      pays: JSON.parse(localStorage.getItem("account")).pays,
      restaurant: Number(JSON.parse(localStorage.getItem("account")).Restaurant),
    }, (data) => {
      data.forEach((elem, index) => {
        kronos(HREF.BodyTable).append(HTML.TemplateLineTable(elem));
        EmployeTableLine[elem.id] = index;
        EmployeNameId[elem.name] = elem.id;
        DataPreSortTable[elem.id] = {};
        Employeid_id[elem.id] = elem._id;
      });
  
      kronos().request(
        "POST",
        "/Horaire", {
          type: "get",
          week: Number(localStorage.getItem("currentWeek")),
          Employe: Object.keys(DataPreSortTable),
        },
        (dataHor, index) => {
          dataHor.forEach((elem, index) => {
            var [Work, WarnningIcon, SameDay, Current] = TimeWorkCurrent(SameWeek, elem, null, true);
  
            if (SameDay) {
              if (Object.keys(TimeWork.day).indexOf(elem.EmployePlanning) !== -1) {
                TimeWork.day[elem.EmployePlanning].push(elem);
              } else {
                TimeWork.day[elem.EmployePlanning] = [elem]
              }
            }
            
            if (Current) {
              if (Object.keys(TimeWork.day).indexOf(elem.EmployePlanning) !== -1) {
                TimeWork.current[elem.EmployePlanning].push(elem);
              } else {
                TimeWork.current[elem.EmployePlanning] = [elem]
              }
            }
  
            if (Object.keys(DataPreSortTable[elem.EmployePlanning]).indexOf(elem.DayDate) !== -1) {
              DataPreSortTable[elem.EmployePlanning][elem.DayDate].push(elem);
            } else {
              DataPreSortTable[elem.EmployePlanning][elem.DayDate] = [elem];
            }
          });
  
          Object.keys(DataPreSortTable).forEach((elem, index) => {
            if (Object.keys(DataPreSortTable[elem]).length !== 0) {
              var TotalHour = 0, countAbsent = 0;
              Object.keys(DataPreSortTable[elem]).forEach(
                (elemDate, indexDate) => {
                  DataPreSortTable[elem][elemDate].forEach((elemTotal, index) => {
                    if (!elemTotal.Absent) {
                      TotalHour += Number(TimeBetweenTwoTime(elemTotal.StartHour.replace(".", ":"), elemTotal.EndHour.replace(".", ":")));
                    } else countAbsent++;
                  })
  
                  if (DataPreSortTable[elem][elemDate].length === 1) {
                    if (!DataPreSortTable[elem][elemDate][0].Absent) {
                      kronos(HREF.TableSpecificLine({row: EmployeTableLine[elem] + 2, column: DATA.DayWeekDataTable[new Date(Number(elemDate)).getDay()]})).append(
                        HTML.TimeTable(
                          DataPreSortTable[elem][elemDate][0].StartHour.replace(".", ":") + " - " + DataPreSortTable[elem][elemDate][0].EndHour.replace(".", ":"), DataPreSortTable[elem][elemDate][0], SameWeek
                        )
                      );
                    } else {
                      kronos(
                        HREF.TableSpecificLine({
                          row: EmployeTableLine[elem] + 2,
                          column: DATA.DayWeekDataTable[
                            new Date(Number(elemDate)).getDay()
                          ],
                        })
                      ).html("<p>Abs</p>");
                    }
                  } else {
                    var AllHourDay = "",
                      AllHourId = [];
                    DataPreSortTable[elem][elemDate].forEach(
                      (elemData, indexData) => {
                        if (!DataPreSortTable[elem][elemDate][0].Absent) {
                          if (AllHourDay !== "") {
                            AllHourDay += `;${DataPreSortTable[elem][elemDate][indexData].StartHour.replace(".", ":")} - ${DataPreSortTable[elem][elemDate][indexData].EndHour.replace(".", ":")}`;
                            AllHourId.push(DataPreSortTable[elem][elemDate][indexData]);
                          } else {
                            AllHourDay = `${DataPreSortTable[elem][elemDate][indexData].StartHour.replace(".", ":")} - ${DataPreSortTable[elem][elemDate][indexData].EndHour.replace(".", ":")}`;
                            AllHourId.push(DataPreSortTable[elem][elemDate][indexData]);
                          }
                        } else {
                          kronos(
                            HREF.TableSpecificLine({
                              row: EmployeTableLine[elem] + 2,
                              column: DATA.DayWeekDataTable[
                                new Date(Number(elemDate)).getDay()
                              ],
                            })
                          ).html("<p>Abs</p>");
                        }
                      }
                    );
                    if (AllHourDay !== "")
                      kronos(
                        HREF.TableSpecificLine({
                          row: EmployeTableLine[elem] + 2,
                          column: DATA.DayWeekDataTable[
                            new Date(Number(elemDate)).getDay()
                          ],
                        })
                      ).html(HTML.TimeTable(AllHourDay, AllHourId, SameWeek));
                  }
                }
              );
  
              var MaxHour = Number(kronos(HREF.SpecificColumnTable(10))[EmployeTableLine[elem]+2].innerHTML.replace(" / ", ""));
  
              if (countAbsent == 7) TotalHour = "Abs";
  
              if (TotalHour == MaxHour) {
                kronos(HREF.SpecificColumnTable(10))[EmployeTableLine[elem]+2].classList.add("text-warning");
              } else if (TotalHour < MaxHour) {
                kronos(HREF.SpecificColumnTable(10))[EmployeTableLine[elem]+2].classList.add("text-success");
              } else if (TotalHour != "Abs") {
                kronos(HREF.SpecificColumnTable(10))[EmployeTableLine[elem]+2].classList.add("text-danger");
              }
  
              kronos(HREF.SpecificColumnTable(10))[EmployeTableLine[elem]+2].innerHTML = `${TotalHour} ${kronos(HREF.SpecificColumnTable(10))[EmployeTableLine[elem]+2].innerHTML}`
            }
          });
  
          kronos(HREF.PTotalEmpWork).html(`${kronos(HREF.AllPTextWarning).length} employée sur ${Object.keys(DataPreSortTable).length} actif(s)`);
          var ListWorkEmp = [];
  
          (kronos(HREF.AllPTextWarning)).forEach((elem, index) => {
            elem = elem.parentElement.parentElement.parentElement.children[1].innerHTML;
            if (ListWorkEmp.indexOf(elem) == -1) ListWorkEmp.push(elem)
          });
  
          kronos(HREF.PTotalEmpWork).attr("add", "title", ListWorkEmp.join(", "));
          ReloadTooltips();
  
          kronos(HREF.RowTableCard).forEach((elem) => {
            elem.addEventListener("click", (event) => {
              kronos("." + HREF.AnimationArrow).class("remove", HREF.AnimationArrow);
              kronos(HREF.BtnOptionEmploye).attr("remove", "disabled");
              kronos(HREF.DivOptionEmploye).html("");
  
              var FullName = "",
                id = "",
                HourMonday = "",
                HourTuesday = "",
                HourWednesday = "",
                HourThursday = "",
                HourFriday = "",
                HourSaturday = "",
                HourSunday = "",
                TotalHour = "";
                
              if (event.target.tagName == "TD" || event.target.tagName == "TH") {
                ({
                  FullName,
                  id,
                  HourMonday,
                  HourTuesday,
                  HourWednesday,
                  HourThursday,
                  HourFriday,
                  HourSaturday,
                  HourSunday,
                  TotalHour
                } = GetDataTable(FullName, id, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday, HourSunday, TotalHour, event.path[1]));
              } else if (event.target.tagName == "P" || event.target.tagName == "HR" || event.target.tagName == "I") {
                ({
                  FullName,
                  id,
                  HourMonday,
                  HourTuesday,
                  HourWednesday,
                  HourThursday,
                  HourFriday,
                  HourSaturday,
                  HourSunday,
                  TotalHour
                } = GetDataTable(FullName, id, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday, HourSunday, TotalHour, event.path[3]));
              } else if (event.target.tagName == "TR") {
                ({
                  FullName,
                  id,
                  HourMonday,
                  HourTuesday,
                  HourWednesday,
                  HourThursday,
                  HourFriday,
                  HourSaturday,
                  HourSunday,
                  TotalHour
                } = GetDataTable(FullName, id, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday, HourSunday, TotalHour, event.target));
              } else if (event.target.tagName == "DIV") {
                ({
                  FullName,
                  id,
                  HourMonday,
                  HourTuesday,
                  HourWednesday,
                  HourThursday,
                  HourFriday,
                  HourSaturday,
                  HourSunday,
                  TotalHour
                } = GetDataTable(FullName, id, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday, HourSunday, TotalHour, event.path[2]));
              }
              
              kronos().request(
                "POST",
                "/Employe", {
                  type: "getOne",
                  _id: Employeid_id[Number(id)],
                },
                (data) => {
                  data = data[0]
                  data.TotalHour = TotalHour;
                  localStorage.setItem("employee", JSON.stringify(data))
                }
              )
  
              if (JSON.parse(localStorage.getItem("account")).permission === "Administration") {
                ClickRowTableAdmin(Employeid_id, id, event);
              } else if (JSON.parse(localStorage.getItem("account")).permission === "Manager" && !event.target.classList.contains("text-success") && (event.path[2].cellIndex+1) === DATA.DayWeekDataTable[new Date().getDay()]) {
                ClickRowTableManager(Employeid_id, id, event);
              } else if (JSON.parse(localStorage.getItem("account")).permission === "Manager") {
                ClickRowTableManager(Employeid_id, id, event, true);
              };
  
              var ArrayHourDay = [HourSunday, HourMonday, HourTuesday, HourWednesday, HourThursday, HourFriday, HourSaturday]
  
              kronos(HREF.ListUniqueWorkerHeader).html(`${id} | ${FullName}`);
  
              ArrayHourDay.forEach((elem, index) => {
                kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).html("");
                if (elem != "" && elem != "Abs") {
                  if (elem.indexOf(";") !== -1) {
                    elem.split(";").forEach((elemSplit, indexSplit) => {
                      SpecificDay(elemSplit, index, indexSplit, elem);
                    });
                    SimulateEvent(kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index]))[0].previousElementSibling, "click");
                  } else {
                    SpecificDay(elem, index);
                    SimulateEvent(kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index]))[0].previousElementSibling, "click");
                  }
                } else if (elem === "Abs") {
                  kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).html(HTML.TemplateLineCard({
                    type: "neutral"
                  }));
                  SimulateEvent(kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index]))[0].previousElementSibling, "click");
                } else {
                  kronos(HREF.CardSpecificDay(DATA.DayWeekDate[index])).html("");
                }
              });
            });
          });
        }
      );
    });
  
    kronos(HREF.BtnOptionEmploye).on('click', (event) => {
      kronos(HREF.DivOptionEmploye).html(HTML.OptionEmploye);
      var dataEmp = JSON.parse(localStorage.getItem("employee")), role = null, res = "";
  
      if (Object.keys(TimeWork.current).indexOf(`${dataEmp.id}`) !== -1) {
        role = TimeWork.current[`${dataEmp.id}`][0].Role;
        if (role[0] === "K" && role[1] !== "C") res = `Poste ${DATA.Role[role]} ligne ${TimeWork.current[`${dataEmp.id}`][0].Line}`;
        else res = `Poste ${DATA.Role[role]}`;
      }
      console.log(Object.keys(TimeWork.current), `${dataEmp.id}`, res, Object.keys(TimeWork.current).indexOf(`${dataEmp.id}`))
  
      if (dataEmp.TotalHour == "Abs") dataEmp.TotalHour = Number(dataEmp.MaxHour) - 1;
      kronos(HREF.BtnSalaireEmploye).attr("add", "title", `≈ ${String((dataEmp.TotalHour * 10.15).round()).replace(".", ",")} €<br/><em>Base de 10.15 €/Heure<br/>Pas de Majoration</em>`);
      kronos(HREF.BtnRoleEmploye).attr("add", "title", res);
      if (res == "") kronos(HREF.BtnRoleEmploye).attr("add", "disabled", "true");
      else kronos(HREF.BtnRoleEmploye).attr("remove", "disabled", "true");
      ReloadTooltips();
    });
  
    var InputSearchChange = false;
  
    kronos(HREF.InputSearchBar).on('click', (event) => {
      InputSearchChange = true;
    });
  
    document.addEventListener('keypress', (event) => {
      if (event.key === "Enter" && InputSearchChange) Search(EmployeTableLine, EmployeNameId);
    });
  
    kronos(HREF.BtnSearchBar).on('click', (event) => {
      if (InputSearchChange) Search(EmployeTableLine, EmployeNameId);
    });
  });
}