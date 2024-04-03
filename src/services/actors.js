import { customFetch } from "../utils/utils"; // Adjust the path as needed

const URL = `${process.env.REACT_APP_API_URL}/actors`;

export const searchActors = (inputValue) => {
  return customFetch(`${URL}/search?query=${inputValue}`);
};

export const getAllActors = (signal, searchQuery = "", page = 1) => {
  const params = new URLSearchParams({ query: searchQuery, page }).toString();
  return customFetch(`${URL}?${params}`, { signal });
};

export const deleteActor = (token, actorId) => {
  return customFetch(`${URL}/${actorId}`, {
    method: "DELETE",
    token,
  });
};

export const addActor = (token, ActorData) => {
  const formData = new FormData();
  formData.append("name", ActorData.name);
  formData.append("gender", ActorData.gender);
  formData.append("about", ActorData.about);
  if (ActorData.profile) formData.append("profile", ActorData.profile);

  return customFetch(`${URL}`, {
    method: "POST",
    body: formData,
    token,
  });
};

export const editActor = (token, { actorId, actorData }) => {
  const formData = new FormData();
  Object.keys(actorData).forEach((key) => {
    formData.append(key, actorData[key]);
  });

  return customFetch(`${URL}/${actorId}`, {
    method: "PATCH",
    body: formData,
    token,
  });
};
