export interface Role {
  id: string;
  name: string;
  description?: string;
  panel?: string;
  permissionIds?: string[];
  type?: string;
  permissions?: string[];
  userCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
