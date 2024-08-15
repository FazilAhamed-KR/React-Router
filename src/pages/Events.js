import { Await, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading.....</p>}>
      <Await resolve={events}>
        {(loaderEvents) => <EventsList events={loaderEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

