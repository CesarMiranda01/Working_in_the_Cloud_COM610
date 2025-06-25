export interface User {
    id: string;
    email: string;
    fullName: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UpdateUserData {
    admin: {
      id: string;
      firstName: string;
      middleName?: string;
      fatherName: string;
      motherName: string;
      dni: string;
      email: string;
      imgPerfil?: string;
      rank: number;
      position: string;
      gender: 'male' | 'female' | 'other';
      docent: boolean;
      phoneCode: number;
      telephone: string;
      birthDate: string;
      createdAt: string;
      updatedAt: string;
    };
    auth: {
      id: string;
      administratorId: string;
      email: string;
      emailOld: string | null;
      createdAt: string;
      updatedAt: string;
    };
  }