
export interface Cola {
  updatedAt: Date
  personas: string[]
}

export const cola: Cola = {
  updatedAt: new Date(),
  personas: []
};