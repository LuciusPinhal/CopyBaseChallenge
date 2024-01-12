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
  initUpload: {},
  initGraphs: {},

  FileName: '',
  StatusScreen: false,
  AllStats: {},

  async notify(sender, event) {
    switch (event) {
      case "initHome":
        this.mainScreen = sender
        this.notify(this.StatusScreen, "screenStatus");
        break
      
      case "initNavbar": 
        this.initNavbar = sender;
        this.notify(this.FileName, "FileName");
        break
      
      case "initTable":
        this.mainTable = sender
        this.notify(null, "PullDate")
        break
      
      case "initUpload":
        this.initUpload = sender
        break
      
      case "initGraphs":
        this.initGraphs = sender
        this.notify(null, "ReloadAllScreen");
        break
      
        
      case "screenStatus": 
        this.StatusScreen = sender
        this.mainScreen.ValidationHeader(this.StatusScreen);
        break
    
      case "AllStats": 
        this.AllStats = {
          'ARR': sender.Arr,
          'Mrr' : sender.Mrr,
          'ChurnRate' : sender.ChurnRate,
          'ChurnRateAmonth' : sender.ChurnRateAmonth,
          'statisticsAmonth' : sender.statisticsAmonth, 
          'resultGroupedPermonth' : sender.resultGroupedPermonth, 
          'arpuMonthly' : sender.arpuMonthly,
          'arpuAnnual' : sender.arpuAnnual, 
          'totalMonthlyRevenue' : sender.totalMonthlyRevenue,  
          'totalAnnualRevenue' : sender.totalAnnualRevenue, 
          'totalUsers' : sender.totalUsers,  
          'ltvMonthly' : sender.ltvMonthly,  
          'ltvAnnual' : sender.ltvAnnual,
        }
        break
      
      case "FileName": 
        this.FileName = sender;
        this.initNavbar.updateNavbar(sender);
        break
      
      case "ImportFile": 
            //   setTimeout(() => {
            //     this.initUpload.flashEffect();
            // }, 500);
        break
           
      case "PullDate":
        var resultGroupedPermonth = this.AllStats.resultGroupedPermonth
        this.mainTable.loadFromMediator(resultGroupedPermonth);
        break
      
      case "Remove":  
        this.FileName = '';
        this.StatusScreen = false;
        this.AllStats = {};

        this.notify(null, "ReloadAllScreen");

       
        break
      
      case "ReloadAllScreen":  
        this.notify(this.FileName, "FileName");
        this.notify(this.StatusScreen, "screenStatus");
        //verificando se a table foi iniciada
        if (this.mainTable.loadFromMediator) {
          this.notify(this.resultGroupedPermonth, "PullDate");
          this.mainTable.getStatus(this.StatusScreen);
        }
        if (this.initGraphs.loadFromMediator) {
          this.initGraphs.loadFromMediator(this.AllStats);
        }
       
  
        break
    
    }

  }

}

export default Mediator