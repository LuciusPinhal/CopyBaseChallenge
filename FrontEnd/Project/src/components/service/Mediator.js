var Mediator = {
  instance: function () {
    if (!Mediator.instance) {
      Mediator.instance = this;
    }
    return Mediator.instance;
  },

  mainScreen: {},
  mainTable: {},
  initNavbar: {},

  FileName: '',

  StatusScreen: false,

  Arr: 0,
  Mrr: [],
  ChurnRate: 0,
  ChurnRateAmonth: 0,
  statisticsAmonth: {}, 
  //ver quando carregar a tela se o mediator envia os dados
  resultGroupedPermonth: [], 
  arpuMonthly: 0,
  arpuAnnual: 0, 
  totalMonthlyRevenue: 0,  
  totalAnnualRevenue: 0, 
  totalUsers: 0,  
  ltvMonthly: 0,  
  ltvAnnual: 0,  



  async notify(sender, event) {
    switch (event) {
      case "initHome":
        this.mainScreen = sender
        //verificar status pagina
        this.notify(this.StatusScreen, "screenStatus")
        break
      
      case "initNavbar": 
        this.initNavbar = sender;
        break
      
      case "initTable":
        this.mainTable = sender
        this.notify(null, "PullDate")
        break
        
      case "screenStatus": 
        this.StatusScreen = sender
        this.mainScreen.ValidationHeader(this.StatusScreen);
        break
    
      case "AllStats": 
        console.log('sender 1:>> ', sender.Arr);
        console.log('sender 2:>> ', sender.Mrr);
        console.log('sender 3:>> ', sender.ChurnRate);
        console.log('sender 4:>> ', sender.ChurnRateAmonth);
        console.log('sender 5:>> ', sender.statisticsAmonth);
        this.statisticsAmonth = sender.statisticsAmonth;

        console.warn("🍷🗿 >> this.statisticsAmonth: 5", this.statisticsAmonth);

        console.log('sender 6:>> ', sender.arpuMonthly);
        console.log('sender 7:>> ', sender.arpuAnnual);
        console.log('sender 8:>> ', sender.totalMonthlyRevenue);
        console.log('sender 9:>> ', sender.totalAnnualRevenue);

        console.log('sender 10:>> ', sender.totalUsers);
        console.log('sender 11:>> ', sender.ltvMonthly);
        console.log('sender 12:>> ', sender.ltvAnnual);
 

      //  Mediator.notify({ ARR, MRR, ChurnRate, ChurnRateAmonth, statisticsAmonth, resultGroupedPermonth,
      //                           arpuMonthly, arpuAnnual, totalMonthlyRevenue, totalAnnualRevenue, totalUsers,
      //                           ltvMonthly, ltvAnnual }, "AllStats");
         
        this.resultGroupedPermonth = sender.resultGroupedPermonth
        break
      
     
      case "FileName": 
        console.log('sender :>> ', sender);
        this.FileName = sender;
        this.initNavbar.updateNavbar(this.FileName);
        break
       
      case "PullDate":
        this.mainTable.loadFromMediator(this.resultGroupedPermonth)
        break
    
    }

  }

}

export default Mediator