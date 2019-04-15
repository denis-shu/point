import React, {useState} from "react";
import ReactMapGL, {NavigationControl} from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";

const initviewport = {
  latitude: 37.7577,
  longtitude: -122.4376,
  zoom: 7
}

const Map = ({ classes }) => {
  const [viewport, setViewport] = useState(initviewport)
  return (
  <div className={classes.root}>
  <ReactMapGL
  width="100vw"
  height="calc(100vh - 64px)"
  mapStyle="mapbox://styles/mapbox/streets-v11"
  mapboxApiAccessToken="pk.eyJ1IjoiM3VtYSIsImEiOiJjanVpb2wxam4xOHlhNDFvYWVqaWV0cXV4In0.v9WgYxIa0BhbmJLAjOMMdA"
  onViewportChange={newViewport => setViewport(newViewport) }
  {...viewport}
  >
    <div className={classes.navigationControl}>
    <NavigationControl   onViewportChange={newViewport => setViewport(newViewport) }
/>
    </div>
    </ReactMapGL>
  </div>
  
  )  
  };

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
