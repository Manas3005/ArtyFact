import {createRoot} from "react-dom/client";
import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
import { createElement } from "react";
import { observable, configure , reaction} from "mobx";
import {model} from '/src/artModel.js';

const reactiveModel= observable(model);

createRoot(document.getElementById('root'))
    .render(<ReactRoot model={reactiveModel} />);

window.myModel= reactiveModel;