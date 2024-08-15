import logo from "./logo.svg";
import "./App.css";
import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import { useEffect } from "react";

cytoscape.use(cxtmenu);

// import CytoscapeComponent from 'react-cytoscapejs';

/*
class MyApp extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    const elements = [
      { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
      { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
      { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
    ];

    return <CytoscapeComponent
      layout={
        {
          name: 'random'
        }
      }

      zoom={1}


      stylesheet={[
        {
          selector: 'node',
          style: {
            width: 40,
            height: 40,
            shape: 'star'
          }
        },
        {
          selector: 'edge',
          style: {
            width: 5
          }
        }
      ]} elements={elements} style={{ width: '1000px', height: '1000px' }} />;
  }
}
*/

function App() {
  const node = "nodes" as cytoscape.ElementGroup;
  const edge = "edges" as cytoscape.ElementGroup;
  const elements: cytoscape.EdgeDefinition[] | cytoscape.NodeDefinition[] = [
    {
      data: { id: "one", label: "Node 1" },
      position: { x: 0, y: 0 },
      group: node,
    },
    {
      data: { id: "two", label: "Node 2" },
      position: { x: 100, y: 0 },
      group: node,
    },
    {
      data: {
        source: "one",
        target: "two",
        label: "Edge from Node1 to Node2",
        id: "edge1",
        flipLabel: true
      },
      group: edge,
    },
  ];

  useEffect(() => {
    console.log("IN", document.getElementById("cy"));
    const cy = cytoscape({
      container: document.getElementById("cy"),
      style: [{
        selector: 'node',
        style: {
          'background-color': '#666',
          'label': 'data(label)'
        }
      },

      {
        selector: 'edge',
        style: {
          'width': 3,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier'
        }
      }],
      layout: {
        name: "preset",
      },
      elements: elements,
      zoom: 2,
      pan: {
        x: 200,
        y: 200
      },
      minZoom: 1,
      maxZoom: 2,
      zoomingEnabled: true,
      userZoomingEnabled: true,
      panningEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: true,
    });

    const default_settings: cytoscapeCxtmenu.Options = {
      menuRadius: () => {
        return 100;
      }, // the outer radius (node center to the end of the menu) in pixels. It is added to the rendered size of the node. Can either be a number or function as in the example.
      selector: "node", // elements matching this Cytoscape.js selector will trigger cxtmenus
      commands: [
        // an array of commands to list in the menu or a function that returns the array
        
        { // example command
          fillColor: 'rgba(200, 200, 200, 0.75)', // optional: custom background color for item
          content: 'a command name', // html/text content to be displayed in the menu
          contentStyle: {}, // css key:value pairs to set the command's css in js if you want
          select: function(ele){ // a function to execute when the command is selected
            console.log( ele.id() ) // `ele` holds the reference to the active element
          },
          // hover: function(ele){ // a function to execute when the command is hovered
          //   console.log( ele.id() ) // `ele` holds the reference to the active element
          // },
          enabled: true // whether the command is selectable
        }
        
      ], // function( ele ){ return [ /*...*/ ] }, // a function that returns commands or a promise of commands
      fillColor: "rgba(0, 0, 0, 0.75)", // the background colour of the menu
      activeFillColor: "rgba(1, 105, 217, 0.75)", // the colour used to indicate the selected command
      activePadding: 20, // additional size in pixels for the active command
      indicatorSize: 24, // the size in pixels of the pointer to the active command, will default to the node size if the node size is smaller than the indicator size,
      separatorWidth: 3, // the empty spacing in pixels between successive commands
      spotlightPadding: 4, // extra spacing in pixels between the element and the spotlight
      adaptativeNodeSpotlightRadius: false, // specify whether the spotlight radius should adapt to the node size
      minSpotlightRadius: 24, // the minimum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
      maxSpotlightRadius: 38, // the maximum radius in pixels of the spotlight (ignored for the node if adaptativeNodeSpotlightRadius is enabled but still used for the edge & background)
      openMenuEvents: "cxttapstart taphold", // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
      itemColor: "white", // the colour of text in the command's content
      itemTextShadowColor: "transparent", // the text shadow colour of the command's content
      zIndex: 9999, // the z-index of the ui div
      atMouse: false, // draw menu at mouse position

      outsideMenuCancel: 2, // if set to a number, this will cancel the command if the pointer is released outside of the spotlight, padded by the number given
    };

    const menu = cy.cxtmenu(default_settings);

    console.log("MENU", menu);
  }, []);



  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>

          {/* {
          <MyApp />
        } */}
        </header>
      </div >
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', /* Full width of the parent */
        height: '100%', /* Full height of the parent */
      }}>
        <div id="cy" style={{ width: '100vw', height: '100vh' }}></div>
      </div>

    </>
  );
}

export default App;
