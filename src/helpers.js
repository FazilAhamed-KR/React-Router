import { defer, json, redirect } from "react-router-dom";

async function loaderEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json({ message: "could not fetch the data" }, { status: 500 });
    // //....
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader() {
  return defer({
    events: loaderEvents(),
  });
}

async function loaderDetails(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "could to fetch details for the selected events" },
      { status: 500 }
    );
  }
  const resData = await response.json();
  return resData.event;
}

//eventDetails
export async function loaderEventDetails({ params }) {
  const id = params.id;
  return defer({
    event: await loaderDetails(id),
    events: loaderEvents(),
  });
}
export async function handleDelete({ request, params }) {
  const id = params.id;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "could to delete the selected events" },
      { status: 500 }
    );
  }
  return redirect("/events");
}

//New Event
export async function handleNewEvent({ request, params }) {
  const method = await request.method;
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    const id = params.id;
    url = `http://localhost:8080/events/${id}`;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "could not able to create a data" }, { status: 500 });
  }

  return redirect("/events");
}

// NewsLetter
export async function newsletterAction({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  // send to backend newsletter server ...
  console.log(email);
  return { message: "Signup successful!" };
}
