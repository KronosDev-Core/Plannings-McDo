kronos(() => {
  kronos().request("POST", "/Geo", 
    {
      type: "get"
    },
    (data) => {
      kronos(HREF.DivMainPageForm).html(HTML.TemplateFormMainPage({World: data.Pays}));
      var PaysChange = false, RegionChange = false, RestaurantChange = false;
    
      kronos(HREF.SelectMainPage).on('change', (event) => {
        console.log(event,event.target.name)
        if (event.target.name === "Pays") {
          kronos(HREF.divSpecificMainPage(2)).class("remove", "d-none");
          kronos(HREF.divSpecificMainPage(3)).class("add", "d-none");
          kronos(HREF.divSpecificMainPage(4)).class("add", "d-none");
          PaysChange = true, RestaurantChange = false;
          kronos(HREF.SelectDepartement).html(HTML.OptionDepartement({pays: event.target.value, Departement: data.Departement}))
        }
        if (event.target.name === "Departement" && PaysChange) {
          kronos(HREF.divSpecificMainPage(3)).class("remove", "d-none");
          RegionChange = true;
          kronos().request("POST", "/Geo", 
          {
            type: "get",
            subtype: "Restaurant",
            pays: kronos(HREF.SelectSpecificMainPage(1)).value(),
            departement: Number(kronos(HREF.SelectSpecificMainPage(2)).value()),
          },
          (dataRestaurant) => {
            kronos(HREF.SelectSpecificMainPage(3)).html(HTML.OptionRestaurant(dataRestaurant.Restaurant));
          })
        }
        if (event.target.name === "Restaurant" && PaysChange && RegionChange) {kronos(HREF.MainPageDivBtn).class("remove", "d-none"); RestaurantChange = true}
      })
      
      kronos(HREF.MainPageBtn).on('click', (event) => {
        var valueBtn = event.target.innerHTML;
        var regex = /[^()/><\][\\\x22,;|]+/gm, permission = "";
        
        if (valueBtn === "Employee") {
          localStorage.setItem("account", JSON.stringify({ username:"viewer", permission:"view", pays: kronos(HREF.SelectSpecificMainPage(1)).value(), Restaurant: kronos(HREF.SelectSpecificMainPage(3)).value() }));
          window.location.href = "/plannings";
        }

        if (valueBtn === "Manager") {
          kronos(HREF.DivConnectionLandingPage).class("remove", "d-none");
          permission = "Manager";
        }

        if (valueBtn === "Administration") {
          kronos(HREF.DivConnectionLandingPage).class("remove", "d-none");
          permission = "Administration";
        }

        kronos(HREF.BtnConnectionLandingPage).on('click', (event) => {
          console.log(event, String(kronos(HREF.IptUsername).value()), String(kronos(HREF.IptPassword).value()))
          kronos().request("POST", "/Connection",
          {
            username: String(kronos(HREF.IptUsername).value()),
            password: String(kronos(HREF.IptPassword).value()),
            permission: permission,
          },
          (dataConnection) => {
            dataConnection = dataConnection[0];
            console.log(dataConnection)
            if (dataConnection[0] === "Error Connection") {
              kronos(HREF.IptUsername).value("");
              kronos(HREF.IptPassword).value("");
              var toast = new bootstrap.Toast(document.getElementById('liveToast'))
              toast.show()
            } else {
              localStorage.setItem('account', JSON.stringify({username: dataConnection.username, permission: dataConnection.permission, pays: kronos(HREF.SelectSpecificMainPage(1)).value(), Restaurant: kronos(HREF.SelectSpecificMainPage(3)).value()}));
              window.location.href = "/plannings";
            };
          });
        });

        kronos().keypress((key) => {
          if (key.key === "Enter" && (kronos(HREF.IptUsername).value() && kronos(HREF.IptPassword).value())) {
            SimulateEvent(kronos(HREF.BtnConnectionLandingPage)[0], 'click');
          }
        });
      })
    }
  )

})