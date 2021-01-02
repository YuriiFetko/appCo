export interface Users {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  totalClicks: number;
  totalPageViews: number;
  ipAddress: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
}
