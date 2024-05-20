// https://mobilepalette.colorion.co
// https://coolors.co/2c363f-e75a7c-f2f5ea-d6dbd2-bbc7a4
// const tintColorLight = "#510C06";
// const tintColorDark = "#510C06";

export const themes = (colorScheme) =>
  colorScheme === "dark"
    ? {
        background: "#774308",
        text: "#FBF8F4",
        button: "#510C06",
        cardbackground: "#FBF8F4",
        cardtext: "#774308",
        tint: "#510C06",
      }
    : {
        background: "#FBF8F4",
        text: "#774308",
        button: "#510C06",
        cardbackground: "#774308",
        cardtext: "#FBF8F4",
        tint: "#510C06",
      };
