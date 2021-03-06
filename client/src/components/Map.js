import React, {useState, useEffect, useContext} from "react";
import ReactMapGL, {NavigationControl, Marker} from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
import PinIcon from './PinIcon';
import Context from '../context';
import Blog from './Blog';

const initviewport = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 7
}

const Map = ({ classes }) => {
  const {state, dispatch} = useContext(Context);
  const [viewport, setViewport] = useState(initviewport);
  const [userPosition, setUserPosition] = useState(null);
  useEffect(()=>{
    getUserPosition();
  }, []);

  const  getUserPosition = ()=> {
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(position => {
        const {latitude, longitude} = position.coords
        console.log(position.coords);
        setViewport({ ...viewport, latitude, longitude})
        setUserPosition({latitude, longitude})
      });
    }
  };

  const handleMapClick = ({lngLat, leftButton}) => {
    if(!leftButton) return;
    if(!state.draft) {
      dispatch({type: "CREATE_DRAFT"})
    }

    const [longitude, latitude] = lngLat;
    dispatch({
      type: "UPDATE_DRAFT_LOCATION",
      payload: {longitude, latitude}
    })

  }

  return (
  <div className={classes.root}>
  <ReactMapGL
  width="100vw"
  height="calc(100vh - 64px)"
  mapStyle="mapbox://styles/mapbox/streets-v11"
  mapboxApiAccessToken="pk.eyJ1IjoiM3VtYSIsImEiOiJjanVpb2wxam4xOHlhNDFvYWVqaWV0cXV4In0.v9WgYxIa0BhbmJLAjOMMdA"
  onViewportChange={newViewport => setViewport(newViewport) }
  onClick={handleMapClick}
  {...viewport}
  >
    <div className={classes.navigationControl}>
    <NavigationControl   onViewportChange={newViewport => setViewport(newViewport) }
/>
    </div>

   {userPosition && (
     <Marker
       latitude = {userPosition.latitude} 
       longitude = {userPosition.longitude}
       offsetLeft = {-19}
       offsetTop = {-37}
       >
       <PinIcon size={41} color="red"/>
     </Marker>
   )}
   {state.draft && (
      <Marker
      latitude = {state.draft.latitude} 
      longitude = {state.draft.longitude}
      offsetLeft = {-19}
      offsetTop = {-37}
      >
      <PinIcon size={41} color="hotpink"/>
    </Marker>
   )}
    </ReactMapGL>

    <Blog/>
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
