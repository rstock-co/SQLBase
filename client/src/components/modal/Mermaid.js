import { React, Component } from "react";
import mermaid from "mermaid";
import './mermaid.scss'

const style = {
  maxWidth: '100%',
  fontSize: 32,
}

mermaid.initialize({
  startOnLoad: true,
  theme: "neutral",
  securityLevel: "loose",
  er: {
    diagramPadding: 20,
    layoutDirection: 'TB',
    minEntityWidth: 100,
    minEntityHeight: 70,
    entityPadding: 15,
    stroke: 'gray',
    fill: 'honeydew',
    fontSize: 24,
    useMaxWidth: false,
  },
  themeCSS: `
    .er.relationshipLine {
      stroke-width: 1.5;
    }
    .er.entityBox {
      fill: #262c72
    }
    .er.entityLabel {
      fill: #fff
    }
    .er.attributeBoxEven {
      fill: #8781d3
    }
    .er.attributeBoxOdd {
      fill: #5755a1
    }


    g.classGroup rect {
      fill: #282a36;
      stroke: #6272a4;
    } 
    g.classGroup text {
      fill: #f8f8f2;
    }
    g.classGroup line {
      stroke: #f8f8f2;
      stroke-width: 1;
    }
    .classLabel .box {
      stroke: #21222c;
      stroke-width: 3;
      fill: #21222c;
      opacity: 1;
    }
    .classLabel .label {
      fill: #f1fa8c;
    }
    .relation {
      stroke: #ff79c6;
      stroke-width: 1;
    }
    #compositionStart, #compositionEnd {
      fill: #bd93f9;
      stroke: #bd93f9;
      stroke-width: 1;
    }
    #aggregationEnd, #aggregationStart {
      fill: #21222c;
      stroke: #50fa7b;
      stroke-width: 1;
    }
    #dependencyStart, #dependencyEnd {
      fill: #00bcd4;
      stroke: #00bcd4;
      stroke-width: 1;
    } 
    #extensionStart, #extensionEnd {
      fill: #f8f8f2;
      stroke: #f8f8f2;
      stroke-width: 1;
    }`,
  fontFamily: "roboto",
});



export default class Mermaid extends Component {
  componentDidMount() {
    mermaid.contentLoaded();
  }
  render() {
    return <div className="mermaid" style={style}>{this.props.chart}</div>;
  }
}

// export default Mermaid;
