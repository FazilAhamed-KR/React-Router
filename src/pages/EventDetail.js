import React, { Suspense } from "react";
import EventItem from "../components/EventItem";
import { Await, useRouteLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

const EventDetail = () => {
  const { event, events } = useRouteLoaderData("event-details");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>{(event) => <EventItem event={event} />}</Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(events) => <EventsList events={events} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetail;
