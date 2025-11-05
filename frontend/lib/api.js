import axios from "axios";

const api = axios.create({
  // Use same-origin by default so Next.js rewrites proxy (next.config.mjs) applies in dev.
  // You can override with NEXT_PUBLIC_API_URL when deploying.
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Users API
export const getUsers = async () => {
  const res = await api.get("/api/v1/users");
  return res.data;
};

export const getUser = async (id) => {
  const res = await api.get(`/api/v1/users/${id}`);
  return res.data;
};

export const createUser = async (user) => {
  const res = await api.post("/api/v1/users", { user });
  return res.data;
};

export const updateUser = async (id, user) => {
  const payload = {};
  const name = String(user?.name ?? "").trim();
  const email = String(user?.email ?? "").trim();
  const role = user?.role;
  if (name) payload.name = name;
  if (email) payload.email = email;
  if (role) payload.role = role;
  const res = await api.put(`/api/v1/users/${id}`, { user: payload }, {
    validateStatus: (s) => s === 200 || s === 202,
  });
  return res.data;
};

export const deleteUser = async (id) => {
  const res = await api.delete(`/api/v1/users/${id}`, {
    validateStatus: (s) => [200, 202, 204, 404].includes(s),
  });
  return res.data ?? {};
};

// Projects API
export const getProjects = async () => {
  const res = await api.get("/api/v1/projects");
  return res.data;
};

export const getProject = async (id) => {
  const res = await api.get(`/api/v1/projects/${id}`);
  return res.data;
};

export const createProject = async (project) => {
  const res = await api.post("/api/v1/projects", { project });
  return res.data;
};

export const updateProject = async (id, project) => {
  const payload = {
    title: String(project?.title ?? "").trim(),
    description: project?.description ?? "",
    status: project?.status ?? undefined,
    credit_allocated: project?.credit_allocated ?? undefined,
    credit_used: project?.credit_used ?? undefined,
    user_id: project?.user_id ?? undefined,
  };
  const res = await api.put(`/api/v1/projects/${id}`, { project: payload }, {
    validateStatus: (s) => s === 200 || s === 202,
  });
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/api/v1/projects/${id}`, {
    validateStatus: (s) => [200, 202, 204, 404].includes(s),
  });
  return res.data ?? {};
};

// Scales API
export const getScales = async () => {
  const res = await api.get("/api/v1/scales");
  return res.data;
};

export const getScale = async (id) => {
  const res = await api.get(`/api/v1/scales/${id}`);
  return res.data;
};

export const createScale = async (scale) => {
  const res = await api.post("/api/v1/scales", { scale });
  return res.data;
};

export const updateScale = async (id, scale) => {
  const payload = {
    title: String(scale?.title ?? "").trim(),
    description: scale?.description ?? "",
    language: String(scale?.language ?? "tr").trim() || "tr",
    status: scale?.status || "draft",
    project_id: scale?.project_id ?? undefined,
    user_id: scale?.user_id ?? undefined,
  };
  const res = await api.put(`/api/v1/scales/${id}`, { scale: payload }, {
    validateStatus: (s) => s === 200 || s === 202,
  });
  return res.data;
};

export const deleteScale = async (id) => {
  const res = await api.delete(`/api/v1/scales/${id}`, {
    validateStatus: (s) => [200, 202, 204, 404].includes(s),
  });
  return res.data ?? {};
};

// Scale Items API
export const getScaleItems = async () => {
  const res = await api.get("/api/v1/scale_items");
  return res.data;
};

export const createScaleItem = async (scale_item) => {
  const res = await api.post("/api/v1/scale_items", { scale_item });
  return res.data;
};

export const deleteScaleItem = async (id) => {
  const res = await api.delete(`/api/v1/scale_items/${id}`);
  return res.data;
};

// Surveys API
export const getSurveys = async () => {
  const res = await api.get("/api/v1/surveys");
  return res.data;
};

export const getSurvey = async (id) => {
  const res = await api.get(`/api/v1/surveys/${id}`);
  return res.data;
};

export const createSurvey = async (survey) => {
  const res = await api.post("/api/v1/surveys", { survey });
  return res.data;
};

export const updateSurvey = async (id, survey) => {
  const res = await api.put(`/api/v1/surveys/${id}`, { survey });
  return res.data;
};

export const deleteSurvey = async (id) => {
  const res = await api.delete(`/api/v1/surveys/${id}`);
  return res.data;
};

export default api;

// Analyses API
export const getAnalyses = async () => {
  const res = await api.get("/api/v1/analyses");
  return res.data;
};

export const getAnalysis = async (id) => {
  const res = await api.get(`/api/v1/analyses/${id}`);
  return res.data;
};

export const createAnalysis = async (analysis) => {
  const res = await api.post("/api/v1/analyses", { analysis });
  return res.data;
};

export const updateAnalysis = async (id, analysis) => {
  const res = await api.put(`/api/v1/analyses/${id}`, { analysis });
  return res.data;
};

export const deleteAnalysis = async (id) => {
  const res = await api.delete(`/api/v1/analyses/${id}`);
  return res.data;
};

// Credit Transactions API
export const getCreditTransactions = async () => {
  const res = await api.get("/api/v1/credit_transactions");
  return res.data;
};

export const getCreditTransaction = async (id) => {
  const res = await api.get(`/api/v1/credit_transactions/${id}`);
  return res.data;
};

export const createCreditTransaction = async (credit_transaction) => {
  const res = await api.post("/api/v1/credit_transactions", { credit_transaction });
  return res.data;
};

export const updateCreditTransaction = async (id, credit_transaction) => {
  const res = await api.put(`/api/v1/credit_transactions/${id}`, { credit_transaction });
  return res.data;
};

export const deleteCreditTransaction = async (id) => {
  const res = await api.delete(`/api/v1/credit_transactions/${id}`);
  return res.data;
};

// Responses API
export const getResponses = async () => {
  const res = await api.get("/api/v1/responses");
  return res.data;
};

export const getResponse = async (id) => {
  const res = await api.get(`/api/v1/responses/${id}`);
  return res.data;
};

export const createResponse = async (response) => {
  const res = await api.post("/api/v1/responses", { response });
  return res.data;
};

export const updateResponse = async (id, response) => {
  const res = await api.put(`/api/v1/responses/${id}`, { response });
  return res.data;
};

export const deleteResponse = async (id) => {
  const res = await api.delete(`/api/v1/responses/${id}`);
  return res.data;
};
