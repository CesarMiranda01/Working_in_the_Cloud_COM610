// types/publish.ts
export interface Publish {
  _id?: string; // Para compatibilidad con MongoDB
  id: string;
  administratorId: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  link1?: string;
  link2?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePublishData {
  title: string;
  description: string;
  image?: string;
  video?: string;
  link1?: string;
  link2?: string;
}

export interface UpdatePublishData {
  title?: string;
  description?: string;
  image?: string;
  video?: string;
  link1?: string;
  link2?: string;
}