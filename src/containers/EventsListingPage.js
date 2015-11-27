import React, {Component, PropTypes} from "react";
import moment from "moment-timezone";
import { connectToStores } from "fluxible-addons-react";

import EventList from "../components/EventList";

@connectToStores(["EventStore", "GalleryStore", "LocationStore"], context =>
  ({
    events: context.getStore("EventStore").getEvents(),
    galleries: context.getStore("GalleryStore").getGalleries(),
    locations: context.getStore("LocationStore").getLocations()
  })
)
class EventsListingPage extends Component {
  static propTypes = {}
  render() {
    const filterDay = this.props.currentRoute.params.date || moment.tz("Australia/Melbourne").format("YYYY-MM-DD");
    return (
      <main>
        <div className="container">
          <div className="row">
            <div className="col-sm-5 col-md-5 col-lg-4">
              <h1 className="Page-title">Art Gallery Openings In Melbourne</h1>
            </div>
            <div className="col-md-offset-0 col-md-7 col-lg-8 col-sm-offset-1 col-sm-6">
              <EventList {...this.props} filterDay={filterDay}/>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default EventsListingPage;
