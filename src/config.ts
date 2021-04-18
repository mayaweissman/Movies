export class IsOnFactory {
    public static IsOnFactory: boolean;
  
    public static _initialize() {
      // if (process.env.NODE_ENV === "production") {
        const currentUrl = window.location.href.split("//")[1].split("/")[0];
        if(currentUrl === 'localhost:3000' || currentUrl === 'factory.mccann.co.il'){
          IsOnFactory.IsOnFactory = true;
        }
        else if(currentUrl === 'digital.mccann.co.il'){
          IsOnFactory.IsOnFactory = false;
        }
      // } else {
      //   Config.serverUrl = "http://localhost:3000";
      // }
    }
  }
  
  IsOnFactory._initialize();
  