export default {
  logo: require("app.root/assets/images/logo.svg").default,
  fonts:{
      "SourceSansPro-Regular":require("app.root/assets/fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf").default,
      "SourceSansPro-Light":require("app.root/assets/fonts/Source_Sans_Pro/SourceSansPro-Light.ttf").default,
      "SourceSansPro-Semibold":require("app.root/assets/fonts/Source_Sans_Pro/SourceSansPro-Semibold.ttf").default,
      "Dosis-Medium":require("app.root/assets/fonts/Dosis/Dosis-Medium.ttf").default,
  }
} as {
  fonts: {[key:string]:string};
  logo: string;
};
