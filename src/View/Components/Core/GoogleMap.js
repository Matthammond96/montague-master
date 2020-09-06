import React, { Component } from 'react';
import { Map, GoogleApiWrapper} from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        lat: null,
        lng: null
      }
    }

    this.geocode = this.geocode.bind(this);
  }


  async geocode(geocoder) {
    await geocoder.geocode({'address': "13 spenlow apartment, wenlock road, london, n1 7gh"}, async (results, status) => {
      if (status == 'OK') {
        await this.setState({
          location: {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }
        })
      } else {
        console.log(status);
      }
    })
  }

  async componentDidMount() {
    const google = window.google;
    let geocoder = new google.maps.Geocoder();
    await this.geocode(geocoder)
  }
  

  render() {
    return (
      <div className="google-map-container">
        <Map
          google={this.props.google}
          zoom={16}
          style={mapStyles}
          center={{
            lat: this.state.location.lat,
            lng: this.state.location.lng
          }}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBrHZ7TqCyB_sT0c4OGK91RxQV5GAaPgPs")
})(MapContainer)