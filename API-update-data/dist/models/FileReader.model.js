"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseFileReader_model_1 = require("./baseFileReader.model");
var App;
(function (App) {
    class FileReader extends baseFileReader_model_1.BaseFileReader {
        constructor(name) {
            super(name);
            this.name = name;
        }
    }
    App.FileReader = FileReader;
})(App || (App = {}));
