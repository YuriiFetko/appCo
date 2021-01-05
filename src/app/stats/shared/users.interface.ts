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

export interface User {
  userId: number;
  views: number;
  clicks: number;
  date: string;
}

export interface DateArray {
  clicks: number;
  views: number;
  date: string;
}
