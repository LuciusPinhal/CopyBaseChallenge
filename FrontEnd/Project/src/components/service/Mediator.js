var Mediator = {
  instance: function () {
    if (!Mediator.instance) {
      Mediator.instance = this;
    }
    return Mediator.instance;
  },

  mainScreen: {},
  StatusScreen: false,


  async notify(sender, event) {
        switch (event) {
            case "init":
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