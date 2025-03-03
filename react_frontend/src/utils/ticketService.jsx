const api_url = import.meta.env.VITE_API_URL;

export const getTickets = async (token) => {
  const response = await fetch(`${api_url}/tickets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to load tickets");
  }
  return data.data;
};

// createTicket function to send the ticket to the backend
export const createTicket = async (token, ticketData) => {
  const response = await fetch(`${api_url}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Attach the token here
    },
    body: JSON.stringify(ticketData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create ticket");
  }

  return data.data; // Assuming the response contains the ticket data in `data`
};

export const updateTicketStatus = async (token, ticketId, newStatus) => {
  const response = await fetch(`${api_url}/tickets/${ticketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: newStatus }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update ticket status");
  }
  return data.data; // Returning the updated ticket
};
