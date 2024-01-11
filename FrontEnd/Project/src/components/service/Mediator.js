var Mediator = {
  instance: function () {
    if (!Mediator.instance) {
      Mediator.instance = this;
    }
    return Mediator.instance;
  },

  mainScreen: {},
  StatusScreen: false,

  ARR,
  MRR,
  ChurnRate,
  ChurnRateAmonth,
  statisticsAmonth, 
  //ver quando carregar a tela se o mediator envia os dados
  resultGroupedPermonth, 

  arpuMonthly,
  arpuAnnual, 
  totalMonthlyRevenue,  
  totalAnnualRevenue, 
  totalUsers,  
  ltvMonthly,  
  ltvAnnual,  



  async notify(sender, event) {
        switch (event) {
            case "initHome":
            this.mainScreen = sender
            break

            case "screenStatus": 
            this.StatusScreen = sender
            this.mainScreen.ValidationHeader(this.StatusScreen);
            break
          
            case "test": 
            console.log('sender :>> ', sender);
              console.log('sender :>> ', sender.resultGroupedPermonth);
            break

        }

    }

}

export default Mediator